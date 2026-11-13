"use client";

import { motion, useReducedMotion } from "motion/react";

import { halloween } from "@/config/seasonal";

import { SeasonalPopup } from "./seasonal-popup";
import { useSeason } from "./use-season";

const useHalloween = () => useSeason(halloween, "halloween");

// Cobweb drawn from the top-left corner: radial threads, joined by rings that sag towards the corner.
const ANGLES = [0, 15, 30, 45, 60, 75, 90].map((d) => (d * Math.PI) / 180);
const RINGS = [38, 72, 106, 140, 172];
const point = (r: number, a: number) => [r * Math.cos(a), r * Math.sin(a)].map((n) => n.toFixed(1)).join(" ");
const WEB_PATH = [
  ...ANGLES.map((a) => `M0 0L${point(196, a)}`),
  ...RINGS.map((r) =>
    ANGLES.slice(1)
      .map((a, i) => `${i === 0 ? `M${point(r, ANGLES[0])}` : ""}Q${point(r * 0.84, (a + ANGLES[i]) / 2)} ${point(r, a)}`)
      .join(""),
  ),
].join("");

function Cobweb({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      <path d={WEB_PATH} stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Cobwebs in the Hero's top corners, behind the copy and photo, with a small spider bobbing on a thread. */
export function HalloweenCobwebs() {
  const on = useHalloween();
  const reduceMotion = useReducedMotion();
  if (!on) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-[5] text-cocoa/35">
      <Cobweb className="absolute top-0 left-0 size-[clamp(96px,12vw,170px)]" />
      <Cobweb className="absolute top-0 right-0 size-[clamp(96px,12vw,170px)] -scale-x-100" />
      <motion.div
        className="absolute top-0 right-[clamp(40px,5vw,72px)] flex flex-col items-center"
        animate={reduceMotion ? undefined : { y: [0, 22, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="h-[clamp(48px,6vw,84px)] w-px bg-current" />
        <svg viewBox="0 0 24 20" className="w-[18px] text-cocoa">
          <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M8 9 3 5M8 11 2 11M8 13 3 17M16 9l5-4M16 11h6M16 13l5 4" />
          </g>
          <ellipse cx="12" cy="11" rx="5" ry="6" fill="currentColor" />
        </svg>
      </motion.div>
    </div>
  );
}

// Flight path in viewport units, with a lean into each turn. Kept clear of the edges so the ghost never clips.
const PATH = {
  x: ["6vw", "38vw", "78vw", "84vw", "52vw", "20vw", "62vw", "6vw"],
  y: ["70vh", "22vh", "30vh", "68vh", "46vh", "34vh", "78vh", "70vh"],
  rotate: [0, 8, 6, -8, -6, 6, -6, 0],
};

/** The sheet ghost. `sway` bobs it and swings its hem from the top. */
function Ghost({ className, sway = false }: { className?: string; sway?: boolean }) {
  const loop = (duration: number) => ({ duration, repeat: Infinity, ease: "easeInOut" as const });
  return (
    <motion.svg
      viewBox="0 0 64 80"
      className={className}
      animate={sway ? { y: [0, -8, 0] } : undefined}
      transition={loop(2.4)}
    >
      <motion.path
        d="M32 4C15 4 7 18 7 36v30q5 8 10 0t10 0 10 0 10 0 10 0V36C57 18 49 4 32 4Z"
        fill="#FBF3E6"
        stroke="rgba(62,42,46,0.35)"
        strokeWidth="1.2"
        style={{ transformOrigin: "32px 4px" }}
        animate={sway ? { skewX: [-4, 4, -4] } : undefined}
        transition={loop(3)}
      />
      <ellipse cx="24" cy="32" rx="3" ry="4.5" fill="#3E2A2E" />
      <ellipse cx="40" cy="32" rx="3" ry="4.5" fill="#3E2A2E" />
      <ellipse cx="32" cy="44" rx="2.6" ry="3.4" fill="#3E2A2E" />
      <circle cx="18.5" cy="40" r="3" fill="#B85F72" opacity="0.35" />
      <circle cx="45.5" cy="40" r="3" fill="#B85F72" opacity="0.35" />
    </motion.svg>
  );
}

/** A small sheet ghost drifting around the screen. Skipped for people who ask for reduced motion. */
export function HalloweenGhost() {
  const on = useHalloween();
  const reduceMotion = useReducedMotion();
  if (!on || reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 w-12 drop-shadow-[0_8px_14px_rgba(62,42,46,0.25)] lg:w-16"
      initial={{ x: PATH.x[0], y: PATH.y[0], opacity: 0 }}
      animate={{ ...PATH, opacity: 0.85 }}
      transition={{
        default: { duration: 40, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 1.2 },
      }}
    >
      <Ghost sway />
    </motion.div>
  );
}

/** Slide-down Halloween message (see SeasonalPopup). */
export function HalloweenPopup() {
  return (
    <SeasonalPopup
      on={useHalloween()}
      storageKey="halloween-popup-dismissed"
      label="Halloween message"
      icon={<Ghost sway className="w-11 shrink-0" />}
      title="It's Halloween!"
      text={<>Order a spooky themed&nbsp;cake&nbsp;🎃</>}
      link={{ href: "/custom-cakes", label: "Order a spooky cake" }}
    />
  );
}
