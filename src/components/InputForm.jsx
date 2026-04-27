import React, { useState } from 'react';
import { ShieldAlert, Loader2 } from 'lucide-react';

const InputForm = ({ onAnalyze, loading, error }) => {
  const [formData, setFormData] = useState({
    income: '',
    credit_score: '',
    loan_amount: '',
    loan_term: '',
    dependents: '',
    education: '',
    employment: '',
    assets: '',
    bank_balance: '',
    // Protected Attributes
    gender: '',
    race: '',
    age: '',
    zipcode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <div className="glass-card">
      <h2 className="card-title">
        <ShieldAlert size={24} className="text-blue-500" />
        Applicant Details
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Enter financial details. The system will automatically generate shadow profiles to test for demographic bias.
      </p>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid var(--accent-red)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#ff8a8a' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Financials */}
          <div className="input-group">
            <label>Annual Income ($)</label>
            <input type="number" name="income" value={formData.income} onChange={handleChange} placeholder="e.g. 60000" required />
          </div>
          <div className="input-group">
            <label>Credit Score</label>
            <input type="number" name="credit_score" value={formData.credit_score} onChange={handleChange} placeholder="e.g. 720" required />
          </div>
          <div className="input-group">
            <label>Loan Amount ($)</label>
            <input type="number" name="loan_amount" value={formData.loan_amount} onChange={handleChange} placeholder="e.g. 200000" required />
          </div>
          <div className="input-group">
            <label>Bank Balance ($)</label>
            <input type="number" name="bank_balance" value={formData.bank_balance} onChange={handleChange} placeholder="e.g. 15000" required />
          </div>
          <div className="input-group">
            <label>Education</label>
            <select name="education" value={formData.education} onChange={handleChange} required>
              <option value="" disabled>Select...</option>
              <option value="graduate">Graduate</option>
              <option value="not_graduate">Not Graduate</option>
            </select>
          </div>
          
          {/* Protected Attributes for Shadow Profiles */}
          <div className="input-group" style={{ borderLeft: '2px solid var(--accent-purple)', paddingLeft: '1rem' }}>
            <label>Gender (Protected)</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="" disabled>Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="nonbinary">Non-Binary</option>
            </select>
          </div>
          <div className="input-group" style={{ borderLeft: '2px solid var(--accent-purple)', paddingLeft: '1rem' }}>
            <label>Race/Ethnicity (Protected)</label>
            <select name="race" value={formData.race} onChange={handleChange} required>
              <option value="" disabled>Select...</option>
              <option value="majority">Majority</option>
              <option value="minority">Minority</option>
            </select>
          </div>
          <div className="input-group" style={{ borderLeft: '2px solid var(--accent-purple)', paddingLeft: '1rem' }}>
            <label>Age (Protected)</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 35" required />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <button type="submit" className="btn-primary" disabled={loading} style={{ minWidth: '300px' }}>
            {loading ? <Loader2 className="animate-spin" /> : 'Run Bias Detection Analysis'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
