import { AnniversaryCakes } from "@/components/home/anniversary-cakes";
import { BirthdayCakes } from "@/components/home/birthday-cakes";
import { Hero } from "@/components/home/hero";
import { SpecialEvents } from "@/components/home/special-events";
import { HalloweenGhost, HalloweenPopup } from "@/components/seasonal/halloween";

// Homepage — sections from DESIGN_SPEC.md §6 are added one step at a time.
const upcoming = [
  { id: "about", title: "About", bg: "bg-cream" },
  { id: "order", title: "Order Now", bg: "bg-blush-mist" },
];

export default function HomePage() {
  return (
    <>
      <HalloweenGhost />
      <HalloweenPopup />
      <Hero />
      <BirthdayCakes />
      <AnniversaryCakes />
      <SpecialEvents />
      {upcoming.map((s) => (
        <section key={s.id} id={s.id} className={`${s.bg} flex min-h-[60vh] items-center justify-center px-4`}>
          <p className="type-eyebrow text-rose-text">{s.title} · coming next</p>
        </section>
      ))}
    </>
  );
}
