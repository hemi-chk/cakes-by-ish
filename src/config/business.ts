// Business rules (CLAUDE.md "Business rules"). Change values here, not in components.
// Values marked "unconfirmed" still need the client's sign-off.

export const business = {
  currency: "GBP",
  locale: "en-GB",
  timeZone: "Europe/London",

  cupcakes: {
    // Unconfirmed: min 3 per type selected, max 50 total per order line.
    min: 3,
    max: 50,
  },

  // Unconfirmed: character limit for the message piped on a cake.
  cakeMessageMaxLength: 40,
} as const;

export function formatPrice(amount: number) {
  return new Intl.NumberFormat(business.locale, { style: "currency", currency: business.currency }).format(amount);
}
