// app/page.tsx
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import SmartRetirementSection from "../components/SmartRetirementSection";
import ServicesSection from "../components/ServicesSection";
import DestinationsSection from "../components/DestinationsSection";
import WhyAbroadSection from "../components/WhyAbroadSection";
import HowItWorksSection from "../components/HowItWorksSection";
import MissionVisionSection from "../components/MissionVisionSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <TopBar />
      <main className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <AboutSection />
        <SmartRetirementSection />
        <ServicesSection />
        <WhyAbroadSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <MissionVisionSection />
        <DestinationsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
