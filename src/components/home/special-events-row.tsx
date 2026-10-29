"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { RevealPhoto } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { SpecialEvent } from "@/lib/data/special-events";

/**
 * Heading with prev/next arrows, then a sideways scroll-snap row of event cards. Swipe or scroll on
 * phones; the arrows move one card at a time and grey out at either end.
 */
export function SpecialEventsRow({ heading, events }: { heading: React.ReactNode; events: SpecialEvent[] }) {
  const row = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const update = () =>
      setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function step(direction: 1 | -1) {
    const el = row.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <>
      <div className="flex items-end justify-between gap-6 px-5 sm:px-10 lg:px-[min(5.5vw,80px)]">
        {heading}
        <div className="hidden shrink-0 gap-3 sm:flex">
          <Button variant="creamFlour" size="icon" className="rounded-full" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous events">
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button variant="creamFlour" size="icon" className="rounded-full" onClick={() => step(1)} disabled={edges.end} aria-label="Next events">
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>

      <ul
        ref={row}
        aria-label="Special events"
        className="mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-2 pb-6 [scrollbar-width:none] sm:scroll-px-10 sm:px-10 lg:mt-10 lg:scroll-px-[min(5.5vw,80px)] lg:gap-6 lg:px-[min(5.5vw,80px)]"
      >
        {events.map((event, i) => (
          <li key={event.slug} className="w-[min(72vw,280px)] shrink-0 snap-start">
            <RevealPhoto delay={Math.min(i, 4) * 0.08} amount={0.05} className="h-full">
              <Link
                href={`/cakes/${event.slug}`}
                className="group block h-full rounded-[10px] bg-events-card p-3 shadow-flour transition-colors duration-150 hover:bg-[rgba(255,250,246,0.9)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-blush-mist">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.alt}
                      fill
                      sizes="280px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-6 text-center">
                      <span className="type-caption-serif text-events-heading/70">{event.name} photo coming soon</span>
                    </div>
                  )}
                </div>
                <div className="px-1 pt-4 pb-1">
                  <p className="type-title text-events-heading">{event.name}</p>
                  <p className="type-small mt-1 text-events-text">{event.when}</p>
                </div>
              </Link>
            </RevealPhoto>
          </li>
        ))}
      </ul>
    </>
  );
}
