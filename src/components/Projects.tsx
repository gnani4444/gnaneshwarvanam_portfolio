"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    title: "GiftVision",
    subtitle: "AI Product Customisation Platform",
    description:
      "Chat with Gemini 3.0 Flash to customise awards, trophies, and gifts via natural language — no editing software required. Describe your vision and the AI instantly generates a realistic product image, ready to go straight to hardware production.",
    longDesc:
      "Users select a base product from the gallery, then describe desired changes in plain English — 'Add Taylor as Employee of the Year', 'Happy Valentine's Day with a red ribbon', 'Happy Birthday Sarah'. Gemini 3.0 Flash receives both the base product image (multimodal input) and the user prompt, generating a modified product image instantly. Outputs go straight to hardware production — no designer or editing tools needed.",
    tags: ["Next.js 16", "TypeScript", "React 19", "Gemini 3.0 Flash", "TailwindCSS", "Multimodal AI", "No-Code Customisation", "Hardware Production"],
    gradient: "from-blue-500/20 to-cyan-400/20",
    accentColor: "#2997ff",
    icon: "🎁",
    features: [
      "No editing software required — describe in plain English",
      "AI-generated images ready for hardware production",
      "Conversational chat interface with full message history",
      "Wide variety of gift types: trophies, awards, plaques & more",
      "Multimodal AI (image + text input)",
      "Real-time image generation",
    ],
    link: "https://v0-e-commerce-customization-platfor.vercel.app/",
    github: null,
    badge: "Featured",
    featured: true,
    previewBlocked: false,
  },
  {
    title: "Truth Verifier",
    subtitle: "AI-Powered Health Misinformation Detector",
    description:
      "Paste an Instagram post or reel URL and get real-time fact-check verdicts — TRUE, FALSE, or UNVERIFIABLE — with cited sources in seconds. Built to make health and science fact-checking frictionless at scale.",
    longDesc:
      "The backend fetches Instagram content via yt-dlp (cookie-based auth), extracts audio with ffmpeg, and transcribes it via Gradium STT. TinyFish Agent AI parses the transcript into individual factual claims, searches each against the web using TinyFish Search API, then returns a verdict with explanation and source citation. Results stream to the browser in real time via SSE — users see claims resolve as they arrive, no full-pipeline wait.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "SSE", "Supabase", "TinyFish Agent", "Gemini Vision", "yt-dlp", "ffmpeg", "Gradium STT", "Vercel", "Render"],
    gradient: "from-purple-500/20 to-pink-500/20",
    accentColor: "#BF5AF2",
    icon: "🛡️",
    features: [
      "Real-time SSE streaming — verdicts appear as each claim resolves",
      "Solved Vercel Edge timeout by moving DB write to client-side POST after 'done' event",
      "Tiered usage system (free / pro / admin) with live usage banner and upgrade modal",
      "File-based extraction cache keyed by URL + vision flag — avoids redundant Gradium calls",
      "Supabase RLS with service-role bypass pattern for reliable server-side writes",
      "Vision mode: Gemini Vision analyzes on-screen text in video frames (admin tier)",
    ],
    link: "https://www.truthverifier.in/",
    github: null,
    badge: "Featured",
    featured: true,
    previewBlocked: true,
  },
  {
    title: "Campaign Intelligence Platform",
    subtitle: "GenAI Agentic Data Extraction System",
    description:
      "Multi-turn GenAI agentic loop that extracts structured fields from unstructured telecom promotional campaign text — partner, product, promotion type, and offer details — with 90%+ accuracy.",
    longDesc:
      "The system runs a multi-turn LLM conversation with tool use: database lookup for partner resolution, two-layer business rule validation, and automatic self-correction retry. Supports OpenAI GPT-4o and Google Gemini interchangeably. Full audit trail logged as structured JSONL.",
    tags: ["Python", "FastAPI", "LangChain", "OpenAI GPT-4o", "Gemini", "SQLite", "Pydantic"],
    gradient: "from-pink-600/20 to-orange-600/20",
    accentColor: "#FF6584",
    icon: "🤖",
    features: [
      "Multi-turn agentic loop (up to 10 turns)",
      "Two-layer validation + self-correction",
      "Provider-agnostic (OpenAI / Gemini)",
      "Full JSONL audit trail",
    ],
    link: null,
    github: null,
    badge: "Production System",
    featured: false,
  },
  {
    title: "Agentic Job Discovery Engine",
    subtitle: "Autonomous Career Page Scraper",
    description:
      "Agentic tool that reads companies and job keywords from a Google Sheet, searches for career pages via Google Search + Gemini disambiguation, scrapes listings with Playwright, and writes results back automatically.",
    longDesc:
      "End-to-end autonomous pipeline: reads from Google Sheets → searches for career pages → scrapes job listings with headless Chromium → uses Gemini to disambiguate results → writes structured output back to the sheet. Handles pagination, dynamic JS-rendered pages, and multi-tab layouts.",
    tags: ["Python", "Playwright", "Gemini", "Google Sheets API", "BeautifulSoup", "Agentic"],
    gradient: "from-yellow-600/20 to-green-600/20",
    accentColor: "#F59E0B",
    icon: "🔍",
    features: [
      "Headless browser scraping",
      "Gemini-powered page disambiguation",
      "Google Sheets read/write",
      "Handles dynamic JS-rendered pages",
    ],
    link: null,
    github: null,
    badge: "Open Source",
    featured: false,
  },
];

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function FeaturedProjectCard({
  project,
  inView,
}: {
  project: (typeof projects)[0];
  inView: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const c = project.accentColor;
  const domain = project.link ? new URL(project.link).hostname : "";

  return (
    <div
      className={`relative mb-10 transition-all duration-1000 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-40 blur-md animate-pulse"
        style={{ background: `linear-gradient(135deg,${c},${hexToRgba(c, 0.6)},${c})` }}
      />
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#000d1a 0%,#001428 100%)",
          border: `1.5px solid ${hexToRgba(c, 0.45)}`,
        }}
      >
        {/* Top bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg,${c},${hexToRgba(c, 0.6)},${c})` }} />

        <div className="p-8 md:p-12">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left: content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: hexToRgba(c, 0.15),
                    border: `1px solid ${hexToRgba(c, 0.4)}`,
                    color: c,
                  }}
                >
                  ⭐ Featured Project
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: "rgba(48,209,88,0.12)",
                    border: "1px solid rgba(48,209,88,0.35)",
                    color: "#30d158",
                  }}
                >
                  🟢 Live
                </span>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: hexToRgba(c, 0.15),
                    border: `1px solid ${hexToRgba(c, 0.3)}`,
                  }}
                >
                  {project.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white">{project.title}</h3>
                  <p className="text-sm font-semibold" style={{ color: c }}>
                    {project.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed mb-5">{project.description}</p>

              {/* Expandable */}
              <div
                className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-96" : "max-h-0"}`}
              >
                <p className="text-slate-500 leading-relaxed mb-4 pt-4 border-t border-white/5">
                  {project.longDesc}
                </p>
                <ul className="space-y-1.5 mb-4">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                      <span style={{ color: c }}>▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg"
                    style={{
                      background: hexToRgba(c, 0.08),
                      border: `1px solid ${hexToRgba(c, 0.2)}`,
                      color: c,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={project.link!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 group"
                  style={{
                    background: c,
                    color: "#fff",
                    boxShadow: `0 4px 20px ${hexToRgba(c, 0.4)}`,
                  }}
                >
                  <span>View Live Demo</span>
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 border"
                  style={{
                    borderColor: hexToRgba(c, 0.3),
                    color: c,
                    background: hexToRgba(c, 0.07),
                  }}
                >
                  {expanded ? "Show Less ↑" : "Learn More ↓"}
                </button>
              </div>
            </div>

            {/* Right: Live preview iframe */}
            <div className="flex-shrink-0 w-full lg:w-[420px]">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid ${hexToRgba(c, 0.2)}`,
                  background: "#000",
                  boxShadow: `0 8px 40px ${hexToRgba(c, 0.15)}`,
                }}
              >
                {/* Browser chrome */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-xs text-slate-600 font-mono truncate">{domain}</span>
                </div>
                <div style={{ height: 320, position: "relative" }}>
                  {project.previewBlocked ? (
                    <a
                      href={project.link!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center w-full h-full gap-5 group"
                      style={{ background: "rgba(0,0,0,0.6)" }}
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                        style={{ background: hexToRgba(c, 0.15), border: `1px solid ${hexToRgba(c, 0.3)}` }}
                      >
                        {project.icon}
                      </div>
                      <div className="text-center px-6">
                        <p className="text-white font-bold text-base mb-1">{project.title}</p>
                        <p className="text-slate-400 text-xs mb-4 font-mono">{domain}</p>
                        <span
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 group-hover:scale-105"
                          style={{ background: c, boxShadow: `0 2px 16px ${hexToRgba(c, 0.45)}` }}
                        >
                          Open Live Demo ↗
                        </span>
                      </div>
                    </a>
                  ) : (
                    <>
                      <iframe
                        src={project.link!}
                        title={`${project.title} Live Preview`}
                        className="w-full h-full"
                        style={{ border: "none", pointerEvents: "none" }}
                        loading="lazy"
                      />
                      <a
                        href={project.link!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0,0,0,0.45)" }}
                      >
                        <span
                          className="px-4 py-2 rounded-xl text-sm font-bold text-white"
                          style={{ background: c, boxShadow: `0 2px 12px ${hexToRgba(c, 0.5)}` }}
                        >
                          Open Full Demo ↗
                        </span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`project-card rounded-2xl bg-dark-card border border-dark-border overflow-hidden transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Card header gradient */}
      <div
        className={`h-2 w-full bg-gradient-to-r ${project.gradient}`}
        style={{ boxShadow: `0 0 20px ${project.accentColor}40` }}
      />

      <div className="p-7">
        {/* Icon + Badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}20, ${project.accentColor}40)`,
              border: `1px solid ${project.accentColor}30`,
            }}
          >
            {project.icon}
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: `${project.accentColor}15`,
              color: project.accentColor,
              border: `1px solid ${project.accentColor}30`,
            }}
          >
            {project.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
        <p className="text-sm font-medium mb-3" style={{ color: project.accentColor }}>
          {project.subtitle}
        </p>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>

        {/* Expandable details */}
        <div className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-96" : "max-h-0"}`}>
          <p className="text-sm text-slate-500 leading-relaxed mb-4 pt-2 border-t border-dark-border">
            {project.longDesc}
          </p>
          <ul className="space-y-1.5 mb-4">
            {project.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                <span style={{ color: project.accentColor }}>▸</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-mono rounded bg-dark border border-dark-border text-slate-400 hover:text-slate-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border"
            style={{
              borderColor: `${project.accentColor}40`,
              color: project.accentColor,
              background: `${project.accentColor}10`,
            }}
          >
            {expanded ? "Show Less ↑" : "Learn More ↓"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 px-6 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-5">
          <span className="text-primary font-mono text-sm font-bold tracking-widest">03.</span>
          <h2 className="section-heading text-white">Personal Projects</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-dark-border to-transparent" />
        </div>
        <p className="text-slate-400 mb-12 max-w-xl">
          AI/ML systems I&apos;ve designed, built, and shipped — from GenAI agents to full-stack AI applications.
        </p>

        {/* Featured projects */}
        {featuredProjects.map((project) => (
          <FeaturedProjectCard key={project.title} project={project} inView={inView} />
        ))}

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6">
              More Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} inView={inView} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
