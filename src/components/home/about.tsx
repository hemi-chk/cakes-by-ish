import Image from "next/image";

import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/brand/social-icons";
import { RevealGroup, RevealItem, RevealPhoto } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site, whatsappUrl } from "@/config/site";

const socials = [
  { label: "Instagram", href: site.instagram.url, Icon: InstagramIcon },
  { label: "WhatsApp", href: whatsappUrl(), Icon: WhatsAppIcon },
  { label: "Facebook", href: site.facebookUrl, Icon: FacebookIcon },
];

/**
 * Section 5 — About Cakes by Ish (DESIGN_SPEC.md §6.5). Copy on the left, circular portrait on a blush
 * circle on the right. On mobile the portrait comes first.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="overflow-hidden bg-cream px-5 py-16 lg:px-[min(5.5vw,80px)] lg:py-20 xl:px-[120px]">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-12 lg:flex-row-reverse lg:justify-between lg:gap-12">
        {/* Portrait on a blush circle offset 24px down (mobile: 280px on 300px) */}
        <RevealPhoto className="relative shrink-0">
          <div
            aria-hidden="true"
            className="absolute top-[calc(50%+24px)] left-1/2 size-[300px] -translate-1/2 rounded-full bg-blush lg:size-[min(560px,40vw)]"
          />
          <div className="relative size-[280px] overflow-hidden rounded-full border-[10px] border-white shadow-portrait lg:size-[min(520px,37vw)]">
            <Image
              src="/images/hero-baker.jpg"
              alt={`${site.owner}, the baker behind Cakes by Ish, piping icing onto a cake`}
              fill
              sizes="(min-width: 1024px) 520px, 280px"
              className="object-cover object-[64%_38%]"
            />
          </div>
        </RevealPhoto>

        <RevealGroup className="max-w-[600px] text-center lg:text-left">
          <RevealItem>
            <p className="type-eyebrow text-rose-text">Meet the baker</p>
          </RevealItem>
          <RevealItem>
            <h2 id="about-title" className="type-display-lg mt-4 text-balance lg:mt-5">
              About Cakes <span className="font-medium text-rose italic">by</span> Ish
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="type-body-lg mt-5 text-cocoa-body">
              Big birthdays. Quiet anniversaries. &ldquo;Just because&rdquo; Tuesdays. I&apos;m Ishani, and I bake for
              all of them. What started as a loving mum making cakes for her family&apos;s special occasions is now a
              little Milton Keynes bakery fuelled by buttercream, sprinkles and a lot of excitement every time an order
              comes in.
            </p>
          </RevealItem>
          <RevealItem>
            <p className="type-body-lg mt-4 text-cocoa-body">
              No two cakes are the same, because no two celebrations are. Message me your idea, even if it&apos;s
              half-formed, and we&apos;ll shape it together. Fresh, handmade and ready to steal the show.
            </p>
          </RevealItem>
          <RevealItem>
            <p className="type-eyebrow mt-8 text-rose-text">Follow and message</p>
          </RevealItem>
          <RevealItem className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
            {socials.map(({ label, href, Icon }) => (
              <Button key={label} asChild variant="pill">
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="size-5 text-rose" />
                  {label}
                </a>
              </Button>
            ))}
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
