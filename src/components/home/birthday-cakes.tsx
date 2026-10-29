import Image from "next/image";
import Link from "next/link";

import { RevealGroup, RevealItem, RevealPhoto } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const points = ["Add a message on the cake", "Matching cupcakes", "From [£PRICE]"];

/**
 * Section 2 — Birthday Cakes. DESIGN_SPEC.md §6.2.
 *
 * Desktop: one screen tall (viewport height minus the sticky nav). The pour flows from the top
 * right with the copy on it; the two photos overlap on the pink at the left as one collage that
 * scales with the section height, so the arch keeps its shape on wide and short screens.
 *
 * The pour is sized from the copy, not the section: its box is anchored to the copy column and is
 * ~2× its height, and the pour's wavy edge sits at ~50–59% of the image, so the edge always lands
 * just below the button whatever the copy length or screen width. The image's pink matches the
 * Hero's, so the two sections join without a seam.
 */
export function BirthdayCakes() {
  return (
    <section
      id="birthday"
      aria-labelledby="birthday-title"
      className="relative isolate overflow-hidden bg-[#F5BFC9]"
    >
      {/* Blend the Hero's pink into this section's slightly lighter pink (left side only, where both are pink) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -z-10 hidden h-16 w-[42%] bg-gradient-to-b from-[#F7BECC] to-transparent [mask-image:linear-gradient(to_right,black_60%,transparent)] lg:block"
      />

      {/* Centred 1500px frame, one screen tall on desktop (viewport minus the 64px sticky nav) */}
      <div className="relative lg:mx-auto lg:min-h-[clamp(560px,calc(100svh-64px),960px)] lg:max-w-[1500px]">
        {/* Copy column — also the reference box for the pour */}
        <div className="relative lg:ml-auto lg:w-[46%] lg:pr-[min(4vw,60px)] xl:w-[44.8%]">
          {/* Pour box: on wide screens it reaches past the frame to the viewport's right edge */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 -z-10 h-[215%] w-[230vw] lg:right-[min(0px,calc((1500px-100vw)/2))] lg:h-[200%] lg:w-[100vw]"
          >
            <Image src="/images/birthday-pour-bg.jpg" alt="" fill sizes="(min-width: 1024px) 100vw, 230vw" className="object-fill" />
          </div>

          <RevealGroup className="px-5 pt-12 pb-10 sm:px-10 lg:px-0 lg:pt-[clamp(40px,9svh,104px)] lg:pb-12">
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
              <p className="type-body-lg leading-[1.45] text-cocoa-body">Cakes by Ish makes those sweet memories real, one cake at a time.</p>
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
        </div>

        {/* Photos: side by side on mobile, overlapping on desktop */}
        {/* Desktop collage box: mockup proportions (605 × 713 at 1440 wide), height-driven */}
        <div className="grid grid-cols-2 gap-4 px-5 pb-14 sm:px-10 lg:absolute lg:top-[12.2%] lg:left-[5.2%] lg:block lg:aspect-[605/713] lg:h-[74.3%] lg:max-w-[46%] lg:p-0">
          <RevealPhoto className="relative h-[280px] overflow-hidden rounded-[999px_999px_10px_10px] shadow-photo sm:h-[360px] lg:absolute lg:top-0 lg:left-0 lg:h-[78.7%] lg:w-[61.3%]">
            <Image
              src="/images/cake-butterfly.jpg"
              alt="Peach buttercream birthday cake with a gold number 7, pink butterflies, piped rosettes and gold and blush spheres"
              fill
              sizes="(min-width: 1024px) 26vw, 50vw"
              className="object-cover object-[50%_45%]"
            />
          </RevealPhoto>
          <RevealPhoto
            delay={0.12}
            className="relative h-[280px] overflow-hidden rounded-[12px] border-[7px] border-white-choc shadow-photo sm:mt-10 sm:h-[360px] lg:absolute lg:top-[39.7%] lg:left-[49.4%] lg:mt-0 lg:h-[60.3%] lg:w-[50.4%]"
          >
            <Image
              src="/images/cake-pink-drip.jpg"
              alt="Pink drip birthday cake topped with macarons and gold meringue kisses, with a Happy Birthday disc"
              fill
              sizes="(min-width: 1024px) 22vw, 50vw"
              className="object-cover object-[50%_60%]"
            />
          </RevealPhoto>
        </div>
      </div>
    </section>
  );
}
