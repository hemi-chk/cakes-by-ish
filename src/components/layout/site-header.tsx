"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav } from "@/config/site";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "@/modules/auth/client";

/** Main navigation bar — DESIGN_SPEC.md §5.2. Shrinks from 84px to 64px once the page scrolls. */
export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const firstName = session?.user.name.split(" ")[0];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function onSignOut() {
    await signOut();
    router.refresh();
  }

  // Sign-in link that brings the visitor back to this page afterwards
  const signInHref = pathname === "/" || pathname === "/sign-in" ? "/sign-in" : `/sign-in?next=${encodeURIComponent(pathname)}`;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-line transition-[height,background-color,box-shadow] duration-200 ease-out motion-reduce:transition-none",
        scrolled ? "h-16 bg-cream/95 shadow-menu backdrop-blur-[8px]" : "h-16 bg-cream lg:h-[84px]",
      )}
    >
      <div className="flex h-full items-center justify-between gap-6 px-4 lg:px-12">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "type-nav inline-flex min-h-11 items-center border-b-2 py-3 transition-colors",
                      active
                        ? "border-rose font-bold text-rose"
                        : "border-transparent text-cocoa hover:text-rose-text",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {/* Nothing until the session is known, so the link doesn't flash "Sign in" for signed-in visitors */}
          {isPending ? null : session ? (
            <>
              <span className="px-1 text-sm text-cocoa-body">Hi, {firstName}</span>
              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex min-h-11 items-center rounded-[4px] px-3 py-2 text-sm text-cocoa underline-offset-4 transition-colors hover:text-rose-text hover:underline"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href={signInHref}
              className="inline-flex min-h-11 items-center rounded-[4px] px-3 py-2 text-sm text-cocoa transition-colors hover:text-rose-text"
            >
              Sign in
            </Link>
          )}
          <Button asChild size="nav">
            <Link href="/cakes">Order now</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Button asChild variant="ghost" size="icon" aria-label="Cart">
            <Link href="/cart">
              <ShoppingBag className="size-6!" />
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-6!" />
              </Button>
            </SheetTrigger>
            <SheetContent className="px-6 pt-16 pb-8">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav aria-label="Mobile" className="flex-1">
                <ul className="divide-y divide-line border-y border-line">
                  {mainNav.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex h-14 items-center text-base tracking-[0.08em] uppercase",
                              active ? "font-bold text-rose" : "text-cocoa",
                            )}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                  {!isPending && (
                    <li>
                      <SheetClose asChild>
                        {session ? (
                          <button type="button" onClick={onSignOut} className="flex h-14 w-full items-center text-base text-cocoa">
                            Sign out ({firstName})
                          </button>
                        ) : (
                          <Link href={signInHref} className="flex h-14 items-center text-base text-cocoa">
                            Sign in
                          </Link>
                        )}
                      </SheetClose>
                    </li>
                  )}
                </ul>
              </nav>
              <SheetClose asChild>
                <Button asChild className="w-full">
                  <Link href="/cakes">Order now</Link>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
