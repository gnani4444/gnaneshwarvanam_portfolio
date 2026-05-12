"use client";

import { useInView } from "react-intersection-observer";

const experiences = [
  {
    role: "Senior AI Engineer / Forward Deployed",
    company: "Google",
    period: "April 2025 – Present",
    type: "Full-time",
    highlights: [
      {
        title: "GenAI Data Quality Agent",
        desc: "Scoped, designed, and productionised a multi-turn Gemini 2.5 Pro agentic system extracting structured fields from 10,000+ unstructured promotional campaign texts. Hit 92% field-level accuracy with 2% validation errors using a hand-labelled eval set, a two-layer validator with self-correction, tool calls, and retry loop — automating ~10,000 analyst hours annually.",
        tags: ["Gemini 2.5 Pro", "Multi-turn Agents", "Validator + Self-Correction", "Retry Loop", "FastAPI", "LangChain"],
      },
      {
        title: "Pixel Dynamic Pricing Engine",
        desc: "Led end-to-end build of a LightGBM regression and constrained-optimisation engine on EMEA market signals. Shipped an interactive dashboard for analysts to visualise forecasts, adjust constraints, and re-run optimisation on demand, replacing week-long feedback cycles — delivering 90% forecast accuracy and $10M incremental profit in 6 months.",
        tags: ["LightGBM", "Regression", "Constrained Optimisation", "Interactive Dashboard", "PySpark", "Azure ML", "MLflow"],
      },
    ],
  },
  {
    role: "Senior AI Engineer / Forward Deployed",
    company: "Meta",
    period: "August 2022 – March 2025",
    type: "Full-time",
    highlights: [
      {
        title: "Fine-Tuned LLM + RAG for Sales Analytics",
        desc: "Owned discovery, scoping, and production deployment of a domain-specific RAG system backed by a fine-tuned LLM (LoRA / QLoRA). Built an automated eval harness scoring answers against a labelled golden dataset. Hit 95% answer accuracy and reduced analyst effort by 40%.",
        tags: ["LLM Fine-Tuning", "LoRA", "QLoRA", "RAG", "HuggingFace", "LangChain", "FAISS", "FastAPI"],
      },
      {
        title: "Customer Churn Intelligence",
        desc: "Built an XGBoost churn prediction model with 80% precision, identifying key churn drivers with SHAP-based explainability. Monitored production drift and enabled 95% retention of high-priority B2B customers, protecting $10M+ in annual revenue.",
        tags: ["XGBoost", "SHAP", "Feature Engineering", "Drift Monitoring", "Cohort Analysis"],
      },
      {
        title: "AI Fraud Detection",
        desc: "Engineered supervised risk-scoring models combining account-compromise signals and free-tier behavioural patterns. Achieved 92% precision and mitigated ~$4M in potential revenue loss.",
        tags: ["Supervised Learning", "Risk Scoring", "Fraud Detection", "Behavioural Features"],
      },
    ],
  },
  {
    role: "Data Scientist / AI Engineer",
    company: "Humana",
    period: "June 2019 – August 2022",
    type: "Full-time",
    highlights: [
      {
        title: "Hospitalisation Risk Prediction",
        desc: "Developed a predictive model to identify patients at high risk of unplanned inpatient hospital admissions, enabling proactive intervention and care planning — improving precision by 20% and generating $15M in savings.",
        tags: ["LightGBM", "Neural Networks", "Survival Analysis", "XGBoost", "SHAP", "Healthcare"],
      },
      {
        title: "Cohort Analysis & Drug Adoption",
        desc: "Led a 5-member data science team using clustering and predictive modelling to boost drug adoption by 5%. Applied Shapley values for explainability, driving stakeholder confidence in model decisions.",
        tags: ["Clustering", "Predictive Modelling", "SHAP", "Team Lead", "Cohort Analysis"],
      },
      {
        title: "NLP & Admission Prediction",
        desc: "Applied BERT vectorisation, PCA, and cosine similarity for patient cohort analysis. Built and deployed ML models predicting inpatient admissions with 3% precision improvement.",
        tags: ["BERT", "NLP", "PCA", "Cosine Similarity", "Predictive Modelling"],
      },
      {
        title: "Model Productionisation & MLOps",
        desc: "Productionised multiple predictive models with robust data pipelines, monitoring, and retraining workflows on Azure.",
        tags: ["MLflow", "Azure DevOps", "CI/CD", "Docker"],
      },
    ],
  },
];

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" className="py-32 px-6 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm font-bold tracking-widest">
            02.
          </span>
          <h2 className="section-heading text-white">Experience</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-dark-border to-transparent" />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, ei) => (
              <div
                key={ei}
                className={`relative md:pl-24 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={{ transitionDelay: `${ei * 200}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 hidden md:block">
                  <div className="w-8 h-8 rounded-full bg-dark-card border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </div>

                {/* Role header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      {exp.company && <><span className="text-primary font-semibold">{exp.company}</span><span className="text-slate-600">·</span></>}
                      <span className="text-slate-400 text-sm">{exp.type}</span>
                    </div>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-mono font-medium whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                {/* Highlights grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {exp.highlights.map((h, hi) => (
                    <div
                      key={hi}
                      className="p-5 rounded-xl bg-dark-card border border-dark-border hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1"
                    >
                      <h4 className="text-sm font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {h.title}
                      </h4>
                      <p className="text-sm text-slate-400 leading-relaxed mb-3">
                        {h.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {h.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-mono rounded bg-primary/10 text-primary/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
