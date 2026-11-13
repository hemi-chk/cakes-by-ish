import { About } from "@/components/home/about";
import { AnniversaryCakes } from "@/components/home/anniversary-cakes";
import { BirthdayCakes } from "@/components/home/birthday-cakes";
import { Hero } from "@/components/home/hero";
import { OrderNow } from "@/components/home/order-now";
import { SpecialEvents } from "@/components/home/special-events";
import { ChristmasPopup } from "@/components/seasonal/christmas";
import { HalloweenGhost, HalloweenPopup } from "@/components/seasonal/halloween";

// Homepage — sections from DESIGN_SPEC.md §6.
export default function HomePage() {
  return (
    <>
      <HalloweenGhost />
      <HalloweenPopup />
      <ChristmasPopup />
      <Hero />
      <BirthdayCakes />
      <AnniversaryCakes />
      <SpecialEvents />
      <About />
      <OrderNow />
    </>
  );
}
