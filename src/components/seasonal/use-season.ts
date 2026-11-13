"use client";

import { useEffect, useState } from "react";

/**
 * True in the browser while today (Europe/London) is within the season's dates, or when the URL has
 * `?<preview>=1`. False on the server, so nothing seasonal prerenders.
 */
export function useSeason(season: { from: string; to: string }, preview: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date()).slice(5);
    const previewing = new URLSearchParams(window.location.search).get(preview) === "1";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the date is only known in the browser
    setOn(previewing || (season.from <= today && today <= season.to));
  }, [season.from, season.to, preview]);
  return on;
}
