import React from "react";
import { ArrowRight, Star, Users, BookOpen } from "lucide-react";

const HeroSection = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            {/* Main Headline */}
            <h1 className="hero-title brand-display">
              Master English Grammar Like Never Before
            </h1>
            
            {/* Subheadline */}
            <p className="hero-subtitle body-large">
              Transform your English skills with our comprehensive grammar books. 
              From basics to expert-level mastery - choose the perfect plan for your learning journey.
            </p>

            {/* Social Proof Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <Users size={24} color="var(--brand-primary)" />
                <div className="stat-text">
                  <span className="stat-number">5000+</span>
                  <span className="stat-label">Happy Students</span>
                </div>
              </div>
              <div className="stat-item">
                <Star size={24} color="var(--brand-primary)" />
                <div className="stat-text">
                  <span className="stat-number">4.9/5</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
              <div className="stat-item">
                <BookOpen size={24} color="var(--brand-primary)" />
                <div className="stat-text">
                  <span className="stat-number">3</span>
                  <span className="stat-label">Expert Plans</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-ctas">
              <button onClick={scrollToPricing} className="btn-primary">
                View Plans
                <ArrowRight size={20} style={{ marginLeft: "8px" }} />
              </button>
              <button 
                onClick={() => document.getElementById("payment").scrollIntoView({ behavior: "smooth" })}
                className="btn-secondary"
              >
                Learn How to Buy
              </button>
            </div>

            {/* Value Proposition */}
            <div className="hero-value">
              <p className="value-text body-medium">
                ✨ <strong>Special Offer:</strong> Buy Legend Plan and get Basic & Expert plans absolutely FREE!
              </p>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hero-visual">
            <div className="hero-card">
              <div className="card-glow"></div>
              <div className="card-content">
                <BookOpen size={64} color="var(--brand-primary)" />
                <h3 className="heading-3">Premium Grammar Books</h3>
                <p className="body-medium">
                  Expertly crafted content for all skill levels
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding: 120px 0 80px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-text {
          max-width: 600px;
        }

        .hero-title {
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          margin-bottom: 2rem;
          max-width: 500px;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .stat-text {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-label {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 400;
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1;
        }

        .hero-ctas {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .hero-value {
          padding: 1rem;
          background: var(--bg-card);
          border-radius: 12px;
          border: 1px solid var(--border-medium);
        }

        .value-text {
          color: var(--text-primary);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-card {
          position: relative;
          background: var(--bg-card);
          border-radius: 20px;
          padding: 3rem;
          border: 1px solid var(--border-medium);
          text-align: center;
          max-width: 400px;
          transition: transform 0.3s ease;
        }

        .hero-card:hover {
          transform: translateY(-8px);
        }

        .card-glow {
          position: absolute;
          inset: -1px;
          background: linear-gradient(45deg, var(--brand-primary), transparent, var(--brand-primary));
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .hero-card:hover .card-glow {
          opacity: 0.3;
        }

        .card-content h3 {
          margin: 1rem 0 0.5rem;
        }

        .card-content p {
          margin: 0;
        }

        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .hero-text {
            max-width: none;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 100px 0 60px;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .hero-ctas {
            flex-direction: column;
          }

          .hero-card {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;