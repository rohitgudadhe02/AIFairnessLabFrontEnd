# 🏦 FairLoan AI — Bias Detection Platform
> An AI-powered loan fairness auditing platform built for the **Google Solution Challenge 2026**
> Addressing UN SDG Goal 10: Reduced Inequalities & Goal 9: Industry, Innovation and Infrastructure

---
## 🌍 The Problem
Every year, millions of loan applications are processed by automated Machine Learning models. These models are trained on historical financial data — data that already contains decades of systemic discrimination. The result? A model that appears neutral but quietly penalizes applicants based on their **gender, race, age, or zip code** — factors completely unrelated to their ability to repay a loan.
These biases are invisible. No applicant is ever told *why* they were rejected. No compliance team has the tools to detect *when* a model is discriminating. That is the problem FairLoan AI was built to solve.
---
## 💡 The Solution — FairLoan AI
FairLoan AI is a real-time bias auditing platform that uses **Shadow Profile Testing** to expose hidden demographic discrimination inside loan approval ML models.
### How it works:
1. **You submit** an applicant's financial details (income, credit score, assets, loan amount).
2. **We call** your trained ML model to get a baseline approval probability.
3. **We generate Shadow Profiles** — clones of the same applicant where only protected attributes (gender, race, location) are changed, while all financial data stays identical.
4. **We calculate a Bias Index (0–100)** showing exactly how much the model's decisions shift based purely on demographics.
5. **Google Gemini AI explains the bias** in clear, plain English that any compliance officer or applicant can understand.
6. **You download a Fairness Report PDF** — a complete audit trail ready for regulatory review.
---
## ✨ Key Features
| Feature | Description |
|---|---|
| 🔍 **Shadow Profile Testing** | Auto-generates demographic clones to expose bias |
| 📊 **Bias Index Score (0–100)** | Quantifies the severity of bias with Low / Moderate / High labels |
| 📈 **Visual Comparison Chart** | Side-by-side horizontal bar chart comparing all shadow profiles |
| 🤖 **Gemini AI Explanation** | Google Gemini 2.5 Flash generates plain-English bias reports |
| 🎛️ **What-If Simulator** | Real-time sliders to see how financial changes improve chances |
| 📄 **Fairness Report PDF** | Downloadable audit report for regulatory compliance |
| 🔬 **Model Transparency Card** | Shows algorithm used, accuracy, features, and limitations |
---
## 🛠️ Tech Stack
**Frontend**
- ⚛️ React 18 + Vite
- 📊 Recharts (for bias comparison charts)
- 📄 jsPDF + html2canvas (for PDF report generation)
- 🎨 Vanilla CSS with advanced glassmorphism & aurora animations
- 🔷 Lucide React (icons)
**Backend** ([View Backend Repo](https://github.com/rohitgudadhe02/loan-bias-backend))
- 🐍 Python + FastAPI
- 🌐 Uvicorn (ASGI server)
- 🤖 Scikit-Learn — Random Forest Classifier
- 📦 Pandas + Joblib
**AI & Cloud**
- ✨ Google Gemini 2.5 Flash API (bias explanation)
- ☁️ Vercel (frontend hosting)
- 🖥️ Render.com (backend hosting)
---
## 🚀 Live Demo
**🌐 Live App:** https://loan-bias-detect.vercel.app/
---
## ⚙️ Run Locally
### Frontend
```bash
# Clone the repository
git clone https://github.com/rohitgudadhe02/loan-bias-frontend.git
cd loan-bias-frontend
# Install dependencies
npm install
# Create a .env file and add your Gemini API key
echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env
# Start the dev server
npm run dev
Backend
bash
git clone https://github.com/rohitgudadhe02/loan-bias-backend.git
cd loan-bias-backend
pip install -r requirements.txt
uvicorn api:app --reload
🎯 UN Sustainable Development Goals
This project directly addresses:

⚖️ SDG 10 — Reduced Inequalities By exposing and quantifying hidden demographic discrimination in automated financial decision systems, FairLoan AI helps ensure that creditworthiness — not race, gender, or zip code — determines loan eligibility.

🏗️ SDG 9 — Industry, Innovation and Infrastructure By providing compliance teams and developers with an open-source, real-time bias auditing tool, FairLoan AI promotes responsible, transparent, and ethical AI infrastructure in the financial sector.

🔮 Future Roadmap
 Batch Audit Mode — Upload a CSV of 10,000 applicants for macro-level bias analysis
 SHAP Value Integration — Explainable AI feature importance breakdown
 Fairness-Optimized Model — Auto-retrain a de-biased version of the model
 Compliance History Dashboard — Track bias score trends over time
👨‍💻 Built By
Rohit Gudadhe
Google Solution Challenge 2026 Submission
