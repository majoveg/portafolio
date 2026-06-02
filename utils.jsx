// utils.jsx — shared helpers, reveal hooks, RichText renderer

const { useState, useEffect, useRef, useCallback, useMemo } = React;

// RichText: renders [string | {em: string}] segments. Used everywhere for em-italic accents.
function RichText({ parts, asWords = false }) {
  if (!Array.isArray(parts)) parts = [parts];
  if (!asWords) {
    return (
      <>
        {parts.map((p, i) => {
          if (typeof p === "string") return <React.Fragment key={i}>{p}</React.Fragment>;
          if (p && p.em) return <em key={i}>{p.em}</em>;
          return null;
        })}
      </>
    );
  }
  // Word-by-word reveal mode
  const wordChunks = [];
  parts.forEach((p, pi) => {
    if (typeof p === "string") {
      p.split(/(\s+)/).forEach((w, wi) => {
        if (w.trim() === "") wordChunks.push({ k: `${pi}-s-${wi}`, kind: "space", text: w });
        else wordChunks.push({ k: `${pi}-w-${wi}`, kind: "word", text: w });
      });
    } else if (p && p.em) {
      p.em.split(/(\s+)/).forEach((w, wi) => {
        if (w.trim() === "") wordChunks.push({ k: `${pi}-es-${wi}`, kind: "space", text: w });
        else wordChunks.push({ k: `${pi}-ew-${wi}`, kind: "emword", text: w });
      });
    }
  });
  return (
    <>
      {wordChunks.map((c, idx) => {
        if (c.kind === "space") return <React.Fragment key={c.k}>{c.text}</React.Fragment>;
        const style = { transitionDelay: `${Math.min(idx * 60, 1200)}ms` };
        if (c.kind === "emword") return <em key={c.k} className="reveal-word" style={style}>{c.text}</em>;
        return <span key={c.k} className="reveal-word" style={style}>{c.text}</span>;
      })}
    </>
  );
}

// useReveal — toggles `.is-in` on its element + descendants .reveal-word when in viewport
function useReveal({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            if (once) obs.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-in");
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);
  return ref;
}

// Global observer — watches every .reveal in the document, stamps is-in once visible.
// Set up once at app mount, picks up dynamically-added elements via MutationObserver.
function useGlobalReveal() {
  useEffect(() => {
    const seen = new WeakSet();
    const stamp = (el, idx = 0) => {
      if (seen.has(el)) return;
      seen.add(el);
      if (!el.style.transitionDelay) {
        el.style.transitionDelay = `${Math.min(idx * 50, 400)}ms`;
      }
      el.classList.add("is-in");
    };
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            stamp(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    const observeAll = () => {
      document.querySelectorAll(".reveal:not(.is-in), .reveal-word:not(.is-in)").forEach((el, i) => {
        if (!seen.has(el)) obs.observe(el);
      });
    };
    observeAll();
    // Also re-scan after a short delay so React-inserted nodes are picked up
    const t = setTimeout(observeAll, 200);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);
}

// useScrollProgress — returns 0..1 progress through page
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? window.scrollY / max : 0);
      });
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);
  return p;
}

// useMousePos — global mouse position
function useMousePos() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

// usePrefersReducedMotion
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const h = () => setReduced(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return reduced;
}

// Placeholder art — soft generative-feeling visual for case cards
function PlaceholderArt({ palette, variant = "a" }) {
  const style = {
    "--pa-bg": palette?.bg || "#efe2d3",
    "--pa-1": palette?.a || "#e8a988",
    "--pa-2": palette?.b || "#d68c69",
  };
  const patterns = {
    a: (
      <svg viewBox="0 0 600 400" fill="none" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <defs>
          <radialGradient id="pgA1" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor={palette?.a || "#e8a988"} stopOpacity="0.9" />
            <stop offset="100%" stopColor={palette?.a || "#e8a988"} stopOpacity="0" />
          </radialGradient>
        </defs>
        {[...Array(28)].map((_, i) => (
          <line key={i} x1="0" y1={i * 18} x2="600" y2={i * 18 + 30}
            stroke={palette?.b || "#d68c69"} strokeOpacity="0.25" strokeWidth="0.6" />
        ))}
        <circle cx="380" cy="190" r="120" fill="url(#pgA1)" />
      </svg>
    ),
    b: (
      <svg viewBox="0 0 600 400" fill="none" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        {[...Array(7)].map((_, i) => (
          <ellipse key={i} cx={300} cy={200} rx={50 + i * 40} ry={30 + i * 24}
            stroke={palette?.b || "#9a78b3"} strokeOpacity={0.4 - i * 0.04} fill="none" strokeWidth="0.7" />
        ))}
        <circle cx="300" cy="200" r="6" fill={palette?.b || "#9a78b3"} />
      </svg>
    ),
    c: (
      <svg viewBox="0 0 600 400" fill="none" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <path d="M40 320 Q 140 80, 280 220 T 540 140" stroke={palette?.b || "#5f8d7c"} strokeWidth="1.2" fill="none" strokeOpacity="0.7" />
        <path d="M40 360 Q 200 200, 320 280 T 560 200" stroke={palette?.b || "#5f8d7c"} strokeWidth="0.8" fill="none" strokeOpacity="0.5" />
        {[80, 180, 280, 380, 480].map((x, i) => (
          <circle key={i} cx={x} cy={300 - i * 30} r="3" fill={palette?.b || "#5f8d7c"} />
        ))}
      </svg>
    ),
    d: (
      <svg viewBox="0 0 600 400" fill="none" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        {[...Array(18)].map((_, i) => {
          const x = 60 + (i % 6) * 90;
          const y = 80 + Math.floor(i / 6) * 110;
          return <rect key={i} x={x} y={y} width="60" height="60" stroke={palette?.b || "#9a8b3f"}
            strokeOpacity={0.5 - (i % 4) * 0.08} fill="none" strokeWidth="0.6" />;
        })}
        <circle cx="380" cy="200" r="60" fill={palette?.a || "#d4c47a"} fillOpacity="0.4" />
      </svg>
    )
  };
  return (
    <div className="placeholder-art" style={style}>
      <div className="pa-pattern" style={{ width: "100%", height: "100%" }}>
        {patterns[variant] || patterns.a}
      </div>
    </div>
  );
}

// CaseImage — drop-in image slot. Four visual registers via `image.kind`:
//   • "photo"   (default) — duotone warm treatment (grayscale + tint + glow)
//   • "ui"     — no filter, sits inside a soft browser-style frame on --bg-soft
//   • "diagram" — no filter, neutral padded canvas, no shadow
//   • "float"  — PNG floats over the existing palette background (drop-shadow, contain)
// Falls back to PlaceholderArt + hint card while src is empty or fails to load.
function CaseImage({ image, lang = "es", fallbackPalette, fallbackVariant = "a", className = "", showHint = true }) {
  const [failed, setFailed] = useState(false);
  const kind = (image && image.kind) || "photo";
  const hasSrc = !!(image && image.src) && !failed;
  const hint = image ? (image[`hint_${lang}`] || image.hint || "") : "";
  const kindLabel = kind === "ui" ? "UI" : kind === "diagram" ? (lang === "en" ? "DIAGRAM" : "DIAGRAMA") : kind === "float" ? "PNG" : (lang === "en" ? "PHOTO" : "FOTO");

  // Browser-chrome bar used by the "ui" register (and shown faded in placeholder
  // mode so the slot reads as a UI slot even when empty).
  const renderChrome = () => (
    <div className="case-img__chrome" aria-hidden="true">
      <span className="case-img__chrome-dots"><i /><i /><i /></span>
      {image?.chromeLabel && <span className="case-img__chrome-label">{image.chromeLabel}</span>}
    </div>
  );

  return (
    <figure
      className={`case-img case-img--${kind} ${hasSrc ? "case-img--filled" : "case-img--empty"} ${className}`}
    >
      {hasSrc ? (
        kind === "ui" ? (
          <div className="case-img__frame">
            {renderChrome()}
            <img
              src={image.src}
              alt={image.alt || ""}
              loading="lazy"
              draggable={false}
              onError={() => setFailed(true)}
            />
          </div>
        ) : kind === "diagram" ? (
          <img
            src={image.src}
            alt={image.alt || ""}
            loading="lazy"
            draggable={false}
            onError={() => setFailed(true)}
          />
        ) : kind === "float" ? (
          <>
            <div className="case-img__float-bg" aria-hidden="true">
              <PlaceholderArt palette={fallbackPalette} variant={fallbackVariant} />
            </div>
            <img
              src={image.src}
              alt={image.alt || ""}
              loading="lazy"
              draggable={false}
              className="case-img__float-img"
              style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
              onError={() => setFailed(true)}
            />
            <span className="case-img__tint" aria-hidden="true" />
            <span className="case-img__glow" aria-hidden="true" />
          </>
        ) : (
          <>
            <img
              src={image.src}
              alt={image.alt || ""}
              loading="lazy"
              draggable={false}
              onError={() => setFailed(true)}
            />
            <span className="case-img__tint" aria-hidden="true" />
            <span className="case-img__glow" aria-hidden="true" />
          </>
        )
      ) : (
        <>
          {kind === "ui" ? (
            <div className="case-img__frame case-img__frame--ghost">
              {renderChrome()}
              <div className="case-img__placeholder case-img__placeholder--inner">
                <PlaceholderArt palette={fallbackPalette} variant={fallbackVariant} />
              </div>
            </div>
          ) : (
            <div className="case-img__placeholder" aria-hidden="true">
              <PlaceholderArt palette={fallbackPalette} variant={fallbackVariant} />
            </div>
          )}
          {showHint && (image?.tag || hint) && (
            <div className="case-img__hint">
              <span className="case-img__hint-row">
                {image?.tag && <span className="case-img__hint-tag">{image.tag}</span>}
                <span className="case-img__hint-kind">{kindLabel}</span>
              </span>
              {hint && <span className="case-img__hint-text">{hint}</span>}
              {image?.specs && <span className="case-img__hint-specs">{image.specs}</span>}
            </div>
          )}
        </>
      )}
    </figure>
  );
}

Object.assign(window, { RichText, useReveal, useGlobalReveal, useScrollProgress, useMousePos, usePrefersReducedMotion, PlaceholderArt, CaseImage });
