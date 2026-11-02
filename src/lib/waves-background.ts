/*
 * waves-background.ts
 * Silk-ribbon canvas background for the portfolio.
 *
 * - Peak opacity: Dark mode ~0.35 (gently reduced by just a touch for eye-comfort and premium smoothness),
 *   Light mode ~0.35 (refined luminous pearl/lavender silk sheen).
 * - Full original 3-ribbon multi-strand architecture.
 * - Smooth scroll-driven motion and gentle ambient drift.
 * - Clean fade out before footer, hero remains clean.
 */

export interface WavesOptions {
  hero?: string;
  footer?: string;
  maxDark?: number;
  maxLight?: number;
  speed?: number;
}

export function initWaves(o?: WavesOptions): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }
  o = o || {};
  const hero = document.querySelector(o.hero || "#hero") as HTMLElement | null;
  const foot = document.querySelector(o.footer || "footer") as HTMLElement | null;
  if (!hero || !foot) return () => {};

  function nums(c: string): number[] {
    const m = String(c).match(/[\d.]+/g);
    return m ? m.slice(0, 3).map(Number) : [0, 0, 0];
  }
  function hex(c: string): number[] {
    c = c.trim();
    if (c[0] === "#") {
      if (c.length === 4) c = "#" + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
      return [
        parseInt(c.substr(1, 2), 16),
        parseInt(c.substr(3, 2), 16),
        parseInt(c.substr(5, 2), 16),
      ];
    }
    return nums(c);
  }
  function mix(a: number[], b: number[], t: number): number[] {
    return a.map((v, i) => Math.round(v + (b[i] - v) * t));
  }
  function clamp(v: number): number {
    return Math.max(0, Math.min(1, v));
  }
  function smooth(t: number): number {
    return t * t * (3 - 2 * t);
  }

  /* ---- tuning ---- */
  // Dark: 0.35 (just slightly reduced from 0.42 for a perfectly smooth, premium, eye-soothing look)
  // Light: 0.35 (soft, luminous pearl lavender)
  const MAX_DARK = o.maxDark !== undefined ? o.maxDark : 0.35;
  const MAX_LIGHT = o.maxLight !== undefined ? o.maxLight : 0.35;
  const SPEED = o.speed !== undefined ? o.speed : 0.42;

  const RIBBONS = [
    { y: 0.13, a: 0.08, f: 1.15, s: 0.09, t: 0.28, p: 0.5, d: 0.8, g: 1.3, k: 1, n: 18 },
    { y: 0.84, a: 0.13, f: 1.0, s: 0.07, t: 0.42, p: 2.4, d: -1, g: 1.1, k: 1, n: 22 },
    { y: 0.56, a: 0.07, f: 1.8, s: 0.11, t: 0.15, p: 4.2, d: 1.4, g: 1.7, k: 0.5, n: 10 },
  ];

  const root = document.documentElement;
  const c = document.createElement("canvas");
  c.setAttribute("aria-hidden", "true");
  c.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0";
  document.body.insertBefore(c, document.body.firstChild);
  const x = c.getContext("2d");
  if (!x) return () => {};

  let W: number,
    H: number,
    T = 0,
    P = 0,
    target = 0,
    op = 0,
    opT = 0,
    tick = 0,
    last = performance.now(),
    raf = 0;
  let dark = true,
    col = [139, 140, 247],
    hi = [222, 220, 255];
  const TH = Math.PI * 2;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function theme() {
    const bgs = [
      getComputedStyle(document.body).backgroundColor,
      getComputedStyle(root).backgroundColor,
    ].filter((v) => v && v !== "transparent" && !/rgba\(.*,\s*0\)$/.test(v));
    if (bgs.length) {
      const b = nums(bgs[0]);
      dark = (0.299 * b[0] + 0.587 * b[1] + 0.114 * b[2]) / 255 < 0.5;
    } else {
      dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    const ac = getComputedStyle(root).getPropertyValue("--accent").trim();
    if (dark) {
      col = ac ? hex(ac) : [139, 140, 247];
      hi = mix(col, [255, 255, 255], 0.72);
    } else {
      col = ac ? hex(ac) : [91, 93, 224];
      hi = mix(col, [255, 255, 255], 0.65);
    }
  }

  function size() {
    const d = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.5 : 2);
    W = window.innerWidth;
    H = window.innerHeight;
    c.width = W * d;
    c.height = H * d;
    x!.setTransform(d, 0, 0, d, 0, 0);
  }

  function measure() {
    if (!hero || !foot) return;
    const vh = window.innerHeight;
    const heroBottom = hero.getBoundingClientRect().bottom;
    const footTop = foot.getBoundingClientRect().top;
    const fadeIn = clamp(1 - heroBottom / (vh * 0.55));
    const fadeOut = clamp((footTop - vh * 0.9) / (vh * 0.7));
    opT = (dark ? MAX_DARK : MAX_LIGHT) * smooth(fadeIn) * smooth(fadeOut);
    target = window.scrollY / H;
  }

  function cl(r: any, u: number, fs: number): number {
    return (
      r.y * H +
      H * 0.05 * r.d * P +
      H * r.a * Math.sin(u * TH * r.f * fs * 0.5 + r.p + T * r.s + P * r.d * 1.2) +
      H * r.a * 0.45 * Math.sin(u * TH * r.f * fs * 1.4 + r.p * 1.7 - T * r.s * 0.8 - P * r.d * 0.5)
    );
  }

  function hw(r: any, u: number, fs: number): number {
    const q = Math.sin(u * Math.PI * r.g * fs + r.p + T * r.s * 0.5 + P * 0.7);
    return (H * r.t * (0.10 + 0.90 * q * q)) / 2;
  }

  function line(r: any, sd: number, fs: number, N: number, rev: boolean) {
    for (let i = 0; i <= N; i++) {
      const u = rev ? 1 - i / N : i / N;
      x!.lineTo(-30 + u * (W + 60), cl(r, u, fs) + sd * hw(r, u, fs));
    }
  }

  function draw() {
    if (!x) return;
    x.globalCompositeOperation = "source-over";
    x.globalAlpha = 1;
    x.clearRect(0, 0, W, H);
    const D = dark;
    const base = col.join(",");
    const hl = hi.join(",");
    const fs = Math.max(0.55, Math.min(1, W / 1100));
    const N = 72;

    x.globalCompositeOperation = D ? "lighter" : "source-over";

    RIBBONS.forEach((r) => {
      const hp = 0.5 + 0.36 * Math.sin(T * 0.06 + r.p + P * 0.7);
      const hx = hp * W;
      const hy = cl(r, hp, fs);

      // Translucent Silk Sheet Gradient Fill
      const g1 = x!.createLinearGradient(0, 0, W, 0);
      g1.addColorStop(0, "rgba(" + base + ",0)");
      g1.addColorStop(hp, "rgba(" + base + "," + (D ? 0.17 : 0.12) * r.k + ")");
      g1.addColorStop(1, "rgba(" + base + "," + (D ? 0.025 : 0.02) * r.k + ")");

      x!.globalAlpha = 1;
      x!.beginPath();
      x!.moveTo(-30, cl(r, 0, fs) - hw(r, 0, fs));
      line(r, -1, fs, N, false);
      line(r, 1, fs, N, true);
      x!.closePath();
      x!.fillStyle = g1;
      x!.fill();

      // Soft Specular Radial Sheen
      const rg = x!.createRadialGradient(hx, hy, 0, hx, hy, H * 0.26);
      if (D) {
        rg.addColorStop(0, "rgba(" + base + "," + 0.13 * r.k + ")");
        rg.addColorStop(1, "rgba(" + base + ",0)");
      } else {
        rg.addColorStop(0, "rgba(" + hl + "," + 0.14 * r.k + ")");
        rg.addColorStop(1, "rgba(" + base + ",0)");
      }
      x!.fillStyle = rg;
      x!.fillRect(hx - H * 0.3, hy - H * 0.3, H * 0.6, H * 0.6);

      // Multi-strand Silk Ribbon Lines
      const ln = x!.createLinearGradient(0, 0, W, 0);
      ln.addColorStop(0, "rgba(" + base + ",0)");
      ln.addColorStop(hp * 0.5, "rgba(" + base + "," + (D ? 0.45 : 0.35) + ")");
      ln.addColorStop(hp, "rgba(" + hl + "," + (D ? 0.90 : 0.85) + ")");
      ln.addColorStop((1 + hp) / 2, "rgba(" + base + "," + (D ? 0.48 : 0.40) + ")");
      ln.addColorStop(1, "rgba(" + base + "," + (D ? 0.10 : 0.08) + ")");

      x!.strokeStyle = ln;
      x!.lineWidth = D ? 1.0 : 0.9;
      x!.lineCap = "round";
      x!.lineJoin = "round";

      const n = r.n;
      for (let j = 0; j <= n; j++) {
        const sd = -1 + (2 * j) / n;
        const e = Math.abs(sd);
        const strokeAlpha = (0.06 + 0.94 * Math.pow(e, 4)) * r.k * (D ? 0.92 : 0.75);
        x!.globalAlpha = strokeAlpha;
        x!.beginPath();
        x!.moveTo(-30, cl(r, 0, fs) + sd * hw(r, 0, fs));
        line(r, sd, fs, N, false);
        x!.stroke();
      }
    });

    x.globalAlpha = 1;
    x.globalCompositeOperation = "source-over";
  }

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (document.hidden) {
      last = now;
      return;
    }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (++tick % 30 === 1) theme();
    measure();
    op += (opT - op) * Math.min(1, dt * 6);
    c.style.opacity = op.toFixed(3);
    if (op < 0.01) return;
    T += dt * SPEED;
    P += (target - P) * Math.min(1, dt * 4);
    draw();
  }

  function once() {
    measure();
    op = opT;
    c.style.opacity = op.toFixed(3);
    P = target;
    if (op >= 0.01) draw();
  }

  function onResize() {
    if (window.innerWidth !== W || Math.abs(window.innerHeight - H) > 150) {
      size();
      if (still) once();
    }
  }

  const mo = new MutationObserver(() => {
    theme();
    setTimeout(theme, 500);
    if (still) setTimeout(once, 520);
  });
  mo.observe(root, { attributes: true });
  mo.observe(document.body, { attributes: true });

  theme();
  size();
  measure();
  op = opT;
  P = target;
  c.style.opacity = op.toFixed(3);
  window.addEventListener("resize", onResize);
  if (still) {
    window.addEventListener("scroll", once, { passive: true });
    once();
  } else {
    raf = requestAnimationFrame(frame);
  }

  return function destroy() {
    cancelAnimationFrame(raf);
    mo.disconnect();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", once);
    c.remove();
  };
}
