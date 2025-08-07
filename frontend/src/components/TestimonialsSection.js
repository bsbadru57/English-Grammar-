import React, { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/testimonials`);
        const data = await response.json();
        
        if (data.success) {
          setTestimonials(data.data);
        } else {
          setError("Failed to load testimonials");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        fill={index < rating ? "var(--brand-primary)" : "none"}
        color={index < rating ? "var(--brand-primary)" : "var(--text-muted)"}
      />
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="testimonials-header">
          <h2 className="section-title heading-1">
            What Our Students Say
          </h2>
          <p className="section-subtitle body-large">
            Real success stories from learners who transformed their English speaking skills
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <p className="body-large">Loading testimonials...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <p className="body-large" style={{ color: "var(--destructive)" }}>
              {error}. Please try again later.
            </p>
          </div>
        )}

        {/* Testimonials Grid */}
        {!loading && !error && (
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="card-header">
                  <Quote size={32} color="var(--brand-primary)" className="quote-icon" />
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <div className="testimonial-content">
                  <p className="testimonial-text body-medium">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4 className="author-name heading-3">{testimonial.name}</h4>
                    <p className="author-location body-small">{testimonial.location}</p>
                  </div>
                  <div className="plan-badge">
                    {testimonial.planName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {!loading && !error && testimonials.length > 0 && (
          <div className="testimonials-cta">
            <p className="cta-text body-large">
              Join thousands of satisfied learners and start your English mastery journey today!
            </p>
            <button 
              onClick={() => document.getElementById("pricing").scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              Choose Your Plan
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .testimonials-section {
          padding: 96px 0;
          background: var(--bg-card);
          border-top: 1px solid var(--border-medium);
        }

        .testimonials-header {
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

        .loading-state,
        .error-state {
          text-align: center;
          padding: 4rem 0;
        }

        .loading-state p,
        .error-state p {
          margin: 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .testimonial-card {
          background: var(--bg-page);
          border: 1px solid var(--border-medium);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          border-color: var(--brand-primary);
          box-shadow: 0 8px 32px rgba(217, 251, 6, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .quote-icon {
          opacity: 0.7;
        }

        .rating {
          display: flex;
          gap: 0.25rem;
        }

        .testimonial-content {
          flex: 1;
          margin-bottom: 1.5rem;
        }

        .testimonial-text {
          line-height: 1.6;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          margin-bottom: 0.25rem;
          font-size: 1.1rem;
        }

        .author-location {
          margin: 0;
          color: var(--text-muted);
        }

        .plan-badge {
          background: var(--brand-primary);
          color: var(--text-inverse);
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .testimonials-cta {
          text-align: center;
          background: rgba(217, 251, 6, 0.1);
          border-radius: 16px;
          padding: 3rem 2rem;
          border: 1px solid var(--brand-primary);
        }

        .cta-text {
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .testimonial-author {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .plan-badge {
            align-self: flex-start;
          }

          .testimonials-cta {
            padding: 2rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .card-header {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;