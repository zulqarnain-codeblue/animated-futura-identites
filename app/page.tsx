import AboutSection from "@/components/home/AboutSection";
import TextMarqueeSection from "@/components/home/TextMarqueeSection";
import ComprehensiveBrandingSection from "@/components/home/ComprehensiveBrandingSection";
import HeroSection from "@/components/home/HeroSection";
import ProductsCapabilitiesSection from "@/components/home/ProductsCapabilitiesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrustedClientsSection from "@/components/home/TrustedClientsSection";
import IndustriesSection from "@/components/home/IndustriesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ComprehensiveBrandingSection/>
      {/* <TextMarqueeSection /> */}
      <IndustriesSection />
      <ProductsCapabilitiesSection />
      <TestimonialsSection />
      <TrustedClientsSection />
    </>
  );
}
