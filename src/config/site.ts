// Public business details. Values in [square brackets] are placeholders the client still has to
// supply (DESIGN_SPEC.md §12) and must not ship. WhatsApp number and bank details move to the
// admin-editable `settings` table once the backend lands.

export const site = {
  name: "Cakes by Ish",
  owner: "Ishani Attanayake",
  location: "Bletchley, Milton Keynes",
  instagram: {
    handle: "@Cakesby_Ish",
    url: "https://www.instagram.com/cakesby_ish/",
  },
  facebookUrl: "https://www.facebook.com/share/1C8r8qhWpY/",
  email: "ishaniphy@yahoo.com",
  whatsapp: {
    display: "+44 7792 607251",
    // International format, digits only, e.g. "447700900123".
    number: "447792607251",
    message: "Hi Ishani! I'd like to order a cake.",
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Cakes", href: "/cakes" },
  { label: "Cupcakes", href: "/cupcakes" },
  { label: "Custom cakes", href: "/custom-cakes" },
  { label: "Contact", href: "/#order" },
] as const;

export function whatsappUrl(message: string = site.whatsapp.message) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
