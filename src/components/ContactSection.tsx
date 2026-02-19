import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  { icon: MapPin, label: "Adresse", value: "Abomey-Calavi, Bénin" },
  { icon: Phone, label: "Téléphone", value: "+229 41 67 57 84" },
  { icon: Clock, label: "Horaires", value: "Lun-Sam : 9h - 19h" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
          Nous <span className="text-gradient">Contacter</span>
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
          Passez nous voir ou contactez-nous directement sur WhatsApp
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {contactInfo.map((item) => (
            <div key={item.label} className="glass rounded-xl p-6 text-center group hover:glow-primary-sm transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="text-primary" size={22} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
