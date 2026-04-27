import React from 'react';
import { Info } from 'lucide-react';

const TransparencyCard = () => {
  return (
    <div className="glass-card fade-in-up delay-3" style={{ background: 'rgba(10, 15, 30, 0.8)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
      <h3 className="card-title" style={{ fontSize: '1.2rem' }}>
        <Info size={18} className="text-blue-400" /> Model Transparency Card
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Algorithm</div>
          <div style={{ fontWeight: 500 }}>Random Forest Classifier</div>
        </div>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Performance</div>
          <div style={{ fontWeight: 500 }}>Accuracy: 81.2% | AUC: 0.86</div>
        </div>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Trained Features</div>
          <div style={{ fontSize: '0.9rem' }}>Credit Score, Income, Assets, Loan Term, Dependents</div>
        </div>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Known Limitations</div>
          <div style={{ fontSize: '0.9rem' }}>Model trained on historical data which may contain embedded societal biases. Shadow testing is an approximation.</div>
        </div>
      </div>
    </div>
  );
};

export default TransparencyCard;
