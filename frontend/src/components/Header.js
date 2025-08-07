import React, { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="container">
          <div className="nav-content">
            {/* Logo */}
            <div className="nav-logo">
              <BookOpen size={32} color="var(--brand-primary)" />
              <span className="nav-brand">English Grammar Master</span>
            </div>

            {/* Desktop Navigation */}
            <div className="nav-links desktop-nav">
              <button
                onClick={() => scrollToSection("hero")}
                className="nav-link"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="nav-link"
              >
                Plans
              </button>
              <button
                onClick={() => scrollToSection("payment")}
                className="nav-link"
              >
                How to Buy
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="nav-link"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={24} color="var(--brand-primary)" />
              ) : (
                <Menu size={24} color="var(--brand-primary)" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="mobile-nav">
              <button
                onClick={() => scrollToSection("hero")}
                className="nav-link mobile"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="nav-link mobile"
              >
                Plans
              </button>
              <button
                onClick={() => scrollToSection("payment")}
                className="nav-link mobile"
              >
                How to Buy
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="nav-link mobile"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(26, 28, 27, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-medium);
        }

        .nav-container {
          padding: 1rem 0;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-brand {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-family: 'Inter', Arial, sans-serif;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav-link:hover {
          color: var(--brand-primary);
          transform: translateY(-2px);
        }

        .nav-link:active {
          color: var(--brand-active);
        }

        .desktop-nav {
          display: none;
        }

        .mobile-menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem 0;
          border-top: 1px solid var(--border-medium);
          margin-top: 1rem;
        }

        .nav-link.mobile {
          padding: 0.75rem 0;
          text-align: left;
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }

          .mobile-menu-btn {
            display: none;
          }

          .mobile-nav {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;