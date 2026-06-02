// process-fog.jsx — terracotta "fog" that travels the dashed process line cyclically.
// Pause on out-of-view, follow mouse along path on hover, resume when hover leaves.

// Shared path builder — also used by sections.jsx to render the dashed line.
function buildProcessPath(stepsCount, ys) {
  const pts = ys.slice(0, stepsCount).map((y, i) => [
    80 + i * (840 / (stepsCount - 1)),
    y * 3.6
  ]);
  const d = pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = pts[i - 1];
    const cx1 = px + (x - px) / 2;
    const cx2 = px + (x - px) / 2;
    return `${acc} C ${cx1} ${py}, ${cx2} ${y}, ${x} ${y}`;
  }, "");
  return { d, points: pts };
}

function ProcessFog({ stepsCount, ys }) {
  const svgRef = React.useRef(null);
  const pathRef = React.useRef(null);
  const fogRef = React.useRef(null);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const fog = fogRef.current;
    if (!svg || !path || !fog) return;

    const totalLen = path.getTotalLength();
    if (!totalLen) return;

    // ── Find length along path corresponding to each step (by x in viewBox) ──
    const stepXs = Array.from({ length: stepsCount }, (_, i) =>
      80 + i * (840 / (stepsCount - 1))
    );
    const stepLens = stepXs.map((targetX) => {
      let bestLen = 0;
      let bestDx = Infinity;
      const SAMPLES = 600;
      for (let s = 0; s <= SAMPLES; s++) {
        const L = (s / SAMPLES) * totalLen;
        const p = path.getPointAtLength(L);
        const dx = Math.abs(p.x - targetX);
        if (dx < bestDx) {
          bestDx = dx;
          bestLen = L;
        }
      }
      return bestLen;
    });

    // ── Cyclic, non-linear journey: forward sweep, backtracks, restart ──
    // step indices on the 6-step process: 0=Escuchar … 5=Iterar
    const seq = [
      // 1. forward sweep 0 → 5, varied per leg
      { from: 0, to: 1, dur: 1100, ease: "easeInOut", pause: 380 },
      { from: 1, to: 2, dur: 850,  ease: "easeOut",   pause: 240 },
      { from: 2, to: 3, dur: 1400, ease: "easeInOut", pause: 420 },
      { from: 3, to: 4, dur: 680,  ease: "easeIn",    pause: 300 },
      { from: 4, to: 5, dur: 1000, ease: "easeInOut", pause: 520 },
      // 2. backtrack 5 → 1 (longer, contemplative)
      { from: 5, to: 1, dur: 1700, ease: "easeInOut", pause: 420 },
      // 3. forward 1 → 5
      { from: 1, to: 5, dur: 1500, ease: "easeInOut", pause: 380 },
      // 4. backtrack 5 → 2
      { from: 5, to: 2, dur: 1100, ease: "easeInOut", pause: 360 },
      // 5. forward 2 → 5
      { from: 2, to: 5, dur: 1200, ease: "easeInOut", pause: 420 },
      // 6. loop: 5 → 0 (return to start)
      { from: 5, to: 0, dur: 1900, ease: "easeInOut", pause: 560 }
    ];

    const easings = {
      easeIn:    (t) => t * t,
      easeOut:   (t) => 1 - (1 - t) * (1 - t),
      easeInOut: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
    };

    // ── State ──
    let segIdx = 0;
    let segStartT = 0;
    let inPause = false;
    let pauseEnd = 0;
    let currentLen = stepLens[seq[0].from];
    let lastLen = currentLen;
    let lastT = 0;
    let smoothedSpeed = 0;
    let raf = 0;
    let visible = false;
    let running = false;
    let hoverActive = false;
    let hoverTargetLen = currentLen;

    // ── Animation tick ──
    function tick(now) {
      const dt = Math.max(1, Math.min(64, now - lastT));
      lastT = now;

      let len;
      if (hoverActive) {
        // Smooth follow toward hoverTargetLen (snappy but not instant)
        const FOLLOW = 1 - Math.pow(0.001, dt / 1000); // ~time-based lerp
        len = currentLen + (hoverTargetLen - currentLen) * FOLLOW;
        currentLen = len;
      } else if (inPause) {
        if (now >= pauseEnd) {
          inPause = false;
          segIdx = (segIdx + 1) % seq.length;
          segStartT = now;
        }
        len = currentLen;
      } else {
        const seg = seq[segIdx];
        const elapsed = now - segStartT;
        const t = Math.min(1, elapsed / seg.dur);
        const eased = easings[seg.ease](t);
        const fromLen = stepLens[seg.from];
        const toLen = stepLens[seg.to];
        len = fromLen + (toLen - fromLen) * eased;
        if (t >= 1) {
          inPause = true;
          pauseEnd = now + seg.pause;
          currentLen = toLen;
        } else {
          currentLen = len;
        }
      }

      // ── Velocity in viewBox-units per ms (signed) ──
      const instVel = (len - lastLen) / dt;
      lastLen = len;
      // smooth speed magnitude to avoid jitter
      const targetSpeed = Math.abs(instVel);
      smoothedSpeed += (targetSpeed - smoothedSpeed) * 0.2;
      const dir = instVel === 0 ? 1 : Math.sign(instVel);

      // ── Position + tangent ──
      const pt = path.getPointAtLength(clamp(len, 0, totalLen));
      const eps = 3;
      const pa = path.getPointAtLength(clamp(len - eps, 0, totalLen));
      const pb = path.getPointAtLength(clamp(len + eps, 0, totalLen));
      const angleDeg = (Math.atan2(pb.y - pa.y, pb.x - pa.x) * 180) / Math.PI;

      // ── Visual modulation by speed ──
      // speed roughly 0..0.4 vb/ms typically; clamp for visuals.
      const sp = Math.min(0.5, smoothedSpeed);
      const stretch = 1 + sp * 2.6;            // 1 .. ~2.3
      const headOpacity = 0.18 + sp * 0.4;     // 0.18 .. ~0.38
      const tailOpacity = 0.06 + sp * 0.65;    // 0.06 .. ~0.39
      const tailDist1 = 10 + sp * 50;          // farther tail at high speed
      const tailDist2 = 22 + sp * 90;

      // Three layered blobs: head (sharp-ish), mid, tail
      const blobs = fog.children;
      const head = blobs[0];
      const mid = blobs[1];
      const tail = blobs[2];

      // Head: at the current point, stretched along motion
      head.setAttribute(
        "transform",
        `translate(${pt.x} ${pt.y}) rotate(${angleDeg}) scale(${stretch} ${1 / Math.sqrt(stretch)})`
      );
      head.setAttribute("opacity", headOpacity.toFixed(3));

      // Mid: offset behind direction of motion
      const midLen = clamp(len - dir * tailDist1, 0, totalLen);
      const midPt = path.getPointAtLength(midLen);
      mid.setAttribute(
        "transform",
        `translate(${midPt.x} ${midPt.y}) rotate(${angleDeg}) scale(${1 + sp * 1.8} ${1})`
      );
      mid.setAttribute("opacity", (tailOpacity * 0.85).toFixed(3));

      // Tail: even farther behind, soft and rounder
      const tailLen = clamp(len - dir * tailDist2, 0, totalLen);
      const tailPt = path.getPointAtLength(tailLen);
      tail.setAttribute(
        "transform",
        `translate(${tailPt.x} ${tailPt.y}) scale(${0.8 + sp * 1.4})`
      );
      tail.setAttribute("opacity", (tailOpacity * 0.55).toFixed(3));

      raf = requestAnimationFrame(tick);
    }

    function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

    function start() {
      if (running) return;
      running = true;
      lastT = performance.now();
      segStartT = lastT;
      raf = requestAnimationFrame(tick);
    }
    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    }

    // ── Visibility ──
    const diagram = svg.closest(".process__diagram");
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(diagram);

    // ── Hover handling: follow mouse along path ──
    function findNearestLen(clientX, clientY) {
      const rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      const vbX = ((clientX - rect.left) / rect.width) * 1000;
      const vbY = ((clientY - rect.top) / rect.height) * 360;
      let bestLen = 0;
      let bestD2 = Infinity;
      const SAMPLES = 220;
      for (let s = 0; s <= SAMPLES; s++) {
        const L = (s / SAMPLES) * totalLen;
        const p = path.getPointAtLength(L);
        // Account for non-uniform scaling: distance in viewBox space
        const dx = (p.x - vbX) * (rect.width / 1000);
        const dy = (p.y - vbY) * (rect.height / 360);
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD2) {
          bestD2 = d2;
          bestLen = L;
        }
      }
      // Activation threshold in screen px (~80px from path counts as hovering)
      return Math.sqrt(bestD2) < 90 ? bestLen : null;
    }

    function onMove(e) {
      if (!visible) return;
      const L = findNearestLen(e.clientX, e.clientY);
      if (L != null) {
        hoverActive = true;
        hoverTargetLen = L;
      } else if (hoverActive) {
        resumeFromHover();
      }
    }
    function onLeave() {
      if (hoverActive) resumeFromHover();
    }
    function resumeFromHover() {
      hoverActive = false;
      // Find segment whose range contains currentLen → resume with matching t.
      let bestI = -1;
      let bestT = 0;
      for (let i = 0; i < seq.length; i++) {
        const fL = stepLens[seq[i].from];
        const tL = stepLens[seq[i].to];
        const minL = Math.min(fL, tL);
        const maxL = Math.max(fL, tL);
        if (currentLen >= minL - 0.5 && currentLen <= maxL + 0.5) {
          const denom = tL - fL || 1;
          const t = clamp((currentLen - fL) / denom, 0, 1);
          bestI = i;
          bestT = t;
          break;
        }
      }
      if (bestI < 0) {
        // fallback: nearest from-point
        let bD = Infinity;
        for (let i = 0; i < seq.length; i++) {
          const d = Math.abs(stepLens[seq[i].from] - currentLen);
          if (d < bD) { bD = d; bestI = i; bestT = 0; }
        }
      }
      segIdx = bestI;
      inPause = false;
      // Place segStartT so elapsed/dur ≈ bestT (linear approx; close enough)
      segStartT = performance.now() - seq[segIdx].dur * bestT;
    }

    diagram.addEventListener("mousemove", onMove, { passive: true });
    diagram.addEventListener("mouseleave", onLeave);

    // Reduced motion: snap to step 0 and don't animate
    if (reduced) {
      stop();
      const pt = path.getPointAtLength(stepLens[0]);
      const head = fog.children[0];
      head.setAttribute("transform", `translate(${pt.x} ${pt.y}) scale(1 1)`);
      head.setAttribute("opacity", "0.35");
      fog.children[1].setAttribute("opacity", "0");
      fog.children[2].setAttribute("opacity", "0");
    }

    return () => {
      stop();
      io.disconnect();
      diagram.removeEventListener("mousemove", onMove);
      diagram.removeEventListener("mouseleave", onLeave);
    };
  }, [stepsCount, ys.join(","), reduced]);

  // Build path d directly so it matches the dashed line exactly.
  const { d } = buildProcessPath(stepsCount, ys);

  return (
    <svg
      ref={svgRef}
      className="process__fog"
      viewBox="0 0 1000 360"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="processFogBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="processFogBlurSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="processFogBlurWide" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      {/* Hidden geometry path used for getPointAtLength */}
      <path ref={pathRef} d={d} fill="none" stroke="none" />
      <g ref={fogRef}>
        {/* head — denser, slightly sharper */}
        <ellipse rx="10" ry="7" fill="var(--accent)" filter="url(#processFogBlur)" opacity="0" />
        {/* mid — softer trailing body */}
        <ellipse rx="14" ry="10" fill="var(--accent)" filter="url(#processFogBlurSoft)" opacity="0" />
        {/* tail — wide diffuse afterglow */}
        <ellipse rx="20" ry="15" fill="var(--accent)" filter="url(#processFogBlurWide)" opacity="0" />
      </g>
    </svg>
  );
}

Object.assign(window, { ProcessFog, buildProcessPath });
