# Cakes by Ish — UI Design Specification

Version 1.0 · 29 Oct 2026 · Homepage (6 sections) + shared components
Stack: Next.js (App Router) · Tailwind CSS · **shadcn/ui** · Motion (scroll effects) · Cloudflare Workers (OpenNext)

This document defines how the site looks. Functional requirements (orders, payments, admin, data model) live in `CLAUDE.md`. If the two ever disagree on visuals, this file wins.

Placeholders in `[square brackets]` are content the client still has to supply. Never ship them.

---

## 1. Design principles

1. **Her cakes are the hero.** Photography leads; UI stays soft and quiet around it.
2. **Bakery textures, not decoration.** White-chocolate pours and flour are the only ornament. No gradients, emoji or stock icons beyond the set in §7.
3. **One accent action per screen.** Each section has exactly one filled primary button.
4. **Readable on pink.** Every text/background pair in this spec passes WCAG AA (4.5:1 body, 3:1 large text). Don't lighten text colours to "match" a mockup.

---

## 2. Colour tokens

### 2.1 Brand palette

| Token | Hex | Use |
|---|---|---|
| `blush` | `#EFC6CD` | Main section background (Hero left, Anniversary) |
| `blush-birthday` | `#EFC6D1` | Birthday section fallback behind its pour image |
| `blush-soft` | `#E9C3C8` | Soft accent fills, secondary buttons |
| `blush-mist` | `#F5E2E4` | Muted surfaces, skeletons |
| `cream` | `#FBF7F3` | Page background, nav, About section |
| `white-choc` | `#FBF3E6` | White chocolate drip fill, cream buttons, photo frames |
| `white-choc-shadow` | `#E3CDB3` | Drip shadow layer (offset 9px down) |
| `rose` | `#9A5560` | **Primary** buttons, active nav underline |
| `rose-hover` | `#84434F` | Primary hover |
| `rose-pressed` | `#713945` | Primary active/pressed |
| `rose-text` | `#8C4A55` | Eyebrows, inline links, prices |
| `rose-dot` | `#B85F72` | List bullets, small decorative marks (never text) |
| `cocoa` | `#3E2A2E` | Headings, footer background, Order circle |
| `cocoa-body` | `#5A3F44` | Body copy |
| `cocoa-soft` | `#6A4D52` | Secondary text, captions |
| `line` | `#EBDCD6` | Borders, dividers |
| `line-strong` | `#D9B3BA` | Outline pill buttons, input borders |

### 2.2 Special Events panel (section 4 only)

| Token | Hex | Use |
|---|---|---|
| `events-panel` | `#E9C0BD` | Panel fallback colour behind its flour image |
| `events-heading` | `#8E3A52` | H2 and event names (large text only) |
| `events-text` | `#6E2C40` | Body, dates |
| `events-eyebrow` | `#7A2E48` | Eyebrow (small text: needs the darker shade) |
| `events-card` | `rgba(251,238,234,0.72)` | Event card fill |
| `events-button` | `#FDF6EE` | Cream button fill |

### 2.3 Footer and dark surfaces

| Token | Hex | Use |
|---|---|---|
| `footer-bg` | `#3E2A2E` | Footer, Order circle |
| `footer-text` | `#FBF3E6` | Footer headings, links |
| `footer-muted` | `#D9C2C6` | Address, email, number |
| `footer-link` | `#F6D9DE` | Instagram handle, secondary links |
| `footer-fine` | `#CDB4B9` | Copyright row |

### 2.4 Status colours (admin and forms)

| Token | Hex | Use |
|---|---|---|
| `success` | `#2F6B3F` on `#E6F2E8` | Confirmed, paid |
| `warning` | `#8A5A00` on `#FBF0D9` | Pending payment, slip uploaded |
| `danger` | `#B42318` on `#FDECEA` | Declined, cancelled, form errors |
| `info` | `#1F5C8A` on `#E6F0F8` | Quoted |

---

## 3. Typography

Load both with `next/font/google` (subset `latin`, `display: swap`).

| Family | Weights | Role |
|---|---|---|
| **Playfair Display** | 500, 600, 500 italic | Headings, logo, card titles, event names |
| **DM Sans** | 400, 500, 700 | Body, UI, buttons, nav |

The logo is always: `Cakes` (600) + `by` (500 italic, colour `rose`) + `Ish` (600).

### 3.1 Type scale

| Style | Font | Desktop (≥1024px) | Mobile (<768px) | Line height | Other |
|---|---|---|---|---|---|
| `display-xl` | Playfair 600 | 72px | 44px | 1.02 | Hero H1 only |
| `display-lg` | Playfair 600 | 60px | 40px | 1.05 | Section H2 |
| `display-order` | Playfair 600 | 68px | 48px | 1.0 | "Order Now" |
| `display-md` | Playfair 600 | 52px | 34px | 1.08 | Events H2 |
| `title` | Playfair 600 | 25px | 22px | 1.2 | Event names, card titles |
| `caption-serif` | Playfair 600 | 19px | 17px | 1.3 | Photo captions |
| `logo` | Playfair 600 | 30px | 24px | 1 | Nav + footer logo |
| `body-lg` | DM Sans 400 | 17px | 16px | 1.6 | Section intros |
| `body` | DM Sans 400 | 16px | 16px | 1.6 | Lists, general copy |
| `small` | DM Sans 400 | 14px | 14px | 1.5 | Dates, meta, footer |
| `fine` | DM Sans 400 | 13px | 13px | 1.4 | Copyright |
| `eyebrow` | DM Sans 700 | 13px | 12px | 1.2 | UPPERCASE, letter-spacing 0.22em |
| `nav` | DM Sans 400 / 700 active | 14px | 16px (mobile menu) | 1.2 | UPPERCASE, letter-spacing 0.08em |
| `button` | DM Sans 700 | 13px | 13px | 1 | UPPERCASE, letter-spacing 0.12em |
| `button-pill` | DM Sans 500 | 15px | 15px | 1 | Sentence case |

Minimum text size anywhere: **13px**. Body copy never below 16px on mobile.

---

## 4. Layout, spacing, radius, elevation

### 4.1 Breakpoints (Tailwind defaults)

`sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536. Desktop designs are drawn at **1440px**. Below `lg`, every two-column section stacks (see §6).

### 4.2 Spacing scale

Use Tailwind's 4px scale. Common values in this design:

| Use | Desktop | Mobile |
|---|---|---|
| Page side padding (content sections) | 120px | 16px (min) – 24px |
| Nav side padding | 48px | 16px |
| Section vertical padding | 80px | 56px |
| Gap: eyebrow → H2 → intro → list → button | 16–22px | 14–18px |
| Gap between buttons | 12px | 12px |
| Gap between list cards | 12–14px | 12px |
| Grid gap (photo rows) | 28px | 16px |

### 4.3 Radius

| Token | Value | Use |
|---|---|---|
| `radius-button` | 4px | Rectangular buttons |
| `radius-card` | 8–10px | Event cards, list cards, inputs (8px) |
| `radius-photo` | 10–12px | Photo frames |
| `radius-arch` | `999px 999px 10px 10px` | Arched photo tops (Birthday, Anniversary) |
| `radius-pill` | 999px | Social and WhatsApp buttons |
| `radius-circle` | 50% | About portrait, gift-box thumbnail |

### 4.4 Elevation

| Token | Value | Use |
|---|---|---|
| `shadow-photo` | `0 18px 40px rgba(110,53,64,0.22)` | Photo frames on pink |
| `shadow-portrait` | `0 20px 50px rgba(110,53,64,0.20)` | About portrait |
| `glow-flour` | `0 0 0 3px rgba(255,251,247,0.85), 0 0 14px 4px rgba(255,251,247,0.55)` | Events cards and button |
| `shadow-menu` | `0 8px 24px rgba(62,42,46,0.12)` | Dropdowns, cart sheet |

### 4.5 Photo frames

- Framed photo: 6–8px solid `white-choc` border, `box-sizing: border-box`, `shadow-photo`.
- All photos `object-fit: cover`; set `object-position` per image so the cake (not the board or any name lettering) is centred.

---

## 5. Components

All interactive targets are **at least 44 × 44px**. Every component needs visible hover, active, focus and disabled states.

**Focus ring (all components):** `outline: 2px solid #3E2A2E; outline-offset: 2px`. On dark surfaces (footer, Order circle) use `#FBF3E6`.

### 5.1 Buttons (shadcn `Button`, custom variants)

| Variant | Height | Padding (x) | Radius | Fill | Text | Border | Hover |
|---|---|---|---|---|---|---|---|
| `primary` (default) | 48px | 28px | 4px | `rose` | `#FFFFFF` | none | fill `rose-hover` |
| `primary` size `nav` | 44px | 22px | 4px | `rose` | `#FFFFFF` | none | fill `rose-hover` |
| `outline` | 48px | 24px | 4px | transparent | `rose-text` | 1.5px `rose` | fill `blush-mist` |
| `soft` | 44px | 18px | 4px | `blush-soft` | `#6E3540` | none | fill `#E2B3BA` |
| `cream` | 48px | 26px | 4px | `white-choc` | `#7A2E48` | none | fill `#FFFFFF` |
| `cream-flour` (Events) | 52px | 34px | 8px | `events-button` | `#7A2E48` | `glow-flour` | fill `#FFFFFF` |
| `pill` (social) | 48px | 20px | 999px | transparent | `cocoa` | 1.5px `line-strong` | fill `blush-mist` |
| `pill-cream` (WhatsApp) | 52px | 28px | 999px | `white-choc` | `cocoa` | none | fill `#FFFFFF` |
| `link` | 48px tap area | 0 | — | — | `rose-text` | underline offset 4px | `#6E3540` |

- Label: `button` style (13px DM Sans 700, uppercase, 0.12em) for all except `pill` / `pill-cream` / `link` (15px, 500, sentence case).
- Icon in button: 20px, 10px gap before label, stroke 1.8px, `currentColor`.
- Pressed: `rose-pressed` for primary; `transform: scale(0.98)` for all.
- Disabled: 45% opacity, `cursor: not-allowed`. Prefer leaving buttons enabled and showing an inline error instead.
- Loading: replace label with a 16px spinner, keep the button's width.

### 5.2 Navigation bar (Hero only; becomes sticky)

- Height **84px**, background `cream`, bottom border 1px `line`, side padding 48px.
- Left: logo (`logo` style, link to `/`).
- Centre: links Home · Cakes · Cupcakes · Custom cakes · Contact, `nav` style, gap 32px, each with 12px vertical padding (44px tap height).
- Active link: `rose`, weight 700, 2px bottom border `rose`.
- Right: "Sign in" text link (14px, 12px × 8px padding) + `primary` size `nav` "Order now".
- Sticky after scrolling past the hero: same bar, height **64px**, `cream` at 95% opacity with `backdrop-filter: blur(8px)` and `shadow-menu`.
- **Mobile (<1024px):** logo + 44px icon button (menu) + cart icon. Menu opens a shadcn `Sheet` from the right, links stacked at 16px with 56px row height, "Order now" full width at the bottom.

### 5.3 Eyebrow

`eyebrow` style, colour `rose-text` (on cream / blush / white-choc), `events-eyebrow` on the Events panel, `#F6D9DE` on dark. Always above an H2, 16–22px gap.

### 5.4 Bullet list (Birthday)

Row: 8px circle `rose-dot` + 12px gap + `body` text in `#4A3135`. Rows 10px apart.

### 5.5 Event card (Events)

- Height ≥ 64px, padding 18px 26px, radius 10px, fill `events-card`, `glow-flour`.
- Left: event name (`title`, `events-heading`). Right: date (`small`, `events-text`).
- If the card links to a product list, make the whole card an `<a>` with hover fill `rgba(255,250,246,0.9)`.

### 5.6 Photo caption (Anniversary)

`<figure>` with photo (height 300px desktop / 220px mobile, `radius-arch`, 6px `white-choc` border) and `<figcaption>` (`caption-serif`), 12px gap, centred.

### 5.7 Social pills (About, footer)

Instagram · WhatsApp · Facebook as `pill` buttons, 20px icon in `rose`, 12px gap, wrap on small screens.

### 5.8 Forms (cart, checkout, custom cake, sign in, admin)

| Element | Spec |
|---|---|
| Input / Select / Date picker | Height 48px, radius 8px, 1px `line-strong` border, fill `#FFFFFF`, text 16px `cocoa`, padding 0 14px |
| Textarea | Min height 120px, same styles, padding 12px 14px |
| Label | 14px DM Sans 500 `cocoa`, 8px above field |
| Helper text | 13px `cocoa-soft`, 6px below field |
| Error | Border `danger`, 13px `danger` message with icon below field, `aria-describedby` linked |
| Focus | Border `rose` + focus ring (§5) |
| Field gap | 20px between fields, 32px between groups |
| Quantity stepper (cupcakes) | 48px tall: [–] 48×48 · value 56px wide, 16px 700 centred · [+] 48×48. `+` disabled at 50, `–` at 3, with helper "3 to 50 cupcakes" |
| File upload (slip, custom photos) | Dashed 1.5px `line-strong` drop zone, 160px min height, radius 10px, fill `cream`; accepted types shown in helper text |

Use shadcn `Form` with react-hook-form + zod; validate on submit, then on change once a field has errored.

### 5.9 Badges (order status)

shadcn `Badge`, height 24px, padding 0 10px, radius 999px, 12px DM Sans 500, colours from §2.4.

### 5.10 Toasts

shadcn `sonner`, bottom-right desktop / bottom-centre mobile, `cream` fill, `cocoa` text, 4px left accent in the status colour, auto-dismiss after 4s.

---

## 6. Homepage sections

Each section is a full-width band. Desktop target height **≈ 900px** at 1440px wide. Section order and anchor ids are fixed:

| # | Section | id | Background |
|---|---|---|---|
| 1 | Hero | `#home` | Glossy pour image from top left (`hero-pour-bg`) + arched photo (right) |
| 2 | Birthday Cakes | `#birthday` | Pour image, cream on the right |
| 3 | Anniversary Cakes | `#anniversary` | `blush` + white-choc drips across top |
| 4 | Special Events | `#events` | Flour-lettering image (left) + flour panel (right) |
| 5 | About | `#about` | `cream` |
| 6 | Order Now + Footer | `#order` | Pink flat-lay image + `footer-bg` |

### 6.1 Hero

*Revised 29 Oct 2026 to match the client's reference screenshot. Implemented in `src/components/home/hero.tsx`.*

**Desktop**
- Nav (§5.2) on top, then one full-width band, height `clamp(720px, 63.3vw, 912px)` (912px at 1440 wide). Background fill `#F5BFC9` (the pour image's own pink, so its edge never shows).
- Background: `hero-pour-bg` (the birthday pour image mirrored, generated by `pnpm images`), anchored top left. The image box is 137% of the section height at aspect `1536 / 1331`, i.e. stretched 1.3× vertically, so the glossy pour flows from the top left and its wavy edge reaches ~75–80% of the section height.
- Content on the pour, left padding 5.5%, top padding `clamp(56px, 6.25vw, 90px)`, max-width 480px: eyebrow "Bletchley · Milton Keynes" → H1 "Bite into Happiness" (`display-xl`) → `body-lg` intro (max 420px) → buttons: `primary` "Order now" + `outline` "See the cakes".
- Right: `hero-baker` photo in an arched frame (`radius-arch`, 8px `white-choc` border, `shadow-photo`), 84% of the section height, aspect 475 / 765, vertically centred, right padding 5.5%. `object-position: 62% 50%`.

**Mobile**
- Pour image box 230vw wide × 860px tall behind the content, so the cream covers the copy and its wavy edge falls just below the buttons.
- Content centred, padding 40px 20px; buttons stack full width, 12px apart.
- Arched photo below, `min(78vw, 360px)` wide, centred, sitting across the pour's edge onto the pink.

### 6.2 Birthday Cakes

**Desktop**
- Background: `birthday-pour-bg` (1576 × 998). The section uses `aspect-ratio: 1576 / 998` so positioned content stays aligned with the pour.
- Positions (percent of section):
  - Arched photo (`cake-butterfly`): left 5.2%, top 12.3%, width 25.8%, height 58.4%, `radius-arch`, `shadow-photo`.
  - Framed photo (`cake-pink-drip`): left 26%, top 41.7%, width 21.2%, height 44.8%, 7px `white-choc` border.
  - Text block: left 55.2%, top 10.4%, width 39%.
- Text block: eyebrow "Made to order" → H2 "Birthday Cakes" (`display-lg`) → intro → bullet list (§5.4) → `primary` "Shop birthday cakes".

**Mobile (<1024px)**
- Drop the percentage layout. Use `birthday-pour-bg-mobile` (portrait crop, cream area at top) behind the text block, padding 48px 20px, then the two photos side by side below (arched left, framed right, each 50% width minus 8px, height 280px).

### 6.3 Anniversary Cakes

**Desktop**
- `blush` background; white-choc drip shape across the full top (solid to ~33% height). Longest drips at the far left and right edges (~75% height), short ones in the middle.
- Centred text on the chocolate, padding 64px 160px 0: eyebrow "Celebrate together" → H2 "Anniversary Cakes" → intro (max 620px).
- Bottom: 4-column grid (`repeat(4, minmax(0,1fr))`, gap 28px, side padding 160px, bottom padding 64px) of photo captions (§5.6), then `primary` "Shop anniversary cakes" centred, 40px from the bottom.

**Mobile**
- Drips scale down (solid band ~180px). Grid becomes a horizontal scroll-snap row (cards 72% wide, 16px gap, 20px side padding) so photos stay large.

### 6.4 Special Events

**Desktop**
- Two equal columns, 900px tall.
- Left: `events-flour-lettering` image, `object-fit: cover`. The words "SPECIAL EVENTS" are part of the image, so give it `alt="Special Events"`; the panel's H2 is the semantic section heading.
- Right: `events-panel-bg` image covering the column, content padding 80px 96px 80px 120px, max-width 680px:
  eyebrow "Seasonal specials" → H2 "Treats for the days that matter" (`display-md`) → intro → 3 event cards (§5.5): Mother's Day, Teachers' Day, `[Third event]` with `[Date]` → row: `cream-flour` button "See seasonal specials" + 92px circular `giftbox` thumbnail (4px `events-button` border).

**Mobile**
- Flour image first at 4:3 (`object-position: 50% 45%` so both words show), then the panel, padding 48px 20px. Button full width; thumbnail hidden below 400px.

### 6.5 About Cakes by Ish

**Desktop**
- `cream`, padding 80px 120px, two columns with a 48px gap, vertically centred.
- Left (max 600px): eyebrow "Meet the baker" → H2 "About Cakes by Ish" (logo-style italic "by") → two `body-lg` paragraphs `[Her story]`, `[What to expect]` → eyebrow "Follow and message" → social pills (§5.7).
- Right: 520px circular portrait (`object-position: 64% 38%`), 10px white border, `shadow-portrait`, sitting on a 560px `blush` circle offset 24px down.

**Mobile**
- Portrait first (280px, blush circle 300px), then text. Pills wrap.

### 6.6 Order Now + Footer

**Order Now (desktop)**
- 900px tall, `order-flatlay-pink` as cover background. The image has a cocoa ellipse baked in at its centre (51% x, 52% y).
- Content centred on it, width 520px: heart icon (30px, `#E9A8B3`) → "Order Now" (`display-order`, `white-choc`) → `body-lg` in `#EBD3D7` (max 380px) → `pill-cream` "WhatsApp [number]" with WhatsApp icon → `link` "or order online" in `footer-link`.
- WhatsApp button opens `https://wa.me/<number>?text=<prefilled message>`.

**Order Now (mobile)**
- Image height 640px, `object-position: 51% 52%`; content width `calc(100% - 32px)`. If the ellipse is too small for the text, render a CSS cocoa circle (min(88vw, 360px)) on top instead.

**Footer**
- `footer-bg`, padding 56px 120px 32px.
- Row 1 (wrap, space-between, 32px gap): logo + "Bletchley, Milton Keynes" · footer nav (same links as main nav, `footer-text`) · contact column (Instagram handle, `[Email]`, `[WhatsApp number]`).
- Row 2, after a 1px `rgba(251,243,230,0.18)` divider with 20px top padding: "© 2026 Cakes by Ish" · "Privacy notice" link (required: the site collects personal data, UK GDPR).
- Mobile: all columns stack, 32px apart, padding 48px 20px 24px.

---

## 7. Icons

Use **lucide-react** (ships with shadcn). Stroke 1.8, 20px in buttons and pills, 24px for nav and menu. Only these:

`Menu`, `X`, `ShoppingBag` (cart), `Heart`, `Upload`, `Calendar`, `Minus`, `Plus`, `Check`, `AlertCircle`, `ChevronRight`, `MessageCircle`.

Brand logos (Instagram, Facebook, WhatsApp): lucide has been phasing out brand icons, so use the official SVGs (or `simple-icons`) as inline SVG components, drawn at the same 20/24px size and coloured with `currentColor`.

Icon-only buttons must have `aria-label`.

---

## 8. Motion

Use **Motion** (`motion/react`). Every animation must be disabled when `prefers-reduced-motion: reduce` is set (content just appears).

| Effect | Trigger | Spec |
|---|---|---|
| **Pour switches sides** (Hero → Birthday) | Birthday section scroll progress 0 → 0.4 | Hero pour translates up 40% and fades to 0. Birthday pour clip-path `inset(0 0 100% 0)` → `inset(0 0 0 0)` (it "pours" down from the top right). Duration follows scroll; easing `easeOut`. |
| Anniversary drips | Section enters viewport (30% visible) | Drip layer `scaleY` 0.6 → 1 from the top, 700ms, `[0.22, 1, 0.36, 1]`, once |
| Section content | Enters viewport (30%) | Eyebrow, H2, body, buttons fade in + translateY 16px → 0, stagger 80ms, 500ms each, once |
| Photo frames | Enters viewport | opacity 0 → 1, scale 0.98 → 1, 600ms, once |
| Buttons | Hover / press | Colour 150ms ease; press scale 0.98 |
| Sticky nav | Scroll past hero | Height 84 → 64px, 200ms |

No parallax on mobile. No animation longer than 800ms except the scroll-linked pour.

---

## 9. Assets

Export to `public/images/`. Serve AVIF/WebP via `next/image`. On Cloudflare Workers, image optimisation needs Cloudflare Images (or a custom loader). Set this up before launch; check the OpenNext Cloudflare docs.

| File | Source | Size (master) | Notes |
|---|---|---|---|
| `hero-baker.jpg` | Gemini (AI) | 1200 × 1600 | **AI-generated person.** Client must approve before launch, or replace with a real photo of Ishani. |
| `birthday-pour-bg.jpg` | Gemini, text removed | 1576 × 998 | Background only; layout depends on these proportions. |
| `hero-pour-bg.jpg` | Generated: `birthday-pour-bg` mirrored | 1536 × 1024 | Hero background (§6.1). Made by `pnpm images`, never edit by hand. |
| `birthday-pour-bg-mobile.jpg` | To create | 900 × 1400 | Portrait crop/regeneration with cream area at top. |
| `events-flour-lettering.jpg` | Gemini, left half | 795 × 992 | Contains the words "Special Events". |
| `events-panel-bg.jpg` | Gemini, UI removed | 791 × 992 | Background only. |
| `order-flatlay-pink.jpg` | Recoloured flat-lay | 1438 × 953 | Cocoa ellipse painted at centre. |
| `cake-butterfly.jpg` | Gemini from client photo | 765 × 1024 | |
| `cake-pink-drip.jpg` | Gemini from client photo | 765 × 1024 | |
| `cake-rose-ombre.jpg` | Gemini from client photo | 765 × 1024 | |
| `cake-chocolate-strawberry.jpg` | Gemini from client photo | 765 × 1024 | |
| `cake-anniversary.jpg` | Gemini from client photo | 765 × 1024 | Side band shows partial customer names. Crop high or regenerate plain. |
| `cupcakes-trio.jpg` | Gemini from client photo | 765 × 1024 | |
| `giftbox-mothers-day.jpg` | Client photo | 1536 × 2048 | |

Rules:
- Max 300 KB per delivered image at 1600px wide; hero image uses `priority`, everything else lazy-loads.
- Every cake photo needs descriptive `alt`. Pure backgrounds (`*-bg`, flat-lay) get `alt=""`.
- Product images uploaded by the admin later: 4:5 portrait, min 1000px tall, on a plain light background.
- Several cake images are AI re-renders of her real cakes. Confirm with the client she's happy showing them as her work.

---

## 10. shadcn/ui setup

```bash
npx shadcn@latest init
npx shadcn@latest add button input textarea label form select checkbox radio-group \
  calendar popover dialog sheet card badge table tabs dropdown-menu \
  navigation-menu separator skeleton sonner avatar
```

### 10.1 Theme variables (`app/globals.css`)

```css
:root {
  --background: #FBF7F3;
  --foreground: #3E2A2E;
  --card: #FFFFFF;
  --card-foreground: #3E2A2E;
  --popover: #FFFFFF;
  --popover-foreground: #3E2A2E;
  --primary: #9A5560;
  --primary-foreground: #FFFFFF;
  --secondary: #E9C3C8;
  --secondary-foreground: #6E3540;
  --muted: #F5E2E4;
  --muted-foreground: #6A4D52;
  --accent: #EFC6CD;
  --accent-foreground: #3E2A2E;
  --destructive: #B42318;
  --border: #EBDCD6;
  --input: #D9B3BA;
  --ring: #3E2A2E;
  --radius: 0.5rem;

  /* brand extras */
  --blush: #EFC6CD;
  --blush-soft: #E9C3C8;
  --blush-mist: #F5E2E4;
  --cream: #FBF7F3;
  --white-choc: #FBF3E6;
  --white-choc-shadow: #E3CDB3;
  --rose: #9A5560;
  --rose-hover: #84434F;
  --rose-pressed: #713945;
  --rose-text: #8C4A55;
  --rose-dot: #B85F72;
  --cocoa: #3E2A2E;
  --cocoa-body: #5A3F44;
  --cocoa-soft: #6A4D52;
  --line: #EBDCD6;
  --line-strong: #D9B3BA;
}

@theme inline {
  --color-blush: var(--blush);
  --color-blush-soft: var(--blush-soft);
  --color-blush-mist: var(--blush-mist);
  --color-cream: var(--cream);
  --color-white-choc: var(--white-choc);
  --color-rose: var(--rose);
  --color-rose-hover: var(--rose-hover);
  --color-rose-text: var(--rose-text);
  --color-cocoa: var(--cocoa);
  --color-cocoa-body: var(--cocoa-body);
  --color-cocoa-soft: var(--cocoa-soft);
  --color-line: var(--line);
  --color-line-strong: var(--line-strong);
  --font-display: var(--font-playfair);
  --font-sans: var(--font-dm-sans);
}
```

No dark mode in V1. The brand is light-only; don't add `.dark` overrides.

### 10.2 Button variants (`components/ui/button.tsx`)

Add to the `cva` config:

```ts
variant: {
  default:      "bg-rose text-white hover:bg-rose-hover active:bg-[#713945]",
  outline:      "border-[1.5px] border-rose text-rose-text bg-transparent hover:bg-blush-mist",
  soft:         "bg-blush-soft text-[#6E3540] hover:bg-[#E2B3BA]",
  cream:        "bg-white-choc text-[#7A2E48] hover:bg-white",
  creamFlour:   "rounded-lg bg-[#FDF6EE] text-[#7A2E48] hover:bg-white shadow-[0_0_0_3px_rgba(255,251,247,.85),0_0_14px_4px_rgba(255,251,247,.55)]",
  pill:         "rounded-full border-[1.5px] border-line-strong text-cocoa bg-transparent hover:bg-blush-mist normal-case tracking-normal text-[15px] font-medium",
  pillCream:    "rounded-full bg-white-choc text-cocoa hover:bg-white normal-case tracking-normal text-[15px] font-bold",
  link:         "text-rose-text underline-offset-4 hover:underline normal-case tracking-normal",
},
size: {
  nav:     "h-11 px-[22px]",
  default: "h-12 px-7",
  lg:      "h-[52px] px-[34px]",
  icon:    "h-11 w-11",
},
```

Base classes: `inline-flex items-center justify-center gap-2.5 rounded-[4px] text-[13px] font-bold uppercase tracking-[0.12em] transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa disabled:opacity-45`.

---

## 11. Accessibility checklist

- [ ] All text/background pairs pass AA (verify any new colour with a contrast checker)
- [ ] Every interactive element ≥ 44 × 44px, reachable by keyboard, with a visible focus ring
- [ ] One `<h1>` per page (Hero); each section starts with an `<h2>`
- [ ] Real `<button>` / `<a href>` elements only; no clickable `div`s
- [ ] Icon-only buttons have `aria-label`
- [ ] Form errors announced (`aria-invalid`, `aria-describedby`)
- [ ] Decorative images `alt=""`; cake photos described
- [ ] `prefers-reduced-motion` respected (§8)
- [ ] Page usable at 200% zoom and at 320px wide with no horizontal scroll

---

## 12. Open items (client to supply)

| Item | Where |
|---|---|
| Intro copy for Birthday, Anniversary, Events, About | §6.2–6.5 |
| Prices ("From £…") | Birthday list, product cards |
| Third special event + all event dates | §6.4 |
| WhatsApp number, business email | Order Now, footer |
| Approval of AI-generated images (baker photo, cake re-renders) | §9 |
| Facebook page URL | About, footer |
| Privacy notice text | Footer |
