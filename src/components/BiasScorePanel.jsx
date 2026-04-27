import React from 'react';
import { Activity } from 'lucide-react';

const BiasScorePanel = ({ results }) => {
  // Calculate variance from original
  const original = results.find(r => r.type === 'original');
  const shadows = results.filter(r => r.type === 'shadow');
  
  if (!original || shadows.length === 0) return null;

  let maxDiff = 0;
  shadows.forEach(s => {
    const diff = Math.abs(s.probability - original.probability);
    if (diff > maxDiff) maxDiff = diff;
  });

  // Calculate Bias Index 0-100 (mapping a 25% max diff to 100)
  const biasIndex = Math.min(Math.round((maxDiff / 25) * 100), 100);

  let label = 'Low Bias';
  let color = 'var(--accent-green)';
  if (biasIndex > 30) { label = 'Moderate Bias'; color = 'var(--accent-orange)'; }
  if (biasIndex > 70) { label = 'High Bias'; color = 'var(--accent-red)'; }

  return (
    <div className="glass-card">
      <h3 className="card-title"><Activity size={20} /> Bias Index</h3>
      
      <div className={`score-circle ${biasIndex >= 30 ? 'high-bias' : ''}`} style={{ '--score-color': color, '--score-deg': `${(biasIndex / 100) * 360}deg` }}>
        <div className="score-circle-inner">
          <div className="score-value" style={{ color }}>{biasIndex}</div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ color, fontSize: '1.2rem', marginBottom: '0.5rem' }}>{label} Detected</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          This score represents how much your approval probability changes purely due to protected demographic attributes.
        </p>
      </div>
    </div>
  );
};

export default BiasScorePanel;
