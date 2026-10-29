import Link from "next/link";

import { cn } from "@/lib/utils";

/** "Cakes *by* Ish" wordmark — DESIGN_SPEC.md §3. `tone="dark"` is for the footer. */
export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Cakes by Ish, home"
      className={cn(
        "type-logo inline-flex min-h-11 items-center whitespace-nowrap",
        tone === "light" ? "text-cocoa" : "text-footer-text focus-visible:outline-footer-text",
        className,
      )}
    >
      Cakes{" "}
      <span className={cn("mx-[0.22em] font-medium italic", tone === "light" ? "text-rose" : "text-footer-link")}>
        by
      </span>{" "}
      Ish
    </Link>
  );
}
