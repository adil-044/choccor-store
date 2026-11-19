# Open Questions — Choccor Storefront

Track every placeholder and unconfirmed detail. Do **not** invent answers.
Internal notes belong here — not on customer-facing pages.

## Pricing

- [ ] Confirm **retail** prices for every product. Wholesale order-form prices must never be shown on the storefront.
- [ ] Storefront currently shows **Price coming soon** via `storefront/src/lib/pricing.ts` (`PRICES_CONFIRMED` / `NEXT_PUBLIC_PRICES_CONFIRMED`). Flip the flag when prices are ready.
- [ ] Cart subtotal shows **Calculated at checkout** until prices are confirmed.
- [ ] Confirm currency (seed assumes CAD as a working default for Medusa store config only — not shown as a price).

## Product names & photos

- [ ] Confirm whether `mint-chocolate` retail name is **Chocormint** or something else.
- [ ] Confirm product names for the two Build Your Own Bar photos:
  - `build-your-own-bar-milk` — currently shown as **Build Your Own Bar** example only
  - `build-your-own-bar-half-and-half` — currently shown as **Build Your Own Bar** example only
- [x] Real cream-studio mockup PNGs wired into `storefront/public/products/` as WebP.
- [ ] Confirm full wholesale order-form product list (15 SKUs) and which appear on the retail homepage.
- [ ] `/public/hero-products.webp` is a pre-composited mock with translucent overlays — **do not use as a clean hero background**. Homepage hero uses `/products/chocolate-tray.webp` in a split layout instead.
- [ ] BYOB banner assets (`hero-byob.webp`, `reference/byob-banner-full.webp`) contain typography — always `object-contain` (or use product photos) so lettering is never cropped.

## Ingredients

Confirmed from tray labels only:

- Mango Madness — Mango Puree, Choco, Butter, Vanilla
- Baileys Dream — Choco, Baileys, Butter, Vanilla

Still needed:

- [ ] Ingredients for remaining chocolates, bars, bites, tray assortment, and juices
- [ ] Allergen statements — PDPs currently say “Please contact us for ingredient and allergen information” when not documented
- [ ] Dietary claims (vegan / gluten-free / etc.) — do not publish until confirmed
- [ ] Storage guidance — contact CTA until confirmed

## Contact & business details

- [ ] Confirm **one** public phone number (two conflicting numbers exist across materials; **hidden** on the live site until confirmed)
- [ ] Confirm public email / contact form destination (**hidden** until confirmed; form is UI-only)
- [ ] Confirm business address / pickup / shipping regions
- [x] Facebook link published: https://www.facebook.com/share/g/1AGZq8sVwy/

## Copy & merchandising

- [ ] Confirm Build a Box rules (box of 9) and any BYOB customization options/pricing
- [ ] Confirm juice product descriptions beyond the names Berry Rush, Avocado Boost, Peanut Punch
- [ ] Confirm whether additional juices (e.g. Natural Juice Refresher from existing packaging) should appear
- [ ] Confirm which customer reviews beyond Kathleen & Rose may be published
- [ ] Newsletter provider / backend send (UI only for now — customer copy stays soft)
- [ ] Shipping / returns / privacy full policy language

## Technical / ops

- [ ] Postgres + Redis for local Medusa (or hosted equivalents) — storefront works without them via seeded fallback
- [ ] Publishable API key for storefront ↔ Medusa
- [ ] Payment provider, tax, shipping — Medusa checkout stubbed at `/checkout/`
- [ ] Domain / public deployment

## Agency

- Agency partner for this build: **Uptisement** (footer credit only: “Site by Uptisement”)
- Owner: **Courtney Foreman** (he/him) — confirmed by Adil; do not use she/her in copy, docs, or comments
