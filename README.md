# Choccor Gourmet Chocolates

Premium ecommerce foundation for **Choccor** (owner **Courtney Foreman**, he/him) — handmade chocolates and natural juices. Agency: **Uptisement**.

Amboras-style editorial commerce homepage (cream linen paper, photography-led buy panel) plus architecture for later pages: **Medusa v2** backend with a Choccor seed script, and a **Next.js** App Router storefront with subtle GSAP motion and a **seeded catalog fallback** (no backend required for the static homepage).

**Live (GitHub Pages):** https://adil-044.github.io/choccor-store/

## Stack

| Layer | Tech |
|---|---|
| Storefront | Next.js 15 (App Router), TypeScript, Tailwind, GSAP, Lenis |
| Backend | Medusa v2 (optional for local API / admin) |
| Catalog | Seeded fallback in `storefront/src/lib/catalog.ts` when Medusa is offline |
| Deploy | Static export → GitHub Pages (`NEXT_PUBLIC_BASE_PATH=/choccor-store`) |

## Monorepo layout

```
backend/       Medusa v2 API + admin + seed script
storefront/    Next.js storefront (static-exportable)
docs/          Open questions & design references
.github/       Pages deploy workflow
```

## Storefront (no backend needed)

```bash
cd storefront
npm install
npm run dev          # http://127.0.0.1:43123
```

### Static export (local root)

```bash
cd storefront
npm run build
npx serve out -l 43210
```

### Static export for GitHub Pages (project subpath)

```bash
cd storefront
npm run build:pages  # sets NEXT_PUBLIC_BASE_PATH=/choccor-store
# Serve under the same subpath, e.g.:
npx serve out -l 43210
# then open http://127.0.0.1:43210/choccor-store/
```

Or:

```bash
NEXT_PUBLIC_BASE_PATH=/choccor-store npm run build
```

The build writes `out/.nojekyll` so GitHub Pages serves `_next` assets correctly.

## Backend (Medusa v2, optional)

Requires PostgreSQL. Copy `backend/.env.template` → `backend/.env` and set `DATABASE_URL` (never commit `.env`).

```bash
cd backend
npm install --legacy-peer-deps
npm run dev
npm run seed   # placeholder prices only
```

Storefront optional env (`storefront/.env.local` — gitignored):

```bash
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
```

## Placeholders (do not invent)

- **Prices:** always shown as **Price TBC** until Courtney confirms retail pricing. Wholesale order-form costs are never displayed.
- **Phone / email / address:** unconfirmed — omitted or marked TBC. Do not publish conflicting numbers from source materials.
- **Reviews:** only Kathleen & Rose quotes from approved copy.
- See [`docs/OPEN_QUESTIONS.md`](docs/OPEN_QUESTIONS.md).

## Design notes

- Cream / linen `#F4EDE4`, deep cocoa accent, gold secondary
- Display: Cormorant Garamond · Body: Outfit · Specs: IBM Plex Mono
- Real product photography only (Courtney’s mockups)
- No invented ratings, review counts, shipping promises, or stats

## Scripts

| Package | Command | Purpose |
|---|---|---|
| storefront | `npm run dev` | Dev server :43123 |
| storefront | `npm run build` | Static export → `out/` (+ `.nojekyll`) |
| storefront | `npm run build:pages` | Pages build with `/choccor-store` base path |
| storefront | `npm run serve:static` | Serve `out/` on :43210 |
| backend | `npm run seed` | Seed Choccor products (placeholder amounts) |

## CI / GitHub Pages

Push to `main` runs [`.github/workflows/pages.yml`](.github/workflows/pages.yml): builds the storefront with `NEXT_PUBLIC_BASE_PATH=/choccor-store` (seeded catalog, no Medusa), uploads the artifact, and deploys with `actions/deploy-pages`. Enable **Settings → Pages → Source: GitHub Actions** on the GitHub repo.
