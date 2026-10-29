"use client";

import { MotionConfig, motion, type Variants } from "motion/react";

// Section content entrance — DESIGN_SPEC.md §8: fade in + rise 16px, 500ms each, 80ms stagger, once,
// when 30% of the group is visible. `reducedMotion="user"` drops the movement for people who ask for
// reduced motion. Server and client always render the same initial state, so hydration matches.

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

type Props = { children: React.ReactNode; className?: string };

/** `onLoad` animates as soon as the page loads (for content already on screen, like the Hero). */
export function RevealGroup({ children, className, onLoad = false }: Props & { onLoad?: boolean }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        variants={group}
        initial="hidden"
        {...(onLoad
          ? { animate: "visible" }
          : { whileInView: "visible", viewport: { once: true, amount: 0.3 } })}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

export function RevealItem({ children, className }: Props) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/** Photo frames — §8: opacity 0 → 1, scale 0.98 → 1, 600ms, once. */
export function RevealPhoto({ children, className, delay = 0 }: Props & { delay?: number }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
