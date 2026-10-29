// Types mirroring the D1 tables in CLAUDE.md "Data model". Mock data and, later, Drizzle queries
// both return these shapes, so pages don't change when the backend lands.

export type Announcement = {
  id: number;
  message: string;
  link: string | null;
  startsAt: string; // ISO date, Europe/London
  endsAt: string; // ISO date, Europe/London
  active: boolean;
};
