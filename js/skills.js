/* ═══════════════════════════════════════════════════════════
   skills.js — Hidden skill scoring system
   ─────────────────────────────────────────────────────────
   All scores are stored ONLY in this JS object.
   Nothing is written into the HTML markup.
   Skill bars are fully rendered by this script.

   SECRET: Click the "{ } Scores live in JS · click 3×" button
   three times to unlock the full radar-chart analysis.
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── SKILLS DATA (scores hidden in JS, not in HTML) ────── */
const SKILLS = {
  categories: [
    {
      id: 'languages',
      name: 'Languages & Data',
      color: '#2997ff',
      gradient: 'linear-gradient(90deg, #2997ff, #74c2ff)',
      skills: [
        { name: 'Python',          score: 95, note: '6+ yrs' },
        { name: 'SQL',             score: 91, note: '6+ yrs' },
        { name: 'PySpark',         score: 78, note: '3+ yrs' },
      ],
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      color: '#bf5af2',
      gradient: 'linear-gradient(90deg, #bf5af2, #da8fff)',
      skills: [
        { name: 'Supervised Learning',    score: 93, note: '6+ yrs' },
        { name: 'XGBoost / LightGBM',     score: 90, note: '5+ yrs' },
        { name: 'Feature Engineering',    score: 92, note: '6+ yrs' },
        { name: 'Hyperparameter Tuning',  score: 87, note: '5+ yrs' },
        { name: 'Scikit-learn',           score: 91, note: '6+ yrs' },
      ],
    },
    {
      id: 'dlnlp',
      name: 'Deep Learning & NLP',
      color: '#30d158',
      gradient: 'linear-gradient(90deg, #30d158, #64d68a)',
      skills: [
        { name: 'TensorFlow / PyTorch',   score: 85, note: '4+ yrs' },
        { name: 'Transformers',           score: 88, note: '3+ yrs' },
        { name: 'NLP Pipelines',          score: 89, note: '4+ yrs' },
        { name: 'Text Classification',    score: 88, note: '4+ yrs' },
        { name: 'Topic Modelling',        score: 83, note: '3+ yrs' },
      ],
    },
    {
      id: 'genai',
      name: 'Generative AI & LLMs',
      color: '#ffd60a',
      gradient: 'linear-gradient(90deg, #ffd60a, #ff9f0a)',
      skills: [
        { name: 'LLM Fine-tuning (LoRA)', score: 88, note: '2+ yrs' },
        { name: 'RAG Systems',            score: 87, note: '2+ yrs' },
        { name: 'Prompt Engineering',     score: 93, note: '2+ yrs' },
        { name: 'Vector Databases (FAISS)',score: 84, note: '2+ yrs' },
        { name: 'LLM Evaluation',         score: 86, note: '2+ yrs' },
      ],
    },
    {
      id: 'mlops',
      name: 'MLOps & Cloud',
      color: '#ff453a',
      gradient: 'linear-gradient(90deg, #ff453a, #ff6961)',
      skills: [
        { name: 'MLflow',                 score: 83, note: '3+ yrs' },
        { name: 'Azure DevOps (CI/CD)',   score: 79, note: '2+ yrs' },
        { name: 'Model Monitoring',       score: 84, note: '3+ yrs' },
        { name: 'Data Pipelines',         score: 86, note: '5+ yrs' },
      ],
    },
    {
      id: 'analytics',
      name: 'Analytics & Strategy',
      color: '#64d2ff',
      gradient: 'linear-gradient(90deg, #64d2ff, #2997ff)',
      skills: [
        { name: 'Exploratory Data Analysis', score: 95, note: '6+ yrs' },
        { name: 'A/B Testing',               score: 88, note: '4+ yrs' },
        { name: 'Time Series Forecasting',   score: 85, note: '4+ yrs' },
        { name: 'Cohort Analysis',           score: 87, note: '4+ yrs' },
        { name: 'Product Analytics',         score: 89, note: '4+ yrs' },
      ],
    },
  ],

  /* Radar chart summary — one score per category */
  radar: {
    labels: [
      'Python & SQL',
      'Machine Learning',
      'Deep Learning & NLP',
      'Generative AI',
      'MLOps & Cloud',
      'Analytics & Strategy',
    ],
    scores: [92, 91, 87, 88, 83, 89],
  },
};

/* ─── Render all skill categories ───────────────────────── */
function renderSkills() {
  const container = document.getElementById('skillsContainer');
  if (!container) return;

  SKILLS.categories.forEach(cat => {
    const section = document.createElement('div');
    section.className = 'skills-category reveal-up';

    const title = document.createElement('div');
    title.className = 'skills-cat-title';
    title.textContent = cat.name;
    section.appendChild(title);

    const bars = document.createElement('div');
    bars.className = 'skills-bars';

    cat.skills.forEach(skill => {
      const wrap = document.createElement('div');
      wrap.className = 'skill-bar-wrap';

      const head = document.createElement('div');
      head.className = 'skill-bar-head';

      const nameEl = document.createElement('span');
      nameEl.className = 'skill-name';
      nameEl.textContent = skill.name;

      // Label intentionally empty — score stays hidden in JS
      // (screen reader hint: the value is loaded dynamically)
      const scoreEl = document.createElement('span');
      scoreEl.className = 'skill-score-label';
      scoreEl.setAttribute('aria-label', `${skill.score}% proficiency`);
      // We store the score in a data attribute, but don't render it visibly
      scoreEl.dataset.score = skill.score;

      head.appendChild(nameEl);
      head.appendChild(scoreEl);

      const track = document.createElement('div');
      track.className = 'skill-track';

      const fill = document.createElement('div');
      fill.className = 'skill-fill';
      fill.style.background = cat.gradient;
      // Score NOT written into width here — animated on scroll
      fill.dataset.target = skill.score;

      track.appendChild(fill);
      wrap.appendChild(head);
      wrap.appendChild(track);
      bars.appendChild(wrap);
    });

    section.appendChild(bars);
    container.appendChild(section);
  });

  // Trigger scroll-reveal on the new elements
  setTimeout(initSkillBarReveal, 50);
}

/* ─── Animate bars when scrolled into view ──────────────── */
function initSkillBarReveal() {
  // Reuse the global reveal observer for category blocks
  const items = document.querySelectorAll('.skills-category.reveal-up:not([data-observed])');
  items.forEach(el => el.setAttribute('data-observed', '1'));

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.skills-category').forEach(el => revealObs.observe(el));

  // Animate individual bars when their track enters the viewport
  const fillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill  = e.target;
        const score = parseInt(fill.dataset.target, 10);
        // Small stagger per sibling
        const idx   = [...fill.parentElement.parentElement.parentElement
          .querySelectorAll('.skill-fill')].indexOf(fill);
        setTimeout(() => {
          fill.style.width = score + '%';
          // Reveal score label after bar fills
          const label = fill.closest('.skill-bar-wrap')
            ?.querySelector('.skill-score-label');
          if (label) {
            setTimeout(() => {
              label.textContent = score + '%';
              label.style.transition = 'opacity 0.4s ease';
              label.style.opacity = '1';
            }, 900);
          }
        }, idx * 80);
        fillObs.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.skill-fill').forEach(el => {
    el.style.opacity = '0.9';
    const label = el.closest('.skill-bar-wrap')?.querySelector('.skill-score-label');
    if (label) { label.style.opacity = '0'; }
    fillObs.observe(el);
  });
}

/* ════════════════════════════════════════
   HIDDEN SKILLS RADAR — Click "{ }" 3×
════════════════════════════════════════ */
(function initSkillsUnlock() {
  const btn        = document.getElementById('skillsUnlockBtn');
  const modal      = document.getElementById('skillsModal');
  const backdrop   = document.getElementById('modalBackdrop');
  const closeBtn   = document.getElementById('modalClose');
  const dot1       = document.getElementById('ud1');
  const dot2       = document.getElementById('ud2');
  const dot3       = document.getElementById('ud3');
  const dots       = [dot1, dot2, dot3];
  if (!btn || !modal) return;

  let clickCount   = 0;
  let resetTimer   = null;
  let chartInstance = null;

  function lightDot(n) {
    for (let i = 0; i < n; i++) dots[i]?.classList.add('lit');
    for (let i = n; i < 3; i++) dots[i]?.classList.remove('lit');
  }

  function resetDots() {
    clickCount = 0;
    lightDot(0);
  }

  btn.addEventListener('click', () => {
    clearTimeout(resetTimer);
    clickCount++;
    lightDot(clickCount);
    // Animate button
    btn.style.transform = 'scale(0.92)';
    setTimeout(() => { btn.style.transform = ''; }, 150);

    if (clickCount >= 3) {
      resetDots();
      openModal();
    } else {
      resetTimer = setTimeout(resetDots, 2500);
    }
  });

  function openModal() {
    document.body.classList.add('modal-open');
    modal.classList.add('open');
    buildRadar();
    buildSkillList();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  if (closeBtn)   closeBtn.addEventListener('click', closeModal);
  if (backdrop)   backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ── Build Chart.js radar ─────────────────────────────── */
  function buildRadar() {
    if (chartInstance) return; // Only build once
    if (typeof Chart === 'undefined') return;

    const canvas = document.getElementById('radarChart');
    if (!canvas) return;

    // Apple-style chart colours
    const data   = SKILLS.radar.scores;
    const labels = SKILLS.radar.labels;

    Chart.defaults.color = '#86868b';
    Chart.defaults.font.family = "-apple-system,'SF Pro Text','Inter',sans-serif";

    chartInstance = new Chart(canvas, {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: 'Proficiency',
          data,
          fill: true,
          backgroundColor: 'rgba(41,151,255,0.12)',
          borderColor: '#2997ff',
          borderWidth: 2,
          pointBackgroundColor: '#2997ff',
          pointBorderColor: '#000',
          pointHoverBackgroundColor: '#74c2ff',
          pointRadius: 5,
          pointHoverRadius: 7,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 1200, easing: 'easeOutQuart' },
        scales: {
          r: {
            min: 50,
            max: 100,
            ticks: {
              stepSize: 10,
              color: '#3d3d3f',
              backdropColor: 'transparent',
              font: { size: 11 },
            },
            grid:       { color: 'rgba(255,255,255,0.06)' },
            angleLines: { color: 'rgba(255,255,255,0.06)' },
            pointLabels: {
              color: '#86868b',
              font: { size: 12, weight: '500' },
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.85)',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            titleColor: '#f5f5f7',
            bodyColor: '#86868b',
            callbacks: {
              label: ctx => ` ${ctx.parsed.r}% proficiency`,
            },
          },
        },
      },
    });
  }

  /* ── Build flat skill list inside modal ──────────────── */
  function buildSkillList() {
    const listEl = document.getElementById('modalSkillList');
    if (!listEl || listEl.childElementCount > 0) return; // Already built

    // Flatten all skills into one list sorted by score desc
    const all = SKILLS.categories.flatMap(cat =>
      cat.skills.map(s => ({ ...s, color: cat.color }))
    ).sort((a, b) => b.score - a.score);

    all.forEach(skill => {
      const item = document.createElement('div');
      item.className = 'modal-skill-item';

      const name = document.createElement('span');
      name.className = 'modal-skill-name';
      name.textContent = skill.name;

      const score = document.createElement('span');
      score.className = 'modal-skill-score';
      score.style.color = skill.color;
      score.textContent = skill.score + '%';

      item.appendChild(name);
      item.appendChild(score);
      listEl.appendChild(item);
    });
  }
})();

/* ─── Bootstrap ─────────────────────────────────────────── */
renderSkills();
