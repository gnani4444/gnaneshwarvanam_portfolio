"use client";

import { useInView } from "react-intersection-observer";

const experiences = [
  {
    role: "Senior Data Scientist",
    company: "",
    period: "2022 – Present",
    type: "Full-time",
    highlights: [
      {
        title: "GenAI Data Quality Agent",
        desc: "Built a Gemini 2.5 Pro-based LLM agent for structured 10K+ campaign data extraction. 90% accuracy, saving 10,000+ manual hours annually.",
        tags: ["Gemini 2.5 Pro", "Multi-turn Agents", "Agentic Loop", "FastAPI"],
      },
      {
        title: "Dynamic Pricing Model",
        desc: "End-to-end LightGBM regression model for phone pricing optimisation, delivering $10M+ in savings over 6 campaigns.",
        tags: ["LightGBM", "Regression", "Pricing Strategy"],
      },
      {
        title: "Generative AI & Domain-Specific LLMs",
        desc: "Fine-tuned domain-specific LLMs for answering specialised business and technical queries with high precision.",
        tags: ["LLM Fine-Tuning", "LoRA", "QLoRA", "RAG", "Vector Databases"],
      },
      {
        title: "Churn Prediction Model",
        desc: "Built B2B churn prediction pipeline with 80% precision, identifying key churn drivers and enabling proactive retention strategies.",
        tags: ["XGBoost", "Feature Engineering", "Cohort Analysis"],
      },
    ],
  },
  {
    role: "Data Scientist",
    company: "",
    period: "2019 – 2022",
    type: "Full-time",
    highlights: [
      {
        title: "Predictive Healthcare Risk Modelling",
        desc: "Developed a predictive model to identify patients at high risk of unplanned inpatient hospital admissions within six months, enabling proactive intervention and care planning — generating $15M in savings within one year.",
        tags: ["Survival Analysis", "XGBoost", "SHAP", "Healthcare"],
      },
      {
        title: "Enterprise Reporting Automation",
        desc: "Scaled end-to-end reporting automation using Python, SQL and Google Sheets APIs, reducing manual effort significantly and saving $15K annually.",
        tags: ["Python", "SQL", "Google Sheets API", "Automation"],
      },
      {
        title: "Model Productionisation & MLOps",
        desc: "Productionised multiple predictive models with robust data pipelines, monitoring, and retraining workflows on Azure.",
        tags: ["MLflow", "Azure DevOps", "CI/CD", "Docker"],
      },
      {
        title: "Analytics & ML Strategy Roadmap",
        desc: "Conducted a comprehensive assessment of existing products, defining a 3-year analytics and machine learning roadmap.",
        tags: ["Strategy", "Stakeholder Mgmt", "EDA", "Tableau"],
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
