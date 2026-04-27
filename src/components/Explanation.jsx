import React, { useState, useEffect } from 'react';
import { AlertCircle, Sparkles, Loader2 } from 'lucide-react';

const Explanation = ({ results }) => {
  const [aiExplanation, setAiExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset when results change
    setAiExplanation(null);
  }, [results]);

  const original = results.find(r => r.type === 'original');
  const shadows = results.filter(r => r.type === 'shadow');

  if (!original || shadows.length === 0) return null;

  let worstProfile = shadows[0];
  let maxDrop = 0;

  shadows.forEach(s => {
    const drop = original.probability - s.probability;
    if (drop > maxDrop) {
      maxDrop = drop;
      worstProfile = s;
    }
  });

  // Fallback Static Text
  const fallbackText = `When the demographic attribute "${worstProfile.diffAttribute}" is changed to "${worstProfile.name.split(': ')[1]}" while keeping all financial details identical, your approval chance drops by ${maxDrop.toFixed(1)}%. This indicates that the underlying machine learning model may be applying discriminatory penalties completely unrelated to actual creditworthiness.`;

  const generateAIExplanation = async () => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      setAiExplanation("API Key missing. Add VITE_GEMINI_API_KEY to your .env file.\n\nFallback: " + fallbackText);
      setLoading(false);
      return;
    }

    const prompt = `You are an AI fairness and bias auditor. I have an ML model predicting loan approvals. 
    The baseline applicant has an approval probability of ${original.probability.toFixed(1)}%. 
    However, when we generate a shadow profile changing ONLY their ${worstProfile.diffAttribute} to ${worstProfile.name.split(': ')[1]} (keeping all finances identical), the approval probability drops to ${worstProfile.probability.toFixed(1)}% (a drop of ${maxDrop.toFixed(1)}%).
    Write a clear, professional 2-3 sentence explanation of why this represents a harmful model bias and what it means for the applicant. Do not use markdown.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      const text = data.candidates[0].content.parts[0].text;
      setAiExplanation(text);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setAiExplanation(fallbackText); // Use Fallback
    } finally {
      setLoading(false);
    }
  };

  if (maxDrop < 3) {
    return (
      <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-green)' }}>
        <h3 className="card-title" style={{ color: 'var(--accent-green)' }}>
          <AlertCircle size={20} /> Bias Assessment
        </h3>
        <p style={{ lineHeight: 1.6 }}>
          Your approval probability remains stable across all shadow profiles. This suggests the model is making decisions primarily based on financial merit without applying significant demographic bias.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-red)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 className="card-title" style={{ color: 'var(--accent-red)', margin: 0 }}>
          <AlertCircle size={20} /> Bias Detected
        </h3>
        <button 
          onClick={generateAIExplanation} 
          disabled={loading}
          style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd', border: '1px solid var(--accent-purple)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          {loading ? 'Analyzing...' : 'Ask Gemini for Clarification'}
        </button>
      </div>
      
      <div style={{ lineHeight: 1.6, fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
        {aiExplanation ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c4b5fd', fontSize: '0.8rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Sparkles size={12} /> Gemini Insight
            </div>
            {aiExplanation}
          </div>
        ) : (
          <div>
            <p>
              When the demographic attribute <strong style={{color: 'white'}}>{worstProfile.diffAttribute}</strong> is changed 
              to <strong style={{color: 'white'}}>{worstProfile.name.split(': ')[1]}</strong> while keeping all financial details identical, 
              your approval chance drops by <strong style={{color: '#ff8a8a'}}>{maxDrop.toFixed(1)}%</strong>. 
            </p>
            <p style={{ marginTop: '0.8rem', color: 'var(--text-secondary)' }}>
              This indicates that the underlying machine learning model may be applying discriminatory penalties completely unrelated to actual creditworthiness.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explanation;
