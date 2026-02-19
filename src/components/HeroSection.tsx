import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroImg}
        alt="Atelier de réparation mobile EurissGSM"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80" />
      {/* Gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 text-center px-6 max-w-3xl animate-fade-up">
        <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6">
          Réparation Mobile{" "}
          <span className="text-gradient">Premium</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground mb-10">
          Diagnostic intelligent avec IA en temps réel
        </p>
        <a href="#diagnostic">
          <Button className="text-lg px-8 py-6 glow-primary hover:animate-pulse-glow transition-all duration-300">
            Diagnostiquer maintenant
          </Button>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
