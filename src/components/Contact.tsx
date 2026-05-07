"use client";

import { useInView } from "react-intersection-observer";

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="contact" className="py-32 px-6 relative" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(ellipse, rgba(41,151,255,0.07) 0%, transparent 65%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm font-bold tracking-widest">06.</span>
          <h2 className="section-heading" style={{ color: "#f5f5f7" }}>Get In Touch</h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.1), transparent)" }} />
        </div>

        <div
          className={`grid lg:grid-cols-2 gap-8 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {/* Left — description */}
          <div className="p-8 rounded-2xl flex flex-col justify-between gap-8"
            style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#f5f5f7", letterSpacing: "-0.02em" }}>
                Let&apos;s Build Something Impactful
              </h3>
              <p className="leading-relaxed mb-6" style={{ color: "#86868b" }}>
                I&apos;m actively exploring senior AI/ML and Data Science opportunities where I can drive
                meaningful impact through GenAI products, ML systems, or strategic data roadmaps.
              </p>
              <p style={{ color: "#86868b" }} className="leading-relaxed">
                Whether you&apos;re building a new AI product, scaling an ML platform, or planning your
                data strategy — let&apos;s connect.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3" style={{ color: "#86868b" }}>
                <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#2997ff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">London, United Kingdom · Open to Global/Remote</span>
              </div>
              <div className="flex items-center gap-3" style={{ color: "#86868b" }}>
                <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#2997ff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Senior Data Scientist · AI/ML Engineer · GenAI Architect</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#30d158", boxShadow: "0 0 8px #30d158" }} />
                <span className="text-sm font-medium" style={{ color: "#30d158" }}>Currently available</span>
              </div>
            </div>
          </div>

          {/* Right — CTA */}
          <div className="p-8 rounded-2xl flex flex-col justify-center gap-6"
            style={{
              background: "linear-gradient(135deg, rgba(41,151,255,0.05) 0%, rgba(100,210,255,0.03) 100%)",
              border: "1px solid rgba(41,151,255,0.15)",
            }}>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#2997ff" }}>
                OPEN TO OPPORTUNITIES
              </p>
              <h3 className="text-2xl font-bold mb-3" style={{ color: "#f5f5f7", letterSpacing: "-0.02em" }}>
                Ready to Connect?
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#86868b" }}>
                Send me an email and let&apos;s discuss how I can contribute to your team&apos;s success.
              </p>
            </div>

            <a
              href="mailto:vanamgnaneshwar@gmail.com"
              className="glow-btn inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 group"
              style={{
                background: "#2997ff",
                boxShadow: "0 4px 24px rgba(41,151,255,0.35)",
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Send Email</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: "Response Time", value: "< 24h", icon: "⚡" },
                { label: "Time Zone",     value: "GMT (London)", icon: "🕐" },
                { label: "Work Style",    value: "Hybrid / Remote", icon: "💻" },
                { label: "Start Date",    value: "Immediate", icon: "🚀" },
              ].map((item) => (
                <div key={item.label}
                  className="p-3 rounded-xl text-center"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-lg mb-1">{item.icon}</div>
                  <div className="text-xs font-bold" style={{ color: "#f5f5f7" }}>{item.value}</div>
                  <div className="text-xs" style={{ color: "#3d3d3f" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-lg font-bold" style={{ color: "#f5f5f7", letterSpacing: "-0.02em" }}>
              Gnaneshwar Vanam
            </p>
            <p className="text-sm" style={{ color: "#86868b" }}>
              Senior Data Scientist · AI/ML Engineer · GenAI Architect · London
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
