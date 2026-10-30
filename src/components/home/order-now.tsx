import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { WhatsAppIcon } from "@/components/brand/social-icons";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site, whatsappUrl } from "@/config/site";

/**
 * Section 6 — Order Now (DESIGN_SPEC.md §6.6). The flat-lay photo has a cocoa ellipse painted at its
 * centre (51% x, 52% y). The photo always covers the section with that point pinned, so the copy,
 * centred on the same point, always sits inside the ellipse. The section height is chosen so the
 * ellipse stays taller than the copy at every width.
 */
export function OrderNow() {
  const whatsappLabel = site.whatsapp.number ? `WhatsApp ${site.whatsapp.display}` : "Chat on WhatsApp";

  return (
    <section
      id="order"
      aria-labelledby="order-title"
      className="relative isolate flex h-[640px] items-center justify-center overflow-hidden bg-footer-bg lg:h-[clamp(680px,62.5vw,900px)]"
    >
      <Image
        src="/images/order-flatlay-pink.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[51%_52%]"
      />

      {/* Centred on the ellipse: nudged 1% right and 2% down to match its position in the photo */}
      <RevealGroup className="flex w-[calc(100%-32px)] max-w-[440px] translate-x-[1%] translate-y-[2%] flex-col items-center text-center">
        <RevealItem>
          <Heart aria-hidden="true" className="size-[30px] fill-[#E9A8B3] text-[#E9A8B3]" strokeWidth={1.8} />
        </RevealItem>
        <RevealItem>
          <h2 id="order-title" className="type-display-order mt-4 text-white-choc">
            Order Now
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="type-body-lg mx-auto mt-4 max-w-[380px] text-[#EBD3D7]">
            Tell us your date and your idea, and we&apos;ll bake something sweet to make it special.
          </p>
        </RevealItem>
        <RevealItem className="mt-7">
          <Button asChild variant="pillCream" size="lg">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {whatsappLabel}
            </a>
          </Button>
        </RevealItem>
        <RevealItem className="mt-2">
          <Button
            asChild
            variant="link"
            className="text-footer-link hover:text-white-choc focus-visible:outline-white-choc"
          >
            <Link href="/cakes">or order online</Link>
          </Button>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
