# Gnaneshwar Vanam — Portfolio

Personal portfolio website for **Gnaneshwar Vanam**, Senior Data Scientist based in London, UK. Built with Next.js 14, TypeScript, and Tailwind CSS. Deployed on Vercel.

**Live site:** [gnani4444/portfolio](https://github.com/gnani4444/portfolio)

---

## Overview

An Apple-inspired dark theme single-page portfolio showcasing 6.5+ years of production AI/ML experience. Key design choices:

- **Apple dark system** — `#000000` background, `#f5f5f7` primary text, `#2997ff` blue accent, `#ffd60a` gold for the featured certification
- **SF Pro font stack** — `-apple-system, SF Pro Display, SF Pro Text, Inter, Helvetica Neue`
- **Glassmorphism cards** — `rgba(255,255,255,0.04)` backgrounds with `backdrop-filter: blur`
- **Canvas particle network** — animated neural mesh in the hero, drawn with the Web Canvas API (no library)
- **Hidden skill depth map** — click the `{ }` button 3× to unlock a full SVG radar chart; scores live only in JS, never serialised into HTML
- **Scroll-triggered animations** — every section animates in via `react-intersection-observer`
- **Animated stat counters** — `react-countup` fires once on section enter
- **Typewriter hero subtitle** — `react-type-animation` cycles through four roles

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + custom CSS variables |
| Animations | `react-intersection-observer`, `react-type-animation`, `react-countup`, CSS keyframes |
| Charts | Pure SVG radar chart (no Chart.js) |
| Deployment | Vercel |
| Package manager | npm |

---

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Root layout — assembles all sections
│   │   ├── layout.tsx        # HTML shell, metadata
│   │   └── globals.css       # CSS custom properties, keyframes, utility classes
│   └── components/
│       ├── Navbar.tsx        # Fixed top nav, scroll-aware active link, mobile hamburger
│       ├── Hero.tsx          # Canvas particle animation, typewriter, stat row
│       ├── About.tsx         # Bio, animated stat counters, core stack cloud
│       ├── Experience.tsx    # Vertical timeline, two roles, highlight cards
│       ├── Projects.tsx      # Featured GiftVision card + two standard cards
│       ├── Certifications.tsx# Claude Certified Architect hero + 7 Coursera certs
│       ├── Skills.tsx        # Animated bars, tier labels, hidden radar modal
│       └── Contact.tsx       # Email CTA, availability grid, footer
├── public/                   # Static assets
├── tailwind.config.ts        # Apple colour tokens, custom animations
├── next.config.mjs           # Next.js config
├── vercel.json               # Vercel deployment + security headers
└── package.json
```

---

## Sections

### 01. About
Two-column layout. Left: bio copy with highlighted stack names and focus areas (agentic systems, RAG, LoRA/QLoRA fine-tuning, Azure MLOps). Right: animated stat counters in a 2×2 diagonal grid — `$10M+` and `15+` on one diagonal, `10K+` and `98%` on the other. Below the stats sits a core stack tag cloud: Python, PyTorch, TensorFlow, LangChain, FastAPI, MLflow, Azure, PySpark, SQL, Docker, Gemini, Claude API, OpenAI, HuggingFace, FAISS.

### 02. Experience
Vertical timeline with two roles:

**Senior Data Scientist** · 2022 – Present
- GenAI Data Quality Agent (Gemini 2.5 Pro, multi-turn agentic loop, FastAPI — 90% accuracy, 10K+ hours saved)
- Dynamic Pricing Model (LightGBM regression — $10M+ savings over 6 campaigns)
- Generative AI & Domain-Specific LLMs (LoRA/QLoRA fine-tuning, RAG, vector databases)
- Churn Prediction Model (XGBoost, 80% precision B2B pipeline)

**Data Scientist** · 2019 – 2022
- Predictive Healthcare Risk Modelling (XGBoost, Survival Analysis, SHAP — $15M savings in year one)
- Enterprise Reporting Automation (Python, SQL, Google Sheets API — $15K annual saving)
- Model Productionisation & MLOps (MLflow, Azure DevOps, Docker CI/CD)
- Analytics & ML Strategy Roadmap (3-year roadmap, Tableau, stakeholder management)

### 03. Personal Projects
**Featured — GiftVision** (live demo embedded via iframe with browser chrome):
- Gemini 3.0 Flash multimodal AI gift customisation platform
- Natural language input: "Add Taylor as Employee of the Year", "Happy Birthday Sarah"
- No editing software required; outputs ready for hardware production
- Live: https://v0-e-commerce-customization-platfor.vercel.app/

**More Projects:**
- Campaign Intelligence Platform — multi-turn GenAI agentic loop for telecom campaign extraction (FastAPI, LangChain, OpenAI/Gemini, SQLite)
- Agentic Job Discovery Engine — Playwright + Gemini scraper that reads/writes Google Sheets autonomously

### 04. Certifications
Gold-glowing hero card for **Claude Certified Architect** (Anthropic, April 2026) with an animated orbit of 6 skill labels (GenAI, LLM, MLOps, API, RAG, Arch) rotating around a central trophy badge. Verification link: https://verify.skilljar.com/c/xmdccbpd3j5i

Seven additional Coursera / DeepLearning.AI certifications displayed as compact cards:
- Natural Language Processing in TensorFlow (Jul 2020)
- NLP with Classification and Vector Spaces (Feb 2021)
- NLP with Probabilistic Models (Mar 2021)
- Sequences, Time Series and Prediction (Jun 2020)
- Convolutional Neural Networks in TensorFlow (Nov 2019)
- Introduction to TensorFlow for AI/ML/DL (Aug 2019)
- Machine Learning (Mar 2019)

### 05. Technical Skills
Four categories, each rendered as animated progress bars. Scores are stored only in JavaScript data — never serialised into HTML attributes or `data-*` values. After the bar animation completes, a tier badge fades in instead of a number:

| Tier | Score range |
|------|------------|
| 🔥 Expert | 92+ |
| ⚡ Advanced | 86–91 |
| ✦ Proficient | 80–85 |
| ◎ Solid | < 80 |

**Categories:**
- Languages & Data (blue `#2997ff`) — Python · SQL/SparkSQL · PySpark
- ML & Deep Learning (purple `#bf5af2`) — Scikit-learn/XGBoost/LightGBM · PyTorch · TensorFlow/Keras
- Generative AI & LLMs (gold `#ffd60a`) — Agentic Systems · Claude · Gemini · Prompt Engineering & RAG · LLM Fine-Tuning · Vector Databases
- MLOps & Cloud (green `#30d158`) — MLflow · Azure DevOps · CI/CD · Model Monitoring · Data Pipeline Automation

**Hidden depth map:** clicking the `{ } Unlock depth map · 3 clicks` button three times (with a 2.5 s reset timer) opens a modal with an animated SVG hexagonal radar chart across six axes — Python & SQL, Machine Learning, Deep Learning, Generative AI, MLOps & Cloud, Analytics.

### 06. Contact
Two-column card layout. Left: availability status (green pulse dot), location, and role labels. Right: email CTA (`vanamgnaneshwar@gmail.com`) with a 2×2 availability grid — Response Time `< 24h`, Time Zone `GMT (London)`, Work Style `Hybrid / Remote`, Start Date `Immediate`.

---

## Design System

### Colour Tokens (`globals.css` + `tailwind.config.ts`)

```css
--primary:        #2997ff;   /* Apple blue */
--primary-light:  #74c2ff;
--secondary:      #64d2ff;
--accent:         #ff9f0a;   /* Apple amber */
--gold:           #ffd60a;   /* Certification gold */
--green:          #30d158;
--purple:         #bf5af2;
--dark:           #000000;
--dark-card:      #111111;
--dark-border:    rgba(255,255,255,0.1);
--text-primary:   #f5f5f7;
--text-secondary: #86868b;
```

### Custom CSS Classes

| Class | Purpose |
|-------|---------|
| `.gradient-text` | Blue→cyan gradient fill on text |
| `.gradient-text-gold` | Gold→amber gradient fill |
| `.gradient-text-purple-cyan` | Purple→cyan (logo) |
| `.gradient-border` | Animated glowing border card |
| `.glass-card` | Frosted glass surface |
| `.glow-btn` | Button with animated blue glow |
| `.claude-glow` | Gold pulse shadow (certification card) |
| `.cursor-glow` | Mouse-following radial gradient orb |
| `.section-heading` | 2.5rem bold heading |
| `.skill-bar-fill` | Animated shimmer overlay on bar |
| `.modal-overlay` | Full-screen blurred backdrop |
| `.modal-box` | Centred modal container |

### Keyframe Animations

- `shimmer` — left→right gloss sweep on skill bars
- `gradientShift` — background-position oscillation
- `fadeIn` / `scaleIn` — modal entrance
- `claudePulse` — gold box-shadow breath on cert card
- `float` — vertical oscillation
- `glow` — blue box-shadow pulse

---

## Running Locally

```bash
cd portfolio
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint
```

No `.env` variables required — the site is fully static with no API routes.

---

## Deployment

Hosted on **Vercel**. Connected to `github.com/gnani4444/portfolio` — every push to `main` triggers an automatic deployment.

`vercel.json` sets `"framework": "nextjs"` and adds the following security headers on all routes: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`.

---

## Key Implementation Notes

**Canvas particle network** (`Hero.tsx`) — 120 particles with random velocity, bounce off edges. Pairs within 140 px are connected with lines at opacity `0.12 × (1 − dist/140)`. Drawn in a `requestAnimationFrame` loop; cleaned up on unmount.

**Hidden skill scores** — all numeric scores live in the `skillCategories` and `radarData` JS objects in `Skills.tsx`. The bar component receives `score` as a prop and converts it to a tier string before rendering. The number never appears in the DOM.

**Radar chart** — pure SVG, no Chart.js. Hexagonal ring grid drawn as `<path>` elements at ring fractions `[0.25, 0.5, 0.75, 1]`. Data polygon animated via `easeOutCubic` in a `requestAnimationFrame` loop over 1400 ms. Score mapping: `50–100 → 0.25–1` radius fraction.

**Orbit animation** (`Certifications.tsx`) — six `.orbit-dot` divs positioned via `transform: translate(cos·r, sin·r)` where angle increments by 0.3° per frame. All dots share radius `r=90` and are evenly spaced by `360/6 × index`.

**Stat counter diagonal** (`About.tsx`) — the 2×2 `grid-cols-2` grid renders in row-major order. Stats are ordered `[$10M+, 10K+, 15+, 98%]` so the two "10" values fall on positions (0,0) and (1,0)→(0,1) diagonally: top-left and bottom-right are the "large impact" numbers, top-right and bottom-left are the other two.
