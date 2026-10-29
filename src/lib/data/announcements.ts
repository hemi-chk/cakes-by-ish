import type { Announcement } from "./types";

// Mock data until D1 lands (matches the seed in CLAUDE.md).
const announcements: Announcement[] = [
  {
    id: 1,
    message: "It's Halloween month 🎃 Order a spooky themed cake!",
    link: "/custom-cakes",
    startsAt: "2026-10-01",
    endsAt: "2026-10-31",
    active: true,
  },
];

/**
 * The announcement to show in the site banner: active and within its dates, or null.
 * Pages are prerendered, so "today" is the build date until the banner reads from D1 with revalidation.
 */
export async function getActiveAnnouncement(): Promise<Announcement | null> {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
  return announcements.find((a) => a.active && a.startsAt <= today && today <= a.endsAt) ?? null;
}
