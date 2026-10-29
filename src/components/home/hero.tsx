import Image from "next/image";
import Link from "next/link";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

/**
 * Section 1 — Hero. Layout follows the client's reference (design/mockups): glossy white-chocolate
 * pour from the top left with the copy on it, and the baker photo in an arched frame on the right.
 *
 * The pour image is stretched vertically (box taller than the image's 3:2) so the pour reaches
 * further down the section. Its pink matches the section background (`bg-[#F5BFC9]`) so the
 * image edge never shows.
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#F5BFC9] lg:h-[clamp(720px,63.3vw,912px)]"
    >
      {/* Pour background */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 -z-10 h-[860px] w-[230vw] lg:h-[137%] lg:w-auto lg:aspect-[1536/1331]"
      >
        <Image src="/images/hero-pour-bg.jpg" alt="" fill priority sizes="(min-width: 1024px) 100vw, 230vw" className="object-fill" />
      </div>

      <div className="flex h-full flex-col gap-10 px-5 pt-10 pb-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-[5.5%] lg:py-0">
        {/* Copy, sitting on the pour */}
        <RevealGroup onLoad className="text-center lg:max-w-[480px] lg:self-start lg:pt-[clamp(56px,6.25vw,90px)] lg:text-left">
          <RevealItem>
            <p className="type-eyebrow text-rose-text">Bletchley · Milton Keynes</p>
          </RevealItem>
          <RevealItem>
            <h1 id="hero-title" className="type-display-xl mt-4 lg:mt-5">
              Bite into
              <br />
              Happiness
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="type-body-lg mx-auto mt-4 max-w-[420px] text-cocoa-body lg:mx-0 lg:mt-5">
              Handmade cakes and cupcakes by {site.owner}, baked with love to bring joy.
            </p>
          </RevealItem>
          <RevealItem className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-7 lg:justify-start">
            <Button asChild>
              <Link href="/cakes">Order now</Link>
            </Button>
            <Button asChild variant="outline" className="bg-white-choc/40">
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
