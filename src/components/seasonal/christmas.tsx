"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { christmas } from "@/config/seasonal";

import { SeasonalPopup } from "./seasonal-popup";
import { useSeason } from "./use-season";

const useChristmas = () => useSeason(christmas, "christmas");

type Flake = { x: number; y: number; r: number; speed: number; drift: number; phase: number; alpha: number };

// One flake per this many square pixels of screen, so phones get fewer than wide desktops.
const AREA_PER_FLAKE = 14000;
const MAX_FLAKES = 140;

function makeFlake(width: number, height: number, anywhere: boolean): Flake {
  const r = 1.2 + Math.random() * 2.8;
  return {
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : -r * 2,
    r,
    // Bigger flakes are "closer", so they fall faster
    speed: 0.25 + r * 0.18 + Math.random() * 0.2,
    drift: 0.3 + Math.random() * 0.7,
    phase: Math.random() * Math.PI * 2,
    alpha: 0.65 + Math.random() * 0.35,
  };
}

/**
 * Gentle snowfall over the whole site in December (or with `?christmas=1`). One canvas fixed over the
 * page that ignores clicks. White flakes get a faint cocoa shadow so they still show on the cream
 * sections. Off for people who ask for reduced motion.
 */
export function ChristmasSnow() {
  const on = useChristmas();
  const reduceMotion = useReducedMotion();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!on || reduceMotion || !el || !ctx) return;

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      el.width = width * dpr;
      el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(MAX_FLAKES, Math.round((width * height) / AREA_PER_FLAKE));
      flakes = flakes.slice(0, count);
      while (flakes.length < count) flakes.push(makeFlake(width, height, true));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.shadowColor = "rgba(110, 53, 64, 0.35)";
      ctx.shadowBlur = 3;
      for (const f of flakes) {
        f.y += f.speed;
        f.x += Math.sin(time / 1600 + f.phase) * f.drift * 0.35;
        if (f.y > height + f.r * 2 || f.x < -10 || f.x > width + 10) Object.assign(f, makeFlake(width, height, false));
        ctx.globalAlpha = f.alpha;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [on, reduceMotion]);

  if (!on || reduceMotion) return null;
  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 size-full" />;
}

// Baubles hung on the tree tiers: [x, y, colour]
const BAUBLES = [
  [27, 25, "#E9A8B3"],
  [37, 31, "#FBF3E6"],
  [22, 41, "#FBF3E6"],
  [33, 46, "#E9A8B3"],
  [43, 43, "#B85F72"],
  [18, 58, "#B85F72"],
  [30, 61, "#FBF3E6"],
  [45, 58, "#E9A8B3"],
] as const;

/** Little Christmas tree with baubles and a twinkling gold star. */
function ChristmasTree({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <svg viewBox="0 0 64 80" aria-hidden="true" className={className}>
      <rect x="28" y="66" width="8" height="9" rx="1.5" fill="#7A5244" />
      <path d="M32 12 17 34h8L12 52h9L6 68h52L43 52h9L39 34h8Z" fill="#4E7A5C" />
      <path d="M32 12 17 34h8L12 52h9L6 68h26Z" fill="#5E8C6B" />
      {BAUBLES.map(([cx, cy, fill]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" fill={fill} stroke="rgba(62,42,46,0.25)" strokeWidth="0.6" />
      ))}
      <motion.path
        d="m32 2 2.6 5.4 5.9.8-4.3 4.1 1 5.8L32 15.3l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8Z"
        fill="#E8B547"
        stroke="#C8912A"
        strokeWidth="0.6"
        style={{ transformOrigin: "32px 10px" }}
        animate={reduceMotion ? undefined : { scale: [1, 1.18, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/** Slide-down Christmas message (see SeasonalPopup). */
export function ChristmasPopup() {
  return (
    <SeasonalPopup
      on={useChristmas()}
      storageKey="christmas-popup-dismissed"
      label="Christmas message"
      icon={<ChristmasTree className="w-11 shrink-0" />}
      title={<>Let&apos;s customise your Christmas&nbsp;cake</>}
      link={{ href: "/custom-cakes", label: "Design your Christmas cake" }}
    />
  );
}
