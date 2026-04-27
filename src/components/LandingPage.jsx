import React from 'react';
import { ShieldCheck, ArrowRight, BarChart2, Zap } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="landing-container fade-in-up">
      <div className="hero-section">
        <div className="hero-badge">AI Auditing & Compliance</div>
        <h1 className="hero-title">FairLoan AI</h1>
        <p className="hero-subtitle">
          Detect and eliminate hidden demographic biases in your machine learning loan approval models with real-time shadow testing.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button className="btn-primary hero-btn" onClick={onStart}>
            Start Bias Analysis <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card delay-1">
          <div className="feature-icon bg-blue"><ShieldCheck size={24} /></div>
          <h3>Shadow Profile Testing</h3>
          <p>We automatically clone your applicant's financial profile and alter protected attributes (gender, race) to test if your model is secretly applying discriminatory penalties.</p>
        </div>
        
        <div className="feature-card delay-2">
          <div className="feature-icon bg-purple"><BarChart2 size={24} /></div>
          <h3>Bias Index Scoring</h3>
          <p>Get a quantifiable Bias Index (0-100) instantly. Understand exactly how much variance exists in your model's decision-making across different demographics.</p>
        </div>
        
        <div className="feature-card delay-3">
          <div className="feature-icon bg-green"><Zap size={24} /></div>
          <h3>Gemini AI Clarification</h3>
          <p>If bias is detected, our integrated Google Gemini AI agent generates a professional, plain-English explanation of why the bias occurred and what it means for the applicant.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
