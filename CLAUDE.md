# Cakes by Ish — Project Context

Paid client project: a cake ordering website for Cakes by Ish (UK home cake business in Bletchley, Milton Keynes; Instagram: @Cakesby_Ish). Developer: Hemindi. Target: one strong V1, no planned V2.

Visual design lives in `DESIGN_SPEC.md`. If it and this file disagree on visuals, `DESIGN_SPEC.md` wins.

## Build approach (agreed)

Frontend first, then backend. Built step by step: small, reviewable steps, not everything at once.

- Mock data must match the database schema below exactly (TypeScript types mirror the Drizzle tables).
- All page data goes through one data-access layer (`src/lib/data/*`) that returns mock data now and D1 queries later, so pages don't change when the backend lands.
- Forms use Zod schemas from day one, shared with server actions.

## Architecture: modular monolith

One Next.js app, split by feature. Each module in `src/modules/<module>/` owns its tables (`schema.ts`), server logic (`server.ts` / actions), validation (`validation.ts`) and UI (`components/`). Modules talk to each other through their exported functions, never by querying another module's tables directly.

- `src/modules/auth`: Better Auth config (`server.ts`: `getAuth`, `getSession`), browser client (`client.ts`), sign-in/register forms.
- Later modules: `catalog` (cake types, cakes, cupcakes), `cart`, `orders`, `custom-requests`, `reviews`, `announcements`, `settings`, `notifications`.
- Shared infrastructure: `src/server/db` (`getDb()` per request; `schema.ts` re-exports every module's tables for drizzle-kit). Shared UI stays in `src/components`.
- Migrations: `pnpm db:generate` (drizzle-kit → `drizzle/`), `pnpm db:migrate:local` / `db:migrate:remote` (wrangler). After changing `wrangler.jsonc`, run `pnpm cf-typegen`. Local secrets live in `.dev.vars` (see `.dev.vars.example`).

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router, TypeScript, server actions + route handlers) |
| Hosting | Cloudflare Workers via @opennextjs/cloudflare |
| Database | Cloudflare D1 (SQLite) with Drizzle ORM + drizzle-kit migrations |
| File storage | Cloudflare R2: private bucket for payment slips and custom-request photos; cake images can be public |
| Auth | Better Auth (email + password and Google sign-in), Drizzle adapter, role field on user: customer or admin |
| Styling | Tailwind CSS v4 + shadcn/ui, tokens in `src/app/globals.css` |
| Motion | Motion (`motion/react`) |
| Email | Resend |
| Admin app | PWA (manifest + service worker via Serwist + Web Push with VAPID keys) |
| Domain / email | Cloudflare Registrar + Email Routing (cakesbyish.co.uk) |

Workers runtime notes: no Node-only native modules. Hash passwords with Web Crypto (PBKDF2) or bcryptjs, not bcrypt. Access D1/R2 through the Cloudflare bindings (`getCloudflareContext()`). The `web-push` npm package needs Node crypto; use a Web Crypto based implementation. `next/image` optimisation needs Cloudflare Images or a custom loader on Workers.

## Users

- Customer: registers, signs in, orders.
- Admin: the business owner. Manages everything below. Uses the admin area as an installed PWA on her phone.

## Features (V1)

### Public / customer

- Landing page: announcement banner (top), featured cakes with prices, ratings & reviews, services info, Order Now.
- Order Now → register → sign in (unauthenticated users are redirected; return them to where they were after login).
- Cakes: browse by cake type, cake detail page.
- Cake add-ons when adding a cake to cart:
  - Message on the cake (text, with character limit, see config).
  - Matching cupcakes: choose one or more cupcake types, each with a – / + stepper.
- Cupcakes section: order cupcakes on their own (same cupcake types and prices).
- Cart → Checkout: date needed, delivery/collection, notes. Creates an order in `pending_payment`.
- Payment: no online payment. Customer pays a deposit by bank transfer (bank details shown from settings) and uploads the slip (PDF or image).
- Custom cake request: upload reference photo(s) + size/servings, flavour, filling, theme/colours, date needed, allergy notes, description.
  - Admin quotes a price → customer can Accept & continue (becomes payable order), Chat on WhatsApp (wa.me link pre-filled with request reference), or Decline.
- My Orders: list + detail for standard orders and custom requests, with status and slip upload.

### Admin

- Orders tab with two sub-tabs:
  - Standard orders: cake message and cupcake add-ons per item, customer details, slip preview, tap-to-call / WhatsApp, status updates.
  - Custom orders: custom requests with photos and details; enter quoted price + optional note.
- Cake types: CRUD, display order.
- Cakes: CRUD under a cake type: name, description, price, images, available toggle.
- Cupcake types: CRUD: name, description, price per cupcake, image, available toggle.
- Announcements: message, optional link, start date, end date, active toggle. Shown in the landing banner while active and within dates.
- Reviews: CRUD (real customer feedback only), approve/hide.
- Settings: WhatsApp number, bank details, deposit percentage.
- PWA: installable, push notifications for new order, new custom request, slip uploaded.

### Emails (Resend)

- Customer: order received, custom request quoted, order status changed.
- Admin: new order, new custom request, slip uploaded (in addition to push).

## Business rules

Keep in `src/config/business.ts` so they are easy to change.

- Cupcakes: minimum 3, maximum 50. Default: min 3 per type selected, max 50 total per order line. Not yet confirmed by client; keep configurable.
- Server must validate all quantity limits and prices; never trust client totals.
- Store price at time of order (`unit_price` on order items) so later price changes don't alter old orders.
- Currency: GBP (£). Dates/times: Europe/London.

## Order statuses

- Standard: `pending_payment` → `slip_uploaded` → `confirmed` → `in_progress` → `ready` → `completed` (or `cancelled` at any point).
- Custom request: `pending` → `quoted` → `accepted` (creates order in `pending_payment`, then follows standard flow) or `declined` / `cancelled`.

## Data model (Drizzle, D1)

- users: id, name, email (unique), email_verified, image, phone, role, created_at, updated_at (passwords live in Better Auth's `accounts` table, provider "credential"; plus `sessions` and `verifications`)
- cake_types: id, name, description, image_key, display_order
- cakes: id, cake_type_id, name, description, price, image_keys, available, featured
- cupcake_types: id, name, description, price, image_key, available
- cart_items: id, user_id, cake_id (nullable for cupcake-only), quantity, cake_message, created_at
- cart_item_cupcakes: id, cart_item_id, cupcake_type_id, quantity
- orders: id, user_id, custom_request_id (nullable), total, deposit_amount, status, date_needed, fulfilment (delivery/collection), address, notes, created_at
- order_items: id, order_id, cake_id (nullable), quantity, unit_price, cake_message
- order_item_cupcakes: id, order_item_id, cupcake_type_id, quantity, unit_price
- payment_slips: id, order_id, r2_key, content_type, uploaded_at
- custom_requests: id, user_id, description, size, flavour, filling, theme, date_needed, allergy_notes, status, quoted_price, admin_note, quoted_at, created_at
- custom_request_images: id, custom_request_id, r2_key
- announcements: id, message, link, starts_at, ends_at, active
- reviews: id, customer_name, rating (1–5), text, approved, created_at
- settings: key/value (whatsapp_number, bank_details, deposit_percent)
- push_subscriptions: id, user_id, endpoint, keys, created_at

## Security & privacy

- Admin routes and admin server actions check `role === 'admin'` on the server, not just in the UI.
- Payment slips and custom-request photos are private: serve via an authenticated route that checks ownership or admin role.
- Validate uploads (type: pdf/jpg/png/webp/heic; size limit).
- Validate all input with Zod.
- UK GDPR: privacy notice page covering account data, order data, payment slips, and retention.

## Seed data

`pnpm db:seed` fills dummy cake types, cakes, cupcake types, reviews, an admin user, a test customer, and a Halloween announcement ("It's Halloween month 🎃 Order a spooky themed cake!"). Real content replaces this before launch.

## Build phases

1. Foundation: scaffold, Cloudflare/OpenNext config, D1 + Drizzle schema + migrations, seed script, Auth.js with roles, route protection.
2. Public site: landing page with announcement banner, cake types/cakes, cupcakes section, reviews, services, privacy page.
3. Cart & checkout: cart with cake message + cupcake add-ons, cupcake-only orders, checkout, My Orders, slip upload to R2.
4. Custom requests: form with photo upload, quote / accept / decline / WhatsApp flow.
5. Admin: orders (standard + custom), cake types, cakes, cupcake types, announcements, reviews, settings.
6. Notifications: Resend emails, PWA manifest + service worker, Web Push.
7. Launch: real content, domain, email routing, privacy notice review, testing on the client's phone.

## Open items (confirm with client before finalising)

- Logo.
- Cupcake min/max: per type or total.
- Deposit percentage, delivery area/fees, bank details.
- Client's phone (iPhone needs Safari "Add to Home Screen" for push notifications).
- Raised with developer, not yet in spec: password reset, order capacity / minimum notice / blocked dates, delivery fee field, balance payment after deposit, allergen info and cancellation policy, guest cart.
