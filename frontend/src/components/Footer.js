import React from "react";
import { BookOpen, Mail, MessageCircle, Heart, ArrowUp } from "lucide-react";
import { mockPaymentInfo } from "../mock";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container">
        {/* Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <BookOpen size={32} color="var(--brand-primary)" />
              <span className="brand-name">English Grammar Master</span>
            </div>
            <p className="brand-tagline body-medium">
              Transform your English skills with our comprehensive grammar books. 
              From basics to mastery - we've got you covered.
            </p>
            <div className="social-proof">
              <div className="proof-item">
                <Heart size={16} color="var(--brand-primary)" />
                <span>5000+ Happy Students</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="links-list">
              <li>
                <button 
                  onClick={() => document.getElementById("hero").scrollIntoView({ behavior: "smooth" })}
                  className="footer-link"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById("pricing").scrollIntoView({ behavior: "smooth" })}
                  className="footer-link"
                >
                  Our Plans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById("payment").scrollIntoView({ behavior: "smooth" })}
                  className="footer-link"
                >
                  How to Buy
                </button>
              </li>
            </ul>
          </div>

          {/* Plans */}
          <div className="footer-plans">
            <h4 className="footer-title">Our Plans</h4>
            <ul className="plans-list">
              <li className="plan-item">
                <span className="plan-name">Basic Plan</span>
                <span className="plan-price">₹2</span>
              </li>
              <li className="plan-item">
                <span className="plan-name">Expert Plan</span>
                <span className="plan-price">₹5</span>
              </li>
              <li className="plan-item best-plan">
                <span className="plan-name">Legend Plan</span>
                <span className="plan-price">₹15</span>
                <span className="plan-badge">Best Value</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4 className="footer-title">Get in Touch</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={18} color="var(--brand-primary)" />
                <div className="contact-details">
                  <span className="contact-label">Email Support:</span>
                  <a 
                    href={`mailto:${mockPaymentInfo.supportEmail}`}
                    className="contact-value"
                  >
                    {mockPaymentInfo.supportEmail}
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <MessageCircle size={18} color="var(--brand-primary)" />
                <div className="contact-details">
                  <span className="contact-label">WhatsApp:</span>
                  <span className="contact-value">{mockPaymentInfo.supportWhatsApp}</span>
                </div>
              </div>
            </div>
            
            <div className="response-time">
              <p className="body-small">
                📞 <strong>Quick Response:</strong> We reply within 2-4 hours
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p className="body-small">
                © {currentYear} English Grammar Master. All rights reserved.
              </p>
              <p className="body-small">
                Made with ❤️ for English learners worldwide
              </p>
            </div>
            
            <div className="footer-actions">
              <button onClick={scrollToTop} className="scroll-top-btn">
                <ArrowUp size={18} />
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg-card);
          border-top: 1px solid var(--border-medium);
          padding: 4rem 0 2rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          max-width: 400px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1rem;
        }

        .brand-name {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .brand-tagline {
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .social-proof {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .proof-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Inter', Arial, sans-serif;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .footer-title {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .links-list,
        .plans-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .links-list li,
        .plans-list li {
          margin-bottom: 0.75rem;
        }

        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-family: 'Inter', Arial, sans-serif;
          font-size: 0.875rem;
          transition: color 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-align: left;
        }

        .footer-link:hover {
          color: var(--brand-primary);
        }

        .plan-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          position: relative;
        }

        .plan-item.best-plan {
          background: rgba(217, 251, 6, 0.1);
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--brand-primary);
        }

        .plan-name {
          font-family: 'Inter', Arial, sans-serif;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .best-plan .plan-name {
          color: var(--text-primary);
          font-weight: 500;
        }

        .plan-price {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          color: var(--brand-primary);
        }

        .plan-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--brand-primary);
          color: var(--text-inverse);
          font-size: 0.625rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 8px;
          text-transform: uppercase;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .contact-label {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 500;
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .contact-value {
          font-family: 'Inter', Arial, sans-serif;
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-value:hover {
          color: var(--brand-primary);
        }

        .response-time {
          background: rgba(217, 251, 6, 0.1);
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid var(--brand-primary);
        }

        .response-time p {
          margin: 0;
          color: var(--text-primary);
        }

        .footer-bottom {
          border-top: 1px solid var(--border-medium);
          padding-top: 2rem;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright p {
          margin: 0.25rem 0;
        }

        .scroll-top-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
          padding: 0.75rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Inter', Arial, sans-serif;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .scroll-top-btn:hover {
          border-color: var(--brand-primary);
          color: var(--brand-primary);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .footer-brand {
            max-width: none;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;