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
            transform: translate3d(0, 0, 0) scale(0.7) rotate(-5deg);
            opacity: 0;
          }
          14% {
            transform: translate3d(10vw, -10vh, 0) scale(0.96) rotate(-9deg);
            opacity: 1;
          }
          45% {
            transform: translate3d(36vw, -36vh, 0) scale(1.05) rotate(-15deg);
            opacity: 1;
          }
          75% {
            transform: translate3d(70vw, -68vh, 0) scale(1.0) rotate(-21deg);
            opacity: 1;
          }
          100% {
            transform: translate3d(115vw, -105vh, 0) scale(0.92) rotate(-26deg);
            opacity: 0;
          }
        }

        @keyframes origamiGlideMobile {
          0% {
            transform: translate3d(0, 0, 0) scale(0.65) rotate(-6deg);
            opacity: 0;
          }
          14% {
            transform: translate3d(12vw, -12vh, 0) scale(0.92) rotate(-10deg);
            opacity: 1;
          }
          45% {
            transform: translate3d(40vw, -40vh, 0) scale(1.02) rotate(-16deg);
            opacity: 1;
          }
          75% {
            transform: translate3d(75vw, -72vh, 0) scale(0.98) rotate(-22deg);
            opacity: 1;
          }
          100% {
            transform: translate3d(120vw, -112vh, 0) scale(0.88) rotate(-28deg);
            opacity: 0;
          }
        }

        .anim-origami-flight {
          animation: ${variant === "desktop" ? "origamiGlideDesktop" : "origamiGlideMobile"} 4.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .anim-origami-flight {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>

      <div className="relative z-[100] w-[190px] sm:w-[250px] lg:w-[290px] origin-center anim-origami-flight">
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
