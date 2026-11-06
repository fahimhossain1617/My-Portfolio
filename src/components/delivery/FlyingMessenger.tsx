"use client";

import React from "react";
import { FahimAvatar } from "./FahimAvatar";
import { MessengerBird } from "./MessengerBird";

export interface FlyingMessengerProps {
  isFlying?: boolean;
  wingState?: "auto" | "up" | "down" | "resting";
  className?: string;
  showMotionTrails?: boolean;
}

/**
 * FlyingMessenger
 * Unifies the 3D animated character avatar of Md. Fahim Hossain and the
 * 3D Origami Paper-Plane Bird in a true multi-depth layered composition:
 *
 * Depth Layering (Back to Front):
 * 1. Aerodynamic slipstream wind ribbons & glowing particles (during flight)
 * 2. Far 3D Origami Wing (flapping behind rider)
 * 3. Fahim's Far Leg (tucked behind the origami fuselage)
 * 4. 3D Origami Paper-Plane Fuselage, Tail, Neck, Head & Flapping Near Wing
 * 5. 3D Contact Shadows + Fahim's Near Leg, Torso, Head & Hands straddling the craft
 */
export function FlyingMessenger({
  isFlying = true,
  wingState = "auto",
  className = "",
  showMotionTrails = true,
}: FlyingMessengerProps) {
  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{ aspectRatio: "1150 / 960" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1150 960"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_18px_28px_rgba(8,10,26,0.45)]"
      >
        <defs>
          <filter id="slipstreamGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* =============================================================== */}
        {/* 0. AERODYNAMIC SLIPSTREAM WIND RIBBONS (Active during flight)   */}
        {/* =============================================================== */}
        {isFlying && showMotionTrails && (
          <g id="flight-slipstream-trails" opacity="0.85" filter="url(#slipstreamGlow)">
            <style>{`
              @keyframes slipstreamFlow1 {
                0% {
                  stroke-dashoffset: 0;
                  opacity: 0.2;
                }
                50% {
                  opacity: 0.85;
                }
                100% {
                  stroke-dashoffset: -360;
                  opacity: 0.15;
                }
              }
              @keyframes slipstreamFlow2 {
                0% {
                  stroke-dashoffset: 60;
                  opacity: 0.3;
                }
                50% {
                  opacity: 0.9;
                }
                100% {
                  stroke-dashoffset: -420;
                  opacity: 0.1;
                }
              }
              .slipstream-ribbon-1 {
                stroke-dasharray: 120 240;
                animation: slipstreamFlow1 0.72s linear infinite;
              }
              .slipstream-ribbon-2 {
                stroke-dasharray: 150 210;
                animation: slipstreamFlow2 0.65s linear infinite;
              }
            `}</style>
            {/* Upper wingtip vortex trail */}
            <path
              d="M -140 240 C -30 225, 70 210, 175 195"
              stroke="var(--accent, #8B8CF7)"
              strokeWidth="6"
              strokeLinecap="round"
              className="slipstream-ribbon-1"
            />
            {/* Mid tail slipstream trail */}
            <path
              d="M -190 540 C -70 535, 30 530, 130 525"
              stroke="var(--accent, #8B8CF7)"
              strokeWidth="8"
              strokeLinecap="round"
              className="slipstream-ribbon-2"
            />
            {/* Lower keel airflow trail */}
            <path
              d="M -110 710 C 10 705, 130 695, 260 680"
              stroke="var(--accent, #8B8CF7)"
              strokeWidth="5"
              strokeLinecap="round"
              className="slipstream-ribbon-1"
            />
            {/* Glowing aerodynamic stardust motes */}
            <circle cx="-45" cy="495" r="7" fill="var(--accent, #8B8CF7)" opacity="0.8" />
            <circle cx="35" cy="425" r="5" fill="#FFFFFF" opacity="0.75" />
            <circle cx="-15" cy="645" r="6" fill="var(--accent, #8B8CF7)" opacity="0.7" />
          </g>
        )}

        {/* =============================================================== */}
        {/* 1. FAR 3D ORIGAMI WING (Behind Rider & Fuselage)                */}
        {/* =============================================================== */}
        <MessengerBird
          isFlying={isFlying}
          wingState={wingState}
          renderFarWingOnly={true}
        />

        {/* =============================================================== */}
        {/* 2. RIDER FAR LEG (Tucked Behind the Origami Fuselage)           */}
        {/* =============================================================== */}
        <FahimAvatar isFlying={isFlying} layer="far-leg" />

        {/* =============================================================== */}
        {/* 3. 3D ORIGAMI FUSELAGE, TAIL, NECK, HEAD & FLAPPING NEAR WING   */}
        {/* =============================================================== */}
        <MessengerBird
          isFlying={isFlying}
          wingState={wingState}
          renderNearElementsOnly={true}
        />

        {/* =============================================================== */}
        {/* 4. FOREGROUND 3D RIDER (Contact Shadows + Torso, Head, Near Leg)*/}
        {/* =============================================================== */}
        <FahimAvatar isFlying={isFlying} layer="near-body" />
      </svg>
    </div>
  );
}
