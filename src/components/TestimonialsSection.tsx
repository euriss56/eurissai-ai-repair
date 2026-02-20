import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Fatima A.",
    text: "Mon écran Samsung a été réparé en moins de 30 minutes. Qualité impeccable et prix honnête. Je recommande à 100% !",
    rating: 5,
    device: "Samsung Galaxy S23",
  },
  {
    name: "Koffi M.",
    text: "Le diagnostic IA m'a donné une estimation précise avant même de me déplacer. Service professionnel et rapide.",
    rating: 5,
    device: "iPhone 14 Pro",
  },
  {
    name: "Amina D.",
    text: "Mon téléphone tombé dans l'eau a été sauvé ! L'équipe EurissGSM est vraiment compétente. Merci infiniment.",
    rating: 5,
    device: "Xiaomi Redmi Note 12",
  },
  {
    name: "Boris T.",
    text: "Déblocage réseau fait en 10 minutes. Très satisfait du service et de l'accueil chaleureux.",
    rating: 4,
    device: "Huawei P30",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Neon separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Background neon wave */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 glitch" data-text="Témoignages">
            Ce qu'ils <span className="text-gradient">disent</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            La satisfaction de nos clients est notre meilleure publicité
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -60, rotateY: -15 }}
              transition={{ duration: 0.4 }}
              className="glass-strong rounded-2xl p-8 md:p-12 relative"
            >
              <Quote className="absolute top-6 right-6 text-primary/20" size={48} />

              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonials[current].rating ? "text-accent fill-accent" : "text-muted-foreground/30"}
                  />
                ))}
              </div>

              <p className="text-foreground text-lg md:text-xl leading-relaxed mb-8 font-body">
                "{testimonials[current].text}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading font-semibold text-foreground text-lg">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].device}
                  </p>
                </div>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i === current ? "bg-primary glow-primary-sm w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <button
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:glow-primary-sm transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:glow-primary-sm transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
