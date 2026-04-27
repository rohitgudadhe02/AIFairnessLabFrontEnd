import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const FairnessReportCard = ({ results, formData }) => {
  const reportRef = useRef();

  useEffect(() => {
    const handleGenerate = async () => {
      if (!reportRef.current || !results) return;

      try {
        const canvas = await html2canvas(reportRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('FairLoan_Bias_Report.pdf');
      } catch (err) {
        console.error("PDF generation failed:", err);
        alert("Failed to generate PDF report.");
      }
    };

    window.addEventListener('generate-pdf', handleGenerate);
    return () => window.removeEventListener('generate-pdf', handleGenerate);
  }, [results]);

  if (!results || !formData) return null;

  const original = results.find(r => r.type === 'original');
  const shadows = results.filter(r => r.type === 'shadow');

  let maxDiff = 0;
  let worstProfile = shadows[0];
  shadows.forEach(s => {
    const diff = Math.abs(s.probability - original.probability);
    if (diff > maxDiff) { maxDiff = diff; worstProfile = s; }
  });

  const biasIndex = Math.min(Math.round((maxDiff / 25) * 100), 100);

  return (
    <div className="report-content" ref={reportRef}>
      <div style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ color: '#0a0a0f', fontSize: '28px', margin: 0 }}>FairLoan AI</h1>
        <h2 style={{ color: '#666', fontSize: '18px', fontWeight: 'normal', margin: 0 }}>Personal Loan Fairness Report</h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div>
          <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Applicant Profile</h3>
          <p><strong>Income:</strong> ${formData.income}</p>
          <p><strong>Credit Score:</strong> {formData.credit_score}</p>
          <p><strong>Loan Amount:</strong> ${formData.loan_amount}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Overall Assessment</h3>
          <p><strong>Original Approval Chance:</strong> <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>{original.probability.toFixed(1)}%</span></p>
          <p><strong>Calculated Bias Index:</strong> <span style={{ fontSize: '20px', fontWeight: 'bold', color: biasIndex > 30 ? '#ef4444' : '#10b981' }}>{biasIndex}/100</span></p>
        </div>
      </div>

      <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Shadow Profile Testing Results</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Profile Condition</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Predicted Approval</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Variance</th>
          </tr>
        </thead>
        <tbody>
          {shadows.map((s, i) => {
            const variance = s.probability - original.probability;
            return (
              <tr key={i}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{s.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{s.probability.toFixed(1)}%</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', color: variance < 0 ? '#ef4444' : '#10b981' }}>
                  {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>Auditor Explanation</h3>
        <p style={{ margin: 0, lineHeight: 1.6, color: '#334155' }}>
          When the demographic attribute <strong>{worstProfile.diffAttribute}</strong> is changed 
          to <strong>{worstProfile.name.split(': ')[1]}</strong> while keeping all financial details identical, 
          the approval chance changed by <strong>{(worstProfile.probability - original.probability).toFixed(1)}%</strong>. 
          {maxDiff > 3 ? " This variance suggests the model may be capturing demographic proxies and applying biased decision logic." : " This variance is within acceptable margins, suggesting neutral decision logic."}
        </p>
      </div>

      <div style={{ marginTop: '50px', fontSize: '10px', color: '#94a3b8', textAlign: 'center' }}>
        Generated by FairLoan AI Bias Auditing System. This report is for informational purposes only.
      </div>
    </div>
  );
};

export default FairnessReportCard;
