import Image from "next/image";
import Link from "next/link";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

/**
 * Section 1 — Hero. Layout follows the client's reference (design/mockups): glossy white-chocolate
 * pour from the top left with the copy on it, and the baker photo in an arched frame on the right.
 *
 * Desktop height is one screen (viewport minus the 84px nav, 560–912px), held in `--hero-h`.
 * Content sits in a centred 1500px frame so wide screens don't leave a gap in the middle.
 *
 * The pour box is 137% of the section height (pour stretched down to ~75–80%) and at least as wide
 * as the image's proportions need; on wide screens it widens to `50vw + 620px` so the cream still
 * reaches past the copy in the centred frame. Its pink matches the section background so the image
 * edge never shows.
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#F5BFC9] [--hero-h:clamp(560px,calc(100svh-84px),912px)] lg:h-[var(--hero-h)]"
    >
      {/* Pour background */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 -z-10 h-[860px] w-[230vw] lg:h-[calc(var(--hero-h)*1.37)] lg:w-[max(calc(var(--hero-h)*1.581),calc(50vw+620px))]"
      >
        <Image src="/images/hero-pour-bg.jpg" alt="" fill priority sizes="(min-width: 1024px) 100vw, 230vw" className="object-fill" />
      </div>

      <div className="flex h-full flex-col gap-10 px-5 pt-10 pb-14 lg:mx-auto lg:max-w-[1500px] lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-[min(5.5vw,80px)] lg:py-0">
        {/* Copy on the pour; on desktop the buttons drop to the bottom of the section, on the pink below the pour's edge */}
        <RevealGroup
          onLoad
          className="text-center lg:flex lg:h-full lg:max-w-[560px] lg:flex-col lg:self-start lg:pt-[clamp(32px,9svh,90px)] lg:text-left"
        >
          <RevealItem>
            <p className="type-eyebrow text-rose-text">Bletchley · Milton Keynes</p>
          </RevealItem>
          <RevealItem>
            <h1 id="hero-title" className="type-display-xl mt-4 text-balance lg:mt-5">
              Made of Sugar, Sprinkles &amp; Memories
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="type-body-lg mx-auto mt-4 max-w-[420px] text-cocoa-body lg:mx-0 lg:mt-5">
              Turning life&apos;s sweetest moments into something you can taste.
            </p>
          </RevealItem>
          <RevealItem className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-auto lg:mb-[clamp(28px,6svh,56px)] lg:justify-start">
            <Button asChild>
              <Link href="/cakes">Order now</Link>
            </Button>
            {/* Solid cream on desktop: the outline text needs it for contrast on the pink */}
            <Button asChild variant="outline" className="bg-white-choc/40 lg:bg-white-choc lg:hover:bg-blush-mist">
              <Link href="#birthday">See the cakes</Link>
            </Button>
          </RevealItem>
        </RevealGroup>

        {/* Baker photo in an arched white-chocolate frame */}
        <div className="relative mx-auto aspect-[475/765] w-[min(78vw,360px)] shrink-0 overflow-hidden rounded-[999px_999px_10px_10px] border-[8px] border-white-choc shadow-photo lg:mx-0 lg:h-[84%] lg:w-auto">
          <Image
            src="/images/hero-baker.jpg"
            alt={`${site.owner} piping pink icing onto a drip cake in her kitchen, surrounded by finished birthday cakes`}
            fill
            priority
            sizes="(min-width: 1024px) 34vw, 78vw"
            className="object-cover object-[62%_50%]"
          />
        </div>
      </div>
    </section>
  );
}
