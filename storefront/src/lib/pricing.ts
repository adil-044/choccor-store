/**
 * Customer-facing price helpers.
 * Flip `PRICES_CONFIRMED` (or set NEXT_PUBLIC_PRICES_CONFIRMED=true) once
 * Courtney publishes retail prices — then wire real amounts from Medusa/catalog.
 */

export const PRICES_CONFIRMED =
  process.env.NEXT_PUBLIC_PRICES_CONFIRMED === "true";

/** Shown on product tiles / PDPs while retail prices are unconfirmed. */
export const PRICE_COMING_SOON_LABEL = "Price coming soon";

/** Cart summary line while prices are unconfirmed. */
export const CART_SUBTOTAL_LABEL = "Calculated at checkout";

export function formatProductPrice(amount?: number | null): string {
  if (!PRICES_CONFIRMED || amount == null) return PRICE_COMING_SOON_LABEL;
  // Real formatting lands here when prices are confirmed.
  return PRICE_COMING_SOON_LABEL;
}

export function formatCartSubtotal(cents?: number | null): string {
  if (!PRICES_CONFIRMED || cents == null) return CART_SUBTOTAL_LABEL;
  return CART_SUBTOTAL_LABEL;
}
