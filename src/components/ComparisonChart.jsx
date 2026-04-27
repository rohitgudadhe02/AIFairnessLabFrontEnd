import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { BarChart2 } from 'lucide-react';

const ComparisonChart = ({ results }) => {
  if (!results) return null;

  const original = results.find(r => r.type === 'original');
  
  // Format data for Recharts
  const data = results.map(r => ({
    name: r.name,
    probability: Math.round(r.probability),
    isOriginal: r.type === 'original'
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'var(--bg-card)', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
          <p style={{ margin: 0, color: payload[0].payload.fill }}>Approval: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card">
      <h3 className="card-title"><BarChart2 size={20} /> Shadow Profile Comparison</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis dataKey="name" type="category" width={120} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={original.probability} stroke="var(--text-secondary)" strokeDasharray="3 3" />
            <Bar dataKey="probability" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => {
                let color = 'var(--text-secondary)'; // original
                if (!entry.isOriginal) {
                  if (entry.probability > original.probability + 2) color = 'var(--accent-green)';
                  else if (entry.probability < original.probability - 2) color = 'var(--accent-red)';
                }
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 10, height: 10, background: 'var(--text-secondary)', borderRadius: '2px'}}></div> Original</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 10, height: 10, background: 'var(--accent-green)', borderRadius: '2px'}}></div> Higher Chance</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 10, height: 10, background: 'var(--accent-red)', borderRadius: '2px'}}></div> Lower Chance</span>
      </div>
    </div>
  );
};

export default ComparisonChart;
