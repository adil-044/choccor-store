import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Checkout",
  description: "Checkout coming soon for Choccor Gourmet Chocolates.",
  path: "/checkout/",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad max-w-2xl">
        <p className="eyebrow">Checkout</p>
        <h1 className="display-lg mt-3">Coming soon</h1>
        <p className="mt-5 text-base leading-relaxed text-muted">
          Secure checkout is on the way. Your cart is saved in this browser —
          please check back soon, or contact us to place an order.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/cart/" className="btn-secondary">
            Back to cart
          </Link>
          <Link href="/shop/" className="btn-primary w-auto">
            Keep shopping
            <span className="text-gold" aria-hidden>
              ❦
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
