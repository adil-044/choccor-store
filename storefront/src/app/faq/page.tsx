import Link from "next/link";
import { FAQ_ITEMS } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

const PLACEHOLDER_FAQS = [
  {
    question: "Do you ship?",
    answer:
      "Shipping regions and rates — to confirm with Choccor. Draft policy page available under Shipping.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "Returns / exchanges — to confirm with Choccor. See the draft Returns page.",
  },
  {
    question: "Are your chocolates allergen-free / vegan / gluten-free?",
    answer:
      "Dietary claims — to confirm with Choccor. Do not rely on this page until statements are published.",
  },
  {
    question: "How should I store Choccor chocolates?",
    answer: "Storage guidance — to confirm with Choccor.",
  },
] as const;

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about Choccor — only answers we can support with confirmed facts.",
  path: "/faq/",
});

export default function FaqPage() {
  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad max-w-4xl">
        <p className="eyebrow">Help</p>
        <h1 className="display-lg mt-3">FAQ</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Answers below are limited to confirmed facts. Anything else is clearly
          marked for confirmation with Choccor.
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
                  <span className="text-muted transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-16">
          <p className="eyebrow">Still open</p>
          <h2 className="mt-3 font-display text-3xl text-charcoal">
            To confirm with Choccor
          </h2>
          <div className="mt-6 space-y-0 border-t border-[var(--line)]">
            {PLACEHOLDER_FAQS.map((item) => (
              <details
                key={item.question}
                className="group border-b border-[var(--line)] py-5"
              >
                <summary className="cursor-pointer list-none text-lg text-charcoal focus-ring rounded-sm [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    <span>
                      {item.question}{" "}
                      <span className="ml-2 text-[10px] uppercase tracking-[0.16em] text-gold">
                        To confirm
                      </span>
                    </span>
                    <span className="text-muted transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
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
