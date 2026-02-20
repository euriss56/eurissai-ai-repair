import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Loader2, Send, Cpu, Zap, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const DIAGNOSTIC_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/diagnostic`;

const DiagnosticSection = () => {
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleAnalyze = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setResult("");

    abortRef.current = new AbortController();

    try {
      const resp = await fetch(DIAGNOSTIC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ problem }),
        signal: abortRef.current.signal,
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Erreur inconnue" }));
        toast({ title: "Erreur", description: err.error || "Une erreur est survenue.", variant: "destructive" });
        setLoading(false);
        return;
      }

      if (!resp.body) {
        toast({ title: "Erreur", description: "Pas de réponse du serveur.", variant: "destructive" });
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let accumulated = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              accumulated += content;
              setResult(accumulated);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              accumulated += content;
              setResult(accumulated);
            }
          } catch { /* ignore */ }
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") return;
      console.error("Diagnostic error:", e);
      toast({ title: "Erreur", description: "Impossible de contacter le service IA.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="diagnostic" className="py-28 px-6 relative">
      {/* Neon line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-6">
            <Bot className="text-accent" size={18} />
            <span className="text-sm font-body text-muted-foreground">Propulsé par l'IA</span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 glitch" data-text="Diagnostic Intelligent">
            Diagnostic <span className="text-gradient">Intelligent</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Décrivez votre problème et notre IA génère un diagnostic instantané
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {[
            { icon: Cpu, text: "IA avancée" },
            { icon: Zap, text: "Résultat instantané" },
            { icon: Shield, text: "100% gratuit" },
          ].map((pill) => (
            <div key={pill.text} className="flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-muted-foreground">
              <pill.icon size={14} className="text-primary" />
              {pill.text}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-strong rounded-2xl p-8 md:p-10 space-y-6"
        >
          <div className="relative">
            <Textarea
              placeholder="Ex: Mon iPhone ne charge plus, l'écran clignote quand je branche le câble..."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="min-h-[130px] bg-secondary/40 border-primary/10 text-foreground placeholder:text-muted-foreground resize-none rounded-xl focus:border-primary/40 focus:ring-primary/20 transition-all duration-300 text-base"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading || !problem.trim()}
            className="w-full py-7 text-lg bg-gradient-neon text-primary-foreground glow-primary transition-all duration-300 hover:animate-pulse-glow rounded-xl font-semibold"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={22} />
            ) : (
              <Send className="mr-2" size={22} />
            )}
            {loading ? "Analyse en cours..." : "Analyser mon problème"}
          </Button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-xl p-6 whitespace-pre-line text-sm text-foreground leading-relaxed border border-primary/10"
            >
              {result}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DiagnosticSection;
