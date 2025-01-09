import { Navbar } from "@/components/Navbar";
import { PricingPlans } from "@/components/PricingPlans";
import { Footer } from "@/components/Footer";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        <PricingPlans />
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;