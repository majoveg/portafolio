// app.jsx — root component, nav, fog, cursor, tweaks panel orchestration

const { useState: useStateA, useEffect: useEffectA, useRef: useRefA, useMemo: useMemoA } = React;

const PALETTES = {
  terracotta: { bg: "#f4efe9", text: "#1c1a17", blobA: "#e8a988", blobB: "#f0c7b1", blobC: "#d49982", accent: "#c97956" },
  fog:        { bg: "#eef0f2", text: "#191a1d", blobA: "#a8b5cf", blobB: "#c5cee0", blobC: "#8a96b3", accent: "#6f7ea3" },
  mist:       { bg: "#eef0ec", text: "#181a17", blobA: "#a8bca2", blobB: "#c8d6c0", blobC: "#7d967a", accent: "#5f7e60" },
  blush:      { bg: "#f3eceb", text: "#1a1716", blobA: "#e3a6b0", blobB: "#f0cad0", blobC: "#c98993", accent: "#a55e6b" }
};

const TYPE_PRESETS = {
  hanken:  { sans: '"Hanken Grotesk", "Söhne", ui-sans-serif, system-ui, sans-serif', serif: '"Instrument Serif", Georgia, serif', mono: '"JetBrains Mono", ui-monospace, Menlo, monospace' },
  manrope: { sans: '"Manrope", ui-sans-serif, system-ui, sans-serif', serif: '"Cormorant Garamond", Georgia, serif', mono: '"IBM Plex Mono", ui-monospace, Menlo, monospace' },
  geist:   { sans: '"Geist", ui-sans-serif, system-ui, sans-serif', serif: '"DM Serif Display", Georgia, serif', mono: '"Geist Mono", ui-monospace, Menlo, monospace' }
};

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────
function Nav({ t, lang, setLang }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 0;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  return (
    <nav className="nav">
      <a className="nav__mark" onClick={() => scrollTo("top")} data-cursor="hover">mjv.</a>
      <ul className="nav__links">
        <li><a className="nav__link" onClick={() => scrollTo("philosophy")} data-cursor="hover">{t.nav.about}</a></li>
        <li><a className="nav__link" onClick={() => scrollTo("work")} data-cursor="hover">{t.nav.work}</a></li>
        <li><a className="nav__link" onClick={() => scrollTo("process")} data-cursor="hover">{t.nav.process}</a></li>
        <li><a className="nav__link" onClick={() => scrollTo("contact")} data-cursor="hover">{t.nav.contact}</a></li>
      </ul>
      <div className="lang-toggle">
        <button onClick={() => setLang("es")} className={lang === "es" ? "is-active" : ""} data-cursor="hover">ES</button>
        <span className="sep">/</span>
        <button onClick={() => setLang("en")} className={lang === "en" ? "is-active" : ""} data-cursor="hover">EN</button>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOG — global ambient blobs
// ─────────────────────────────────────────────────────────────────────────────
function Fog({ progress }) {
  // Each blob drifts with scroll on a different vector
  const a = useRefA(null), b = useRefA(null), c = useRefA(null);
  useEffectA(() => {
    if (a.current) a.current.style.transform = `translate3d(${-progress * 60}px, ${progress * 220}px, 0) rotate(${progress * 20}deg)`;
    if (b.current) b.current.style.transform = `translate3d(${progress * 120}px, ${-progress * 180}px, 0) rotate(${-progress * 25}deg)`;
    if (c.current) c.current.style.transform = `translate3d(${progress * -180}px, ${progress * 80}px, 0) rotate(${progress * 15}deg)`;
  }, [progress]);
  return (
    <div className="fog" aria-hidden>
      <div className="blob blob--a" ref={a} />
      <div className="blob blob--b" ref={b} />
      <div className="blob blob--c" ref={c} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────────────────────────────────────────────────────
function CustomCursor({ kind }) {
  const dot = useRefA(null), halo = useRefA(null);
  const pos = useRefA({ x: -100, y: -100 });
  const haloPos = useRefA({ x: -100, y: -100 });
  useEffectA(() => {
    if (kind === "none") { document.body.classList.remove("cursor-custom"); return; }
    document.body.classList.add("cursor-custom");
    let raf;
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const loop = () => {
      // lerp halo toward dot
      haloPos.current.x += (pos.current.x - haloPos.current.x) * 0.18;
      haloPos.current.y += (pos.current.y - haloPos.current.y) * 0.18;
      if (dot.current) {
        dot.current.style.left = `${pos.current.x}px`;
        dot.current.style.top = `${pos.current.y}px`;
      }
      if (halo.current) {
        halo.current.style.left = `${haloPos.current.x}px`;
        halo.current.style.top = `${haloPos.current.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e) => {
      const target = e.target.closest('[data-cursor="hover"], a, button');
      if (target && halo.current) halo.current.classList.add("is-hover");
      else if (halo.current) halo.current.classList.remove("is-hover");
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("cursor-custom");
    };
  }, [kind]);

  if (kind === "none") return null;
  return (
    <>
      <div className="cursor-dot" ref={dot} />
      {kind === "halo" && <div className="cursor-halo" ref={halo} />}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION DOTS (right rail)
// ─────────────────────────────────────────────────────────────────────────────
function SectionDots() {
  const sections = ["top", "philosophy", "work", "skills", "process", "timeline", "playground", "contact"];
  const [active, setActive] = useStateA("top");
  useEffectA(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { threshold: 0.45, rootMargin: "-30% 0px -30% 0px" });
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  };
  return (
    <div className="dots">
      {sections.map((id) => (
        <button key={id}
          className={`dots__d ${active === id ? "is-active" : ""}`}
          onClick={() => go(id)}
          data-cursor="hover"
          aria-label={id}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────

function App() {
  const [lang, setLang] = useStateA(() => localStorage.getItem("mjv-lang") || "es");
  const [openCase, setOpenCase] = useStateA(null);

  useEffectA(() => { localStorage.setItem("mjv-lang", lang); }, [lang]);

  useGlobalReveal();

  const content = window.CONTENT[lang];
  const palette = PALETTES.terracotta;
  const type = TYPE_PRESETS.hanken;

  // Apply CSS variables for palette / type / motion / density
  useEffectA(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg", palette.bg);
    root.style.setProperty("--ink", palette.text);
    root.style.setProperty("--blob-a", palette.blobA);
    root.style.setProperty("--blob-b", palette.blobB);
    root.style.setProperty("--blob-c", palette.blobC);
    root.style.setProperty("--accent", palette.accent);
    root.style.setProperty("--font-sans", type.sans);
    root.style.setProperty("--font-serif", type.serif);
    root.style.setProperty("--font-mono", type.mono);
    root.style.setProperty("--motion", "1");
    root.style.setProperty("--density", "1");
  }, []);

  const progress = useScrollProgress();

  const caseData = openCase ? content.work.cases.find((c) => c.id === openCase) : null;

  return (
    <div className="shell">
      <Fog progress={progress} />
      <CustomCursor kind="halo" />
      <SectionDots />
      <Nav t={content} lang={lang} setLang={setLang} />

      <main>
        <Hero t={content} scrollProgress={progress} />
        <Philosophy t={content} />
        <Work t={content} lang={lang} onOpen={setOpenCase} />
        <Skills t={content} />
        <Process t={content} />
        <Timeline t={content} />
        <Playground t={content} />
        <Contact t={content} />
      </main>

      <footer className="foot">
        <span>{content.foot.left}</span>
        <span>{content.foot.right}</span>
      </footer>

      <CaseModal caseData={caseData} lang={lang} onClose={() => setOpenCase(null)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
