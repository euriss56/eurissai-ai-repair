const Footer = () => (
  <footer className="border-t border-border py-8 px-6">
    <div className="container mx-auto text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} <span className="text-gradient font-heading font-semibold">EurissGSM</span>. Tous droits réservés.
    </div>
  </footer>
);

export default Footer;
