import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function WhatsAppIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12.031 2C6.508 2 2.023 6.484 2.023 12.004c0 1.766.461 3.49 1.337 5.012L2 22l5.122-1.343a9.97 9.97 0 0 0 4.905 1.295h.004c5.522 0 10.008-4.484 10.008-10.004 0-2.673-1.041-5.186-2.931-7.076A9.943 9.943 0 0 0 12.031 2Zm0 18.263h-.003a8.293 8.293 0 0 1-4.231-1.158l-.303-.18-3.039.797.811-2.963-.197-.314a8.288 8.288 0 0 1-1.275-4.441c0-4.588 3.733-8.32 8.34-8.32 2.227 0 4.321.868 5.896 2.443a8.283 8.283 0 0 1 2.442 5.881c0 4.588-3.753 8.255-8.441 8.255Zm4.568-6.228c-.25-.125-1.48-.731-1.709-.814-.229-.083-.396-.125-.562.125-.167.25-.646.814-.792.98-.146.167-.292.188-.542.063-.25-.125-1.055-.389-2.01-1.24-.743-.662-1.245-1.482-1.391-1.732-.146-.25-.015-.385.11-.51.112-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.062-.125-.562-1.355-.771-1.856-.203-.487-.409-.421-.562-.429l-.479-.008c-.167 0-.438.063-.667.313-.229.25-.875.855-.875 2.085 0 1.23.896 2.419 1.021 2.586.125.167 1.764 2.693 4.273 3.776.597.258 1.063.412 1.426.527.599.19 1.145.163 1.576.099.481-.072 1.48-.605 1.688-1.189.208-.584.208-1.085.146-1.189-.063-.104-.229-.167-.479-.292Z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  );
}

export function GitHubIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

/**
 * Custom Skills Icon (Reference Image 1):
 * Half Lightbulb (left) + Half Engineering Gear (right) with inner core gear & radiating rays.
 * Clean, balanced geometry designed for crisp rendering at 20px-22px.
 */
export function SkillsBulbGearIcon({ size = 21, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* 5 Radiating Idea Rays */}
      <line x1="12" y1="1.8" x2="12" y2="3.8" />
      <line x1="5.2" y1="4.4" x2="6.7" y2="5.9" />
      <line x1="18.8" y1="4.4" x2="17.3" y2="5.9" />
      <line x1="2.2" y1="11.2" x2="4.2" y2="11.2" />
      <line x1="19.8" y1="11.2" x2="21.8" y2="11.2" />

      {/* Left Half: Smooth Lightbulb Contour */}
      <path d="M12 6.4a5.4 5.4 0 0 0-5.4 5.4c0 1.85.85 3.3 1.85 4.45.45.52.75 1.15.85 1.75h2.7" />

      {/* Right Half: Sculpted Outer Gear Teeth Arch */}
      <path
        fill="currentColor"
        stroke="none"
        d="M12.3 6.1c.48 0 .95.08 1.4.22l.65-.92a.55.55 0 0 1 .76-.13l1.02.74c.24.18.3.52.14.77l-.62.95c.35.42.63.9.82 1.42l1.12-.12c.3-.03.57.18.62.48l.22 1.24c.05.3-.14.58-.44.65l-1.1.25c-.04.55-.18 1.08-.42 1.56l.84.76c.22.2.25.54.06.77l-.82.98a.55.55 0 0 1-.77.08l-.86-.72a5.2 5.2 0 0 1-1.32.68l.12 1.05a.55.55 0 0 1-.48.61l-1.22.14a.55.55 0 0 1-.6-.48l-.08-.85v-1.7a3.2 3.2 0 0 0 0-6.4V6.1Z"
      />

      {/* Inner Precision Gear Core */}
      <circle cx="12" cy="11.7" r="1.75" strokeWidth={1.65} />
      <path
        d="M12 9.1v.7M12 13.6v.7M9.4 11.7h.7M13.9 11.7h.7M10.15 9.85l.5.5M13.35 13.05l.5.5M13.85 9.85l-.5.5M10.65 13.05l-.5.5"
        strokeWidth={1.5}
      />

      {/* Bulb Base Lines */}
      <line x1="9.3" y1="20.2" x2="14.7" y2="20.2" />
      <line x1="10.4" y1="22.2" x2="13.6" y2="22.2" />
    </svg>
  );
}

/**
 * Custom Developer Journey Icon (Reference Image 2):
 * Person climbing a 3-step staircase — clean, modern stroke geometry.
 */
export function JourneyStairsIcon({ size = 21, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Person Head */}
      <circle cx="10.2" cy="4.2" r="2.1" />

      {/* Person Climbing Body, Arms & Stepping Legs */}
      <path d="M5.2 11.2 6.4 8.2 9.8 7.5 12.6 9.8 14.8 9" />
      <path d="M9.8 7.5 8.8 12.2 12.4 13.4 12.4 16.5" />
      <path d="M8.8 12.2 7.2 17.8" />

      {/* 3-Step Career Progression Staircase */}
      <path d="M4.5 21.2h16.5v-7.2h-4.8v3.6h-4.8v3.6H4.5Z" />
    </svg>
  );
}
