import { Heart } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { WhatsAppIcon } from "@/components/brand/social-icons";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Coming soon",
  robots: { index: false },
};

/**
 * Placeholder for pages that aren't built yet. next.config.ts redirects their links here; remove a
 * redirect there once its page exists.
 */
export default function ComingSoonPage() {
  return (
    <section
      aria-labelledby="coming-soon-title"
      className="flex min-h-[70svh] items-center justify-center bg-cream px-5 py-20"
    >
      <RevealGroup onLoad className="flex max-w-[520px] flex-col items-center text-center">
        <RevealItem>
          <Heart aria-hidden="true" className="size-[30px] fill-[#E9A8B3] text-[#E9A8B3]" strokeWidth={1.8} />
        </RevealItem>
        <RevealItem>
          <p className="type-eyebrow mt-5 text-rose-text">Still in the oven</p>
        </RevealItem>
        <RevealItem>
          <h1 id="coming-soon-title" className="type-display-lg mt-4">
            Coming soon
          </h1>
        </RevealItem>
        <RevealItem>
          <p className="type-body-lg mt-4 text-cocoa-body">
            We&apos;re still baking this part of the site. In the meantime, message us on WhatsApp and
            we&apos;ll help you order.
          </p>
        </RevealItem>
        <RevealItem className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
