import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import PricingSection from "./PricingSection";
import TestimonialsSection from "./TestimonialsSection";
import PaymentSection from "./PaymentSection";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <PricingSection />
      <TestimonialsSection />
      <PaymentSection />
      <Footer />
    </div>
  );
};

export default LandingPage;