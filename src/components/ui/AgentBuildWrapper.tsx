"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export interface AgentSpec {
  name: string;
  color: string;
  fgColor?: string;
  tag?: string;
  actionText?: string;
}

export interface AgentBuildWrapperProps {
  children: React.ReactNode;
  agentName?: string;
  color?: string;
  delay?: number;
  className?: string;
  badgeText?: string;
  dimensionText?: string;
  borderStyle?: "dashed" | "solid";
  once?: boolean;
  amount?: number;
  agentCount?: 2 | 3;
  additionalAgents?: AgentSpec[];
}

interface CursorTrajectory {
  left: string[];
  top: string[];
}

/**
 * High-energy, realistic multi-cursor trajectories.
 * First waypoint grabs & pulls the box into place; subsequent waypoints dart
 * rapidly around the edges, corners, and text lines ("চারোদিকে ছোটাছুটি করছে").
 */
const CHOREOGRAPHY_PRESETS: {
  pullFrom: { x: number; y: number };
  c1: CursorTrajectory;
  c2: CursorTrajectory;
  c3: CursorTrajectory;
}[] = [
  {
    pullFrom: { x: -16, y: 14 },
    c1: {
      left: ["-1%", "4%", "58%", "18%", "70%", "34%", "64%"],
      top: ["24%", "10%", "18%", "64%", "52%", "82%", "12%"],
    },
    c2: {
      left: ["78%", "70%", "12%", "64%", "22%", "72%", "48%"],
      top: ["96%", "84%", "78%", "26%", "14%", "76%", "90%"],
    },
    c3: {
      left: ["48%", "28%", "66%", "14%", "52%", "38%", "68%"],
      top: ["-4%", "36%", "72%", "42%", "68%", "20%", "8%"],
    },
  },
  {
    pullFrom: { x: 16, y: 14 },
    c1: {
      left: ["74%", "64%", "10%", "62%", "20%", "68%", "14%"],
      top: ["26%", "12%", "20%", "62%", "78%", "44%", "14%"],
    },
    c2: {
      left: ["2%", "12%", "68%", "26%", "66%", "16%", "58%"],
      top: ["92%", "80%", "84%", "32%", "16%", "72%", "88%"],
    },
    c3: {
      left: ["32%", "56%", "18%", "64%", "38%", "52%", "22%"],
      top: ["-4%", "44%", "64%", "22%", "76%", "28%", "10%"],
    },
  },
  {
    pullFrom: { x: -12, y: 16 },
    c1: {
      left: ["4%", "12%", "64%", "24%", "70%", "16%", "56%"],
      top: ["18%", "8%", "28%", "74%", "66%", "46%", "14%"],
    },
    c2: {
      left: ["72%", "64%", "18%", "10%", "60%", "74%", "32%"],
      top: ["94%", "82%", "86%", "38%", "18%", "72%", "88%"],
    },
    c3: {
      left: ["54%", "24%", "68%", "34%", "58%", "20%", "46%"],
      top: ["84%", "26%", "14%", "66%", "42%", "78%", "16%"],
    },
  },
];

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * Reusable Collaborative AI Multi-Cursor Build Wrapper.
 *
 * - Instant, physical pull-in build: Cursors grab the element and pull it
 *   directly into place cleanly (no slow fade, no blurry wait).
 * - Upright, crisp cursor physics: Cursors stay upright (zero cartoon tilt)
 *   and dart rapidly around the borders, corners, and text lines.
 * - Plays strictly ONCE when scrolling down on page visit / refresh;
 *   never re-triggers when scrolling back up.
 * - 100% matched to Light Mode & Dark Mode UI theme variables.
 */
export function AgentBuildWrapper({
  children,
  agentName = "Code_Agent",
  color,
  delay = 0,
  className = "",
  badgeText,
  dimensionText,
  borderStyle = "dashed",
  once = true,
  amount = 0.12,
  agentCount = 3,
  additionalAgents,
}: AgentBuildWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  const seed = hashSeed(`${agentName}-${badgeText || ""}-${dimensionText || ""}`);
  const preset = CHOREOGRAPHY_PRESETS[seed % CHOREOGRAPHY_PRESETS.length];

  // Cohesive Light/Dark UI theme color slots (--agent-1, --agent-2, --agent-3)
  const paletteSlots = [
    { bg: "var(--agent-1)", fg: "var(--agent-1-fg)" },
    { bg: "var(--agent-2)", fg: "var(--agent-2-fg)" },
    { bg: "var(--agent-3)", fg: "var(--agent-3-fg)" },
  ];
  const slotOffset = color === "#38BDF8" ? 1 : color === "#10B981" ? 2 : seed % 3;
  const slot1 = paletteSlots[slotOffset % 3];
  const slot2 = paletteSlots[(slotOffset + 1) % 3];
  const slot3 = paletteSlots[(slotOffset + 2) % 3];

  const isCompactHeader =
    badgeText?.startsWith("Section") || badgeText?.startsWith("Navigation");
  const effectiveAgentCount = isCompactHeader ? 2 : Math.max(agentCount, 3);

  const primaryAgent: AgentSpec = {
    name: agentName,
    color: slot1.bg,
    fgColor: slot1.fg,
    tag: badgeText ? badgeText.split("•")[1]?.trim() || "Pulling" : "Pulling",
  };

  const secondaryAgent: AgentSpec = {
    name:
      additionalAgents?.[0]?.name ||
      (agentName === "Layout_Bot" ? "UI_Builder" : "Layout_Bot"),
    color: slot2.bg,
    fgColor: slot2.fg,
    tag: additionalAgents?.[0]?.tag || "Drag • Fit",
  };

  const tertiaryAgent: AgentSpec = {
    name: additionalAgents?.[1]?.name || "Text_Writer",
    color: slot3.bg,
    fgColor: slot3.fg,
    tag: additionalAgents?.[1]?.tag || "Write • DOM",
  };

  // Very slight stagger (max 30ms) so elements respond immediately when scrolling
  const snappyDelay = Math.min(delay * 0.12, 0.03);

  // Overlay Box Variant (Pulled into place, holds briefly, cleanly fades away)
  const boxVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.982,
      x: preset.pullFrom.x,
      y: preset.pullFrom.y,
    },
    visible: {
      opacity: [1, 1, 1, 0],
      scale: [0.982, 1, 1, 1],
      x: [preset.pullFrom.x, 0, 0, 0],
      y: [preset.pullFrom.y, 0, 0, 0],
      transition: {
        duration: 1.45,
        delay: snappyDelay,
        times: [0, 0.18, 0.88, 1],
        ease: "easeInOut",
      },
    },
  };

  // Fast Construction Sweep Highlight
  const sweepVariants: Variants = {
    hidden: { opacity: 0.95, scaleX: 0.08 },
    visible: {
      opacity: [0.95, 0.5, 0],
      scaleX: [0.08, 1, 1],
      transition: {
        duration: 0.38,
        delay: snappyDelay,
        ease: "easeOut",
      },
    },
  };

  // Cursor 1: Primary Swarm Cursor
  const cursor1Variants: Variants = {
    hidden: {
      opacity: 0,
      left: preset.c1.left[0],
      top: preset.c1.top[0],
    },
    visible: {
      opacity: [1, 1, 1, 1, 1, 1, 0],
      left: preset.c1.left,
      top: preset.c1.top,
      transition: {
        duration: 1.42,
        delay: snappyDelay,
        times: [0, 0.16, 0.34, 0.52, 0.70, 0.88, 1],
        ease: "easeInOut",
      },
    },
  };

  const ring1Variants: Variants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: [0.5, 1.9, 0.7, 1.7, 0.7, 1.6],
      opacity: [0.95, 0, 0.85, 0, 0.8, 0],
      transition: {
        duration: 1.32,
        delay: snappyDelay,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    },
  };

  // Cursor 2: Secondary Swarm Cursor
  const cursor2Variants: Variants = {
    hidden: {
      opacity: 0,
      left: preset.c2.left[0],
      top: preset.c2.top[0],
    },
    visible: {
      opacity: [1, 1, 1, 1, 1, 1, 0],
      left: preset.c2.left,
      top: preset.c2.top,
      transition: {
        duration: 1.45,
        delay: snappyDelay + 0.03,
        times: [0, 0.18, 0.36, 0.55, 0.73, 0.89, 1],
        ease: "easeInOut",
      },
    },
  };

  const ring2Variants: Variants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: [0.5, 1.8, 0.7, 1.6, 0.7, 1.5],
      opacity: [0.9, 0, 0.8, 0, 0.75, 0],
      transition: {
        duration: 1.32,
        delay: snappyDelay + 0.03,
        times: [0, 0.22, 0.42, 0.64, 0.82, 1],
      },
    },
  };

  // Cursor 3: Tertiary Swarm Cursor
  const cursor3Variants: Variants = {
    hidden: {
      opacity: 0,
      left: preset.c3.left[0],
      top: preset.c3.top[0],
    },
    visible: {
      opacity: [1, 1, 1, 1, 1, 1, 0],
      left: preset.c3.left,
      top: preset.c3.top,
      transition: {
        duration: 1.4,
        delay: snappyDelay + 0.05,
        times: [0, 0.2, 0.38, 0.56, 0.74, 0.9, 1],
        ease: "easeInOut",
      },
    },
  };

  const ring3Variants: Variants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: [0.5, 1.7, 0.7, 1.5, 0.7],
      opacity: [0.85, 0, 0.75, 0, 0],
      transition: {
        duration: 1.28,
        delay: snappyDelay + 0.05,
        times: [0, 0.25, 0.5, 0.78, 1],
      },
    },
  };

  // Child Content: Physical Pull-In by Cursors
  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      x: preset.pullFrom.x,
      y: preset.pullFrom.y,
      scale: 0.982,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        opacity: {
          duration: 0.12,
          delay: snappyDelay,
          ease: "linear",
        },
        x: {
          duration: 0.32,
          delay: snappyDelay,
          ease: "easeOut",
        },
        y: {
          duration: 0.32,
          delay: snappyDelay,
          ease: "easeOut",
        },
        scale: {
          duration: 0.32,
          delay: snappyDelay,
          ease: "easeOut",
        },
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -24px 0px" }}
      className={`relative max-w-full group/agent ${className}`}
    >
      {/* Active Multi-Cursor Swarm & Wireframe Bounding Box (Runs strictly once on view) */}
      <motion.div
        variants={boxVariants}
        style={{
          borderWidth: "1px",
          borderStyle,
          borderColor: "var(--agent-frame-border)",
          backgroundColor: "var(--agent-frame-bg)",
        }}
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit]"
        aria-hidden="true"
      >
        {/* Construction / Text-Writing Sweep Highlight */}
        <motion.div
          variants={sweepVariants}
          style={{
            originX: 0,
            background:
              "linear-gradient(90deg, transparent 0%, var(--agent-Sweep) 70%, var(--agent-1) 100%)",
          }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />

        {/* 4 Crisp Corner Resize Handles */}
        <span
          className="pointer-events-none absolute -top-1 -left-1 h-2 w-2 rounded-[1.5px] border"
          style={{
            backgroundColor: "var(--agent-handle-bg)",
            borderColor: "var(--agent-1)",
          }}
        />
        <span
          className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 rounded-[1.5px] border"
          style={{
            backgroundColor: "var(--agent-handle-bg)",
            borderColor: "var(--agent-1)",
          }}
        />
        <span
          className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 rounded-[1.5px] border"
          style={{
            backgroundColor: "var(--agent-handle-bg)",
            borderColor: "var(--agent-1)",
          }}
        />
        <span
          className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 rounded-[1.5px] border"
          style={{
            backgroundColor: "var(--agent-handle-bg)",
            borderColor: "var(--agent-1)",
          }}
        />

        {/* Top-Left Frame Construction Tag */}
        <div
          className="pointer-events-none absolute -top-4 left-0 flex max-w-[calc(100%-12px)] items-center gap-1 rounded-t-[4px] px-1.5 py-0.5 font-mono text-[8.5px] font-semibold tracking-wider select-none truncate sm:text-[9px]"
          style={{
            backgroundColor: primaryAgent.color,
            color: primaryAgent.fgColor,
          }}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full animate-pulse"
            style={{ backgroundColor: primaryAgent.fgColor }}
          />
          <span className="truncate">
            {badgeText || `${agentName} • Build`}
          </span>
        </div>

        {/* Bottom-Right Dimension Pill */}
        {dimensionText && (
          <div
            className="pointer-events-none absolute -bottom-4 right-2 flex items-center gap-1 rounded px-1.5 py-0.2 font-mono text-[8px] font-medium select-none whitespace-nowrap"
            style={{
              backgroundColor: "var(--agent-pill-bg)",
              border: "1px solid var(--agent-pill-border)",
              color: "var(--agent-pill-text)",
              boxShadow: "var(--agent-shadow)",
            }}
          >
            <span
              className="h-1 w-1 shrink-0 rounded-full"
              style={{ backgroundColor: "var(--agent-1)" }}
            />
            <span>{dimensionText}</span>
          </div>
        )}

        {/* ============================================================== */}
        {/* CURSOR 1: Lead Pull & Write Agent (Upright, Rapid Darting)     */}
        {/* ============================================================== */}
        <motion.div
          variants={cursor1Variants}
          style={{ filter: "drop-shadow(var(--agent-shadow))" }}
          className="pointer-events-none absolute z-40 flex items-start select-none"
        >
          {/* Click / Drag Action Ring at Cursor Tip */}
          <motion.span
            variants={ring1Variants}
            style={{ borderColor: primaryAgent.color }}
            className="pointer-events-none absolute top-0.5 left-0.5 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          />

          {/* Upright Precision Cursor Pointer (0deg rotation) */}
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M4.5 2.5L19.5 10.2C20.3 10.6 20.2 11.8 19.3 12.0L12.5 13.8L9.6 20.2C9.2 21.0 8.0 20.9 7.8 20.0L4.5 2.5Z"
              fill={primaryAgent.color}
              stroke="var(--agent-cursor-stroke)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>

          {/* Agent Name & Action Pill */}
          <div
            className="ml-1 mt-2 flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[8.5px] font-semibold whitespace-nowrap"
            style={{
              backgroundColor: primaryAgent.color,
              color: primaryAgent.fgColor,
              boxShadow: "var(--agent-shadow)",
            }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full animate-ping"
              style={{ backgroundColor: primaryAgent.fgColor }}
            />
            <span>{primaryAgent.name}</span>
            {primaryAgent.tag && (
              <span
                className="hidden sm:inline-block rounded-full px-1 text-[7.5px]"
                style={{
                  backgroundColor: "var(--agent-pill-bg)",
                  color: "var(--agent-pill-text)",
                }}
              >
                {primaryAgent.tag}
              </span>
            )}
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CURSOR 2: Box Pull & Edge Alignment Agent                      */}
        {/* ============================================================== */}
        <motion.div
          variants={cursor2Variants}
          style={{ filter: "drop-shadow(var(--agent-shadow))" }}
          className="pointer-events-none absolute z-40 flex items-start select-none"
        >
          <motion.span
            variants={ring2Variants}
            style={{ borderColor: secondaryAgent.color }}
            className="pointer-events-none absolute top-0.5 left-0.5 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          />

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M4.5 2.5L19.5 10.2C20.3 10.6 20.2 11.8 19.3 12.0L12.5 13.8L9.6 20.2C9.2 21.0 8.0 20.9 7.8 20.0L4.5 2.5Z"
              fill={secondaryAgent.color}
              stroke="var(--agent-cursor-stroke)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>

          <div
            className="ml-1 mt-2 flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[8px] font-semibold whitespace-nowrap"
            style={{
              backgroundColor: secondaryAgent.color,
              color: secondaryAgent.fgColor,
              boxShadow: "var(--agent-shadow)",
            }}
          >
            <span
              className="h-1 w-1 shrink-0 rounded-full"
              style={{ backgroundColor: secondaryAgent.fgColor }}
            />
            <span>{secondaryAgent.name}</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CURSOR 3: Text & Node Builder Agent (Darts Across Content)     */}
        {/* ============================================================== */}
        {effectiveAgentCount >= 3 && (
          <motion.div
            variants={cursor3Variants}
            style={{ filter: "drop-shadow(var(--agent-shadow))" }}
            className="pointer-events-none absolute z-40 flex items-start select-none"
          >
            <motion.span
              variants={ring3Variants}
              style={{ borderColor: tertiaryAgent.color }}
              className="pointer-events-none absolute top-0.5 left-0.5 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            />

            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M4.5 2.5L19.5 10.2C20.3 10.6 20.2 11.8 19.3 12.0L12.5 13.8L9.6 20.2C9.2 21.0 8.0 20.9 7.8 20.0L4.5 2.5Z"
                fill={tertiaryAgent.color}
                stroke="var(--agent-cursor-stroke)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>

            <div
              className="ml-1 mt-1.5 flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[8px] font-semibold whitespace-nowrap"
              style={{
                backgroundColor: tertiaryAgent.color,
                color: tertiaryAgent.fgColor,
                boxShadow: "var(--agent-shadow)",
              }}
            >
              <span
                className="h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: tertiaryAgent.fgColor }}
              />
              <span>{tertiaryAgent.name}</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ================================================================== */}
      {/* Child Content: Physical Pull-In by Cursors (Runs strictly once)    */}
      {/* ================================================================== */}
      <motion.div variants={contentVariants} className="relative z-10 w-full">
        {children}
      </motion.div>
    </motion.div>
  );
}

export default AgentBuildWrapper;
