import React from "react";

interface CoCreationGraphicProps {
  className?: string;
  size?: number;
}

export function CoCreationGraphic({
  className = "h-7 w-7",
  size = 28,
}: CoCreationGraphicProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Ambient Core Glow */}
        <radialGradient
          id="coreGlow"
          cx="38%"
          cy="38%"
          r="62%"
          fx="35%"
          fy="35%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="35%" stopColor="var(--accent, #8B8CF7)" stopOpacity="0.85" />
          <stop offset="80%" stopColor="var(--accent-hover, #6366F1)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--accent, #4F46E5)" stopOpacity="0.5" />
        </radialGradient>

        <linearGradient id="handGradientTop" x1="56" y1="8" x2="32" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.75" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="handGradientBottom" x1="8" y1="56" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.75" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.95" />
        </linearGradient>

        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Top Hand Reaching Downward (Curved wrist & elegant fingers guiding the sphere) */}
      <g filter="url(#softGlow)">
        {/* Upper wrist and palm line */}
        <path
          d="M 58 6 C 54 11 49 15 44 19 C 40 22 36 24 31 24 C 28 24 25.5 22.8 24 21 C 22.5 19.2 23 17 25 16 C 28 14.5 32 15 36 14 C 40 13 46 9 52 4 Z"
          fill="url(#handGradientTop)"
        />
        {/* Top extended fingers curving gently over the core */}
        <path
          d="M 33 24 C 30 25 27 27 25 30 C 24 31.5 25 33 26.5 33 C 28.5 33 31 30.5 34 28 C 36 26.5 35 24 33 24 Z"
          fill="currentColor"
          fillOpacity="0.9"
        />
        <path
          d="M 42 21 C 39 23 37 26 36 29 C 35.5 30.5 37 31.5 38.5 31 C 40.5 30 42.5 26.5 44 24 Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
      </g>

      {/* Central Spherical Core / The Product Being Built Together */}
      <circle
        cx="32"
        cy="32"
        r="7.5"
        fill="url(#coreGlow)"
        className="drop-shadow-[0_0_8px_rgba(139,140,247,0.6)]"
      />
      {/* Specular 3D Highlight */}
      <circle
        cx="30"
        cy="30"
        r="2"
        fill="#FFFFFF"
        fillOpacity="0.85"
      />

      {/* Bottom Hand Reaching Upward (Curved wrist & cupped fingers supporting the sphere) */}
      <g filter="url(#softGlow)">
        {/* Lower wrist and palm line */}
        <path
          d="M 6 58 C 10 53 15 49 20 45 C 24 42 28 40 33 40 C 36 40 38.5 41.2 40 43 C 41.5 44.8 41 47 39 48 C 36 49.5 32 49 28 50 C 24 51 18 55 12 60 Z"
          fill="url(#handGradientBottom)"
        />
        {/* Bottom extended fingers curving gently under the core */}
        <path
          d="M 31 40 C 34 39 37 37 39 34 C 40 32.5 39 31 37.5 31 C 35.5 31 33 33.5 30 36 C 28 37.5 29 40 31 40 Z"
          fill="currentColor"
          fillOpacity="0.9"
        />
        <path
          d="M 22 43 C 25 41 27 38 28 35 C 28.5 33.5 27 32.5 25.5 33 C 23.5 34 21.5 37.5 20 40 Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
      </g>
    </svg>
  );
}

