// sections.jsx — all narrative sections of the portfolio
// Loaded after utils.jsx; consumes window.{RichText, useReveal, PlaceholderArt}

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS } = React;

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ t, scrollProgress }) {
  const ref = useReveal();
  const blobRef = useRefS(null);
  useEffectS(() => {
    if (!blobRef.current) return;
    const ty = scrollProgress * 200;
    blobRef.current.style.transform = `translate3d(0, ${ty}px, 0)`;
  }, [scrollProgress]);

  return (
    <section className="section section--hero" id="top" data-screen-label="01 Hero">
      <div className="section-blob" ref={blobRef}
      style={{ top: "-200px", right: "-120px", width: "700px", height: "700px", opacity: 0.55 }} />
      <div className="hero" ref={ref}>
        <div className="hero__name">
          <div className="eyebrow reveal" style={{ marginBottom: "32px" }}>{t.hero.eyebrow}</div>
          <h1 className="display reveal">
            {t.hero.name[0]}
            <br />
            <em>{t.hero.name[1]}</em>
          </h1>
        </div>

        <div className="hero__meta reveal">
          <div className="meta">{t.hero.role}</div>
          <p className="hero__bio" style={{ marginTop: "20px" }}>{t.hero.bio}</p>
        </div>

        <div className="hero__sig reveal">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="27" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.6" />
            <circle cx="28" cy="28" r="2" fill="currentColor" />
            <path d="M28 5 v46 M5 28 h46" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.5" />
          </svg>
          <div className="meta" style={{ marginTop: "12px" }}>{t.hero.sig}</div>
        </div>
      </div>

      <div className="reveal" style={{ marginTop: "16vh", maxWidth: "780px" }}>
        <p className="lede" style={{ fontStyle: "italic", fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 3.5vw, 44px)", color: "var(--ink)", maxWidth: "20ch", lineHeight: 1.2 }}>
          {t.hero.manifesto}
        </p>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────────────────────
// PHILOSOPHY
// ─────────────────────────────────────────────────────────────────────────────
function Philosophy({ t }) {
  const ref = useReveal();
  return (
    <section className="section" id="philosophy" data-screen-label="02 Philosophy">
      <div className="philosophy" ref={ref}>
        <div>
          <div className="eyebrow reveal">{t.philosophy.eyebrow}</div>
          <h2 className="display philosophy__title reveal" style={{ marginTop: "24px" }}>
            <RichText parts={t.philosophy.title} />
          </h2>
        </div>
        <div>
          <div className="principles">
            {t.philosophy.principles.map((p, i) =>
            <div className="principle reveal" key={i}>
                <div className="principle__num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="principle__name"><RichText parts={p.name} /></div>
                  <p className="principle__body">{p.body}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────────────────────
// WORK + MODAL
// ─────────────────────────────────────────────────────────────────────────────
function Work({ t, lang, onOpen }) {
  const ref = useReveal();
  // 7 casos — row1: lg+md (12cols), row2: third×3 (12cols), row3: md+lg (12cols)
  const sizes    = ["case--lg","case--md","case--third","case--third","case--third","case--md","case--lg"];
  const variants = ["a","b","c","d","a","b","d"];
  return (
    <section className="section" id="work" data-screen-label="03 Work">
      <div className="section-blob" style={{ top: "10%", left: "-200px", opacity: 0.4 }} />
      <div className="work__head" ref={ref}>
        <div>
          <div className="eyebrow reveal">{t.work.eyebrow}</div>
          <h2 className="display reveal" style={{ marginTop: "24px" }}>
            <RichText parts={t.work.title} />
          </h2>
        </div>
        <p className="lede reveal">{t.work.lede}</p>
      </div>

      <div className="cases">
        {t.work.cases.map((c, i) =>
        <a key={c.id} className={`case reveal ${sizes[i]}`} data-cursor="hover"
        onClick={() => onOpen(c.id)}>
            <div className="case__visual">
              <CaseImage
                image={window.CASE_IMAGES?.[c.id]?.hero}
                lang={lang}
                fallbackPalette={c.palette}
                fallbackVariant={variants[i]}
                className="case-img--card"
              />
              <div className="case__overlay" />
            </div>
            <div className="case__info">
              <div>
                <div className="case__title"><RichText parts={c.title} /></div>
                <div className="case__role">{c.role}</div>
              </div>
              <div className="case__year">{c.year}</div>
            </div>
          </a>
        )}
      </div>
    </section>);

}

function CaseModal({ caseData, lang, onClose }) {
  const open = !!caseData;
  const modalRef = useRefS(null);
  const [activeSection, setActiveSection] = useStateS(null);

  useEffectS(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffectS(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // Reset active section when case changes
  useEffectS(() => { setActiveSection(null); }, [caseData?.id]);

  // Build nav sections dynamically from what exists for this case
  const sections = useMemoS(() => {
    if (!caseData) return [];
    const id = caseData.id;
    const imgs = window.CASE_IMAGES?.[id];
    const list = [
      { id: `${id}--ctx`,     es: "Contexto", en: "Context" },
      { id: `${id}--proc`,    es: "Proceso",  en: "Process" },
    ];
    if (imgs?.gallery?.length) list.push({ id: `${id}--gallery`, es: "Galería",  en: "Gallery" });
    if (imgs?.video)            list.push({ id: `${id}--demo`,    es: "Demo",     en: "Demo"    });
    list.push(                           { id: `${id}--outcome`,  es: "Impacto",  en: "Outcome" });
    return list;
  }, [caseData?.id]);

  // Scroll spy — observes sections within the modal scroll container
  useEffectS(() => {
    if (!open || !modalRef.current || !sections.length) return;
    const root = modalRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { root, threshold: 0, rootMargin: "-5% 0px -75% 0px" }
    );
    const frame = requestAnimationFrame(() => {
      sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
      if (sections.length) setActiveSection(sections[0].id);
    });
    return () => { obs.disconnect(); cancelAnimationFrame(frame); };
  }, [open, sections]);

  // Scroll-to helper within the modal container
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className={`modal-veil ${open ? "is-open" : ""}`} onClick={onClose} />
      <div className={`modal ${open ? "is-open" : ""}`} ref={modalRef}>
        {caseData && (
          <>
            <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
            <div className="modal__hero">
              <CaseImage
                image={window.CASE_IMAGES?.[caseData.id]?.hero}
                lang={lang}
                fallbackPalette={caseData.palette}
                fallbackVariant="a"
                className="case-img--hero"
              />
            </div>
            <div className="modal__body">
              {/* ── Columna izquierda: título + nav sticky ── */}
              <div className="modal__left">
                <div>
                  <div className="eyebrow" style={{ marginBottom: "12px" }}>{caseData.role} · {caseData.year}</div>
                  <h2 className="modal__title"><RichText parts={caseData.title} /></h2>
                  <p className="lede" style={{ marginTop: "32px" }}>{caseData.summary}</p>
                </div>
                {sections.length > 0 && (
                  <nav className="modal__nav" aria-label={lang === "en" ? "Case navigation" : "Navegación del caso"}>
                    {sections.map(s => (
                      <button
                        key={s.id}
                        className={`modal__nav-item${activeSection === s.id ? " is-active" : ""}`}
                        onClick={() => scrollTo(s.id)}
                      >
                        {lang === "en" ? s.en : s.es}
                      </button>
                    ))}
                  </nav>
                )}
              </div>
              {/* ── Columna derecha: secciones de contenido ── */}
              <div className="modal__right">
                <div className="modal__section" id={`${caseData.id}--ctx`}>
                  <h4>{lang === "en" ? "Context" : "Contexto"}</h4>
                  <p>{caseData.context}</p>
                </div>
                <div className="modal__section" id={`${caseData.id}--proc`}>
                  <h4>{lang === "en" ? "Process" : "Proceso"}</h4>
                  <p>{caseData.process}</p>
                </div>
                <CaseGallery
                  sectionId={`${caseData.id}--gallery`}
                  items={window.CASE_IMAGES?.[caseData.id]?.gallery}
                  palette={caseData.palette}
                  lang={lang}
                />
                {window.CASE_IMAGES?.[caseData.id]?.video && (() => {
                  const v = window.CASE_IMAGES[caseData.id].video;
                  return (
                    <div className="modal__section modal__section--video" id={`${caseData.id}--demo`}>
                      <h4>{lang === "en" ? v.label_en : v.label_es}</h4>
                      <div className="modal__video-wrap">
                        <iframe
                          src={`https://www.youtube.com/embed/${v.youtubeId}`}
                          title={lang === "en" ? v.label_en : v.label_es}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  );
                })()}
                <div className="modal__section" id={`${caseData.id}--outcome`}>
                  <h4>{lang === "en" ? "Outcome" : "Impacto"}</h4>
                  <p>{caseData.outcome}</p>
                  <div className="metrics">
                    {caseData.metrics.map((m, i) => (
                      <div key={i} className="metric">
                        <div className="metric__value">{m.value}</div>
                        <div className="metric__label">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS CONSTELLATION
// ─────────────────────────────────────────────────────────────────────────────
function Skills({ t }) {
  const ref = useReveal();
  // node positions in % of container
  const nodes = [
  // 4 anchors (big)
  { x: 28, y: 22, label: "Diseño UX/UI", size: "big", em: true }, // 0
  { x: 72, y: 22, label: "Estrategia", size: "big", em: true }, // 1
  { x: 28, y: 62, label: "Investigación", size: "big", em: true }, // 2
  { x: 72, y: 62, label: "Datos", size: "big", em: true }, // 3

  // mid satellites
  { x: 12, y: 11, label: "Figma", size: "mid" }, // 4
  { x: 50, y: 8, label: "Design Systems", size: "mid" }, // 5
  { x: 12, y: 35, label: "Brand thinking", size: "mid", em: true }, // 6
  { x: 88, y: 11, label: "Design Thinking", size: "mid" }, // 7
  { x: 62, y: 38, label: "Stakeholders", size: "mid" }, // 8
  { x: 50, y: 50, label: "Cultura", size: "mid", em: true }, // 9

  // small chips
  { x: 12, y: 56, label: "Pruebas de usabilidad", size: "sm" }, // 10
  { x: 14, y: 78, label: "A/B Testing", size: "sm" }, // 11
  { x: 88, y: 32, label: "Scrum", size: "sm" }, // 12
  { x: 86, y: 44, label: "Kanban", size: "sm" }, // 13
  { x: 88, y: 58, label: "Excel", size: "sm" }, // 14
  { x: 60, y: 78, label: "Claude", size: "sm" }, // 15
  { x: 76, y: 82, label: "Gemini", size: "sm" }, // 16
  { x: 90, y: 76, label: "n8n", size: "sm" }, // 17
  { x: 32, y: 92, label: "EN · B1", size: "sm" }, // 18
  { x: 48, y: 96, label: "FR · A1", size: "sm" } // 19
  ];
  // connection lines — drawn between node indices
  const links = [
  // Diseño UX/UI hub
  [0, 4], [0, 5], [0, 6], [0, 1], [0, 2], [0, 9],
  // Estrategia hub
  [1, 5], [1, 7], [1, 8], [1, 12], [1, 13], [1, 3],
  // Investigación hub
  [2, 10], [2, 11], [2, 9], [2, 3], [2, 6],
  // Datos · IA hub
  [3, 14], [3, 15], [3, 16], [3, 17], [3, 8],
  // bridges
  [7, 0], [12, 13], [15, 16], [16, 17],
  // languages tucked
  [18, 19], [18, 2]];

  return (
    <section className="section" id="skills" data-screen-label="04 Skills">
      <div className="work__head" ref={ref}>
        <div>
          <div className="eyebrow reveal">{t.skills.eyebrow}</div>
          <h2 className="display reveal" style={{ marginTop: "24px" }}>
            <RichText parts={t.skills.title} />
          </h2>
        </div>
        <p className="lede reveal">{t.skills.lede}</p>
      </div>

      <div className="constellation reveal">
        <svg viewBox="0 0 1000 640" preserveAspectRatio="none">
          {links.map(([a, b], i) => {
            const A = nodes[a],B = nodes[b];
            return <line key={i} x1={A.x * 10} y1={A.y * 6.4} x2={B.x * 10} y2={B.y * 6.4}
            stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.6" />;
          })}
        </svg>
        {nodes.map((n, i) =>
        <div key={i}
        className={`skill-node skill-node--${n.size}`}
        style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            {n.em ? <em>{n.label}</em> : n.label}
          </div>
        )}
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────────────────────
// PROCESS
// ─────────────────────────────────────────────────────────────────────────────
function Process({ t }) {
  const ref = useReveal();
  const steps = t.process.steps;
  // curve positions — gentle wave; ys are step positions on the curve (% from top)
  const ys = [70, 40, 60, 30, 55, 25];
  const emphasis = Math.floor(steps.length / 2); // which step is italicized
  return (
    <section className="section" id="process" data-screen-label="05 Process">
      <div className="section-blob" style={{ top: "-50px", right: "10%", opacity: 0.4 }} />
      <div className="work__head" ref={ref}>
        <div>
          <div className="eyebrow reveal">{t.process.eyebrow}</div>
          <h2 className="display reveal" style={{ marginTop: "24px" }}>
            <RichText parts={t.process.title} />
          </h2>
        </div>
        <p className="lede reveal">{t.process.lede}</p>
      </div>

      <div className="process__diagram reveal">
        <svg viewBox="0 0 1000 360" preserveAspectRatio="none">
          {(() => {
            const { d } = buildProcessPath(steps.length, ys);
            return <path d={d} stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" fill="none" strokeDasharray="2 5" />;
          })()}
        </svg>
        <ProcessFog stepsCount={steps.length} ys={ys} />
        {steps.map((s, i) => {
          const up = i % 2 === 0; // alternate label position
          const x = (80 + i * (840 / (steps.length - 1))) / 10;
          const y = ys[i];
          return (
            <div key={i} className={`process__step ${up ? "up" : "down"}`}
            style={{ left: `${x}%`, top: `${y}%` }}>
              {up ?
              <>
                  <div className="hint">{String(i + 1).padStart(2, "0")}</div>
                  <div className="name" style={{ padding: "0px" }}>{i === emphasis ? <em>{s}</em> : s}</div>
                  <div className="dot" />
                </> :

              <>
                  <div className="dot" />
                  <div className="name" style={{ backgroundColor: "rgb(244, 239, 233)", padding: "0px 0px 0px 8px" }}>{i === emphasis ? <em style={{ fontWeight: "600" }}>{s}</em> : s}</div>
                  <div className="hint">{String(i + 1).padStart(2, "0")}</div>
                </>
              }
            </div>);

        })}
      </div>
      {t.process.manifesto && (
        <p className="process__manifesto reveal">{t.process.manifesto}</p>
      )}
    </section>);

}

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────────────────────────────────────────
function Timeline({ t }) {
  const ref = useReveal();
  return (
    <section className="section" id="timeline" data-screen-label="06 Timeline">
      <div className="work__head" ref={ref}>
        <div>
          <div className="eyebrow reveal">{t.timeline.eyebrow}</div>
          <h2 className="display reveal" style={{ marginTop: "24px" }}>
            <RichText parts={t.timeline.title} />
          </h2>
        </div>
        <div />
      </div>
      <div className="timeline reveal">
        {t.timeline.items.map((it, i) =>
        <div className="tl-item reveal" key={i}>
            <div className="tl-when">{it.when}</div>
            <div>
              <div className="tl-role"><RichText parts={it.role} /></div>
              <div className="tl-co">{it.co}</div>
              <p className="tl-blurb">{it.blurb}</p>
            </div>
          </div>
        )}
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────────────────────
// PLAYGROUND
// ─────────────────────────────────────────────────────────────────────────────
function Playground({ t }) {
  const ref = useReveal();
  return (
    <section className="section" id="playground" data-screen-label="07 Playground">
      <div className="section-blob" style={{ bottom: "10%", left: "20%", opacity: 0.45 }} />
      <div className="work__head" ref={ref}>
        <div>
          <div className="eyebrow reveal">{t.playground.eyebrow}</div>
          <h2 className="display reveal" style={{ marginTop: "24px" }}>
            <RichText parts={t.playground.title} />
          </h2>
        </div>
        <p className="lede reveal">{t.playground.lede}</p>
      </div>

      <div className="playground">
        {t.playground.cards.map((c, i) =>
        <PlayCard key={i} title={c.title} cap={c.cap} variant={i} />
        )}
      </div>
    </section>);

}

function PlayCard({ title, cap, variant }) {
  const ref = useRefS(null);
  const [hover, setHover] = useStateS(false);
  const [pos, setPos] = useStateS({ x: 50, y: 50 });
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left) / r.width * 100, y: (e.clientY - r.top) / r.height * 100 });
  };
  const visuals = [
  // Card 0 — Details matter: color blob WITH breathing typography
  <div key="v0" style={{ position: "absolute", inset: 0 }}>
      <div style={{
      position: "absolute", inset: 0,
      background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, var(--blob-a), transparent 55%), radial-gradient(circle at ${100 - pos.x}% ${100 - pos.y}%, var(--blob-c), transparent 55%)`,
      filter: "blur(28px)", transition: "background 600ms ease"
    }} />
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
        <span style={{
        fontFamily: "var(--font-serif)", fontStyle: "italic",
        fontSize: "150px", color: "var(--ink)", opacity: 0.75,
        transform: `scale(${1 + (hover ? 0.06 : 0)})`,
        transition: "transform 1200ms cubic-bezier(.22,.61,.36,1)",
        mixBlendMode: "multiply"
      }}>aa</span>
      </div>
    </div>,

  // Card 1 — Branding as bridge: two clusters joined by a soft arc
  <div key="v1" style={{ position: "absolute", inset: 0 }}>
      <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
        <defs>
          <radialGradient id="bg-a" cx="20%" cy="50%" r="60%">
            <stop offset="0%" stopColor="var(--blob-a)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--blob-a)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bg-b" cx="80%" cy="50%" r="60%">
            <stop offset="0%" stopColor="var(--blob-c)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--blob-c)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="140" r="70" fill="url(#bg-a)" />
        <circle cx="320" cy="140" r="70" fill="url(#bg-b)" />
        <circle cx="80" cy="140" r="14" fill="var(--ink)" />
        <circle cx="320" cy="140" r="14" fill="var(--ink)" />
        <path d={`M 96 140 Q 200 ${80 + (hover ? -10 : 10)}, 304 140`} stroke="var(--ink)" strokeWidth="1" fill="none" strokeDasharray="3 4" style={{ transition: "d 800ms ease" }} />
        <text x="60" y="180" fontSize="9" fontFamily="var(--font-mono)" fill="var(--ink-mute)" letterSpacing="1.5">PERSONA</text>
        <text x="285" y="180" fontSize="9" fontFamily="var(--font-mono)" fill="var(--ink-mute)" letterSpacing="1.5">MERCADO</text>
      </svg>
    </div>,

  // Card 2 — Claude + n8n: reactive mesh of dots
  <div key="v2" style={{ position: "absolute", inset: 0 }}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        {[...Array(80)].map((_, i) => {
        const cx = i % 10 * 40 + 20;
        const cy = Math.floor(i / 10) * 40 + 20;
        const dx = cx - pos.x / 100 * 400;
        const dy = cy - pos.y / 100 * 300;
        const d = Math.sqrt(dx * dx + dy * dy);
        const r = Math.max(1, 4 - d / 60);
        return <circle key={i} cx={cx} cy={cy} r={r} fill="var(--accent)" opacity={0.5} />;
      })}
      </svg>
    </div>,

  // Card 3 — Hand-drawn iteration arc: idea → fail → iter
  <div key="v3" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
      <svg viewBox="0 0 360 220" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" fill="none">
        <path d="M 30 160 Q 100 60, 180 130 T 320 80" stroke="var(--ink-soft)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <circle cx="30" cy="160" r="3" fill="var(--ink)" />
        <circle cx="180" cy="130" r="3" fill="var(--ink)" />
        <path d="M 312 85 L 322 78 L 320 90" stroke="var(--ink-soft)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <text x="20" y="185" fill="var(--ink-mute)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.2">IDEA</text>
        <text x="160" y="155" fill="var(--ink-mute)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.2">FAIL</text>
        <text x="280" y="65" fill="var(--accent)" fontSize="12" fontFamily="var(--font-serif)" fontStyle="italic">iterar</text>
      </svg>
    </div>];

  return (
    <div className="play-card reveal" ref={ref}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    onMouseMove={onMove}>
      {visuals[variant]}
      <div className="play-card__cap">{cap}</div>
      <div className="play-card__title"><RichText parts={title} /></div>
    </div>);

}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────────────────
function Contact({ t }) {
  const ref = useReveal();
  return (
    <section className="section contact" id="contact" data-screen-label="08 Contact">
      <div className="section-blob" style={{ top: "20%", left: "50%", transform: "translateX(-50%)", opacity: 0.5 }} />
      <div ref={ref}>
        <div className="eyebrow reveal" style={{ marginBottom: "32px" }}>{t.contact.eyebrow}</div>
        <h2 className="contact__title reveal">
          <RichText parts={t.contact.title} />
        </h2>
        <p className="lede reveal" style={{ margin: "40px auto 0", textAlign: "center" }}>{t.contact.lede}</p>
        <a className="contact__email reveal" href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
        <div className="contact__row reveal">
          <a href={`https://${t.contact.linkedin}`} target="_blank" rel="noreferrer">{t.contact.linkedin}</a>
          <span>{t.contact.phone}</span>
          <span>{t.contact.location}</span>
        </div>
        <a
          className="contact__cv reveal"
          href={t.contact.cv.file}
          download={t.contact.cv.filename}
          aria-label={`${t.contact.cv.label} ${t.contact.cv.em}`}>
          
          <span className="contact__cv-arrow" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 3.5 V14.5" />
              <path d="M5.5 9 L11 14.5 L16.5 9" />
              <path d="M4 18 H18" />
            </svg>
          </span>
          <span className="contact__cv-label">
            {t.contact.cv.label} <em>{t.contact.cv.em}</em>
          </span>
          <span className="contact__cv-hint">{t.contact.cv.hint}</span>
        </a>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────────────────────────
// CASE GALLERY — asymmetric grid shown inside the case modal between
// Proceso and Impacto. Each item is a CaseImage; size controls span/ratio.
// ─────────────────────────────────────────────────────────────────────────────
function CaseGallery({ items, palette, lang, sectionId }) {
  if (!items || items.length === 0) return null;
  const variants = ["a", "b", "c", "d"];
  return (
    <div className="modal__section modal__section--gallery" id={sectionId}>
      <h4>{lang === "en" ? "Gallery" : "Galería"}</h4>
      <div className="modal__gallery">
        {items.map((it, i) => (
          <figure key={i} className={`mg-item mg-item--${it.size || "md"}`}>
            <CaseImage
              image={it}
              lang={lang}
              fallbackPalette={palette}
              fallbackVariant={variants[i % 4]}
            />
            {it.download && (
              <a
                className="mg-item__download"
                href={it.download.href}
                {...(it.download.open
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : { download: it.download.label })}
                onClick={e => e.stopPropagation()}
                aria-label={it.download.label}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  {it.download.open
                    ? <path d="M10.5 7.5v3h-8v-8h3M8 1h4v4M5.5 7.5L12 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    : <path d="M6.5 1v8M3 6.5l3.5 3.5 3.5-3.5M1 11.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  }
                </svg>
                <span>{it.download.label}</span>
              </a>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Hero, Philosophy, Work, CaseModal, CaseGallery, Skills, Process, Timeline, Playground, Contact });