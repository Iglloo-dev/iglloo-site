// app/page.tsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SmartRetirementSection from "../components/SmartRetirementSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SmartRetirementSection />
      {/* Later: add HowItWorks, Destinations, WhyAbroad, Contact sections here */}
    </main>
  );
}
