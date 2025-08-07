import React, { useState } from "react";
import { 
  CreditCard, 
  Smartphone, 
  Mail, 
  Download, 
  CheckCircle, 
  Copy,
  MessageCircle,
  FileText
} from "lucide-react";
import { mockPaymentInfo, mockDownloadProcess } from "../mock";
import { useToast } from "../hooks/use-toast";

const PaymentSection = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { toast } = useToast();

  React.useEffect(() => {
    // Get selected plan from localStorage
    const storedPlan = localStorage.getItem('selectedPlan');
    if (storedPlan) {
      setSelectedPlan(JSON.parse(storedPlan));
    }
  }, []);

  const copyUPIId = () => {
    navigator.clipboard.writeText(mockPaymentInfo.upiId);
    toast({
      title: "Copied!",
      description: "UPI ID copied to clipboard",
      duration: 3000,
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(mockPaymentInfo.supportEmail);
    toast({
      title: "Copied!",
      description: "Email address copied to clipboard", 
      duration: 3000,
    });
  };

  return (
    <section id="payment" className="payment-section">
      <div className="container">
        {/* Section Header */}
        <div className="payment-header">
          <h2 className="section-title heading-1">
            Simple Payment Process
          </h2>
          <p className="section-subtitle body-large">
            Easy UPI payment - Get your books within hours
          </p>
        </div>

        {/* Selected Plan Display */}
        {selectedPlan && (
          <div className="selected-plan">
            <div className="plan-summary">
              <h3 className="heading-3">Your Selected Plan</h3>
              <div className="plan-details">
                <div className="plan-info">
                  <span className="plan-name-selected">{selectedPlan.name}</span>
                  <span className="plan-price">${selectedPlan.price}</span>
                </div>
                <p className="plan-desc body-small">{selectedPlan.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="payment-content">
          {/* Payment Instructions */}
          <div className="payment-instructions">
            <div className="instruction-card">
              <div className="card-icon">
                <CreditCard size={32} color="var(--brand-primary)" />
              </div>
              <h3 className="heading-3">Payment Details</h3>
              
              <div className="upi-info">
                <div className="upi-field">
                  <label>UPI ID:</label>
                  <div className="upi-value">
                    <span>{mockPaymentInfo.upiId}</span>
                    <button onClick={copyUPIId} className="copy-btn">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <div className="upi-field">
                  <label>Name:</label>
                  <span>{mockPaymentInfo.upiName}</span>
                </div>
              </div>

              <div className="payment-steps">
                <h4 className="steps-title">How to Pay:</h4>
                <ol className="steps-list">
                  {mockPaymentInfo.instructions.map((instruction, index) => (
                    <li key={index} className="step-item body-small">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Download Process */}
          <div className="download-process">
            <div className="process-card">
              <div className="card-icon">
                <Download size={32} color="var(--brand-primary)" />
              </div>
              <h3 className="heading-3">Download Process</h3>
              
              <div className="process-steps">
                {mockDownloadProcess.steps.map((step, index) => (
                  <div key={step.step} className="process-step">
                    <div className="step-number">{step.step}</div>
                    <div className="step-content">
                      <h4 className="step-title">{step.title}</h4>
                      <p className="step-desc body-small">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="support-info">
          <div className="support-card">
            <h3 className="heading-3">Need Help?</h3>
            <div className="support-options">
              <div className="support-option">
                <Mail size={20} color="var(--brand-primary)" />
                <div className="support-details">
                  <span className="support-label">Email Support:</span>
                  <div className="support-value">
                    <span>{mockPaymentInfo.supportEmail}</span>
                    <button onClick={copyEmail} className="copy-btn">
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="support-option">
                <MessageCircle size={20} color="var(--brand-primary)" />
                <div className="support-details">
                  <span className="support-label">WhatsApp:</span>
                  <span className="support-value">{mockPaymentInfo.supportWhatsApp}</span>
                </div>
              </div>
              <div className="support-option">
                <CheckCircle size={20} color="var(--brand-primary)" />
                <div className="support-details">
                  <span className="support-label">Response Time:</span>
                  <span className="support-value">Within 2-4 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="quick-actions">
          <button 
            onClick={() => document.getElementById("pricing").scrollIntoView({ behavior: "smooth" })}
            className="btn-secondary"
          >
            <FileText size={20} />
            View All Plans
          </button>
          {selectedPlan && (
            <button 
              onClick={() => window.open(`mailto:${mockPaymentInfo.supportEmail}?subject=Purchase ${selectedPlan.name}&body=Hi, I want to purchase ${selectedPlan.name} for ₹${selectedPlan.price}. Please send me the payment confirmation process.`)}
              className="btn-primary"
            >
              <Mail size={20} />
              Contact Support
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .payment-section {
          padding: 96px 0;
          background: var(--bg-page);
        }

        .payment-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title {
          margin-bottom: 1rem;
        }

        .section-subtitle {
          max-width: 600px;
          margin: 0 auto;
        }

        .selected-plan {
          margin-bottom: 3rem;
          display: flex;
          justify-content: center;
        }

        .plan-summary {
          background: var(--bg-card);
          border: 2px solid var(--brand-primary);
          border-radius: 16px;
          padding: 1.5rem;
          max-width: 500px;
          width: 100%;
        }

        .plan-summary h3 {
          margin-bottom: 1rem;
          text-align: center;
        }

        .plan-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .plan-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .plan-name-selected {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .plan-price {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--brand-primary);
        }

        .plan-desc {
          text-align: center;
          margin-top: 0.5rem;
        }

        .payment-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .instruction-card,
        .process-card {
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          border-radius: 16px;
          padding: 2rem;
        }

        .card-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .instruction-card h3,
        .process-card h3 {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .upi-info {
          background: rgba(217, 251, 6, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .upi-field {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .upi-field:last-child {
          margin-bottom: 0;
        }

        .upi-field label {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          color: var(--text-primary);
          min-width: 80px;
        }

        .upi-value {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
        }

        .upi-value span {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          color: var(--brand-primary);
        }

        .copy-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }

        .copy-btn:hover {
          color: var(--brand-primary);
        }

        .steps-title {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .steps-list {
          padding-left: 1.5rem;
        }

        .step-item {
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .process-steps {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .process-step {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .step-number {
          background: var(--brand-primary);
          color: var(--text-inverse);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
        }

        .step-title {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .step-desc {
          margin: 0;
          line-height: 1.4;
        }

        .support-info {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .support-card {
          background: var(--bg-card);
          border: 1px solid var(--border-medium);
          border-radius: 16px;
          padding: 2rem;
          max-width: 600px;
          width: 100%;
        }

        .support-card h3 {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .support-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .support-option {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .support-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }

        .support-label {
          font-family: 'Inter', Arial, sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .support-value {
          font-family: 'Inter', Arial, sans-serif;
          font-size: 0.875rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quick-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .quick-actions button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @media (max-width: 1024px) {
          .payment-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .support-options {
            gap: 1.5rem;
          }

          .support-option {
            flex-direction: column;
            align-items: flex-start;
            text-align: center;
          }

          .quick-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default PaymentSection;