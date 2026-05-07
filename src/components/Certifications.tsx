"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const otherCerts = [
  {
    title: "Natural Language Processing in TensorFlow",
    issuer: "DeepLearning.AI",
    date: "Jul 2020",
    id: "GQDJU5GCVVR6",
    link: "https://www.coursera.org/account/accomplishments/certificate/GQDJU5GCVVR6",
  },
  {
    title: "NLP with Classification and Vector Spaces",
    issuer: "DeepLearning.AI",
    date: "Feb 2021",
    id: "DVKKJZPY4FUJ",
    link: "https://www.coursera.org/account/accomplishments/certificate/DVKKJZPY4FUJ",
  },
  {
    title: "NLP with Probabilistic Models",
    issuer: "DeepLearning.AI",
    date: "Mar 2021",
    id: "JSZZ94JJK4L8",
    link: "https://www.coursera.org/account/accomplishments/certificate/JSZZ94JJK4L8",
  },
  {
    title: "Sequences, Time Series and Prediction",
    issuer: "Coursera",
    date: "Jun 2020",
    id: "NYKAPTFBX4KS",
    link: "https://www.coursera.org/account/accomplishments/certificate/NYKAPTFBX4KS",
  },
  {
    title: "Convolutional Neural Networks in TensorFlow",
    issuer: "Coursera",
    date: "Nov 2019",
    id: "R9WUFJY5DY3H",
    link: "https://www.coursera.org/account/accomplishments/certificate/R9WUFJY5DY3H",
  },
  {
    title: "Introduction to TensorFlow for AI/ML/DL",
    issuer: "Coursera",
    date: "Aug 2019",
    id: "WN32PPTBLFH7",
    link: "https://www.coursera.org/account/accomplishments/certificate/WN32PPTBLFH7",
  },
  {
    title: "Machine Learning",
    issuer: "Coursera",
    date: "Mar 2019",
    id: "BW4A6XNM5TD5",
    link: "https://www.coursera.org/account/accomplishments/certificate/BW4A6XNM5TD5",
  },
];

function ClaudeOrbit() {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    let frame: number;
    let angle = 0;
    const tick = () => {
      angle += 0.3;
      const dots = el.querySelectorAll<HTMLElement>(".orbit-dot");
      dots.forEach((dot, i) => {
        const offset = (360 / dots.length) * i + angle;
        const rad = (offset * Math.PI) / 180;
        const r = parseInt(dot.dataset.r || "90");
        dot.style.transform = `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`;
      });
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  const orbits = [
    { label: "GenAI",  r: 90, color: "#2997ff" },
    { label: "LLM",    r: 90, color: "#74c2ff" },
    { label: "MLOps",  r: 90, color: "#30d158" },
    { label: "API",    r: 90, color: "#ff9f0a" },
    { label: "RAG",    r: 90, color: "#bf5af2" },
    { label: "Arch",   r: 90, color: "#ffd60a" },
  ];

  return (
    <div
      ref={orbitRef}
      className="relative flex items-center justify-center"
      style={{ width: 220, height: 220 }}
    >
      {/* Center badge */}
      <div className="absolute z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center claude-glow"
        style={{ background: "linear-gradient(135deg,#ffd60a,#ff9f0a)" }}>
        <span className="text-2xl">🏆</span>
        <span className="text-[8px] font-bold text-white leading-tight mt-0.5">
          Certified
          <br />
          Architect
        </span>
      </div>
      {/* Orbit ring */}
      <div className="absolute w-48 h-48 rounded-full border border-primary/20" />
      {/* Orbiting dots */}
      {orbits.map((o, i) => (
        <div
          key={i}
          data-r={o.r}
          className="orbit-dot absolute w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold transition-none"
          style={{
            background: `${o.color}25`,
            border: `1px solid ${o.color}60`,
            color: o.color,
            willChange: "transform",
          }}
        >
          {o.label}
        </div>
      ))}
    </div>
  );
}

export default function Certifications() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="certifications" className="py-32 px-6 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm font-bold tracking-widest">
            04.
          </span>
          <h2 className="section-heading text-white">Certifications</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-dark-border to-transparent" />
        </div>

        {/* ===== CLAUDE CERTIFIED ARCHITECT — HERO FEATURE ===== */}
        <div
          className={`relative mb-16 transition-all duration-1000 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {/* Outer glow frame */}
          <div className="absolute -inset-1 rounded-3xl opacity-50 blur-md animate-pulse"
          style={{ background: "linear-gradient(135deg,#ffd60a,#ff9f0a,#2997ff,#ffd60a)" }} />
          <div className="relative rounded-3xl overflow-hidden claude-glow"
            style={{ background: "linear-gradient(135deg,#0d0d00 0%,#1a1400 100%)", border: "1.5px solid rgba(255,214,10,0.5)" }}>
            {/* Animated background rays */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-px origin-bottom"
                  style={{
                    height: "60%",
                    transform: `translateX(-50%) rotate(${i * 45}deg)`,
                    background: `linear-gradient(transparent, rgba(108,99,255,0.08))`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-10 md:p-14">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Left: Orbit animation */}
                <div className="flex-shrink-0">
                  <ClaudeOrbit />
                </div>

                {/* Center: Main content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Featured badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-bold"
                    style={{ background: "rgba(255,214,10,0.12)", border: "1px solid rgba(255,214,10,0.4)", color: "#ffd60a" }}>
                    ⭐ Featured Certification
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
                    Claude Certified
                    <br />
                    <span className="gradient-text-gold">Architect</span>
                  </h3>

                  <p className="text-slate-400 text-lg mb-2">
                    <span className="text-secondary font-semibold">Anthropic</span> · April 2026
                  </p>

                  <p className="text-slate-400 max-w-xl mb-8 leading-relaxed">
                    Certified in designing, building, and deploying production-grade AI systems
                    using Claude models — covering advanced prompt engineering, multi-agent
                    architectures, tool use, safety practices, and enterprise AI integration patterns.
                  </p>

                  {/* Skills proven */}
                  <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
                    {["Multi-Agent Systems", "Prompt Engineering", "Tool Use & Function Calling",
                      "Safety & Alignment", "Claude API", "AI Architecture", "Production Deployment"].map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(255,214,10,0.08)", border: "1px solid rgba(255,214,10,0.25)", color: "#ffd60a" }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="https://verify.skilljar.com/c/xmdccbpd3j5i"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-300 hover:scale-105 group"
                    style={{
                      background: "linear-gradient(135deg,#ffd60a,#ff9f0a)",
                      color: "#000",
                      boxShadow: "0 0 40px rgba(255,214,10,0.45)",
                    }}
                  >
                    <span>View Credential</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Right: Stats */}
                <div className="flex-shrink-0 grid grid-cols-2 gap-3 w-full max-w-xs">
                  {[
                    { icon: "🧠", label: "AI Architecture", sub: "Expert Level" },
                    { icon: "🔧", label: "Tool Use", sub: "Advanced" },
                    { icon: "🛡️", label: "AI Safety", sub: "Practitioner" },
                    { icon: "🚀", label: "Production AI", sub: "Certified" },
                  ].map((item) => (
                    <div key={item.label}
                      className="p-4 rounded-2xl text-center"
                      style={{ background: "rgba(255,214,10,0.07)", border: "1px solid rgba(255,214,10,0.18)" }}>
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-xs font-bold text-white">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== OTHER CERTIFICATIONS — Minimized ===== */}
        <div>
          <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6">
            Additional Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {otherCerts.map((cert, i) => (
              <a
                key={cert.id}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-xl bg-dark-card border border-dark-border hover:border-slate-600 transition-all duration-500 group ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-xs text-slate-500 mb-1 font-medium">{cert.issuer}</div>
                <div className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors line-clamp-2 leading-snug mb-2">
                  {cert.title}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-mono">{cert.date}</span>
                  <svg className="w-3.5 h-3.5 text-slate-600 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
