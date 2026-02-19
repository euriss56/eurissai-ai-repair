import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Loader2, Send } from "lucide-react";

const DiagnosticSection = () => {
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setResult("");

    // Simulated AI response for now (will connect to Lovable Cloud later)
    await new Promise((r) => setTimeout(r, 1500));
    setResult(
      `🔍 Analyse de votre problème : "${problem}"\n\n` +
      `📋 Diagnostic probable :\n` +
      `• Ce symptôme peut être lié à un composant matériel défaillant.\n` +
      `• Nous recommandons un examen physique approfondi de l'appareil.\n\n` +
      `💡 Solution recommandée :\n` +
      `Prenez rendez-vous pour un diagnostic complet en atelier. Estimation : 15-30 min.\n\n` +
      `⚡ Contactez-nous via WhatsApp pour un devis rapide !`
    );
    setLoading(false);
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
