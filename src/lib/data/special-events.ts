// Mock data for the Special Events row. Not in the D1 schema yet: when the backend lands these become
// cake types (or their own table) so the admin can edit them. Ordered through the year from Halloween.

export type SpecialEvent = {
  slug: string;
  name: string;
  when: string;
  image: string | null; // path in public/images; null shows a placeholder until the photo is added
  alt: string;
};

const events: SpecialEvent[] = [
  {
    slug: "halloween",
    name: "Halloween",
    when: "31 October",
    image: "/images/cake-halloween.jpg",
    alt: "Mummy cake wrapped in white buttercream bandages with big orange eyes peeking out, bats behind",
  },
  {
    slug: "christmas",
    name: "Christmas",
    when: "25 December",
    image: "/images/cake-christmas.jpg",
    alt: "Pink drip cake topped with gold snowflakes, macarons, raspberries and meringue kisses on a gold stand",
  },
  {
    slug: "new-year",
    name: "New Year",
    when: "1 January",
    image: "/images/cake-pastel-ombre.jpg",
    alt: "Mint, lilac and pink ombré buttercream cake with silver stars, topped with meringue kisses",
  },
  {
    slug: "valentines",
    name: "Valentine's Day",
    when: "14 February",
    image: "/images/cake-berry-chocolate-ganache.jpg",
    alt: "Chocolate ganache cake topped with fresh strawberries and squares of dark and white chocolate",
  },
  {
    slug: "mothers-day",
    name: "Mother's Day",
    when: "Mothering Sunday, March",
    image: "/images/giftbox-mothers-day.jpg",
    alt: "Pink chocolate smash heart reading MUM with a little hammer, two cupcakes and two macarons",
  },
  {
    slug: "fathers-day",
    name: "Father's Day",
    when: "Third Sunday in June",
    image: "/images/cake-fathers-day.jpg",
    alt: "Blue buttercream cake with white chocolate drips and a Best Dad Ever plaque, ringed with blue rosettes",
  },
  {
    slug: "weddings",
    name: "Weddings",
    when: "All year round",
    image: "/images/cake-wedding.jpg",
    alt: "Cream buttercream wedding cake with gold leaf, topped and finished with ivory roses and baby's breath",
  },
];

export async function getSpecialEvents(): Promise<SpecialEvent[]> {
  return events;
}
