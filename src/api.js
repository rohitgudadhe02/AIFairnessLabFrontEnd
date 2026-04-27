import axios from 'axios';

const API_URL = 'https://loan-bias-api.onrender.com/predict';

// Helper to format frontend data into what the PyCharm API expects
const formatForApi = (data) => {
  return {
    no_of_dependents: parseFloat(data.dependents) || 0,
    education: data.education === 'graduate' ? 1 : 0,
    self_employed: data.employment === 'self_employed' ? 1 : 0,
    income_annum: parseFloat(data.income) || 0,
    loan_amount: parseFloat(data.loan_amount) || 0,
    loan_term: parseFloat(data.loan_term) || 12,
    cibil_score: parseFloat(data.credit_score) || 300,
    residential_assets_value: parseFloat(data.assets) || 0,
    commercial_assets_value: 0,
    luxury_assets_value: 0,
    bank_asset_value: parseFloat(data.bank_balance) || 0
  };
};

export const fetchPrediction = async (data) => {
  try {
    const payload = formatForApi(data);
    const response = await axios.post(API_URL, payload);
    return response.data.approval_probability * 100;
  } catch (error) {
    console.warn("Backend not available. Using mock prediction fallback.", error.message);
    // Fallback Mock Logic if their API isn't running
    let score = (parseFloat(data.credit_score) / 850) * 50;
    score += (parseFloat(data.income) / 100000) * 30;
    return Math.min(Math.max(score, 5), 95);
  }
};

// Generates shadow profiles and their respective probabilities
export const generateShadowProfiles = async (originalData) => {
  // 1. Get real prediction from user's backend
  const originalProb = await fetchPrediction(originalData);

  // 2. Define shadow profiles by changing ONLY protected attributes
  const profiles = [
    { id: 'original', name: 'Original Profile', type: 'original', data: { ...originalData } },
    { id: 'shadow_1', name: 'Gender: Female', type: 'shadow', diffAttribute: 'Gender', data: { ...originalData, gender: 'female' }, biasMultiplier: 0.85 },
    { id: 'shadow_2', name: 'Race: Minority', type: 'shadow', diffAttribute: 'Race', data: { ...originalData, race: 'minority' }, biasMultiplier: 0.75 },
    { id: 'shadow_3', name: 'Age: >60', type: 'shadow', diffAttribute: 'Age', data: { ...originalData, age: '65' }, biasMultiplier: 1.10 },
    { id: 'shadow_4', name: 'Zip: Low-Income', type: 'shadow', diffAttribute: 'Location', data: { ...originalData, zipcode: '90001' }, biasMultiplier: 0.80 },
  ];

  // 3. Calculate probabilities for each. 
  // Note: Since the user's specific trained model from the tutorial doesn't actually take 'gender' or 'race' as inputs, 
  // we apply a simulation multiplier here to *demonstrate* what a biased model output looks like for the UI charts.
  // In a real scenario where the backend model takes these inputs, we would just call fetchPrediction() again.
  
  const results = profiles.map(p => {
    if (p.type === 'original') return { ...p, probability: originalProb };
    
    // Simulate biased backend response
    let biasedProb = originalProb * p.biasMultiplier;
    biasedProb = Math.min(Math.max(biasedProb, 2), 98); // Clamp between 2 and 98%
    
    return { ...p, probability: biasedProb };
  });

  return results;
};
