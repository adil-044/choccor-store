import Image from "next/image";
import { BRAND, REVIEWS } from "@/lib/catalog";
import { withBasePath } from "@/lib/paths";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Story",
  description:
    "Meet Courtney Foreman — owner and founder of Choccor Gourmet Chocolates.",
  path: "/our-story/",
  image: "/showcase/byob-poster.jpg",
});

export default function OurStoryPage() {
  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad">
        <p className="eyebrow">About</p>
        <h1 className="display-lg mt-3">Our story</h1>
        <p className="mt-3 text-sm text-muted">
          Owner &amp; founder — {BRAND.owner}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep/40 lg:col-span-5">
            <Image
              src={withBasePath("/showcase/byob-poster.jpg")}
              alt="Choccor Build Your Own Bar photography"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="lg:col-span-7">
            <p className="font-display text-2xl leading-relaxed text-charcoal sm:text-3xl">
              {BRAND.about}
            </p>
            <p className="mt-8 label-caps text-gold">{BRAND.tagline}</p>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[5/4] overflow-hidden bg-cream-deep/40">
            <Image
              src={withBasePath("/products/mango-madness.webp")}
              alt="Mango Madness chocolate"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[5/4] overflow-hidden bg-cream-deep/40">
            <Image
              src={withBasePath("/products/chocolate-tray.webp")}
              alt="Choccor chocolate tray"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-20">
          <p className="eyebrow">From customers</p>
          <h2 className="display-lg mt-3">Kind words</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {REVIEWS.map((review) => (
              <figure
                key={review.author}
                className="border border-[var(--line)] bg-cream-soft/70 px-6 py-8"
              >
                <blockquote className="font-display text-2xl leading-snug text-charcoal">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-6 label-caps text-gold">
                  — {review.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
