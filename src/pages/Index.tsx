import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import DiagnosticSection from "@/components/DiagnosticSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { useTheme } from "@/hooks/use-theme";

const Index = () => {
  // Initialize theme on mount
  useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <DiagnosticSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
};

export default Index;
