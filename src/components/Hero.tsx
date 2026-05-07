"use client";

import { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections — Apple subtle white/blue
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100,180,255,${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles — white with slight blue tint
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,225,255,${p.alpha * 0.7})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Radial gradient bg */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(41,151,255,0.07) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(100,210,255,0.05) 0%, transparent 65%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities · London, UK
        </div>

        {/* Name */}
        <h1
          className="font-black text-5xl md:text-7xl lg:text-8xl text-white mb-4 leading-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          Gnaneshwar{" "}
          <span className="gradient-text">Vanam</span>
        </h1>

        {/* Animated subtitle */}
        <div className="text-xl md:text-3xl text-slate-400 font-light mb-6 h-12 flex items-center justify-center">
          <TypeAnimation
            sequence={[
              "Senior Data Scientist",
              2000,
              "GenAI & LLM Engineer",
              2000,
              "MLOps Practitioner",
              2000,
              "AI Product Builder",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-slate-300 font-medium"
          />
        </div>

        {/* Description */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          6.5+ years building{" "}
          <span className="text-secondary">production AI/ML systems</span>,
          GenAI agents, and LLM pipelines that deliver measurable business
          impact and a <span className="text-secondary">Claude Certified Architect</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="glow-btn px-8 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300 hover:scale-105"
            style={{ background: '#2997ff', boxShadow: '0 4px 24px rgba(41,151,255,0.4)' }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', color: '#f5f5f7' }}
          >
            Get in Touch
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { value: "6.5+", label: "Years Experience" },
            { value: "15+", label: "Models Deployed" },
            { value: "$10M+", label: "Business Impact" },
            { value: "10K+", label: "Manual Hours Saved" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text-purple-cyan">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-slate-600 font-medium tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 border border-slate-600 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
