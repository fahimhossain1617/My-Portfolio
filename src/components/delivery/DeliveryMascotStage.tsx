"use client";

import React from "react";
import { FlyingMessenger } from "./FlyingMessenger";

export type DeliveryFlightStatus =
  | "idle"
  | "takeoff"
  | "flying"
  | "exited"
  | "success"
  | "error";

interface DeliveryMascotStageProps {
  flightStatus: DeliveryFlightStatus;
  className?: string;
  variant?: "desktop" | "mobile";
}

/**
 * DeliveryMascotStage
 * Controls the on-demand appearance and diagonal flight trajectory of the
 * 3D Fahim Avatar & 3D Origami Paper-Plane Bird.
 *
 * Uses pure hardware-accelerated CSS keyframe animations for 100% native
 * React 19 compatibility without third-party runtime conflicts.
 */
export function DeliveryMascotStage({
  flightStatus,
  className = "",
  variant = "desktop",
}: DeliveryMascotStageProps) {
  const isActiveFlight =
    flightStatus === "takeoff" || flightStatus === "flying";

  if (!isActiveFlight) {
    return (
      <div
        className={`pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        {/* Silent preload of the 3D avatar texture so frame-1 of flight is instant */}
        <img
          src="/images/fahim-3d-avatar.png"
          alt=""
          aria-hidden="true"
          className="sr-only pointer-events-none w-0 h-0 opacity-0"
        />
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="false"
    >
      <style>{`
        @keyframes origamiGlideDesktop {
          0% {
            transform: translate3d(0vw, 0vh, 0) scale(0.72) rotate(-3deg);
            opacity: 0;
          }
          16% {
            transform: translate3d(6vw, -3vh, 0) scale(1.02) rotate(-7deg);
            opacity: 1;
          }
          48% {
            transform: translate3d(34vw, -16vh, 0) scale(1.06) rotate(-11deg);
            opacity: 1;
          }
          80% {
            transform: translate3d(70vw, -32vh, 0) scale(1.0) rotate(-13deg);
            opacity: 1;
          }
          100% {
            transform: translate3d(108vw, -48vh, 0) scale(0.9) rotate(-15deg);
            opacity: 0;
          }
        }

        @keyframes origamiGlideMobile {
          0% {
            transform: translate3d(0vw, 0vh, 0) scale(0.72) rotate(-3deg);
            opacity: 0;
          }
          16% {
            transform: translate3d(6vw, -4vh, 0) scale(1.02) rotate(-7deg);
            opacity: 1;
          }
          48% {
            transform: translate3d(36vw, -17vh, 0) scale(1.06) rotate(-11deg);
            opacity: 1;
          }
          80% {
            transform: translate3d(74vw, -33vh, 0) scale(1.0) rotate(-13deg);
            opacity: 1;
          }
          100% {
            transform: translate3d(112vw, -48vh, 0) scale(0.9) rotate(-15deg);
            opacity: 0;
          }
        }

        .anim-origami-flight {
          animation: ${variant === "desktop" ? "origamiGlideDesktop" : "origamiGlideMobile"} 4.5s cubic-bezier(0.3, 0.1, 0.25, 1) forwards;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .anim-origami-flight {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>

      <div className="relative z-[100] w-[230px] sm:w-[275px] lg:w-[310px] origin-center anim-origami-flight">
        {/* Subtle 3D Launch Aura Glow behind the paper bird */}
        <div
          className="absolute inset-6 -z-10 rounded-full bg-[var(--accent)]/20 blur-2xl"
          aria-hidden="true"
        />

        <FlyingMessenger
          isFlying={true}
          wingState="auto"
          showMotionTrails={true}
        />
      </div>
    </div>
  );
}
