import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import PricingSection from "./PricingSection";
import PaymentSection from "./PaymentSection";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <PricingSection />
      <PaymentSection />
      <Footer />
    </div>
  );
};

export default LandingPage;