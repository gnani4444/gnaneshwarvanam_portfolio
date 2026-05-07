"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const highlights = [
  { icon: "🎓", label: "IIT Bhubaneswar", sub: "B.Tech" },
  { icon: "📍", label: "London, UK", sub: "Open to Hybrid / Remote" },
  { icon: "🏆", label: "Claude Certified", sub: "Architect · Anthropic 2026" },
  { icon: "⚡", label: "6.5+ Years", sub: "Production AI/ML Systems" },
];

const stats = [
  { end: 10, suffix: "M+", label: "Business Impact ($)" },
  { end: 10, suffix: "K+", label: "Manual Hours Saved" },
  { end: 15, suffix: "+", label: "ML Models Deployed" },
  { end: 98, suffix: "%", label: "Model Accuracy (Peak)" },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  return (
    <section id="about" className="py-32 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm font-bold tracking-widest">01.</span>
          <h2 className="section-heading text-white">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-dark-border to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div
            className={`space-y-6 transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <p className="text-slate-300 text-lg leading-relaxed">
              Senior Data Scientist with{" "}
              <span className="text-secondary font-semibold">6.5+ years</span>{" "}
              building production AI/ML systems that generate measurable business impact —
              from{" "}
              <span className="text-secondary font-semibold">$10M+ in delivered savings</span>{" "}
              to 10,000+ manual hours automated annually.
            </p>
            <p className="text-slate-400 leading-relaxed">
              My stack:{" "}
              <span className="text-primary font-medium">Python · PyTorch · LangChain · FastAPI · Azure</span>.
              I own the full pipeline — feature engineering, model training, REST API deployment,
              monitoring, and automated retraining.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Recent focus:{" "}
              <span className="text-primary font-medium">agentic systems with Claude & Gemini</span>,
              RAG architectures over large document corpora,
              LoRA/QLoRA fine-tuning for domain-specific tasks, and
              <span className="text-primary font-medium"> MLOps pipelines on Azure</span> that
              stay reliable under production load.
            </p>

            {/* Highlight badges */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-dark-card border border-dark-border hover:border-primary/40 transition-colors"
                >
                  <span className="text-2xl">{h.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{h.label}</div>
                    <div className="text-xs text-slate-500">{h.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats + Stack */}
          <div
            className={`transition-all duration-1000 delay-300 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="gradient-border p-6 text-center group hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="text-5xl font-black gradient-text mb-2">
                    {started ? (
                      <CountUp end={stat.end} duration={2.5} suffix={stat.suffix} delay={i * 0.2} />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>
                  <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tech stack cloud */}
            <div className="mt-6 p-6 rounded-2xl bg-dark-card border border-dark-border">
              <p className="text-xs text-slate-500 font-mono mb-4 tracking-widest uppercase">
                Core Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python", "PyTorch", "TensorFlow", "LangChain", "FastAPI",
                  "MLflow", "Azure", "PySpark", "SQL", "Docker",
                  "Gemini", "Claude API", "OpenAI", "HuggingFace", "FAISS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
