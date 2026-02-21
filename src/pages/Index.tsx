import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandsCarousel from "@/components/BrandsCarousel";
import ServicesSection from "@/components/ServicesSection";
import RepairRequestSection from "@/components/RepairRequestSection";
import StatsSection from "@/components/StatsSection";
import DiagnosticSection from "@/components/DiagnosticSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { useTheme } from "@/hooks/use-theme";

const Index = () => {
  useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <BrandsCarousel />
      <ServicesSection />
      <RepairRequestSection />
      <StatsSection />
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
