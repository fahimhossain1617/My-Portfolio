"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { RotateCw } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  r: number;
  g: number;
  b: number;
  uiR: number;
  uiG: number;
  uiB: number;
  size: number;
  delay: number;
  baseAlpha: number;
  swirlAngle: number;
}

export function HeroParticlePortrait({
  src = "/images/fahim-portrait.png",
  alt = "Md. Fahim Hossain Portrait",
}: {
  src?: string;
  alt?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);
  const isImageLoadedRef = useRef<boolean>(false);
  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const drawRectRef = useRef<{ x: number; y: number; w: number; h: number }>({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });

  const [photoOpacity, setPhotoOpacity] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setPhotoOpacity(1);
      }
    }
  }, []);

  // Safety fallback so portrait is always visible after animation window
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setPhotoOpacity(1);
    }, 5800);
    return () => clearTimeout(safetyTimer);
  }, []);

  const initParticles = useCallback(
    (img: HTMLImageElement, width: number, height: number) => {
      try {
        const offCanvas = document.createElement("canvas");
        const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
        if (!offCtx) return;

        const imgAspect = img.naturalWidth / img.naturalHeight;
        let drawWidth = width;
        let drawHeight = width / imgAspect;

        if (drawHeight > height) {
          drawHeight = height;
          drawWidth = height * imgAspect;
        }

        const offsetX = (width - drawWidth) / 2;
        const offsetY = height - drawHeight;
        drawRectRef.current = {
          x: offsetX,
          y: offsetY,
          w: drawWidth,
          h: drawHeight,
        };

        offCanvas.width = width;
        offCanvas.height = height;
        offCtx.clearRect(0, 0, width, height);
        offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        const imgData = offCtx.getImageData(0, 0, width, height).data;
        const particles: Particle[] = [];
        const step = width < 480 ? 5 : 4;

        const isLightMode =
          typeof document !== "undefined" &&
          document.documentElement.getAttribute("data-theme") === "light";

        // Theme-aware UI Palette colors
        const uiPalette = isLightMode
          ? [
              [91, 93, 224], // #5B5DE0 (--accent light)
              [59, 130, 246], // #3B82F6 (vibrant blue)
              [79, 70, 229], // #4F46E5 (indigo)
              [14, 165, 233], // #0EA5E9 (sky blue)
            ]
          : [
              [139, 140, 247], // #8B8CF7 (--accent dark)
              [96, 165, 250], // #60A5FA (glowing blue)
              [56, 189, 248], // #38BDF8 (cyan blue)
              [201, 202, 248], // #C9CAF8 (--text)
            ];

        const centerX = width * 0.5;
        const centerY = height * 0.52;
        const maxSpawnRadiusX = width * 0.42;
        const maxSpawnRadiusY = height * 0.4;

        for (let y = 0; y < height; y += step) {
          const normY = y / height;
          // Show full pants/body without premature cutting off, only subtle fade at the very bottom 4%
          const bottomFade =
            normY > 0.94 ? Math.max(0, 1 - (normY - 0.94) / 0.06) : 1;

          for (let x = 0; x < width; x += step) {
            const index = (y * width + x) * 4;
            const alpha = imgData[index + 3];

            if (alpha > 45) {
              const r = imgData[index];
              const g = imgData[index + 1];
              const b = imgData[index + 2];

              const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              const paletteColor =
                uiPalette[Math.floor(Math.random() * uiPalette.length)];

              const shade = isLightMode ? 0.55 + lum * 0.55 : 0.45 + lum * 0.85;
              const uiR = Math.min(255, Math.round(paletteColor[0] * shade));
              const uiG = Math.min(255, Math.round(paletteColor[1] * shade));
              const uiB = Math.min(255, Math.round(paletteColor[2] * shade));

              // Spawn particles in a soft organic elliptical cloud strictly inside canvas bounds
              const angle = Math.random() * Math.PI * 2;
              const radialDist = Math.pow(Math.random(), 0.75);
              const originX =
                centerX +
                Math.cos(angle) * radialDist * maxSpawnRadiusX +
                (Math.random() - 0.5) * 14;
              const originY =
                centerY +
                Math.sin(angle) * radialDist * maxSpawnRadiusY +
                (Math.random() - 0.5) * 14;

              const jitterX = (Math.random() - 0.5) * 1.8;
              const jitterY = (Math.random() - 0.5) * 1.8;

              particles.push({
                x: originX,
                y: originY,
                originX,
                originY,
                targetX: x + jitterX,
                targetY: y + jitterY,
                r,
                g,
                b,
                uiR,
                uiG,
                uiB,
                size: (Math.random() * 1.25 + 1.05),
                delay: Math.random() * 0.55,
                baseAlpha: (alpha / 255) * bottomFade,
                swirlAngle: (Math.random() - 0.5) * 1.1,
              });
            }
          }
        }

        if (particles.length > 50) {
          particlesRef.current = particles;
        } else {
          setPhotoOpacity(1);
        }
      } catch {
        setPhotoOpacity(1);
      }
    },
    []
  );

  const runAnimation = useCallback(() => {
    if (isReducedMotion) {
      setPhotoOpacity(1);
      return;
    }

    setPhotoOpacity(0);
    startTimeRef.current = performance.now();

    const canvas = canvasRef.current;
    const img = imageElementRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const { x: dx, y: dy, w: dw, h: dh } = drawRectRef.current;

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      ctx.clearRect(0, 0, width, height);

      const gatherDuration = 1.85;
      const sweepStart = 1.75;
      const sweepDuration = 2.9;
      const rawSweep = Math.max(
        0,
        Math.min(1, (elapsed - sweepStart) / sweepDuration)
      );

      const sweepProgress = 0.5 - 0.5 * Math.cos(rawSweep * Math.PI);
      const topLimit = Math.max(0, dy + dh * 0.08);
      const bottomStart = height * 0.98;
      const scanY =
        elapsed < sweepStart
          ? bottomStart + 35
          : bottomStart - sweepProgress * (bottomStart - topLimit);

      // 1. Progressively draw the REAL portrait below scanY with a soft feathered transition band
      if (elapsed >= sweepStart && elapsed < 5.0) {
        const featherBand = 36;
        const solidTop = Math.max(0, Math.floor(scanY + featherBand * 0.45));

        if (solidTop < height) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(0, solidTop, width, height - solidTop);
          ctx.clip();
          ctx.drawImage(img, dx, dy, dw, dh);
          ctx.restore();
        }

        const numSlices = 12;
        const bandStart = Math.max(0, scanY - featherBand * 0.55);
        const sliceHeight = (solidTop - bandStart) / numSlices;
        if (sliceHeight > 0.2) {
          for (let s = 0; s < numSlices; s++) {
            const sy = bandStart + s * sliceHeight;
            const sliceAlpha = (s + 1) / (numSlices + 1);
            ctx.save();
            ctx.globalAlpha = sliceAlpha * sliceAlpha;
            ctx.beginPath();
            ctx.rect(0, sy, width, sliceHeight + 0.8);
            ctx.clip();
            ctx.drawImage(img, dx, dy, dw, dh);
            ctx.restore();
          }
        }
      }

      // Crossfade to the native <Image> element at the end of the sweep
      if (elapsed >= 4.45) {
        const finalOpacity = Math.min(1, (elapsed - 4.45) / 0.5);
        setPhotoOpacity(finalOpacity);
      } else {
        setPhotoOpacity(0);
      }

      // 2. Draw Organic Particles
      const particles = particlesRef.current;
      const globalFadeOut =
        elapsed > 4.55 ? Math.max(0, 1 - (elapsed - 4.55) / 0.45) : 1;

      if (globalFadeOut > 0.01 && particles.length > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (p.targetY > scanY + 26) continue;

          const localProgress = Math.max(
            0,
            Math.min(1, (elapsed - p.delay) / gatherDuration)
          );
          const eased = 1 - Math.pow(1 - localProgress, 4);

          const arcOffset =
            Math.sin(localProgress * Math.PI) * p.swirlAngle * 22;
          const dxFlight = p.targetX - p.originX;
          const dyFlight = p.targetY - p.originY;

          p.x = p.originX + dxFlight * eased - dyFlight * 0.08 * arcOffset;
          p.y = p.originY + dyFlight * eased + dxFlight * 0.08 * arcOffset;

          const distToScan = scanY - p.targetY;
          let r = p.uiR;
          let g = p.uiG;
          let b = p.uiB;
          const entryFade = Math.min(1, localProgress * 2.5);
          let alpha = 0.88 * p.baseAlpha * entryFade * globalFadeOut;
          let radius = p.size;

          if (distToScan >= -26 && distToScan <= 36) {
            const beamFactor = Math.max(0, 1 - Math.abs(distToScan) / 36);
            r = Math.min(255, Math.round(p.uiR + (96 - p.uiR) * beamFactor));
            g = Math.min(255, Math.round(p.uiG + (195 - p.uiG) * beamFactor));
            b = 255;
            radius = p.size * (1 + beamFactor * 0.5);
            if (distToScan < 0) {
              alpha *= Math.max(0, 1 + distToScan / 26);
            }
          }

          if (alpha <= 0.01) continue;

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Draw the 3D Helical "Spring Roll" Light Coil
      if (elapsed >= sweepStart && elapsed <= 4.7) {
        const ringAlpha =
          rawSweep < 0.08
            ? rawSweep / 0.08
            : rawSweep > 0.88
            ? Math.max(0, (1 - rawSweep) / 0.12)
            : 1;

        const centerX = width * 0.5;
        const normScan = Math.max(0, Math.min(1, scanY / height));
        const radiusX = width * (0.26 + 0.12 * Math.sin(normScan * Math.PI));
        const coilHeight = 46;
        const turns = 2.25;
        const rotSpeed = elapsed * 5.2;
        const totalSamples = 110;

        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Back half of helical spring
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#60a5fa";
        for (let i = 0; i < totalSamples; i++) {
          const t0 = i / totalSamples;
          const t1 = (i + 1) / totalSamples;
          const theta0 = t0 * Math.PI * 2 * turns - rotSpeed;
          const theta1 = t1 * Math.PI * 2 * turns - rotSpeed;

          const depth = Math.sin(theta0);
          if (depth >= 0) continue;

          const x0 = centerX + Math.cos(theta0) * radiusX;
          const y0 =
            scanY + (t0 - 0.5) * coilHeight + Math.sin(theta0) * 9;
          const x1 = centerX + Math.cos(theta1) * radiusX;
          const y1 =
            scanY + (t1 - 0.5) * coilHeight + Math.sin(theta1) * 9;

          const endTaper = Math.sin(t0 * Math.PI);
          const segAlpha = ringAlpha * endTaper * 0.35;

          ctx.strokeStyle = `rgba(96, 165, 250, ${segAlpha})`;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }

        // Front half of helical spring
        for (let i = 0; i < totalSamples; i++) {
          const t0 = i / totalSamples;
          const t1 = (i + 1) / totalSamples;
          const theta0 = t0 * Math.PI * 2 * turns - rotSpeed;
          const theta1 = t1 * Math.PI * 2 * turns - rotSpeed;

          const depth = Math.sin(theta0);
          if (depth < -0.05) continue;

          const x0 = centerX + Math.cos(theta0) * radiusX;
          const y0 =
            scanY + (t0 - 0.5) * coilHeight + Math.sin(theta0) * 9;
          const x1 = centerX + Math.cos(theta1) * radiusX;
          const y1 =
            scanY + (t1 - 0.5) * coilHeight + Math.sin(theta1) * 9;

          const endTaper = Math.sin(t0 * Math.PI);
          const frontFactor = (depth + 0.1) / 1.1;
          const segAlpha = ringAlpha * endTaper * (0.45 + 0.55 * frontFactor);

          ctx.shadowBlur = 16;
          ctx.shadowColor = "#38bdf8";
          ctx.strokeStyle = `rgba(56, 189, 248, ${segAlpha * 0.9})`;
          ctx.lineWidth = 3.4 * (0.7 + 0.4 * frontFactor);
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();

          ctx.shadowBlur = 6;
          ctx.shadowColor = "#e0f2fe";
          ctx.strokeStyle = `rgba(224, 242, 254, ${segAlpha * 0.85})`;
          ctx.lineWidth = 1.3 * (0.7 + 0.3 * frontFactor);
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }

        ctx.restore();
      }

      if (elapsed < 5.0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height);
        setPhotoOpacity(1);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isReducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const img = new window.Image();
    img.src = src;
    imageElementRef.current = img;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      if (width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;

      if (isImageLoadedRef.current) {
        initParticles(img, width, height);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        runAnimation();
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      isImageLoadedRef.current = true;
      handleResize();
    } else {
      img.onload = () => {
        isImageLoadedRef.current = true;
        handleResize();
      };
      img.onerror = () => {
        setPhotoOpacity(1);
      };
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [src, initParticles, runAnimation]);

  // Gentle, subtle bottom mask only at the very bottom cut edge (pants & belt fully visible)
  const portraitMaskStyle: React.CSSProperties = {
    WebkitMaskImage:
      "linear-gradient(to bottom, black 0%, black 86%, rgba(0,0,0,0.7) 94%, transparent 100%)",
    maskImage:
      "linear-gradient(to bottom, black 0%, black 86%, rgba(0,0,0,0.7) 94%, transparent 100%)",
  };

  return (
    <div
      ref={containerRef}
      className="group relative mx-auto flex aspect-square w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[370px] lg:max-w-[410px] items-center justify-center overflow-visible bg-transparent select-none"
    >
      {/* Subtle Ambient UI-Accent Aura Behind Portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 bottom-8 top-14 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
        style={{
          background:
            "radial-gradient(circle at 50% 52%, var(--accent), transparent 70%)",
        }}
      />

      {/* Masked Portrait + Particle Canvas Wrapper */}
      <div
        className="relative h-full w-full"
        style={portraitMaskStyle}
      >
        {/* Layer 1: Crisp, Unaltered Real Portrait */}
        <div
          className="absolute inset-0 flex items-end justify-center pointer-events-none"
          style={{ opacity: photoOpacity }}
        >
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 370px, 410px"
              className="object-contain object-bottom select-none"
            />
          </div>
        </div>

        {/* Layer 2: Particle & Helical Spring-Roll Light Reveal Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full z-10"
        />
      </div>

      {/* Gentle, non-overpowering smoky fade only right at the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1 inset-x-8 z-20 h-8 rounded-full blur-lg opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 85% 90% at 50% 90%, var(--bg) 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
