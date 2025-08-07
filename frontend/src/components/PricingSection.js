import React, { useState, useEffect } from "react";
import { Check, Star, Crown, Zap } from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const PricingSection = () => {
  const handleSelectPlan = (plan) => {
    // Store selected plan in localStorage for payment process
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    
    // Scroll to payment section
    const paymentSection = document.getElementById("payment");
    if (paymentSection) {
      paymentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const PlanIcon = ({ planName }) => {
    switch(planName) {
      case "Basic Plan":
        return <Zap size={24} color="var(--brand-primary)" />;
      case "Expert Plan":
        return <Star size={24} color="var(--brand-primary)" />;
      case "Legend Plan":
        return <Crown size={24} color="var(--brand-primary)" />;
      default:
        return <Check size={24} color="var(--brand-primary)" />;
    }
  };

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        {/* Section Header */}
        <div className="pricing-header">
          <h2 className="section-title heading-1">
            Choose Your Learning Path
          </h2>
          <p className="section-subtitle body-large">
            Select the perfect plan to master English grammar at your own pace
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {mockPlans.map((plan) => (
            <div 
              key={plan.id} 
              className={`pricing-card ${plan.isBestValue ? 'best-value' : ''} ${plan.isPopular ? 'popular' : ''}`}
            >
              {/* Card Header */}
              <div className="card-header">
                {plan.isPopular && (
                  <div className="badge popular-badge">Most Popular</div>
                )}
                {plan.isBestValue && (
                  <div className="badge best-value-badge">Best Value</div>
                )}
                
                <div className="plan-icon">
                  <PlanIcon planName={plan.name} />
                </div>
                
                <h3 className="plan-name heading-3">{plan.name}</h3>
                <p className="plan-description body-medium">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="pricing-info">
                <div className="price-display">
                  {plan.originalPrice && (
                    <span className="original-price">${plan.originalPrice}</span>
                  )}
                  <span className="current-price">${plan.price}</span>
                  <span className="price-period">one-time</span>
                </div>
                {plan.originalPrice && (
                  <div className="savings">
                    Save ${plan.originalPrice - plan.price}
                  </div>
                )}
              </div>

              {/* Features List */}
              <div className="features-list">
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <Check size={16} color="var(--brand-primary)" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="card-footer">
                <button 
                  onClick={() => handleSelectPlan(plan)}
                  className={`plan-button ${plan.isBestValue ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Choose {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="pricing-footer">
          <div className="value-proposition">
            <Crown size={32} color="var(--brand-primary)" />
            <div className="value-content">
              <h4 className="heading-3">Why Legend Plan is Unbeatable?</h4>
              <p className="body-medium">
                Get all three levels of content for the price of two! 
                Basic Plan + Expert Plan + Exclusive Advanced Content = Complete English Mastery
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pricing-section {
          padding: 96px 0;
          background: var(--bg-page);
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          margin-bottom: 1rem;
        }

        .section-subtitle {
          max-width: 600px;
          margin: 0 auto;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .pricing-card {
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .pricing-card:hover {
          transform: translateY(-4px);
          border-color: var(--brand-primary);
          box-shadow: 0 8px 32px rgba(217, 251, 6, 0.1);
        }

        .pricing-card.best-value {
          border-color: var(--brand-primary);
          background: linear-gradient(135deg, var(--bg-card), rgba(217, 251, 6, 0.05));
          transform: scale(1.05);
        }

        .pricing-card.best-value:hover {
          transform: scale(1.05) translateY(-4px);
        }

        .badge {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .popular-badge {
          background: var(--secondary-olive);
          color: var(--text-primary);
        }

        .best-value-badge {
          background: var(--brand-primary);
          color: var(--text-inverse);
        }

        .card-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .plan-icon {
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }

        .plan-name {
          margin-bottom: 0.5rem;
        }

        .plan-description {
          line-height: 1.4;
        }

        .pricing-info {
          text-align: center;
          margin-bottom: 2rem;
        }

        .price-display {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .original-price {
          font-family: 'Inter', Arial, sans-serif;
          font-size: 1.2rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .current-price {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 900;
          font-size: 2.5rem;
          color: var(--brand-primary);
          line-height: 1;
        }

        .price-period {
          font-family: 'Inter', Arial, sans-serif;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .savings {
          background: var(--brand-primary);
          color: var(--text-inverse);
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
        }

        .features-list {
          flex: 1;
          margin-bottom: 2rem;
        }

        .features-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          font-family: 'Inter', Arial, sans-serif;
          font-size: 0.875rem;
          line-height: 1.4;
          color: var(--text-secondary);
        }

        .feature-item svg {
          margin-top: 0.1rem;
          flex-shrink: 0;
        }

        .card-footer {
          margin-top: auto;
        }

        .plan-button {
          width: 100%;
          justify-content: center;
        }

        .pricing-footer {
          display: flex;
          justify-content: center;
        }

        .value-proposition {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid var(--border-medium);
          max-width: 600px;
        }

        .value-content h4 {
          margin-bottom: 0.5rem;
        }

        .value-content p {
          margin: 0;
        }

        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card.best-value {
            transform: none;
          }

          .pricing-card.best-value:hover {
            transform: translateY(-4px);
          }

          .value-proposition {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default PricingSection;