import { MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";

const contactInfo = [
  { icon: MapPin, label: "Adresse", value: "Abomey-Calavi, Bénin" },
  { icon: Phone, label: "Téléphone", value: "+229 41 67 57 84" },
  { icon: Clock, label: "Horaires", value: "Lun-Sam : 9h - 19h" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 glitch" data-text="Nous Contacter">
            Nous <span className="text-gradient">Contacter</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Passez nous voir ou contactez-nous directement
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass rounded-2xl overflow-hidden relative min-h-[300px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63451.38563499564!2d2.2945!3d6.4486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1024a95c5b0b5a3d%3A0xb08d5c5b5a90d7a0!2sAbomey-Calavi%2C%20Benin!5e0!3m2!1sfr!2s!4v1700000000000!5m2!1sfr!2s"
              className="w-full h-full min-h-[300px] border-0 grayscale contrast-125 opacity-70"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation EurissGSM"
            />
            {/* Violet overlay on map */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 mix-blend-color bg-primary/10 pointer-events-none" />
          </motion.div>

          {/* Info cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 group hover:glow-primary-sm transition-all duration-300 flex items-center gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-neon flex items-center justify-center group-hover:glow-primary-sm transition-all duration-300">
                  <item.icon className="text-primary-foreground" size={20} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/+2290141675784"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-2xl p-6 group hover:glow-accent transition-all duration-300 flex items-center gap-5 cursor-pointer border border-accent/20 hover:border-accent/40"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[hsl(142,70%,45%)] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">WhatsApp</p>
                <p className="text-sm text-muted-foreground">Discutons en direct</p>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
