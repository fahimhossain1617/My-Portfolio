/*
 * waves-background.js
 * Silk-ribbon canvas background for the portfolio. No dependencies.
 *
 * Usage (after the DOM is ready):
 *   initWaves({ hero: '#hero', footer: 'footer' });
 *
 * - Fades in while the hero section scrolls out, fades out before the footer.
 * - Reads the page theme itself: colour comes from the --accent CSS variable,
 *   dark/light is detected from the page background. Re-checks on theme change.
 * - Scroll-driven: ribbon curves, pinch points and light spots move with scroll (eased).
 * - Respects prefers-reduced-motion, pauses in hidden tabs, skips drawing when invisible.
 */
(function (g) {
  function nums(c) { var m = String(c).match(/[\d.]+/g); return m ? m.slice(0, 3).map(Number) : [0, 0, 0]; }
  function hex(c) {
    c = c.trim();
    if (c[0] === '#') {
      if (c.length === 4) c = '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
      return [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16)];
    }
    return nums(c);
  }
  function mix(a, b, t) { return a.map(function (v, i) { return Math.round(v + (b[i] - v) * t); }); }
  function clamp(v) { return Math.max(0, Math.min(1, v)); }
  function smooth(t) { return t * t * (3 - 2 * t); }

  g.initWaves = function (o) {
    o = o || {};
    var hero = document.querySelector(o.hero || '#hero'), foot = document.querySelector(o.footer || 'footer');
    if (!hero || !foot) return function () {};

    /* ---- tuning ---- */
    // Dark: 0.42 (slightly reduced from original 0.50, rich and vivid)
    // Light: 0.35 (clean, soft pearl lavender, never muddy)
    var MAX_DARK = o.maxDark !== undefined ? o.maxDark : 0.42;
    var MAX_LIGHT = o.maxLight !== undefined ? o.maxLight : 0.35;
    var SPEED = o.speed !== undefined ? o.speed : 0.45;

    var RIBBONS = [
      { y: 0.13, a: 0.08, f: 1.15, s: 0.09, t: 0.28, p: 0.5, d: 0.8, g: 1.3, k: 1, n: 18 },
      { y: 0.84, a: 0.13, f: 1.0, s: 0.07, t: 0.42, p: 2.4, d: -1, g: 1.1, k: 1, n: 22 },
      { y: 0.56, a: 0.07, f: 1.8, s: 0.11, t: 0.15, p: 4.2, d: 1.4, g: 1.7, k: 0.5, n: 10 }
    ];

    var root = document.documentElement;
    var c = document.createElement('canvas');
    c.setAttribute('aria-hidden', 'true');
    c.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0';
    document.body.insertBefore(c, document.body.firstChild);
    var x = c.getContext('2d');
    if (!x) return function () {};

    var W, H, T = 0, P = 0, target = 0, op = 0, opT = 0, tick = 0, last = performance.now(), raf = 0;
    var dark = true, col = [139, 140, 247], hi = [222, 220, 255];
    var TH = Math.PI * 2;
    var still = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function theme() {
      var bgs = [getComputedStyle(document.body).backgroundColor, getComputedStyle(root).backgroundColor]
        .filter(function (v) { return v && v !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(v); });
      if (bgs.length) { var b = nums(bgs[0]); dark = (.299 * b[0] + .587 * b[1] + .114 * b[2]) / 255 < .5; }
      else dark = matchMedia('(prefers-color-scheme: dark)').matches;
      var ac = getComputedStyle(root).getPropertyValue('--accent').trim();
      if (dark) {
        col = ac ? hex(ac) : [139, 140, 247];
        hi = mix(col, [255, 255, 255], 0.72);
      } else {
        col = ac ? hex(ac) : [91, 93, 224];
        hi = mix(col, [255, 255, 255], 0.65);
      }
    }

    function size() {
      var d = Math.min(devicePixelRatio || 1, innerWidth < 700 ? 1.5 : 2);
      W = innerWidth; H = innerHeight;
      c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0);
    }

    function measure() {
      if (!hero || !foot) return;
      var vh = innerHeight;
      var heroBottom = hero.getBoundingClientRect().bottom;
      var footTop = foot.getBoundingClientRect().top;
      var fadeIn = clamp(1 - heroBottom / (vh * .55));
      var fadeOut = clamp((footTop - vh * .9) / (vh * .7));
      opT = (dark ? MAX_DARK : MAX_LIGHT) * smooth(fadeIn) * smooth(fadeOut);
      target = scrollY / H;
    }

    function cl(r, u, fs) {
      return r.y * H + H * .05 * r.d * P
        + H * r.a * Math.sin(u * TH * r.f * fs * .5 + r.p + T * r.s + P * r.d * 1.2)
        + H * r.a * .45 * Math.sin(u * TH * r.f * fs * 1.4 + r.p * 1.7 - T * r.s * .8 - P * r.d * .5);
    }

    function hw(r, u, fs) {
      var q = Math.sin(u * Math.PI * r.g * fs + r.p + T * r.s * .5 + P * .7);
      return H * r.t * (.10 + .90 * q * q) / 2;
    }

    function line(r, sd, fs, N, rev) {
      for (var i = 0; i <= N; i++) {
        var u = rev ? 1 - i / N : i / N;
        x.lineTo(-30 + u * (W + 60), cl(r, u, fs) + sd * hw(r, u, fs));
      }
    }

    function draw() {
      if (!x) return;
      x.globalCompositeOperation = 'source-over';
      x.globalAlpha = 1;
      x.clearRect(0, 0, W, H);
      var D = dark;
      var base = col.join(',');
      var hl = hi.join(',');
      var fs = Math.max(.55, Math.min(1, W / 1100));
      var N = 72;

      x.globalCompositeOperation = D ? 'lighter' : 'source-over';

      RIBBONS.forEach(function (r) {
        var hp = .5 + .36 * Math.sin(T * .06 + r.p + P * .7);
        var hx = hp * W;
        var hy = cl(r, hp, fs);

        var g1 = x.createLinearGradient(0, 0, W, 0);
        g1.addColorStop(0, 'rgba(' + base + ',0)');
        g1.addColorStop(hp, 'rgba(' + base + ',' + (D ? 0.20 : 0.12) * r.k + ')');
        g1.addColorStop(1, 'rgba(' + base + ',' + (D ? 0.03 : 0.02) * r.k + ')');

        x.globalAlpha = 1;
        x.beginPath();
        x.moveTo(-30, cl(r, 0, fs) - hw(r, 0, fs));
        line(r, -1, fs, N, false);
        line(r, 1, fs, N, true);
        x.closePath();
        x.fillStyle = g1;
        x.fill();

        var rg = x.createRadialGradient(hx, hy, 0, hx, hy, H * .26);
        if (D) {
          rg.addColorStop(0, 'rgba(' + base + ',' + 0.16 * r.k + ')');
          rg.addColorStop(1, 'rgba(' + base + ',0)');
        } else {
          rg.addColorStop(0, 'rgba(' + hl + ',' + 0.14 * r.k + ')');
          rg.addColorStop(1, 'rgba(' + base + ',0)');
        }
        x.fillStyle = rg;
        x.fillRect(hx - H * .3, hy - H * .3, H * .6, H * .6);

        var ln = x.createLinearGradient(0, 0, W, 0);
        ln.addColorStop(0, 'rgba(' + base + ',0)');
        ln.addColorStop(hp * .5, 'rgba(' + base + ',' + (D ? 0.5 : 0.35) + ')');
        ln.addColorStop(hp, 'rgba(' + hl + ',' + (D ? 1 : 0.85) + ')');
        ln.addColorStop((1 + hp) / 2, 'rgba(' + base + ',' + (D ? 0.55 : 0.40) + ')');
        ln.addColorStop(1, 'rgba(' + base + ',' + (D ? 0.12 : 0.08) + ')');

        x.strokeStyle = ln;
        x.lineWidth = D ? 1.0 : 0.9;
        x.lineCap = 'round';
        x.lineJoin = 'round';

        var n = r.n;
        for (var j = 0; j <= n; j++) {
          var sd = -1 + 2 * j / n;
          var e = Math.abs(sd);
          var strokeAlpha = (0.07 + 0.93 * Math.pow(e, 4)) * r.k * (D ? 1 : 0.75);
          x.globalAlpha = strokeAlpha;
          x.beginPath();
          x.moveTo(-30, cl(r, 0, fs) + sd * hw(r, 0, fs));
          line(r, sd, fs, N, false);
          x.stroke();
        }
      });

      x.globalAlpha = 1;
      x.globalCompositeOperation = 'source-over';
    }

    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (document.hidden) { last = now; return; }
      var dt = Math.min((now - last) / 1000, .05);
      last = now;
      if (++tick % 30 === 1) theme();
      measure();
      op += (opT - op) * Math.min(1, dt * 6);
      c.style.opacity = op.toFixed(3);
      if (op < .01) return;
      T += dt * SPEED;
      P += (target - P) * Math.min(1, dt * 4);
      draw();
    }

    function once() {
      measure();
      op = opT;
      c.style.opacity = op.toFixed(3);
      P = target;
      if (op >= .01) draw();
    }

    function onResize() {
      if (innerWidth !== W || Math.abs(innerHeight - H) > 150) {
        size();
        if (still) once();
      }
    }

    var mo = new MutationObserver(function () {
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
    addEventListener('resize', onResize);
    if (still) {
      addEventListener('scroll', once, { passive: true });
      once();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return function destroy() {
      cancelAnimationFrame(raf);
      mo.disconnect();
      removeEventListener('resize', onResize);
      removeEventListener('scroll', once);
      c.remove();
    };
  };
})(typeof window !== 'undefined' ? window : this);
