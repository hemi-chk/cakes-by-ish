import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getSpecialEvents } from "@/lib/data/special-events";

import { SpecialEventsRow } from "./special-events-row";

/**
 * Section 4 — Special Events. Replaces the split flour layout in DESIGN_SPEC.md §6.4 with a heading and
 * a sideways row of event cards (agreed with the client, 30 Oct 2026). Keeps the Events panel colours
 * and the flour glow on the cards.
 */
export async function SpecialEvents() {
  const events = await getSpecialEvents();

  return (
    <section id="events" aria-labelledby="events-title" className="overflow-hidden bg-events-panel py-14 lg:py-20">
      <SpecialEventsRow
        events={events}
        heading={
          <RevealGroup className="max-w-[620px]">
            <RevealItem>
              <p className="type-eyebrow text-events-eyebrow">Special events</p>
            </RevealItem>
            <RevealItem>
              <h2 id="events-title" className="type-display-md mt-4 text-events-heading lg:mt-5">
                Treats for the days that matter
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="type-body-lg mt-4 leading-[1.45] text-events-text lg:mt-5">
                From spooky Halloween bakes to Christmas, Valentine&apos;s and your wedding day, every celebration
                deserves a cake of its own.
              </p>
            </RevealItem>
          </RevealGroup>
        }
      />
    </section>
  );
}
