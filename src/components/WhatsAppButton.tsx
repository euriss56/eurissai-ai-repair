import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/33612345678"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-foreground shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse-glow"
      style={{ boxShadow: "0 0 20px hsl(142 70% 45% / 0.4)" }}
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
