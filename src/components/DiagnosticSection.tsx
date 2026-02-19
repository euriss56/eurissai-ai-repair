import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Loader2, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

      // Final flush
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
    <section id="diagnostic" className="py-24 px-6">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Bot className="text-primary" size={20} />
            <span className="text-sm font-body text-muted-foreground">Propulsé par l'IA</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Diagnostic <span className="text-gradient">Intelligent</span>
          </h2>
          <p className="text-muted-foreground">
            Décrivez le problème de votre téléphone et notre IA vous donnera un premier diagnostic
          </p>
        </div>

        <div className="glass rounded-2xl p-8 space-y-6">
          <Textarea
            placeholder="Ex: Mon iPhone ne charge plus, l'écran clignote quand je branche le câble..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="min-h-[120px] bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground resize-none"
          />

          <Button
            onClick={handleAnalyze}
            disabled={loading || !problem.trim()}
            className="w-full py-6 text-lg glow-primary transition-all duration-300 hover:animate-pulse-glow"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={20} />
            ) : (
              <Send className="mr-2" size={20} />
            )}
            {loading ? "Analyse en cours..." : "Analyser"}
          </Button>

          {result && (
            <div className="glass rounded-xl p-6 animate-fade-up whitespace-pre-line text-sm text-foreground leading-relaxed">
              {result}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticSection;
