import Link from "next/link";

export default function NotFound() {
  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="display-lg mt-3">Page not found</h1>
        <p className="mt-5 text-base text-muted">
          This path isn&apos;t on the Choccor storefront. Try the shop, or head
          home for more than just chocolate.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary w-auto">
            Home
            <span className="text-gold" aria-hidden>
              ❦
            </span>
          </Link>
          <Link href="/shop/" className="btn-secondary">
            Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
