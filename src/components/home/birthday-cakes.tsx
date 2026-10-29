import Image from "next/image";
import Link from "next/link";

import { RevealGroup, RevealItem, RevealPhoto } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const points = ["Add a message on the cake", "Matching cupcakes", "From [£PRICE]"];

/**
 * Section 2 — Birthday Cakes (redesign).
 *
 * Cream background so the page alternates with the pink Hero instead of repeating the pour. Natural
 * height with the spec's section padding (80px desktop / 56px mobile). Photo collage on the left
 * with a soft blush arch behind it, copy on the right; on mobile the copy comes first, then the
 * same collage, centred.
 */
export function BirthdayCakes() {
  return (
    <section id="birthday" aria-labelledby="birthday-title" className="bg-cream px-5 py-14 sm:px-10 lg:px-[min(5.5vw,80px)] lg:py-20">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-[clamp(48px,6vw,96px)]">
        {/* Copy */}
        <RevealGroup className="lg:order-2">
          <RevealItem>
            <p className="type-eyebrow text-rose-text">Made to order</p>
          </RevealItem>
          <RevealItem>
            <h2 id="birthday-title" className="type-display-lg mt-4 lg:mt-5">
              Birthday Cakes
            </h2>
          </RevealItem>
          <RevealItem className="mt-4 max-w-[560px] space-y-3 lg:mt-5">
            <p className="type-body-lg leading-[1.45] text-cocoa-body">
              Birthday cakes taste like childhood: the excitement of seeing your name in icing, the glow of tiny
              candles, and the familiar voices singing around you. A little sweetness that takes us back to when
              growing older felt magical and every birthday felt like the happiest day in the world.
            </p>
            <p className="type-body-lg leading-[1.45] text-cocoa-body">
              Cakes by Ish makes those sweet memories real, one cake at a time.
            </p>
          </RevealItem>
          <RevealItem>
            <ul className="mt-5 space-y-2.5">
              {points.map((point) => (
                <li key={point} className="type-body flex items-center gap-3 text-[#4A3135]">
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-rose-dot" />
                  {point}
                </li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem className="mt-7">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/cakes/birthday">Shop birthday cakes</Link>
            </Button>
          </RevealItem>
        </RevealGroup>

        {/* Photo collage: arched photo with a framed photo overlapping it, on a blush arch */}
        <div className="relative mx-auto aspect-[605/713] w-full max-w-[420px] lg:order-1 lg:max-w-[540px]">
          <div
            aria-hidden="true"
            className="absolute top-[6%] left-[12%] h-[90%] w-[72%] rounded-[999px_999px_24px_24px] bg-blush"
          />
          <RevealPhoto className="absolute top-0 left-0 h-[78.7%] w-[61.3%] overflow-hidden rounded-[999px_999px_10px_10px] shadow-photo">
            <Image
              src="/images/cake-butterfly.jpg"
              alt="Peach buttercream birthday cake with a gold number 7, pink butterflies, piped rosettes and gold and blush spheres"
              fill
              sizes="(min-width: 1024px) 330px, 62vw"
              className="object-cover object-[50%_45%]"
            />
          </RevealPhoto>
          <RevealPhoto
            delay={0.12}
            className="absolute top-[39.7%] left-[49.4%] h-[60.3%] w-[50.4%] overflow-hidden rounded-[12px] border-[7px] border-white-choc shadow-photo"
          >
            <Image
              src="/images/cake-pink-drip.jpg"
              alt="Pink drip birthday cake topped with macarons and gold meringue kisses, with a Happy Birthday disc"
              fill
              sizes="(min-width: 1024px) 280px, 52vw"
              className="object-cover object-[50%_60%]"
            />
          </RevealPhoto>
        </div>
      </div>
    </section>
  );
}
