// ====== Background (particles + lines) ======
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d", { alpha: true });

let W, H, DPR;
const particles = [];
const N = 70;

function resize(){
  DPR = Math.min(2, window.devicePixelRatio || 1);
  W = Math.floor(window.innerWidth);
  H = Math.floor(window.innerHeight);
  canvas.width = Math.floor(W * DPR);
  canvas.height = Math.floor(H * DPR);
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
window.addEventListener("resize", resize);
resize();

function rand(min, max){ return Math.random() * (max - min) + min; }

function seed(){
  particles.length = 0;
  for(let i=0;i<N;i++){
    particles.push({
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-0.15, 0.15),
      vy: rand(-0.12, 0.12),
      r: rand(1.0, 2.2),
      a: rand(0.12, 0.30),
    });
  }
}
seed();

function step(){
  ctx.clearRect(0,0,W,H);

  // subtle grid
  ctx.globalAlpha = 0.10;
  ctx.lineWidth = 1;
  for(let x=0; x<W; x+=64){
    ctx.strokeStyle = "rgba(90,107,58,0.18)";
    ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke();
  }
  for(let y=0; y<H; y+=64){
    ctx.strokeStyle = "rgba(90,107,58,0.16)";
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // particles
  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.x < -10) p.x = W + 10;
    if(p.x > W + 10) p.x = -10;
    if(p.y < -10) p.y = H + 10;
    if(p.y > H + 10) p.y = -10;

    ctx.fillStyle = `rgba(199,168,90,${p.a * 0.35})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
  }

  // connect lines
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if(d < 140){
        const alpha = (1 - d/140) * 0.18;
        ctx.strokeStyle = `rgba(90,107,58,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(step);
}
step();

// ====== i18n (EN/ES) ======
const I18N = {
  es: {
    "brand.sub": "DSP Operating System",

    "nav.services": "Servicios",
    "nav.dogma": "DOGMA",
    "nav.roadmap": "Roadmap",

    "top.copyLinks": "Copiar Links",
    "top.access": "Acceder al Dashboard",

    "hero.kicker": `<span class="dot"></span> Internal Build • A&A Xpress Edition`,
    "hero.title": `Control total de tu DSP, <span class="olive">sin caos</span>.`,
    "hero.lead": `DOGMA AI centraliza <b>datos</b>, <b>operaciones</b> y <b>automatización</b> en un solo HQ digital: scorecards, dispatch, fleet, coaching y alertas inteligentes.`,
    "hero.ctaModules": "Ver módulos",
    "hero.ctaDogma": "¿Qué es DOGMA?",
    "hero.badge1": "⚙️ Operaciones diarias",
    "hero.badge2": "📊 Scorecards & Analytics",
    "hero.badge3": "🚨 Alertas & Rescues",
    "hero.badge4": "🛡️ Safety Culture",

    "panel.title": "DOGMA HQ / STATUS",
    "panel.systemLabel": "Sistema",
    "panel.systemValue": `<span class="pill ok"></span> ONLINE`,
    "panel.modeLabel": "Modo",
    "panel.modeValue": "INTERNAL • DSP",
    "panel.focusLabel": "Focus",
    "panel.focusValue": "SPEED + QUALITY",

    "mini.scorecardTitle": "Scorecard",
    "mini.scorecardSub": "Drivers • Quality • Trends",
    "mini.dispatchTitle": "Dispatch",
    "mini.dispatchSub": "Waves • Rescues • Risk",
    "mini.fleetTitle": "Fleet",
    "mini.fleetSub": "DVIC • Maint • Tools",
    "mini.assistantTitle": "AI Assistant",
    "mini.assistantSub": "SOP • Decisions • Summaries",

    "term.l1": `<span class="term-dim">dogma@hq</span>:<span class="term-olive">~</span>$ boot --mode=dsp`,
    "term.l2": `<span class="term-dim">[OK]</span> modules loaded: scorecard, dispatch, fleet, drivers`,
    "term.l3": `<span class="term-dim">[OK]</span> alerts engine armed`,
    "term.l4": `<span class="term-dim">[READY]</span> awaiting input…<span class="cursor">█</span>`,

    "sig.text": "MIL-SPEC UI • OLIVE/BLACK • ELITE OPS",

    "modules.title": "Servicios / WebApps",
    "modules.desc": "Estas tarjetas son puertas a cada módulo. Por ahora, los links pueden apuntar a tus rutas internas.",
    "cards.open": "Abrir →",

    "tag.data": "DATA",
    "tag.ops": "OPS",
    "tag.management": "GESTIÓN",
    "tag.culture": "CULTURA",
    "tag.risk": "RISK",
    "tag.ai": "AI",
    "tag.money": "MONEY",
    "tag.auto": "AUTO",

    "pill.quality": "Quality",
    "pill.safety": "Safety",
    "pill.performance": "Performance",
    "pill.waves": "Waves",
    "pill.rescues": "Rescues",
    "pill.live": "Live",
    "pill.dvic": "DVIC",
    "pill.maint": "Maint",
    "pill.breakdowns": "Breakdowns",
    "pill.coaching": "Coaching",
    "pill.tiers": "Tiers",
    "pill.rewards": "Rewards",
    "pill.alerts": "Alerts",
    "pill.predict": "Predict",
    "pill.trends": "Trends",
    "pill.sop": "SOP",
    "pill.summaries": "Summaries",
    "pill.decisions": "Decisions",
    "pill.bonuses": "Bonuses",
    "pill.cost": "Cost",
    "pill.forecast": "Forecast",
    "pill.pdf": "PDF",
    "pill.email": "Email",
    "pill.daily": "Daily",

    "cards.scorecard.title": "Scorecard Intelligence",
    "cards.scorecard.desc": "Scorecards dinámicos, tendencias, impacto de penalizaciones, top performers y focus areas.",

    "cards.dispatch.title": "Dispatch & Route Control",
    "cards.dispatch.desc": "Waves, standbys, rescues, risk flags y control operativo en tiempo real.",

    "cards.fleet.title": "Fleet Management",
    "cards.fleet.desc": "DVIC, mantenimiento, breakdowns, historial por van y control de herramientas.",

    "cards.drivers.title": "Driver Intelligence",
    "cards.drivers.desc": "Tiers, coaching log, write-ups, reconocimiento semanal y performance notes.",

    "cards.cortex.title": "Cortex Analyzer",
    "cards.cortex.desc": "Red flags, simulación de impacto, alertas de calidad y riesgo operativo.",

    "cards.assistant.title": "AI Assistant (Internal GPT)",
    "cards.assistant.desc": "SOP Q&A, resúmenes, soporte a decisiones, incident analysis y mensajes.",

    "cards.finance.title": "Bonus & Cost Projection",
    "cards.finance.desc": "Fantastic+ tracking, costos, proyecciones y simuladores (salario vs hourly).",

    "cards.reports.title": "Reports & Comms Automation",
    "cards.reports.desc": "Opening notes, PDFs automáticos, correos a management y resúmenes diarios.",

    "callout.title": "Modo interno hoy. SaaS mañana.",
    "callout.text": "Estructura lista para crecer: cada módulo puede ser una sub-app independiente dentro del mismo dominio.",

    "dogma.title": "¿Qué significa DOGMA?",
    "dogma.desc": "Tu fórmula del “piloto automático DSP”.",
    "dogma.d.title": "Datos",
    "dogma.d.text": "Scorecards, métricas, asistencia, rescates, calidad.",
    "dogma.o.title": "Operaciones",
    "dogma.o.text": "Rosters, apertura, waves, dispatch, control diario.",
    "dogma.g.title": "Gestión",
    "dogma.g.text": "Drivers, vans, licencias, mantenimiento, reportes.",
    "dogma.m.title": "Motivación",
    "dogma.m.text": "Reconocimientos, coaching, cultura, comunicación.",
    "dogma.a.title": "Automatización",
    "dogma.a.text": "IA + Workspace + alertas + reportes automáticos.",

    "roadmap.title": "Roadmap (Internal)",
    "roadmap.desc": "Una ruta simple: primero estabilidad, luego escalado.",
    "roadmap.p1.title": "Fase 1 — Centralización",
    "roadmap.p1.text": "Landing + links + autenticación básica + módulos en rutas.",
    "roadmap.p2.title": "Fase 2 — Automatización",
    "roadmap.p2.text": "Alertas, PDFs, reporting, y motor de rescues.",
    "roadmap.p3.title": "Fase 3 — Producto MVP",
    "roadmap.p3.text": "Multi-DSP, permisos por roles, onboarding y pricing.",

    "footer.left": `© <span id="year"></span> DOGMA AI • Internal Build • Jacksonville, FL`,
    "footer.r1": "MIL-TECH UI",
    "footer.r2": "OLIVE/BLACK",

    "toast.copied": "Links copiados ✅",
    "toast.copyFail": "No pude copiar (permiso del navegador) ❌",
    "toast.route": (href) => `Abriendo: ${href}`
  },

  en: {
    "brand.sub": "DSP Operating System",

    "nav.services": "Services",
    "nav.dogma": "DOGMA",
    "nav.roadmap": "Roadmap",

    "top.copyLinks": "Copy Links",
    "top.access": "Access Dashboard",

    "hero.kicker": `<span class="dot"></span> Internal Build • A&A Xpress Edition`,
    "hero.title": `Total control of your DSP, <span class="olive">no chaos</span>.`,
    "hero.lead": `DOGMA AI centralizes <b>data</b>, <b>operations</b>, and <b>automation</b> into one digital HQ: scorecards, dispatch, fleet, coaching, and smart alerts.`,
    "hero.ctaModules": "View modules",
    "hero.ctaDogma": "What is DOGMA?",
    "hero.badge1": "⚙️ Daily operations",
    "hero.badge2": "📊 Scorecards & Analytics",
    "hero.badge3": "🚨 Alerts & Rescues",
    "hero.badge4": "🛡️ Safety Culture",

    "panel.title": "DOGMA HQ / STATUS",
    "panel.systemLabel": "System",
    "panel.systemValue": `<span class="pill ok"></span> ONLINE`,
    "panel.modeLabel": "Mode",
    "panel.modeValue": "INTERNAL • DSP",
    "panel.focusLabel": "Focus",
    "panel.focusValue": "SPEED + QUALITY",

    "mini.scorecardTitle": "Scorecard",
    "mini.scorecardSub": "Drivers • Quality • Trends",
    "mini.dispatchTitle": "Dispatch",
    "mini.dispatchSub": "Waves • Rescues • Risk",
    "mini.fleetTitle": "Fleet",
    "mini.fleetSub": "DVIC • Maint • Tools",
    "mini.assistantTitle": "AI Assistant",
    "mini.assistantSub": "SOP • Decisions • Summaries",

    "term.l1": `<span class="term-dim">dogma@hq</span>:<span class="term-olive">~</span>$ boot --mode=dsp`,
    "term.l2": `<span class="term-dim">[OK]</span> modules loaded: scorecard, dispatch, fleet, drivers`,
    "term.l3": `<span class="term-dim">[OK]</span> alerts engine armed`,
    "term.l4": `<span class="term-dim">[READY]</span> awaiting input…<span class="cursor">█</span>`,

    "sig.text": "MIL-SPEC UI • OLIVE/BLACK • ELITE OPS",

    "modules.title": "Services / WebApps",
    "modules.desc": "Each card is a gateway to a module. For now, links can point to your internal routes.",
    "cards.open": "Open →",

    "tag.data": "DATA",
    "tag.ops": "OPS",
    "tag.management": "MGMT",
    "tag.culture": "CULTURE",
    "tag.risk": "RISK",
    "tag.ai": "AI",
    "tag.money": "MONEY",
    "tag.auto": "AUTO",

    "pill.quality": "Quality",
    "pill.safety": "Safety",
    "pill.performance": "Performance",
    "pill.waves": "Waves",
    "pill.rescues": "Rescues",
    "pill.live": "Live",
    "pill.dvic": "DVIC",
    "pill.maint": "Maint",
    "pill.breakdowns": "Breakdowns",
    "pill.coaching": "Coaching",
    "pill.tiers": "Tiers",
    "pill.rewards": "Rewards",
    "pill.alerts": "Alerts",
    "pill.predict": "Predict",
    "pill.trends": "Trends",
    "pill.sop": "SOP",
    "pill.summaries": "Summaries",
    "pill.decisions": "Decisions",
    "pill.bonuses": "Bonuses",
    "pill.cost": "Cost",
    "pill.forecast": "Forecast",
    "pill.pdf": "PDF",
    "pill.email": "Email",
    "pill.daily": "Daily",

    "cards.scorecard.title": "Scorecard Intelligence",
    "cards.scorecard.desc": "Dynamic scorecards, trends, penalty impact, top performers, and focus areas.",

    "cards.dispatch.title": "Dispatch & Route Control",
    "cards.dispatch.desc": "Waves, standbys, rescues, risk flags, and real-time ops control.",

    "cards.fleet.title": "Fleet Management",
    "cards.fleet.desc": "DVIC, maintenance, breakdowns, van history, and tool control.",

    "cards.drivers.title": "Driver Intelligence",
    "cards.drivers.desc": "Tiers, coaching logs, write-ups, weekly recognition, and performance notes.",

    "cards.cortex.title": "Cortex Analyzer",
    "cards.cortex.desc": "Red flags, impact simulation, quality alerts, and operational risk.",

    "cards.assistant.title": "AI Assistant (Internal GPT)",
    "cards.assistant.desc": "SOP Q&A, summaries, decision support, incident analysis, and messaging.",

    "cards.finance.title": "Bonus & Cost Projection",
    "cards.finance.desc": "Fantastic+ tracking, costs, projections, and salary vs hourly simulators.",

    "cards.reports.title": "Reports & Comms Automation",
    "cards.reports.desc": "Opening notes, auto PDFs, management emails, and daily briefings.",

    "callout.title": "Internal today. SaaS tomorrow.",
    "callout.text": "Built to scale: each module can become an independent sub-app under the same domain.",

    "dogma.title": "What does DOGMA mean?",
    "dogma.desc": "Your “DSP autopilot” formula.",
    "dogma.d.title": "Data",
    "dogma.d.text": "Scorecards, metrics, attendance, rescues, quality.",
    "dogma.o.title": "Operations",
    "dogma.o.text": "Rosters, opening, waves, dispatch, daily control.",
    "dogma.g.title": "Management",
    "dogma.g.text": "Drivers, vans, licenses, maintenance, reporting.",
    "dogma.m.title": "Motivation",
    "dogma.m.text": "Recognition, coaching, culture, communication.",
    "dogma.a.title": "Automation",
    "dogma.a.text": "AI + Workspace + alerts + automated reports.",

    "roadmap.title": "Roadmap (Internal)",
    "roadmap.desc": "Simple path: stabilize first, then scale.",
    "roadmap.p1.title": "Phase 1 — Centralization",
    "roadmap.p1.text": "Landing + links + basic auth + modules on routes.",
    "roadmap.p2.title": "Phase 2 — Automation",
    "roadmap.p2.text": "Alerts, PDFs, reporting, and a rescues engine.",
    "roadmap.p3.title": "Phase 3 — MVP Product",
    "roadmap.p3.text": "Multi-DSP, role permissions, onboarding, and pricing.",

    "footer.left": `© <span id="year"></span> DOGMA AI • Internal Build • Jacksonville, FL`,
    "footer.r1": "MIL-TECH UI",
    "footer.r2": "OLIVE/BLACK",

    "toast.copied": "Links copied ✅",
    "toast.copyFail": "Couldn't copy (browser permission) ❌",
    "toast.route": (href) => `Opening: ${href}`
  }
};

function detectLang(){
  const saved = localStorage.getItem("dogma_lang");
  if(saved === "es" || saved === "en") return saved;
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("es") ? "es" : "en";
}

function setLang(lang){
  localStorage.setItem("dogma_lang", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll(".lang-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = I18N[lang]?.[key];
    if(val === undefined) return;
    el.innerHTML = val;
  });

  // ensure year stays correct even if footer HTML resets it
  const yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();
}

// hook language buttons
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

// init
setLang(detectLang());

// ====== Cards click routing ======
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const href = card.getAttribute("data-href");
    const lang = localStorage.getItem("dogma_lang") || detectLang();

    // If you want to preview instead of navigating, comment next line and use toast only.
    window.location.href = href;

    // Optional toast (will flash briefly before navigation in fast connections)
    toast(I18N[lang]["toast.route"](href));
  });
});

// Mini cards in panel (scroll to modules + optional toast)
document.querySelectorAll(".mini-card").forEach(a => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const lang = localStorage.getItem("dogma_lang") || detectLang();
    toast(I18N[lang]["toast.route"](a.dataset.route));
    document.querySelector("#modules")?.scrollIntoView({ behavior:"smooth" });
  });
});

// Copy routes helper
const btnCopy = document.getElementById("btnCopy");
btnCopy?.addEventListener("click", async () => {
  const base = window.location.origin || "https://dogma-ai.com";
  const routes = ["/scorecard","/dispatch","/fleet","/drivers","/cortex","/assistant","/finance","/reports"]
    .map(r => `${base}${r}`).join("\n");

  const lang = localStorage.getItem("dogma_lang") || detectLang();

  try{
    await navigator.clipboard.writeText(routes);
    toast(I18N[lang]["toast.copied"]);
  }catch{
    toast(I18N[lang]["toast.copyFail"]);
  }
});

// Year (initial)
document.getElementById("year").textContent = new Date().getFullYear();

// Tiny toast
let toastTimer;
function toast(msg){
  clearTimeout(toastTimer);
  let el = document.getElementById("toast");
  if(!el){
    el = document.createElement("div");
    el.id = "toast";
    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.bottom = "18px";
    el.style.transform = "translateX(-50%)";
    el.style.padding = "10px 14px";
    el.style.borderRadius = "14px";
    el.style.fontFamily = `"IBM Plex Mono", monospace`;
    el.style.fontSize = "12px";
    el.style.color = "rgba(245,248,245,.92)";
    el.style.background = "rgba(10,12,10,.72)";
    el.style.border = "1px solid rgba(90,107,58,.25)";
    el.style.backdropFilter = "blur(10px)";
    el.style.boxShadow = "0 18px 30px rgba(0,0,0,.45)";
    el.style.zIndex = 9999;
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  toastTimer = setTimeout(() => { el.style.opacity = "0"; }, 1600);
}
