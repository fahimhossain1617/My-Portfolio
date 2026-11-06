"use client";

import React from "react";

interface MessengerBirdProps {
  isFlying?: boolean;
  wingState?: "auto" | "up" | "down" | "resting";
  className?: string;
  renderFarWingOnly?: boolean;
  renderNearElementsOnly?: boolean;
}

/**
 * MessengerBird (3D Origami Paper-Plane Bird)
 * A studio-lit, multi-faceted 3D Origami Paper-Plane & Crane hybrid designed
 * in the 1150x960 coordinate space to carry the 3D Fahim Avatar.
 *
 * Features:
 * - 18+ precision geometric 3D paper facets with directional studio lighting,
 *   ambient occlusion fold creases, and specular edge highlights.
 * - Iconic paper-airplane V-keel underside, pointed supersonic paper nose/beak,
 *   and angular folded origami tail stabilizer.
 * - Articulated 3D Far & Near Delta Paper Wings that smoothly oscillate in 3D
 *   perspective space (rotate + scaleY foreshortening + outer wingtip flex).
 */
export function MessengerBird({
  isFlying = true,
  wingState = "auto",
  className = "",
  renderFarWingOnly = false,
  renderNearElementsOnly = false,
}: MessengerBirdProps) {
  const isUp = wingState === "up";
  const isDown = wingState === "down";
  const isAutoFlapping = isFlying && wingState === "auto";

  return (
    <g className={`origami-paper-bird ${className}`} id="messenger-bird">
      <defs>
        {/* =============================================================== */}
        {/* 3D STUDIO LIGHTING GRADIENTS FOR ORIGAMI PAPER FACETS           */}
        {/* =============================================================== */}
        {/* 1. Brilliant Sunlit Top Paper Facet */}
        <linearGradient id="origamiSunlitTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F5F7FF" />
          <stop offset="100%" stopColor="#E2E8FF" />
        </linearGradient>

        {/* 2. Warm Pearl Upper Fuselage Saddle */}
        <linearGradient id="origamiSaddleFacet" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#EEF2FF" />
          <stop offset="100%" stopColor="#D5DEFA" />
        </linearGradient>

        {/* 3. Mid-Tone Folded Flank Facet */}
        <linearGradient id="origamiMidFlank" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0E7FF" />
          <stop offset="60%" stopColor="#C3CEF8" />
          <stop offset="100%" stopColor="#A5B4EC" />
        </linearGradient>

        {/* 4. Deep 3D Ventral Paper-Plane V-Keel (Underside Shadow) */}
        <linearGradient id="origamiDeepKeel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8E9CE0" />
          <stop offset="55%" stopColor="#6B79C4" />
          <stop offset="100%" stopColor="#48549B" />
        </linearGradient>

        {/* 5. Far Wing Shaded Paper Gradient */}
        <linearGradient id="origamiFarWingMain" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#F4F6FF" />
          <stop offset="55%" stopColor="#D4DDFB" />
          <stop offset="100%" stopColor="#AAB8EE" />
        </linearGradient>

        {/* 6. Far Wing Outer Tip Gradient */}
        <linearGradient id="origamiFarWingTip" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#E4EAFF" />
          <stop offset="100%" stopColor="#C5D0F7" />
        </linearGradient>

        {/* 7. Near Wing Sunlit Delta Gradient */}
        <linearGradient id="origamiNearWingMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#EDF1FF" />
          <stop offset="100%" stopColor="#CBD5FA" />
        </linearGradient>

        {/* 8. Near Wing Underside Crease Fold */}
        <linearGradient id="origamiNearWingCrease" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C2CDF6" />
          <stop offset="100%" stopColor="#8B9AE2" />
        </linearGradient>

        {/* 9. Accent Glow Gradient for Paper-Plane Leading Edge & Nose */}
        <linearGradient id="origamiAccentEdge" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent, #8B8CF7)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.35" />
        </linearGradient>

        {/* 3D Soft Drop Shadow for Origami Depth */}
        <filter id="origamiDepthShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#090B1A" floodOpacity="0.42" />
        </filter>

        {/* =============================================================== */}
        {/* REALISTIC 3D PERSPECTIVE WING FLAPPING ANIMATIONS               */}
        {/* =============================================================== */}
        <style>{`
          /*
            3D Perspective Foreshortening Wing Cycle:
            Simulates true 3D rotation around the paper-plane's wing root crease
            by combining rotation, scaleY perspective projection (+1.06 upstroke
            to -0.52 downstroke), skewX, and dynamic lighting filter!
          */
          @keyframes origamiNearWing3DFlap {
            0% {
              transform: rotate(-18deg) scaleY(1.06) skewX(-4deg);
              filter: brightness(1.06);
            }
            28% {
              transform: rotate(6deg) scaleY(0.42) skewX(5deg);
              filter: brightness(0.96);
            }
            52% {
              transform: rotate(28deg) scaleY(-0.52) skewX(11deg);
              filter: brightness(0.86);
            }
            78% {
              transform: rotate(4deg) scaleY(0.48) skewX(4deg);
              filter: brightness(0.98);
            }
            100% {
              transform: rotate(-18deg) scaleY(1.06) skewX(-4deg);
              filter: brightness(1.06);
            }
          }

          @keyframes origamiFarWing3DFlap {
            0% {
              transform: rotate(-22deg) scaleY(1.05) skewX(-5deg);
              filter: brightness(1.04);
            }
            28% {
              transform: rotate(4deg) scaleY(0.46) skewX(4deg);
              filter: brightness(0.94);
            }
            52% {
              transform: rotate(24deg) scaleY(-0.48) skewX(9deg);
              filter: brightness(0.84);
            }
            78% {
              transform: rotate(2deg) scaleY(0.52) skewX(3deg);
              filter: brightness(0.95);
            }
            100% {
              transform: rotate(-22deg) scaleY(1.05) skewX(-5deg);
              filter: brightness(1.04);
            }
          }

          /* Secondary aerodynamic flex on the outer delta wingtips */
          @keyframes origamiWingtipFlex {
            0%, 100% {
              transform: rotate(-8deg) scaleY(1.04);
            }
            50% {
              transform: rotate(12deg) scaleY(0.88);
            }
          }

          .origami-near-wing-flapping {
            animation: origamiNearWing3DFlap 0.72s cubic-bezier(0.42, 0, 0.58, 1) infinite;
            transform-origin: 395px 568px;
            will-change: transform, filter;
          }

          .origami-far-wing-flapping {
            animation: origamiFarWing3DFlap 0.72s cubic-bezier(0.42, 0, 0.58, 1) infinite;
            transform-origin: 560px 455px;
            will-change: transform, filter;
          }

          .origami-near-tip-flex {
            animation: origamiWingtipFlex 0.72s ease-in-out infinite;
            transform-origin: 185px 335px;
          }

          .origami-far-tip-flex {
            animation: origamiWingtipFlex 0.72s ease-in-out infinite;
            transform-origin: 435px 190px;
          }

          @media (prefers-reduced-motion: reduce) {
            .origami-near-wing-flapping,
            .origami-far-wing-flapping,
            .origami-near-tip-flex,
            .origami-far-tip-flex {
              animation: none !important;
            }
          }
        `}</style>
      </defs>

      {/* =================================================================== */}
      {/* LAYER 1: FAR 3D ORIGAMI WING (Behind Rider & Fuselage)              */}
      {/* =================================================================== */}
      {(!renderNearElementsOnly || renderFarWingOnly) && (
        <g
          id="origami-far-wing-root"
          className={isAutoFlapping ? "origami-far-wing-flapping" : ""}
          style={
            isUp
              ? { transform: "rotate(-20deg) scaleY(1.05)", transformOrigin: "560px 455px" }
              : isDown
              ? { transform: "rotate(24deg) scaleY(-0.48)", transformOrigin: "560px 455px" }
              : undefined
          }
        >
          {/* Inner Main Delta Facet */}
          <polygon
            points="455,468 335,152 595,222 715,448"
            fill="url(#origamiFarWingMain)"
            stroke="#9BA9E8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Trailing Fold Shadow Strip */}
          <polygon
            points="455,468 238,238 335,152"
            fill="url(#origamiNearWingCrease)"
            stroke="#8897DE"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Secondary Fold Facet */}
          <polygon
            points="455,468 335,152 485,295"
            fill="rgba(120, 136, 215, 0.22)"
          />
          {/* Outer Swept Paper-Plane Wingtip (with secondary aerodynamic flex) */}
          <g className={isAutoFlapping ? "origami-far-tip-flex" : ""}>
            <polygon
              points="335,152 190,45 505,125 595,222"
              fill="url(#origamiFarWingTip)"
              stroke="#B4C1F5"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Leading edge accent trim */}
            <polyline
              points="190,45 505,125 595,222 715,448"
              fill="none"
              stroke="url(#origamiAccentEdge)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        </g>
      )}

      {/* =================================================================== */}
      {/* LAYER 2: 3D ORIGAMI PAPER-PLANE FUSELAGE, TAIL, NECK, HEAD & NEAR WING */}
      {/* =================================================================== */}
      {!renderFarWingOnly && (
        <g id="origami-core-fuselage-and-near-wing" filter="url(#origamiDepthShadow)">
          {/* --------------------------------------------------------------- */}
          {/* A. ANGULAR ORIGAMI TAIL STABILIZER FAN (Rear Left)              */}
          {/* --------------------------------------------------------------- */}
          <g id="origami-tail-fan">
            {/* Upper Sunlit Tail Fin */}
            <polygon
              points="42,390 258,535 155,588"
              fill="url(#origamiSunlitTop)"
              stroke="#B8C4F4"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Middle Tail Stabilizer */}
            <polygon
              points="12,468 258,535 196,635"
              fill="url(#origamiMidFlank)"
              stroke="#9EACE8"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Lower Tail Keel Wedge */}
            <polygon
              points="82,588 258,535 355,665"
              fill="url(#origamiDeepKeel)"
              stroke="#6876C0"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>

          {/* --------------------------------------------------------------- */}
          {/* B. CENTRAL 3D PAPER-PLANE FUSELAGE & VENTRAL V-KEEL             */}
          {/* --------------------------------------------------------------- */}
          <g id="origami-fuselage-body">
            {/* 1. Deep Ventral V-Keel (Iconic bottom grip of a paper airplane) */}
            <polygon
              points="355,665 568,682 828,555 655,738 442,748"
              fill="url(#origamiDeepKeel)"
              stroke="#5A68B2"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Secondary underside keel shadow facet */}
            <polygon
              points="568,682 828,555 655,738"
              fill="rgba(32, 40, 88, 0.28)"
            />

            {/* 2. Mid-Side Fuselage Fold Facet */}
            <polygon
              points="235,555 828,555 568,682 355,665"
              fill="url(#origamiMidFlank)"
              stroke="#A4B2EC"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Diagonal internal paper-fold facet on flank */}
            <polygon
              points="235,555 568,682 515,555"
              fill="rgba(135, 150, 224, 0.2)"
            />

            {/* 3. Upper Sunlit Saddle & Forward Fuselage Ridge */}
            <polygon
              points="235,555 510,492 755,465 828,555"
              fill="url(#origamiSaddleFacet)"
              stroke="#C5CFF8"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />

            {/* Crisp Specular Paper Crease Highlight along Main Fuselage Fold */}
            <line
              x1="235"
              y1="555"
              x2="828"
              y2="555"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.92"
            />

            {/* 4. Embossed 3D Origami Message Envelope Seal on Forward Flank */}
            <g transform="translate(658, 562) rotate(-14) skewX(-12)">
              <rect
                x="0"
                y="0"
                width="64"
                height="42"
                rx="4"
                fill="url(#origamiSunlitTop)"
                stroke="var(--accent, #8B8CF7)"
                strokeWidth="2"
              />
              <polyline
                points="2,2 32,24 62,2"
                fill="none"
                stroke="var(--accent, #8B8CF7)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="22" r="5.5" fill="var(--accent, #8B8CF7)" />
            </g>
          </g>

          {/* --------------------------------------------------------------- */}
          {/* C. ASCENDING ORIGAMI NECK & POINTED PAPER-PLANE HEAD / BEAK     */}
          {/* --------------------------------------------------------------- */}
          <g id="origami-neck-and-head">
            {/* Dorsal Neck Ridge (Passes right under Fahim's forward left hand) */}
            <polygon
              points="715,485 875,275 918,295 795,438"
              fill="url(#origamiSunlitTop)"
              stroke="#C2CCF6"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Mid Neck Sunlit Facet */}
            <polygon
              points="715,485 918,295 882,445"
              fill="url(#origamiSaddleFacet)"
              stroke="#B4C0F2"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Lower Neck Shaded Throat Facet */}
            <polygon
              points="715,485 882,445 828,555"
              fill="url(#origamiMidFlank)"
              stroke="#96A5E6"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Crown & Upper Paper-Plane Nose Cone */}
            <polygon
              points="875,275 968,262 1122,335 948,355"
              fill="url(#origamiSunlitTop)"
              stroke="#D0D8FA"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Pointed Paper-Plane Beak Side Facet */}
            <polygon
              points="918,295 948,355 1122,335 962,406 882,445"
              fill="url(#origamiMidFlank)"
              stroke="#9EACE8"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Under-Beak Chin Fold */}
            <polygon
              points="882,445 962,406 912,442"
              fill="url(#origamiDeepKeel)"
              stroke="#6876C0"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Specular Nose Crease Line */}
            <line
              x1="918"
              y1="295"
              x2="1122"
              y2="335"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Glowing Futuristic Geometric Origami Eye Facet */}
            <polygon
              points="945,322 982,318 966,338"
              fill="var(--accent, #8B8CF7)"
            />
          </g>

          {/* --------------------------------------------------------------- */}
          {/* D. NEAR 3D ORIGAMI WING (Attached to Side Crease, Flapping!)    */}
          {/*    Positioned in depth behind Rider's Near Leg & Back Arm so    */}
          {/*    it never covers his black shirt, while sweeping boldly out!  */}
          {/* --------------------------------------------------------------- */}
          <g
            id="origami-near-wing-root"
            className={isAutoFlapping ? "origami-near-wing-flapping" : ""}
            style={
              isUp
                ? { transform: "rotate(-18deg) scaleY(1.06)", transformOrigin: "395px 568px" }
                : isDown
                ? { transform: "rotate(28deg) scaleY(-0.52)", transformOrigin: "395px 568px" }
                : undefined
            }
          >
            {/* Primary Near Delta Wing Plane */}
            <polygon
              points="255,555 42,305 282,348 515,595"
              fill="url(#origamiNearWingMain)"
              stroke="#B4C1F5"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Underside Trailing Crease Fold */}
            <polygon
              points="255,555 12,402 42,305"
              fill="url(#origamiNearWingCrease)"
              stroke="#8B9AE2"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Inner Geometric Fold Shadow */}
            <polygon
              points="255,555 42,305 195,435"
              fill="rgba(130, 146, 224, 0.22)"
            />
            {/* Outer Swept Paper-Plane Delta Wingtip (with aerodynamic flex) */}
            <g className={isAutoFlapping ? "origami-near-tip-flex" : ""}>
              <polygon
                points="42,305 4,195 215,255 282,348"
                fill="url(#origamiSunlitTop)"
                stroke="#C5CFF8"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              {/* Glowing Accent Trim along Near Wing Leading Edge */}
              <polyline
                points="4,195 215,255 282,348 515,595"
                fill="none"
                stroke="url(#origamiAccentEdge)"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Crisp White Specular Fold Line */}
              <line
                x1="42"
                y1="305"
                x2="515"
                y2="595"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>
      )}
    </g>
  );
}
