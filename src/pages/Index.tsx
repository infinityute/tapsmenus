import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { PricingPlans } from "@/components/PricingPlans";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="animate-on-scroll">
        <Hero />
      </div>
      <div className="animate-on-scroll slide-right">
        <Features />
      </div>
      <div className="animate-on-scroll">
        <PricingPlans />
      </div>
      <div className="animate-on-scroll slide-left">
        <FAQ />
      </div>
      <div className="animate-on-scroll">
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default Index;