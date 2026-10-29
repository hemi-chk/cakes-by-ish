import type { Metadata } from "next";
import { ChevronRight, Heart } from "lucide-react";

import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/brand/social-icons";
import { Button } from "@/components/ui/button";

// Internal page for reviewing tokens and components against DESIGN_SPEC.md. Remove before launch.
export const metadata: Metadata = { title: "Style guide", robots: { index: false } };

const swatches = [
  ["blush", "bg-blush"],
  ["blush-soft", "bg-blush-soft"],
  ["blush-mist", "bg-blush-mist"],
  ["cream", "bg-cream"],
  ["white-choc", "bg-white-choc"],
  ["white-choc-shadow", "bg-white-choc-shadow"],
  ["rose", "bg-rose"],
  ["rose-hover", "bg-rose-hover"],
  ["rose-text", "bg-rose-text"],
  ["rose-dot", "bg-rose-dot"],
  ["cocoa", "bg-cocoa"],
  ["cocoa-body", "bg-cocoa-body"],
  ["cocoa-soft", "bg-cocoa-soft"],
  ["line", "bg-line"],
  ["line-strong", "bg-line-strong"],
  ["events-panel", "bg-events-panel"],
] as const;

function Block({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`px-4 py-14 lg:px-[120px] ${className ?? ""}`}>
      <p className="type-eyebrow mb-6 text-rose-text">{title}</p>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <Block title="Colours">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {swatches.map(([name, bg]) => (
            <li key={name}>
              <div className={`${bg} h-16 rounded-lg border border-line`} />
              <p className="type-fine mt-2 text-cocoa-soft">{name}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Typography" className="space-y-5 bg-white-choc">
        <h1 className="type-display-xl">Bite into Happiness</h1>
        <h2 className="type-display-lg">Birthday Cakes</h2>
        <p className="type-display-md text-events-heading">Treats for the days that matter</p>
        <p className="type-title">Mother&apos;s Day</p>
        <p className="type-caption-serif text-cocoa">Rose Ombré</p>
        <p className="type-body-lg max-w-xl">
          Handmade cakes and cupcakes by Ishani Attanayake, baked with love to bring joy. (body-lg)
        </p>
        <p className="type-body max-w-xl">Matching cupcakes, from 3 to 50. (body)</p>
        <p className="type-small">Dates, meta, footer (small)</p>
        <p className="type-fine">© 2026 Cakes by Ish (fine)</p>
      </Block>

      <Block title="Buttons on cream">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Order now</Button>
          <Button size="nav">Order now</Button>
          <Button variant="outline">See the cakes</Button>
          <Button variant="soft">Soft</Button>
          <Button disabled>Disabled</Button>
          <Button variant="link">or order online</Button>
          <Button variant="pill">
            <InstagramIcon className="text-rose" /> Instagram
          </Button>
          <Button variant="pill">
            <WhatsAppIcon className="text-rose" /> WhatsApp
          </Button>
          <Button variant="pill">
            <FacebookIcon className="text-rose" /> Facebook
          </Button>
        </div>
      </Block>

      <Block title="Buttons on blush and events" className="bg-blush">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="cream">Cream</Button>
          <Button variant="creamFlour" size="lg">
            See seasonal specials
          </Button>
          <Button>
            Shop birthday cakes <ChevronRight />
          </Button>
        </div>
      </Block>

      <Block title="Buttons on dark" className="bg-footer-bg">
        <div className="flex flex-wrap items-center gap-3">
          <Heart className="size-[30px] fill-[#E9A8B3] text-[#E9A8B3]" aria-hidden />
          <Button variant="pillCream" size="lg" className="focus-visible:outline-footer-text">
            <WhatsAppIcon /> WhatsApp [number]
          </Button>
          <Button variant="link" className="text-footer-link focus-visible:outline-footer-text">
            or order online
          </Button>
        </div>
      </Block>
    </>
  );
}
