import { motion } from "framer-motion";
import { Smartphone, Battery, Unlock, Camera, Droplets, Plug } from "lucide-react";

const services = [
  { title: "Écran cassé", desc: "Remplacement d'écran LCD/OLED toutes marques avec garantie", icon: Smartphone, color: "from-primary to-accent" },
  { title: "Batterie", desc: "Remplacement de batterie avec pièces certifiées d'origine", icon: Battery, color: "from-accent to-neon-blue" },
  { title: "Problème de charge", desc: "Réparation du port de charge USB-C / Lightning", icon: Plug, color: "from-neon-blue to-primary" },
  { title: "Déblocage", desc: "Déblocage réseau et suppression de comptes opérateur", icon: Unlock, color: "from-primary to-accent" },
  { title: "Caméra", desc: "Réparation et remplacement du module caméra avant/arrière", icon: Camera, color: "from-accent to-neon-blue" },
  { title: "Dégâts des eaux", desc: "Nettoyage ultrasonique et récupération après contact liquide", icon: Droplets, color: "from-neon-blue to-primary" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-28 px-6 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 glitch" data-text="Nos Services">
            Nos <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Des réparations professionnelles pour tous vos appareils mobiles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="group glass rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:glow-primary-sm hover:border-primary/30 relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} mb-5 group-hover:glow-primary-sm transition-all duration-300`}>
                  <service.icon className="text-primary-foreground" size={26} />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-foreground group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
