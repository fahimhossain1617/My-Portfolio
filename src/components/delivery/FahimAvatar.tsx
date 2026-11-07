"use client";

import React from "react";

interface FahimAvatarProps {
  isFlying?: boolean;
  layer?: "far-leg" | "near-body" | "full";
  className?: string;
}

/**
 * FahimAvatar
 * Renders the studio-quality 3D animated character avatar of Md. Fahim Hossain
 * (wearing his signature black button-down shirt with rolled sleeves, black trousers,
 * rectangular glasses, neat beard, and wavy dark hair).
 *
 * Supports split depth-layering ("far-leg" behind the 3D origami fuselage and
 * "near-body" in front of the fuselage) so the character physically straddles
 * the 3D Origami Paper-Plane Bird with realistic 3D contact shadows.
 */
export function FahimAvatar({
  layer = "full",
  className = "",
}: FahimAvatarProps) {
  // Avatar image is 699x958 placed at (180, 0) inside the 1150x960 SVG coordinate space
  const AVATAR_X = 180;
  const AVATAR_Y = 0;
  const AVATAR_W = 699;
  const AVATAR_H = 958;

  if (layer === "far-leg") {
    return (
      <g className={`fahim-avatar-far-leg ${className}`} id="fahim-avatar-far">
        <defs>
          {/* Clip to isolate the Far Leg (left leg) so it renders cleanly behind the paper fuselage */}
          <clipPath id="fahimFarLegClip">
            <polygon points="460,485 879,485 879,958 700,958 625,650 585,585 510,525" />
          </clipPath>
        </defs>
        <g clipPath="url(#fahimFarLegClip)">
          <image
            href="/images/fahim-3d-avatar.png"
            x={AVATAR_X}
            y={AVATAR_Y}
            width={AVATAR_W}
            height={AVATAR_H}
            preserveAspectRatio="xMidYMid meet"
          />
          {/* Subtle depth darkening on the far leg so the foreground leg & fuselage pop in 3D */}
          <polygon
            points="460,485 879,485 879,958 510,958"
            fill="rgba(10, 12, 28, 0.18)"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </g>
    );
  }

  return (
    <g className={`fahim-avatar-near-body ${className}`} id="fahim-avatar-near">
      <defs>
        {/*
          Precision ClipPath in 1150x960 SVG space (shifted by AVATAR_X = 180):
          Includes the entire upper body (head, torso, back arm, forward arm above y=495)
          plus the exact contour of the Near Leg (right leg) so the paper bird fuselage
          passes physically between the rider's two legs.
        */}
        <clipPath id="fahimNearBodyClip">
          <path
            d="
              M 0 -120
              L 1150 -120
              L 1150 492
              L 510 492
              L 460 510
              C 510 526, 565 555, 605 595
              C 620 612, 624 630, 625 650
              L 702 835
              L 728 860
              L 815 840
              L 825 865
              L 730 958
              L 0 958
              Z
            "
          />
        </clipPath>

        {/* Soft 3D Ambient Occlusion Blur for Rider Contact Shadows on the Origami Saddle */}
        <filter
          id="riderSaddleShadowBlur"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* ================================================================= */}
      {/* 1. REALISTIC 3D CONTACT SHADOWS CAST ONTO THE ORIGAMI PAPER BIRD  */}
      {/* ================================================================= */}
      <g
        id="rider-contact-shadows"
        filter="url(#riderSaddleShadowBlur)"
        opacity="0.72"
      >
        {/* Deep ambient occlusion shadow under seated hips & near thigh */}
        <polygon
          points="320,548 560,518 638,625 545,682 348,645"
          fill="#141838"
        />
        {/* Soft contact shadow under the forward left hand resting on the paper neck ridge */}
        <ellipse cx="812" cy="452" rx="46" ry="20" fill="#141838" opacity="0.75" />
        {/* Soft contact shadow under the back right hand near the rear fuselage fold */}
        <ellipse cx="238" cy="576" rx="34" ry="18" fill="#141838" opacity="0.65" />
      </g>

      {/* ================================================================= */}
      {/* 2. FOREGROUND 3D RIDER (Head, Torso, Arms, and Near Leg)          */}
      {/* ================================================================= */}
      <g clipPath={layer === "near-body" ? "url(#fahimNearBodyClip)" : undefined}>
        <image
          href="/images/fahim-3d-avatar.png"
          x={AVATAR_X}
          y={AVATAR_Y}
          width={AVATAR_W}
          height={AVATAR_H}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    </g>
  );
}
