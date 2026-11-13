"use client";

import { ChevronRight, X } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Props = {
  on: boolean;
  /** sessionStorage key that remembers the visitor closed it */
  storageKey: string;
  /** Accessible name, e.g. "Halloween offer" */
  label: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  text?: React.ReactNode;
  link: { href: string; label: string };
};

/**
 * Seasonal card that slides down from the top shortly after the site opens. Once closed it stays closed
 * for the rest of the visit (sessionStorage). It doesn't take focus; Escape closes it too.
 */
export function SeasonalPopup({ on, storageKey, label, icon, title, text, link }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!on) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(storageKey) === "1";
    } catch {}
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(timer);
  }, [on, storageKey]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.aside
            aria-label={label}
            className="fixed inset-x-0 top-3 z-50 mx-auto flex w-[calc(100%-32px)] max-w-[460px] items-center gap-4 rounded-[10px] border border-line-strong bg-cream py-4 pr-3 pl-4 shadow-menu"
            initial={{ y: "-140%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-140%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {icon}
            <div className="min-w-0 flex-1">
              <p className="type-title text-cocoa">{title}</p>
              {text && <p className="type-small mt-0.5 text-cocoa-body">{text}</p>}
              <Link
                href={link.href}
                onClick={close}
                className="type-small mt-1.5 inline-flex min-h-11 items-center gap-1 font-medium text-rose-text underline underline-offset-4 hover:text-[#6E3540]"
              >
                {link.label}
                <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
              </Link>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={`Close ${label}`}
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
