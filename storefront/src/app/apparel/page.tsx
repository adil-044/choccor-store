import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Apparel",
  description:
    "Choccor Apparel — Modern. Strong. Different. Coming soon.",
  path: "/apparel/",
  image: "/apparel/tshirt-black-gold.webp",
});

const SHOTS = [
  {
    src: "/apparel/tshirt-black-gold.webp",
    alt: "Black Choccor t-shirt with gold logo on cream background",
    caption: "Black & gold mark",
  },
  {
    src: "/apparel/tshirt-poster-courtney.webp",
    alt: "Choccor apparel campaign poster featuring Courtney",
    caption: "Campaign preview",
  },
] as const;

export default function ApparelPage() {
  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad">
        <p className="eyebrow">Coming soon</p>
        <h1 className="display-lg mt-3">Choccor Apparel</h1>
        <p className="mt-3 font-display text-2xl italic text-cocoa sm:text-3xl">
          Modern. Strong. Different.
        </p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
          A first look at branded Choccor pieces. Apparel is not for sale yet —
          no sizes, no cart, just the look.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SHOTS.map((shot) => (
            <figure key={shot.src}>
              <div className="relative aspect-[3/4] overflow-hidden bg-cream-deep/40">
                <Image
                  src={withBasePath(shot.src)}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={shot.src.includes("black-gold")}
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Link href="/contact/" className="btn-primary">
            Notify me
          </Link>
          <Link href="/shop/" className="btn-secondary">
            Shop chocolates
          </Link>
        </div>
      </div>
    </div>
  );
}
