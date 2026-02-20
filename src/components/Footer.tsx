import { motion } from "framer-motion";

const Footer = () => (
  <footer className="relative border-t border-border/50 py-10 px-6">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <a href="#accueil" className="font-heading text-2xl font-bold text-gradient">
          EurissGSM
        </a>

        <nav className="flex gap-6">
          {["Accueil", "Services", "Diagnostic", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item === "Accueil" ? "accueil" : item.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="text-gradient font-heading font-semibold">EurissGSM</span>
        </p>
      </motion.div>
    </div>
  </footer>
);

export default Footer;
