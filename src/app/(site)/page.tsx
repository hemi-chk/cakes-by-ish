import { AnniversaryCakes } from "@/components/home/anniversary-cakes";
import { BirthdayCakes } from "@/components/home/birthday-cakes";
import { Hero } from "@/components/home/hero";

// Homepage — sections from DESIGN_SPEC.md §6 are added one step at a time.
const upcoming = [
  { id: "events", title: "Special Events", bg: "bg-events-panel" },
  { id: "about", title: "About", bg: "bg-cream" },
  { id: "order", title: "Order Now", bg: "bg-blush-mist" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <BirthdayCakes />
      <AnniversaryCakes />
      {upcoming.map((s) => (
        <section key={s.id} id={s.id} className={`${s.bg} flex min-h-[60vh] items-center justify-center px-4`}>
          <p className="type-eyebrow text-rose-text">{s.title} · coming next</p>
        </section>
      ))}
    </>
  );
}
