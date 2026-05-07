"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";

/* ════════════════════════════════════════════════════════
   SKILL DATA — scores stored ONLY in JS, never in HTML
════════════════════════════════════════════════════════ */
const skillCategories = [
  {
    category: "Languages & Data",
    color: "#2997ff",
    gradient: "linear-gradient(90deg,#2997ff,#74c2ff)",
    skills: [
      { name: "Python",         score: 95 },
      { name: "SQL / SparkSQL", score: 91 },
      { name: "PySpark",        score: 79 },
    ],
  },
  {
    category: "ML & Deep Learning",
    color: "#bf5af2",
    gradient: "linear-gradient(90deg,#bf5af2,#da8fff)",
    skills: [
      { name: "Scikit-learn / XGBoost / LightGBM", score: 92 },
      { name: "PyTorch",                           score: 86 },
      { name: "TensorFlow / Keras",                score: 88 },
    ],
  },
  {
    category: "Generative AI & LLMs",
    color: "#ffd60a",
    gradient: "linear-gradient(90deg,#ffd60a,#ff9f0a)",
    skills: [
      { name: "Agentic Systems · Claude · Gemini", score: 91 },
      { name: "Prompt Engineering & RAG",          score: 93 },
      { name: "LLM Fine-Tuning (LoRA / QLoRA)",   score: 87 },
      { name: "Vector Databases (FAISS)",          score: 84 },
    ],
  },
  {
    category: "MLOps & Cloud",
    color: "#30d158",
    gradient: "linear-gradient(90deg,#30d158,#64d68a)",
    skills: [
      { name: "MLflow · Azure DevOps · CI/CD", score: 84 },
      { name: "Model Monitoring & Retraining", score: 83 },
      { name: "Data Pipeline Automation",      score: 87 },
    ],
  },
];

/* Radar summary */
const radarData = {
  labels: ["Python & SQL", "Machine Learning", "Deep Learning", "Generative AI", "MLOps & Cloud", "Analytics"],
  scores: [92, 91, 87, 88, 83, 90],
  colors: ["#2997ff", "#bf5af2", "#64d2ff", "#ffd60a", "#30d158", "#ff9f0a"],
};

/* ── Individual skill bar ──────────────────────────────── */
function SkillBar({
  name, score, color, gradient, delay, animate,
}: {
  name: string; score: number; color: string; gradient: string;
  delay: number; animate: boolean;
}) {
  const [width, setWidth] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (animate) {
      const t1 = setTimeout(() => setWidth(score), delay);
      const t2 = setTimeout(() => setShowScore(true), delay + 900);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      setWidth(0);
      setShowScore(false);
    }
  }, [animate, score, delay]);

  // Convert numeric score to a tier label
  const tier = score >= 92 ? "Expert" : score >= 86 ? "Advanced" : score >= 80 ? "Proficient" : "Solid";

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[#86868b] group-hover:text-[#f5f5f7] transition-colors">
          {name}
        </span>
        {/* Tier label renders AFTER animation — not baked into HTML */}
        <span
          className="text-[10px] font-bold uppercase tracking-widest transition-all duration-500 px-2 py-0.5 rounded-full"
          style={{
            color,
            opacity: showScore ? 1 : 0,
            background: `${color}18`,
            border: `1px solid ${color}35`,
          }}
        >
          {tier}
        </span>
      </div>
      <div className="h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: `${width}%`,
            background: gradient,
            transition: "width 1.5s cubic-bezier(0.25,0.46,0.45,0.94)",
            boxShadow: `0 0 8px ${color}50`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.28) 50%,transparent 100%)",
              animation: "shimmer 2.5s infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── SVG Radar Chart (no external dependencies) ─────── */
function RadarChart({ animate }: { animate: boolean }) {
  const { labels, scores, colors } = radarData;
  const N = labels.length;
  const cx = 160, cy = 160, r = 120;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!animate) { setProgress(0); return; }
    let start: number | null = null;
    const duration = 1400;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [animate]);

  const angleAt = (i: number) => (i / N) * 2 * Math.PI - Math.PI / 2;
  const point = (i: number, val: number) => ({
    x: cx + r * val * Math.cos(angleAt(i)),
    y: cy + r * val * Math.sin(angleAt(i)),
  });

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1];

  // Axis endpoints
  const axes = labels.map((_, i) => point(i, 1));

  // Data polygon
  const dataPoints = scores.map((s, i) => {
    const val = ((s - 50) / 50) * 0.75 + 0.25; // map 50-100 → 0.25-1
    return point(i, val * progress);
  });
  const polyStr = dataPoints.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-sm mx-auto">
      {/* Grid rings */}
      {rings.map((rr, ri) => {
        const pts = Array.from({ length: N }, (_, i) => point(i, rr));
        const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
        return <path key={ri} d={d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
      })}
      {/* Axis lines */}
      {axes.map((a, i) => (
        <line key={i} x1={cx} y1={cy} x2={a.x} y2={a.y}
          stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      ))}
      {/* Data polygon fill */}
      <polygon points={polyStr} fill="rgba(41,151,255,0.1)" stroke="#2997ff"
        strokeWidth="2" strokeLinejoin="round" />
      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5"
          fill={colors[i]} stroke="#111" strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }} />
      ))}
      {/* Labels */}
      {labels.map((lbl, i) => {
        const lp = point(i, 1.18);
        return (
          <text key={i} x={lp.x} y={lp.y}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontWeight="500"
            fill={colors[i]}
            style={{ fontFamily: "-apple-system,SF Pro Text,Inter,sans-serif" }}>
            {lbl}
          </text>
        );
      })}
    </svg>
  );
}

/* ── Hidden Skills Modal ──────────────────────────────── */
function SkillsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  // All skills sorted by score desc
  const allSkills = skillCategories
    .flatMap(c => c.skills.map(s => ({ ...s, color: c.color })))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold tracking-tight">
            Skill <span className="gradient-text-blue">Analysis</span>
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.07] hover:bg-white/[0.14] flex items-center justify-center text-[#86868b] hover:text-white transition-all text-lg"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-[#86868b] mb-8">
          Proficiency depth map · data lives in JS, not the DOM
        </p>

        <RadarChart animate={open} />

        <div className="grid grid-cols-2 gap-2 mt-8">
          {allSkills.map(skill => {
            const tier =
              skill.score >= 92 ? { label: "Expert",     emoji: "🔥" } :
              skill.score >= 86 ? { label: "Advanced",   emoji: "⚡" } :
              skill.score >= 80 ? { label: "Proficient", emoji: "✦"  } :
                                  { label: "Solid",      emoji: "◎"  };
            return (
              <div key={skill.name}
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="text-sm font-medium text-[#f5f5f7]">{skill.name}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ color: skill.color, background: `${skill.color}18`, border: `1px solid ${skill.color}35` }}>
                  {tier.emoji} {tier.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN SKILLS SECTION
════════════════════════════════════════════════════════ */
export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const [unlockClicks, setUnlockClicks] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleUnlockClick = useCallback(() => {
    setUnlockClicks(prev => {
      const next = prev + 1;
      if (next >= 3) {
        setModalOpen(true);
        return 0;
      }
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setUnlockClicks(0), 2500);
      return next;
    });
  }, []);

  return (
    <section id="skills" className="py-32 px-6 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(41,151,255,0.05) 0%, transparent 65%)" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm font-bold tracking-widest">05.</span>
          <h2 className="section-heading text-[#f5f5f7]">Technical Skills</h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.1), transparent)" }} />
        </div>

        {/* ── Hidden unlock hint ──────────────────────────── */}
        <div className="flex items-center gap-3 mb-14">
          <button
            onClick={handleUnlockClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              background: "rgba(41,151,255,0.07)",
              border: "1px solid rgba(41,151,255,0.2)",
              color: "#2997ff",
            }}
            title="Depth map hidden in JS — click 3 times to unlock"
          >
            <span className="font-mono text-base tracking-tighter">{"{ }"}</span>
            <span>Unlock depth map · 3 clicks</span>
          </button>
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <span key={i} className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i < unlockClicks ? "#2997ff" : "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: i < unlockClicks ? "0 0 8px #2997ff" : "none",
                }} />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Skill bars — 3 cols */}
          <div className="lg:col-span-3 space-y-8">
            {skillCategories.map((cat) => (
              <div key={cat.category}
                className="p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: "#111111",
                  border: `1px solid ${cat.color}22`,
                }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full"
                    style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                  <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: cat.color }}>
                    {cat.category}
                  </h3>
                </div>
                <div className="space-y-5">
                  {cat.skills.map((skill, i) => (
                    <SkillBar key={skill.name} {...skill}
                      color={cat.color} gradient={cat.gradient}
                      delay={i * 180} animate={inView} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Visual right panel — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Skill bubble map */}
            <div className="flex-1 rounded-2xl p-6 relative overflow-hidden min-h-72"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs text-[#3d3d3f] font-mono tracking-widest uppercase mb-4">
                Core Skills Radar
              </p>
              <div className="relative w-full h-64">
                {[1, 0.75, 0.5, 0.25].map((rr) => (
                  <div key={rr} className="absolute rounded-full"
                    style={{
                      width: `${rr * 100}%`, height: `${rr * 100}%`,
                      top: `${(1 - rr) * 50}%`, left: `${(1 - rr) * 50}%`,
                      border: "1px solid rgba(255,255,255,0.05)",
                    }} />
                ))}
                {[
                  { name: "Python",  level: 95, x: 50, y: 12, color: "#2997ff" },
                  { name: "SQL",     level: 91, x: 84, y: 33, color: "#74c2ff" },
                  { name: "RAG",     level: 88, x: 74, y: 74, color: "#ffd60a" },
                  { name: "PyTorch", level: 86, x: 28, y: 78, color: "#bf5af2" },
                  { name: "Scikit",  level: 92, x: 14, y: 44, color: "#30d158" },
                  { name: "LLMs",    level: 88, x: 50, y: 50, color: "#64d2ff" },
                ].map((skill) => {
                  const size = 30 + (skill.level - 80) * 1.6;
                  return (
                    <div key={skill.name}
                      className="absolute flex items-center justify-center rounded-full transition-transform hover:scale-110 cursor-default"
                      style={{
                        width: size, height: size,
                        left: `${skill.x}%`, top: `${skill.y}%`,
                        transform: "translate(-50%,-50%)",
                        background: `${skill.color}1a`,
                        border: `1px solid ${skill.color}50`,
                        boxShadow: `0 0 12px ${skill.color}30`,
                      }}
                      title={`${skill.name}: ${skill.level}%`}
                    >
                      <span className="text-[9px] font-bold text-white text-center leading-tight px-1">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tools grid */}
            <div className="rounded-2xl p-6"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs text-[#3d3d3f] font-mono tracking-widest uppercase mb-4">
                Tools & Frameworks
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "LangChain", tier: 1 }, { name: "FastAPI", tier: 1 },
                  { name: "HuggingFace", tier: 1 }, { name: "MLflow", tier: 1 },
                  { name: "Pandas", tier: 1 }, { name: "Gemini API", tier: 1 },
                  { name: "OpenAI API", tier: 1 }, { name: "Playwright", tier: 2 },
                  { name: "Docker", tier: 2 }, { name: "Azure ML", tier: 2 },
                  { name: "NumPy", tier: 1 }, { name: "FAISS", tier: 1 },
                  { name: "Jupyter", tier: 1 }, { name: "BeautifulSoup", tier: 2 },
                ].map((tool) => (
                  <span key={tool.name}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg transition-all hover:scale-105 cursor-default"
                    style={tool.tier === 1
                      ? { background: "rgba(41,151,255,0.08)", color: "#2997ff", border: "1px solid rgba(41,151,255,0.2)" }
                      : { background: "rgba(100,210,255,0.07)", color: "#64d2ff", border: "1px solid rgba(100,210,255,0.18)" }
                    }>
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden radar modal */}
      <SkillsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
