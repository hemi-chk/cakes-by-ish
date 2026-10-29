import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { getActiveAnnouncement } from "@/lib/data/announcements";

/** Thin bar above the nav while an announcement is active and within its dates. Scrolls away; the nav stays sticky. */
export async function AnnouncementBanner() {
  const announcement = await getActiveAnnouncement();
  if (!announcement) return null;

  const content = (
    <>
      {/* Wraps on phones; one line on desktop, where the Hero height assumes a 40px bar */}
      <span className="text-balance lg:truncate">{announcement.message}</span>
      {announcement.link && <ChevronRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.8} />}
    </>
  );
  const className =
    "flex min-h-10 items-center justify-center gap-1.5 px-4 py-2 text-center text-sm font-medium text-white focus-visible:outline-white";

  return (
    <aside data-announcement aria-label="Announcement" className="bg-rose">
      {announcement.link ? (
        <Link href={announcement.link} className={`${className} hover:underline hover:underline-offset-4`}>
          {content}
        </Link>
      ) : (
        <p className={className}>{content}</p>
      )}
    </aside>
  );
}
