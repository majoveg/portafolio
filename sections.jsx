// sections.jsx — all narrative sections of the portfolio
// Loaded after utils.jsx; consumes window.{RichText, useReveal, PlaceholderArt}

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS, useCallback: useCallbackS } = React;

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
        <button key={c.id} className={`case reveal ${sizes[i]}`} data-cursor="hover"
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
          </button>
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
                  const posterSrc = v.poster ? v.poster + ".png" : undefined;
                  return (
                    <div className="modal__section modal__section--video" id={`${caseData.id}--demo`}>
                      <h4>{lang === "en" ? v.label_en : v.label_es}</h4>
                      <div className="modal__video-wrap">
                        {v.src ? (
                          <video
                            src={v.src + ".mp4"}
                            poster={posterSrc}
                            controls
                            preload="metadata"
                            playsInline
                          />
                        ) : (
                          <iframe
                            src={`https://www.youtube.com/embed/${v.youtubeId}`}
                            title={lang === "en" ? v.label_en : v.label_es}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
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
  // Positions/sizes are layout data; labels come from t.skills.nodeLabels for i18n
  const nodes = [
    { x: 28, y: 22, size: "big", em: true },  // 0
    { x: 72, y: 22, size: "big", em: true },  // 1
    { x: 28, y: 62, size: "big", em: true },  // 2
    { x: 72, y: 62, size: "big", em: true },  // 3
    { x: 12, y: 11, size: "mid" },            // 4
    { x: 50, y: 8,  size: "mid" },            // 5
    { x: 12, y: 35, size: "mid", em: true },  // 6
    { x: 88, y: 11, size: "mid" },            // 7
    { x: 62, y: 38, size: "mid" },            // 8
    { x: 50, y: 50, size: "mid", em: true },  // 9
    { x: 12, y: 56, size: "sm" },             // 10
    { x: 14, y: 78, size: "sm" },             // 11
    { x: 88, y: 32, size: "sm" },             // 12
    { x: 86, y: 44, size: "sm" },             // 13
    { x: 88, y: 58, size: "sm" },             // 14
    { x: 60, y: 78, size: "sm" },             // 15
    { x: 76, y: 82, size: "sm" },             // 16
    { x: 90, y: 76, size: "sm" },             // 17
    { x: 32, y: 92, size: "sm" },             // 18
    { x: 48, y: 96, size: "sm" },             // 19
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
            {n.em ? <em>{t.skills.nodeLabels[i]}</em> : t.skills.nodeLabels[i]}
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
                  <div className="name" style={{ backgroundColor: "var(--bg)", padding: "0px 0px 0px 8px" }}>{i === emphasis ? <em style={{ fontWeight: "600" }}>{s}</em> : s}</div>
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
      <div className="playground-marquee">
        <div className="playground-track">
          <div className="playground-set">
            {t.playground.cards.map((c, i) =>
              <PlayCard key={i} uid={`a${i}`} title={c.title} cap={c.cap} variant={i} pdf={c.pdf || null} />
            )}
          </div>
          <div className="playground-set" aria-hidden="true">
            {t.playground.cards.map((c, i) =>
              <PlayCard key={`b${i}`} uid={`b${i}`} title={c.title} cap={c.cap} variant={i} pdf={c.pdf || null} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayCard({ title, cap, variant, uid = "x", pdf = null }) {
  const ref = useRefS(null);
  const [hover, setHover] = useStateS(false);
  const [pos, setPos] = useStateS({ x: 50, y: 50 });

  const onMove = useCallbackS((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left) / r.width * 100, y: (e.clientY - r.top) / r.height * 100 });
  }, []);

  const visuals = useMemoS(() => [
    // v0 — Los detalles importan: warm gradient + contrasting Aa typography
    <div key="v0" style={{ position: "absolute", inset: 0 }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, var(--blob-a), transparent 55%), radial-gradient(circle at ${100-pos.x}% ${100-pos.y}%, var(--blob-c), transparent 55%)`,
        filter: "blur(28px)", transition: "background 600ms ease"
      }} />
      <svg viewBox="0 0 400 300" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <text x="18" y="268" fontSize="240" fontFamily="var(--font-serif)" fontStyle="italic" fontWeight="300"
          fill="var(--ink)" opacity="0.45">A</text>
        <text x="185" y="258" fontSize="200" fontFamily="var(--font-sans)" fontWeight="700"
          fill="var(--ink)" opacity="0.72"
          style={{ transition: "transform 1200ms cubic-bezier(.22,.61,.36,1)",
                   transform: hover ? "scale(1.06)" : "scale(1)", transformOrigin: "260px 200px" }}>a</text>
      </svg>
    </div>,

    // v1 — Agentes con Claude + n8n: minimal node workflow tree
    <div key="v1" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
      <svg viewBox="0 0 400 290" width="100%" height="100%" fill="none">
        {[[200,148,78,88],[200,148,200,44],[200,148,322,88],[200,148,78,208],[200,148,322,208]].map(([x1,y1,x2,y2],i) =>
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth="0.9" strokeOpacity="0.28" />
        )}
        {[[78,88,28,44],[78,88,34,158],[322,88,372,44],[322,208,372,252]].map(([x1,y1,x2,y2],i) =>
          <line key={`lf${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth="0.55" strokeOpacity="0.18" />
        )}
        {[[28,44],[34,158],[372,44],[372,252]].map(([cx,cy],i) =>
          <circle key={`leaf${i}`} cx={cx} cy={cy} r={6.5} fill="var(--bg-soft)" stroke="var(--ink)" strokeWidth="0.6" strokeOpacity="0.3" />
        )}
        {[[78,88],[200,44],[322,88],[78,208],[322,208]].map(([cx,cy],i) =>
          <circle key={`br${i}`} cx={cx} cy={cy} r={13} fill="var(--bg-soft)" stroke="var(--ink)" strokeWidth="0.85" strokeOpacity="0.42" />
        )}
        <circle cx="200" cy="148" r="26" fill="var(--accent)" opacity="0.18" />
        <circle cx="200" cy="148" r="18" fill="var(--accent)" opacity="0.92" />
        <text x="200" y="152" fontSize="7.5" fontFamily="var(--font-mono)" fill="white" textAnchor="middle" letterSpacing="0.8">AI</text>
      </svg>
    </div>,

    // v2 — Poster científico: abstract academic poster layout
    <div key="v2" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
      <svg viewBox="0 0 240 318" width="66%" height="88%" fill="none">
        <rect x="1" y="1" width="238" height="316" rx="2" stroke="var(--ink)" strokeWidth="0.65" strokeOpacity="0.38" />
        <rect x="8" y="8" width="224" height="32" rx="1" fill="var(--ink)" fillOpacity="0.1" />
        <rect x="8" y="46" width="148" height="5.5" rx="1" fill="var(--ink)" fillOpacity="0.1" />
        <rect x="8" y="56" width="88" height="5.5" rx="1" fill="var(--ink)" fillOpacity="0.07" />
        <line x1="8" y1="70" x2="232" y2="70" stroke="var(--ink)" strokeWidth="0.4" strokeOpacity="0.22" />
        {[79,88,97,106,115].map(y => <rect key={y} x="8" y={y} width="100" height="4.5" rx="0.5" fill="var(--ink)" fillOpacity="0.1" />)}
        <rect x="8" y="130" width="100" height="72" rx="1" fill="var(--ink)" fillOpacity="0.05" stroke="var(--ink)" strokeWidth="0.4" strokeOpacity="0.22" />
        {[[16,192,10,10],[30,182,10,20],[44,186,10,16],[58,178,10,24],[72,183,10,19],[86,191,8,11]].map(([x,y,w,h]) =>
          <rect key={x} x={x} y={y} width={w} height={h} fill="var(--accent)" fillOpacity="0.52" />
        )}
        {[79,88,97,106,115,124,133,142,151,160,169,178,187].map(y =>
          <rect key={y} x="118" y={y} width={108-(y%5)*4} height="4.5" rx="0.5" fill="var(--ink)" fillOpacity={y<130?0.1:0.07} />
        )}
        <line x1="8" y1="218" x2="232" y2="218" stroke="var(--ink)" strokeWidth="0.3" strokeOpacity="0.18" />
        {[226,235,244,253].map(y => <rect key={y} x="8" y={y} width={140-(y%3)*12} height="3.5" rx="0.5" fill="var(--ink)" fillOpacity="0.07" />)}
        {[226,235,244].map(y => <rect key={`r${y}`} x="158" y={y} width={68+(y%2)*6} height="3.5" rx="0.5" fill="var(--ink)" fillOpacity="0.05" />)}
      </svg>
    </div>,

    // v3 — UX en salas de urgencias: horizontal funnel, chaos → process
    <div key="v3" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
      <svg viewBox="0 0 400 260" width="100%" height="100%" fill="none">
        {/* scattered input dots on the left — chaos */}
        {[
          [28,60],[18,98],[38,134],[22,168],[44,106],[14,72],[36,152],[48,84],[24,120],[42,144],
          [56,65],[10,112],[50,130],[30,90],[62,158]
        ].map(([cx,cy],i) => {
          const progress = (cx - 10) / 60;
          const targetCy = 130;
          const animCy = hover ? cy + (targetCy - cy) * 0.45 : cy;
          return (
            <circle key={i} cx={cx} cy={animCy} r={3.2}
              fill="var(--accent)" fillOpacity={0.35 + progress * 0.3}
              style={{ transition: `cy 600ms cubic-bezier(.4,0,.2,1) ${i * 18}ms` }} />
          );
        })}
        {/* funnel guide lines converging right */}
        <path d="M 72 38 Q 160 80 248 112 L 350 112" stroke="var(--ink)" strokeWidth="0.55" strokeOpacity="0.22" />
        <path d="M 72 222 Q 160 180 248 148 L 350 148" stroke="var(--ink)" strokeWidth="0.55" strokeOpacity="0.22" />
        {/* structured output pill on the right */}
        <rect x="248" y="104" width="104" height="52" rx="26"
          fill="var(--accent)" fillOpacity={hover ? 0.18 : 0.1}
          stroke="var(--ink)" strokeWidth="0.7" strokeOpacity="0.38"
          style={{ transition: "fill-opacity 400ms ease" }} />
        {/* converging dots flowing into the pill */}
        {[112,122,130,138,148].map((cy,i) =>
          <circle key={`in${i}`} cx={200 + i*8} cy={cy} r={2.8}
            fill="var(--accent)" fillOpacity={0.55 + i * 0.08} />
        )}
        <text x="272" y="134" fontSize="7.5" fontFamily="var(--font-mono)" fill="var(--ink-mute)" letterSpacing="1.2">PROCESO</text>
        <text x="30" y="248" fontSize="7.5" fontFamily="var(--font-mono)" fill="var(--ink-mute)" letterSpacing="1">INCERTIDUMBRE</text>
        <text x="268" y="174" fontSize="7.5" fontFamily="var(--font-mono)" fill="var(--ink-mute)" letterSpacing="1">ESTRUCTURA</text>
      </svg>
    </div>,

    // v4 — Diseño para Frutabots: typographic synthesis with leaf detail
    <div key="v4" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
      <svg viewBox="0 0 400 280" width="100%" height="100%" fill="none">
        <text x="200" y="118" fontSize="96" fontFamily="var(--font-sans)" fontWeight="800"
          fill="var(--ink)" fillOpacity="0.88" textAnchor="middle" letterSpacing="-3">fruta</text>
        <text x="200" y="200" fontSize="76" fontFamily="var(--font-sans)" fontWeight="800"
          fill="var(--ink)" fillOpacity="0.88" textAnchor="middle" letterSpacing="6">BOTS</text>
        {/* leaf shape inside the 'O' counter of BOTS — positioned at approx center of O */}
        <g transform="translate(182, 163)">
          {/* white punch-out oval to simulate counter */}
          <ellipse cx="0" cy="0" rx="13" ry="16" fill="var(--bg-soft)" />
          {/* leaf silhouette */}
          <path d="M 0 -13 C 9 -9 9 9 0 13 C -9 9 -9 -9 0 -13 Z"
            fill="var(--accent)" fillOpacity={hover ? 0.85 : 0.65}
            style={{ transition: "fill-opacity 400ms ease" }} />
          {/* leaf midrib */}
          <line x1="0" y1="-11" x2="0" y2="11"
            stroke="var(--bg-soft)" strokeWidth="0.8" strokeOpacity="0.7" />
        </g>
        {/* subtle underline rule */}
        <line x1="80" y1="218" x2="320" y2="218"
          stroke="var(--ink)" strokeWidth="0.4" strokeOpacity="0.2" />
        <text x="200" y="232" fontSize="7" fontFamily="var(--font-mono)"
          fill="var(--ink-mute)" textAnchor="middle" letterSpacing="3.5" fillOpacity="0.7">IDENTIDAD · AGROTECH</text>
      </svg>
    </div>,

    // v5 — Del diseño a la enseñanza: knowledge transfer diagram
    <div key="v5" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
      <svg viewBox="0 0 400 280" width="100%" height="100%" fill="none">
        <circle cx="88" cy="140" r="34" fill="var(--accent)" fillOpacity="0.14"
          stroke="var(--ink)" strokeWidth="0.85" strokeOpacity="0.38" />
        <circle cx="88" cy="140" r="22" fill="var(--accent)" fillOpacity={hover ? 0.32 : 0.2}
          style={{ transition: "fill-opacity 400ms ease" }} />
        <text x="88" y="144" fontSize="7" fontFamily="var(--font-mono)" fill="var(--ink-mute)"
          textAnchor="middle" letterSpacing="0.8">CAP</text>
        {[[230,80],[305,80],[380,80],[230,200],[305,200],[380,200]].map(([cx,cy],i) => (
          <g key={i}>
            <line x1="122" y1="140" x2={cx-12} y2={cy}
              stroke="var(--ink)" strokeWidth="0.55" strokeOpacity="0.2"
              strokeDasharray="3 4" />
            <circle cx={cx} cy={cy} r="18"
              fill="var(--bg-soft)" stroke="var(--ink)" strokeWidth="0.7" strokeOpacity={hover ? 0.48 : 0.28}
              style={{ transition: "stroke-opacity 400ms ease" }} />
            <circle cx={cx} cy={cy} r="6"
              fill="var(--ink)" fillOpacity={hover ? 0.22 : 0.12}
              style={{ transition: "fill-opacity 400ms ease" }} />
          </g>
        ))}
        <text x="88" y="192" fontSize="7" fontFamily="var(--font-mono)" fill="var(--ink-mute)"
          textAnchor="middle" letterSpacing="0.8">DISEÑADORA</text>
        <text x="305" y="236" fontSize="7" fontFamily="var(--font-mono)" fill="var(--ink-mute)"
          textAnchor="middle" letterSpacing="0.8">USUARIOS</text>
      </svg>
    </div>
  ], [hover, pos.x, pos.y, uid]);

  return (
    <div className="play-card" ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}>
      <div className="play-card__visual">
        {visuals[variant]}
      </div>
      <div className="play-card__text">
        <div className="play-card__cap">{cap}</div>
        <div className="play-card__title"><RichText parts={title} /></div>
        {pdf && (
          <a className="play-card__dl" href={pdf.href} download onClick={e => e.stopPropagation()}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M5 1v6M2 5.5L5 8l3-2.5M1 9h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {pdf.label}
          </a>
        )}
      </div>
    </div>
  );
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

Object.assign(window, { Hero, Philosophy, Work, CaseModal, Skills, Process, Timeline, Playground, Contact });