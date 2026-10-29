import { Hero } from "@/components/home/hero";

// Homepage — sections from DESIGN_SPEC.md §6 are added one step at a time.
const upcoming = [
  { id: "birthday", title: "Birthday Cakes", bg: "bg-cream" },
  { id: "anniversary", title: "Anniversary Cakes", bg: "bg-blush" },
  { id: "events", title: "Special Events", bg: "bg-events-panel" },
  { id: "about", title: "About", bg: "bg-cream" },
  { id: "order", title: "Order Now", bg: "bg-blush-mist" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      {upcoming.map((s) => (
        <section key={s.id} id={s.id} className={`${s.bg} flex min-h-[60vh] items-center justify-center px-4`}>
          <p className="type-eyebrow text-rose-text">{s.title} · coming next</p>
        </section>
      ))}
    </>
  );
}
