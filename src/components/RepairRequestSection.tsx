import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, ChevronRight, ChevronLeft, Send, CheckCircle2, Wrench, MessageSquare, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const brands = [
  "Samsung", "Apple", "Huawei", "Xiaomi", "Oppo", "Realme",
  "OnePlus", "Tecno", "Infinix", "Vivo", "Nokia", "Google Pixel",
];

const problems = [
  { id: "screen", label: "Écran cassé / fissuré", icon: "📱" },
  { id: "battery", label: "Batterie défectueuse", icon: "🔋" },
  { id: "charge", label: "Problème de charge", icon: "🔌" },
  { id: "camera", label: "Caméra en panne", icon: "📷" },
  { id: "water", label: "Dégâts des eaux", icon: "💧" },
  { id: "unlock", label: "Déblocage / Mot de passe", icon: "🔓" },
  { id: "speaker", label: "Haut-parleur / Micro", icon: "🔊" },
  { id: "other", label: "Autre problème", icon: "❓" },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  phone: z.string().trim().min(8, "Numéro invalide").max(20),
  details: z.string().trim().max(500).optional(),
});

const TOTAL_STEPS = 4;

const RepairRequestSection = () => {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleProblem = (id: string) => {
    setSelectedProblems((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const canNext = () => {
    if (step === 0) return brand !== "";
    if (step === 1) return model.trim().length >= 2;
    if (step === 2) return selectedProblems.length > 0;
    if (step === 3) return name.trim().length >= 2 && phone.trim().length >= 8;
    return false;
  };

  const handleSubmit = () => {
    const result = contactSchema.safeParse({ name, phone, details });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const problemLabels = selectedProblems
      .map((id) => problems.find((p) => p.id === id)?.label)
      .join(", ");
    const message = encodeURIComponent(
      `Bonjour EurissGSM 👋\n\nJe souhaite faire réparer mon téléphone :\n📱 Marque : ${brand}\n📋 Modèle : ${model}\n🔧 Problème(s) : ${problemLabels}\n📝 Détails : ${details || "Aucun"}\n👤 Nom : ${name}\n📞 Tél : ${phone}`
    );
    window.open(`https://wa.me/22941675784?text=${message}`, "_blank");
    setSubmitted(true);
  };

  const stepTitles = [
    "Quelle est la marque ?",
    "Quel est le modèle ?",
    "Quel est le problème ?",
    "Vos coordonnées",
  ];

  return (
    <section id="reparation" className="py-28 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 glitch" data-text="Demande de Réparation">
            Demande de <span className="text-gradient">Réparation</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Enregistrez votre téléphone en quelques étapes et recevez une prise en charge rapide
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden"
        >
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-8">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted">
                <motion.div
                  className="h-full bg-gradient-neon rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: i <= step ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>

          {/* Step indicator */}
          <p className="text-xs text-muted-foreground mb-2">
            Étape {step + 1} / {TOTAL_STEPS}
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 className="mx-auto text-accent mb-4" size={56} />
                <h3 className="font-heading text-2xl font-bold mb-2 text-foreground">Demande envoyée !</h3>
                <p className="text-muted-foreground mb-6">
                  Nous vous contacterons très rapidement sur WhatsApp.
                </p>
                <Button
                  onClick={() => { setSubmitted(false); setStep(0); setBrand(""); setModel(""); setSelectedProblems([]); setName(""); setPhone(""); setDetails(""); }}
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10"
                >
                  Nouvelle demande
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-heading text-xl md:text-2xl font-semibold mb-6 text-foreground flex items-center gap-3">
                  {step === 0 && <Smartphone size={24} className="text-primary" />}
                  {step === 1 && <Wrench size={24} className="text-primary" />}
                  {step === 2 && <MessageSquare size={24} className="text-primary" />}
                  {step === 3 && <User size={24} className="text-primary" />}
                  {stepTitles[step]}
                </h3>

                {/* Step 0: Brand */}
                {step === 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {brands.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBrand(b)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                          brand === b
                            ? "bg-gradient-neon text-primary-foreground border-transparent glow-primary-sm"
                            : "border-border bg-muted/30 text-foreground hover:border-primary/40 hover:bg-primary/10"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 1: Model */}
                {step === 1 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Marque sélectionnée : <span className="text-primary font-semibold">{brand}</span></p>
                    <input
                      type="text"
                      placeholder={`Ex: ${brand} Galaxy S24, iPhone 15...`}
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      maxLength={100}
                      className="w-full px-5 py-4 rounded-xl bg-muted/40 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                  </div>
                )}

                {/* Step 2: Problems */}
                {step === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {problems.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => toggleProblem(p.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all duration-200 border ${
                          selectedProblems.includes(p.id)
                            ? "bg-gradient-neon text-primary-foreground border-transparent glow-primary-sm"
                            : "border-border bg-muted/30 text-foreground hover:border-primary/40 hover:bg-primary/10"
                        }`}
                      >
                        <span className="text-lg">{p.icon}</span>
                        {p.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 3: Contact */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Votre nom complet"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          maxLength={100}
                          className="w-full pl-11 pr-5 py-4 rounded-xl bg-muted/40 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                        />
                      </div>
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="tel"
                          placeholder="Numéro WhatsApp (ex: +229 90 00 00 00)"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          maxLength={20}
                          className="w-full pl-11 pr-5 py-4 rounded-xl bg-muted/40 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                        />
                      </div>
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <textarea
                      placeholder="Détails supplémentaires (optionnel)"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      maxLength={500}
                      rows={3}
                      className="w-full px-5 py-4 rounded-xl bg-muted/40 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {!submitted && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
                className="border-border hover:bg-primary/10 gap-2"
              >
                <ChevronLeft size={16} /> Retour
              </Button>

              {step < TOTAL_STEPS - 1 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="bg-gradient-neon text-primary-foreground hover:opacity-90 gap-2 glow-primary-sm"
                >
                  Suivant <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canNext()}
                  className="bg-gradient-neon text-primary-foreground hover:opacity-90 gap-2 glow-primary-sm animate-pulse-glow"
                >
                  <Send size={16} /> Envoyer sur WhatsApp
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RepairRequestSection;
