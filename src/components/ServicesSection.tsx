import serviceScreen from "@/assets/service-screen.jpg";
import serviceBattery from "@/assets/service-battery.jpg";
import serviceCharge from "@/assets/service-charge.jpg";
import serviceUnlock from "@/assets/service-unlock.jpg";
import serviceCamera from "@/assets/service-camera.jpg";
import serviceWater from "@/assets/service-water.jpg";

const services = [
  { title: "Écran cassé", desc: "Remplacement d'écran LCD/OLED toutes marques", img: serviceScreen },
  { title: "Batterie", desc: "Remplacement de batterie avec pièces certifiées", img: serviceBattery },
  { title: "Problème de charge", desc: "Réparation du port de charge USB-C / Lightning", img: serviceCharge },
  { title: "Déblocage", desc: "Déblocage réseau et suppression de comptes", img: serviceUnlock },
  { title: "Caméra", desc: "Réparation et remplacement du module caméra", img: serviceCamera },
  { title: "Dégâts des eaux", desc: "Nettoyage et récupération après contact liquide", img: serviceWater },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
          Nos <span className="text-gradient">Services</span>
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
          Des réparations professionnelles pour tous vos appareils mobiles
        </p>

        <div className="masonry">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group glass rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:glow-primary-sm hover:border-primary/40"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold mb-1 text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
