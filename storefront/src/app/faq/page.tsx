import Link from "next/link";
import { FAQ_ITEMS } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Frequently asked questions about Choccor Gourmet Chocolates.",
  path: "/faq/",
});

export default function FaqPage() {
  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad max-w-4xl">
        <p className="eyebrow">Help</p>
        <h1 className="display-lg mt-3">FAQ</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          A few answers to get you started. More details coming soon.
        </p>

        <div className="mt-12 space-y-0 border-t border-[var(--line)]">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group border-b border-[var(--line)] py-5"
            >
              <summary className="cursor-pointer list-none font-display text-2xl text-charcoal focus-ring rounded-sm [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-muted transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted">
          Need something else?{" "}
          <Link href="/contact/" className="underline underline-offset-4">
            Contact
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
