"use client";

import { ChevronRight, X } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { halloween } from "@/config/seasonal";

/** True in the browser while Halloween is on (or previewed with `?halloween=1`). False on the server, so nothing prerenders. */
function useHalloween() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date()).slice(5);
    const preview = new URLSearchParams(window.location.search).get("halloween") === "1";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the date is only known in the browser
    setOn(preview || (halloween.from <= today && today <= halloween.to));
  }, []);
  return on;
}

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

const DISMISSED_KEY = "halloween-popup-dismissed";

/**
 * Card that slides down from the top shortly after the site opens. Once closed it stays closed for the
 * rest of the visit (sessionStorage). It doesn't take focus; Escape closes it too.
 */
export function HalloweenPopup() {
  const on = useHalloween();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!on) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISSED_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(timer);
  }, [on]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.aside
            aria-label="Halloween offer"
            className="fixed inset-x-0 top-3 z-50 mx-auto flex w-[calc(100%-32px)] max-w-[460px] items-center gap-4 rounded-[10px] border border-line-strong bg-cream py-4 pr-3 pl-4 shadow-menu"
            initial={{ y: "-140%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-140%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Ghost sway className="w-11 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="type-title text-cocoa">It&apos;s Halloween!</p>
              <p className="type-small mt-0.5 text-cocoa-body">Order a spooky themed&nbsp;cake&nbsp;🎃</p>
              <Link
                href="/custom-cakes"
                onClick={close}
                className="type-small mt-1.5 inline-flex min-h-11 items-center gap-1 font-medium text-rose-text underline underline-offset-4 hover:text-[#6E3540]"
              >
                Order a spooky cake
                <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
              </Link>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close Halloween message"
              className="flex size-11 shrink-0 items-center justify-center self-start rounded-full text-cocoa-soft transition-colors hover:bg-blush-mist hover:text-cocoa"
            >
              <X aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
