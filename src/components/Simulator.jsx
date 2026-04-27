import React, { useState, useEffect } from 'react';
import { Sliders } from 'lucide-react';
import { fetchPrediction } from '../api';

const Simulator = ({ initialData, originalProb }) => {
  const [simData, setSimData] = useState({
    credit_score: initialData.credit_score || 700,
    income: initialData.income || 50000,
    loan_amount: initialData.loan_amount || 200000
  });
  const [simProb, setSimProb] = useState(originalProb);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsSimulating(true);
      const newProb = await fetchPrediction({ ...initialData, ...simData });
      setSimProb(newProb);
      setIsSimulating(false);
    }, 500); // Debounce API calls

    return () => clearTimeout(timer);
  }, [simData, initialData]);

  const handleChange = (e) => {
    setSimData({ ...simData, [e.target.name]: e.target.value });
  };

  return (
    <div className="glass-card">
      <h3 className="card-title">
        <Sliders size={20} /> What-If Financial Simulator
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        See how improving your financial variables impacts your approval chances in real-time.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
        <span style={{ fontWeight: 600 }}>Simulated Approval:</span>
        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: simProb > 50 ? 'var(--accent-green)' : 'var(--accent-red)', opacity: isSimulating ? 0.5 : 1, transition: 'opacity 0.2s' }}>
          {simProb.toFixed(1)}%
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>Credit Score</span>
            <span style={{ color: 'var(--accent-blue)' }}>{simData.credit_score}</span>
          </div>
          <input type="range" name="credit_score" min="300" max="850" step="10" value={simData.credit_score} onChange={handleChange} />
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>Annual Income ($)</span>
            <span style={{ color: 'var(--accent-blue)' }}>{Number(simData.income).toLocaleString()}</span>
          </div>
          <input type="range" name="income" min="20000" max="250000" step="5000" value={simData.income} onChange={handleChange} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>Loan Amount ($)</span>
            <span style={{ color: 'var(--accent-blue)' }}>{Number(simData.loan_amount).toLocaleString()}</span>
          </div>
          <input type="range" name="loan_amount" min="10000" max="1000000" step="10000" value={simData.loan_amount} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default Simulator;
