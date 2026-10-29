import Image from "next/image";
import Link from "next/link";

import { RevealDrip, RevealGroup, RevealItem, RevealPhoto } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const cakes = [
  {
    name: "25th Anniversary",
    src: "/images/cake-anniversary.jpg",
    alt: "White fondant anniversary cake with a cascade of piped white flowers, a silver 25 and the couple's names",
    position: "object-[50%_55%]",
  },
  {
    name: "Rose Ombré",
    src: "/images/cake-rose-ombre.jpg",
    alt: "Pink and white ombré buttercream cake with fresh pink roses, baby's breath and gold-dipped strawberries",
    position: "object-[50%_45%]",
  },
  {
    name: "Chocolate Strawberry",
    src: "/images/cake-chocolate-strawberry.jpg",
    alt: "Chocolate drip cake with gold leaf, chocolate rosettes, fresh strawberries and white chocolate pearls",
    position: "object-[50%_50%]",
  },
  {
    name: "Raspberry Chocolate",
    src: "/images/cake-chocolate-raspberry.jpg",
    alt: "Chocolate cake coated in chocolate shavings, crowned with cream rosettes and fresh raspberries",
    position: "object-[50%_50%]",
  },
];

/**
 * Section 3 — Anniversary Cakes (DESIGN_SPEC.md §6.3).
 *
 * Copy sits on a solid white-chocolate band that grows with its text, so it never ends up on the pink.
 * The drip image hangs off the bottom of that band and the photos are pulled up over its tails. Photos
 * are a 4-column grid on desktop and a horizontal scroll-snap row on mobile.
 */
export function AnniversaryCakes() {
  return (
    <section id="anniversary" aria-labelledby="anniversary-title" className="relative overflow-hidden bg-blush">
      <div className="bg-white-choc px-5 pt-14 pb-[4vw] text-center sm:px-10 lg:px-[clamp(48px,calc(15vw-56px),160px)] lg:pt-16 lg:pb-[2vw]">
        <RevealGroup className="mx-auto max-w-[620px]">
          <RevealItem>
            <p className="type-eyebrow text-rose-text">Celebrate together</p>
          </RevealItem>
          <RevealItem>
            <h2 id="anniversary-title" className="type-display-lg mt-4 lg:mt-5">
              Anniversary Cakes
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="type-body-lg mt-4 leading-[1.45] text-cocoa-body lg:mt-5">
              For all the years you&apos;ve loved, and all the memories yet to come. Celebrate your forever with a
              lovingly crafted anniversary cake, made to sweeten the moments that make your love story uniquely yours.
            </p>
          </RevealItem>
        </RevealGroup>
      </div>

      {/* Drips hang off the band; the denser crop on mobile keeps them from looking stretched. The image
          overlaps the band's bottom padding and fades in over it, so their shading meets without a seam. */}
      <RevealDrip className="-mt-[4vw] [mask-image:linear-gradient(to_bottom,transparent,black_4vw)] lg:-mt-[2vw] lg:[mask-image:linear-gradient(to_bottom,transparent,black_2vw)]">
        <Image
          src="/images/cream-drips.webp"
          alt=""
          width={1774}
          height={526}
          sizes="100vw"
          className="hidden h-auto w-full lg:block"
        />
        <Image
          src="/images/cream-drips-tall.webp"
          alt=""
          width={1024}
          height={372}
          sizes="100vw"
          className="h-auto w-full lg:hidden"
        />
      </RevealDrip>

      <div
        role="region"
        aria-label="Anniversary cake photos"
        tabIndex={0}
        className="relative -mt-[18vw] flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa lg:-mt-[20vw] lg:mx-auto lg:grid lg:max-w-[1560px] lg:grid-cols-4 lg:gap-7 lg:overflow-visible lg:px-[clamp(48px,calc(15vw-56px),160px)] lg:pb-0"
      >
        {cakes.map((cake, i) => (
          <RevealPhoto key={cake.src} delay={i * 0.08} className="w-[72%] shrink-0 snap-start lg:w-auto">
            <figure className="flex flex-col items-center gap-3">
              <div className="relative h-[220px] w-full overflow-hidden rounded-[999px_999px_10px_10px] border-[6px] border-white-choc shadow-photo lg:h-[clamp(280px,21vw,380px)]">
                <Image
                  src={cake.src}
                  alt={cake.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 72vw"
                  className={`object-cover ${cake.position}`}
                />
              </div>
              <figcaption className="type-caption-serif text-center text-balance text-cocoa">{cake.name}</figcaption>
            </figure>
          </RevealPhoto>
        ))}
      </div>

      <div className="flex justify-center px-5 pt-10 pb-14 lg:pb-10">
        <Button asChild className="w-full sm:w-auto">
          <Link href="/cakes/anniversary">Shop anniversary cakes</Link>
        </Button>
      </div>
    </section>
  );
}
