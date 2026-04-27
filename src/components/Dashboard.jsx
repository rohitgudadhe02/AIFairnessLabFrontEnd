import React from 'react';
import BiasScorePanel from './BiasScorePanel';
import ComparisonChart from './ComparisonChart';
import Explanation from './Explanation';
import Simulator from './Simulator';

const Dashboard = ({ results, initialData }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="dashboard-grid fade-in-up delay-1">
      {/* Left Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <BiasScorePanel results={results} />
        <Explanation results={results} />
      </div>

      {/* Right Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <ComparisonChart results={results} />
        <Simulator initialData={initialData} originalProb={results[0].probability} />
      </div>
    </div>
  );
};

export default Dashboard;
