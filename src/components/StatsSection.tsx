import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Users, Clock, Award } from "lucide-react";

const stats = [
  { icon: Wrench, value: 5000, suffix: "+", label: "Réparations effectuées" },
  { icon: Users, value: 3200, suffix: "+", label: "Clients satisfaits" },
  { icon: Clock, value: 30, suffix: "min", label: "Temps moyen de réparation" },
  { icon: Award, value: 5, suffix: " ans", label: "D'expérience" },
];

const useCountUp = (target: number, trigger: boolean, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [trigger, target, duration]);
  return count;
};

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(stat.value, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center group"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-neon mb-4 group-hover:glow-primary-sm transition-all duration-300">
        <stat.icon className="text-primary-foreground" size={28} />
      </div>
      <div className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-1">
        {count.toLocaleString("fr-FR")}
        <span className="text-gradient">{stat.suffix}</span>
      </div>
      <p className="text-sm text-muted-foreground">{stat.label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
