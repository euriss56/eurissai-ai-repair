import { motion } from "framer-motion";

const brands = [
  "Samsung", "Apple", "Huawei", "Xiaomi", "Oppo", "Realme",
  "OnePlus", "Tecno", "Infinix", "Vivo", "Nokia", "Google",
];

const BrandsCarousel = () => {
  return (
    <section className="py-12 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground mb-8 tracking-wide uppercase"
      >
        Nous réparons toutes les marques
      </motion.p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-10 animate-scroll-x">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 px-6 py-3 rounded-xl glass border border-border/30 text-muted-foreground font-heading text-sm font-semibold tracking-wider hover:text-primary hover:border-primary/40 transition-colors duration-300 whitespace-nowrap"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;
