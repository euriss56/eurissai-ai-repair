import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import ParticlesBackground from "./ParticlesBackground";

const HeroSection = () => {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dark base */}
      <div className="absolute inset-0 bg-background" />

      {/* Neon gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1s" }} />

      {/* Particles */}
      <ParticlesBackground />

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan-line" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(270 80% 60% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(270 80% 60% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-body text-muted-foreground tracking-wide">
              Expert en réparation mobile
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold leading-[1.05] mb-6 glitch"
          data-text="Réparation Mobile Premium"
        >
          Réparation Mobile{" "}
          <span className="text-gradient">Premium</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Diagnostic intelligent propulsé par l'IA · Réparations express · Pièces certifiées
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#diagnostic">
            <Button className="text-lg px-10 py-7 bg-gradient-neon text-primary-foreground glow-primary hover:animate-pulse-glow transition-all duration-300 rounded-xl">
              Diagnostiquer maintenant
            </Button>
          </a>
          <a href="#services">
            <Button
              variant="outline"
              className="text-lg px-10 py-7 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 rounded-xl"
            >
              Nos services
            </Button>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#services" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-xs tracking-widest uppercase">Découvrir</span>
            <ChevronDown size={20} className="animate-float" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
