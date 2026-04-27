import React, { useState } from 'react';
import './index.css';
import LandingPage from './components/LandingPage';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import TransparencyCard from './components/TransparencyCard';
import FairnessReportCard from './components/FairnessReportCard';
import { Download, ArrowLeft } from 'lucide-react';
import { generateShadowProfiles } from './api';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'form', 'results'
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (data) => {
    setLoading(true);
    setError(null);
    setFormData(data);
    try {
      const simulationResults = await generateShadowProfiles(data);
      setResults(simulationResults);
      setView('results');
    } catch (err) {
      setError("Failed to connect to the prediction API. Ensure your backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = () => {
    const event = new CustomEvent('generate-pdf');
    window.dispatchEvent(event);
  };

  return (
    <div className="app-container">
      <div className="aurora-bg"></div>
      
      {view === 'landing' && <LandingPage onStart={() => setView('form')} />}

      {view === 'form' && (
        <div className="fade-in-up">
          <button className="btn-back" onClick={() => setView('landing')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Applicant Data Entry</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Enter the details below to test the model for bias.</p>
          </div>
          <InputForm onAnalyze={handleAnalyze} loading={loading} error={error} />
        </div>
      )}

      {view === 'results' && results && (
        <div className="fade-in-up">
          <div className="results-header">
            <div>
              <button className="btn-back" onClick={() => setView('form')} style={{ marginBottom: '1rem' }}>
                <ArrowLeft size={16} /> Back to Data Entry
              </button>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Analysis Results</h1>
            </div>
            <button className="btn-primary" style={{ padding: '0.8rem 1.5rem', width: 'auto' }} onClick={handleGeneratePDF}>
              <Download size={18} /> Export Fairness Report
            </button>
          </div>
          
          <Dashboard results={results} initialData={formData} />
          
          <div style={{ marginTop: '2rem' }}>
            <TransparencyCard />
          </div>

          <FairnessReportCard results={results} formData={formData} />
        </div>
      )}
    </div>
  );
}

export default App;
