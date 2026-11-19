# Open Questions — Choccor Storefront

Track every placeholder and unconfirmed detail. Do **not** invent answers.

## Pricing

- [ ] Confirm **retail** prices for every product. Wholesale order-form prices must never be shown on the storefront.
- [ ] All products currently display **Price TBC** / `price_placeholder: true` in seed + catalog data.
- [ ] Confirm currency (seed assumes CAD as a working default for Medusa store config only — not shown as a price).

## Product names & photos

- [ ] Confirm whether `mint-chocolate` retail name is **Chocormint** or something else.
- [ ] Confirm product names for the two Build Your Own Bar photos:
  - `build-your-own-bar-milk` — currently shown as **Build Your Own Bar** example only
  - `build-your-own-bar-half-and-half` — currently shown as **Build Your Own Bar** example only
- [x] Real cream-studio mockup PNGs wired into `storefront/public/products/` as WebP (re-attached Nov 19). CDN/stock/illustrated stand-ins removed.
- [ ] Confirm full wholesale order-form product list (15 SKUs) and which appear on the retail homepage.

## Ingredients

Confirmed from tray labels only:

- Mango Madness — Mango Puree, Choco, Butter, Vanilla
- Baileys Dream — Choco, Baileys, Butter, Vanilla

Still needed:

- [ ] Ingredients for remaining chocolates, bars, bites, tray assortment, and juices
- [ ] Allergen statements
- [ ] Dietary claims (vegan / gluten-free / etc.) — do not publish until confirmed

## Contact & business details

- [ ] Confirm **one** public phone number (two conflicting numbers exist across materials; none are shown on the site)
- [ ] Confirm public email / contact form destination
- [ ] Confirm business address / pickup / shipping regions
- [ ] Confirm social links

## Copy & merchandising

- [ ] **Approve 3D showcase headline** — agency draft currently reads “Crafted one bar at a time” (not from Courtney’s materials). Confirm, rewrite, or replace.
- [ ] Confirm Build a Box rules (9 bars each) and any BYOB customization options/pricing
- [ ] Confirm juice product descriptions beyond the names Berry Rush, Avocado Boost, Peanut Punch
- [ ] Confirm whether additional juices (e.g. Natural Juice Refresher from existing packaging) should appear
- [ ] Confirm which customer reviews beyond Kathleen & Rose may be published
- [ ] Newsletter provider / backend send (UI only for now)

## Technical / ops

- [ ] Postgres + Redis for local Medusa (or hosted equivalents) — storefront works without them via seeded fallback
- [ ] Publishable API key for storefront ↔ Medusa
- [ ] Payment provider, tax, shipping — out of scope for homepage milestone
- [ ] Domain / public deployment — explicitly deferred

## Agency

- Agency partner for this build: **Uptisement**
- Owner: **Courtney Foreman** (he/him) — confirmed by Adil; do not use she/her in copy, docs, or comments
