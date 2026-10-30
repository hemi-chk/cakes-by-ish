import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/brand/social-icons";
import { mainNav, site, whatsappUrl } from "@/config/site";

const darkFocus = "focus-visible:outline-footer-text";

/** Site footer — DESIGN_SPEC.md §6.6. */
export function SiteFooter() {
  return (
    <footer className="bg-footer-bg px-5 pt-12 pb-6 text-footer-muted lg:px-[120px] lg:pt-14 lg:pb-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:flex-wrap lg:items-start lg:justify-between">
        <div>
          <Logo tone="dark" />
          <p className="type-small mt-1">{site.location}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-1 lg:flex-row lg:flex-wrap lg:gap-6">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`type-nav inline-flex min-h-11 items-center text-[13px] text-footer-text transition-colors hover:text-footer-link ${darkFocus}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="type-small flex flex-col items-start not-italic">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center text-footer-link underline underline-offset-4 lg:min-h-0 ${darkFocus}`}
          >
            {site.instagram.handle}
          </a>
          <a
            href={`mailto:${site.email}`}
            className={`inline-flex min-h-11 items-center underline-offset-4 hover:text-footer-link hover:underline lg:mt-1 lg:min-h-0 ${darkFocus}`}
          >
            {site.email}
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:text-footer-link hover:underline lg:mt-1 lg:min-h-0 ${darkFocus}`}
          >
            <WhatsAppIcon className="size-4" />
            {site.whatsapp.display}
          </a>
        </address>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-[rgba(251,243,230,0.18)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-fine text-footer-fine">© 2026 {site.name}</p>
        <Link
          href="/privacy"
          className={`type-fine inline-flex min-h-11 items-center text-footer-fine underline underline-offset-4 hover:text-footer-link ${darkFocus}`}
        >
          Privacy notice
        </Link>
      </div>
    </footer>
  );
}
