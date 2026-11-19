/**
 * Canonical Choccor product catalog.
 * Used as storefront fallback when Medusa is unavailable,
 * and mirrored by the backend seed script.
 *
 * HARD RULES: no invented retail prices, reviews, ratings, ingredients,
 * phones, addresses, or emails. Unnamed bars stay unnamed.
 */

export type ProductCategory =
  | "chocolate"
  | "bar"
  | "juice"
  | "tray"
  | "bites"
  | "custom";

export type ChoccorProduct = {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  description: string;
  category: ProductCategory;
  image: string;
  imageAlt: string;
  /** Always true until Courtney confirms retail pricing. */
  pricePlaceholder: true;
  priceLabel: "Price TBC";
  featured?: boolean;
  homepageSection?: "featured" | "juices" | "tray" | "byob";
  ingredients?: string[];
  /** When true, do not treat as a named SKU for sale. */
  exampleOnly?: boolean;
  openQuestions?: string[];
};

export const BRAND = {
  name: "Choccor",
  fullName: "Choccor Gourmet Chocolates",
  /** Owner & founder — he/him (confirmed). */
  owner: "Courtney Foreman",
  agency: "Uptisement",
  tagline: "MORE THAN JUST CHOCOLATE",
  // First-person bio from choccor.com — keep pronouns out of invented third-person paraphrase.
  about: `My name is Courtney... and I'm savouring life's sweet moments! I have always been passionate about making chocolates, but it has taken on new meaning to me since a sudden illness that almost ended my life. It has reminded me that life is not to be lived in fear but to be lived with passion and a vision that fulfills our authentic purpose in life however that might be. And for me that is creating sweet and blissful treats to remind you that it's never too late to live life to the fullest ... one sweet moment at a time!`,
} as const;

export const REVIEWS = [
  {
    author: "Kathleen",
    quote:
      "Tried the chocolates with Guinness in them, so so good! Chocolate wasn't overly sweet, and didn't have any beer like taste, would definitely recommend",
  },
  {
    author: "Rose",
    quote:
      "If you haven't tried Courtney's Chocolate Bailey Squares, you should~they are delicious! A box of 4 would be perfect for a gift for a teacher or anyone!",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What makes Choccor chocolates special?",
    answer:
      "Every piece is handmade by Courtney Foreman — crafted with care as sweet, blissful treats meant to be savoured one moment at a time.",
  },
  {
    question: "Do you offer Build Your Own Bar?",
    answer:
      "Yes — Build Your Own Bar lets you choose your chocolate style. Boxes are built with 9 bars in each. Retail details are being confirmed.",
  },
  {
    question: "What juices do you offer?",
    answer:
      "Choccor's natural juice lineup includes Berry Rush, Avocado Boost, and Peanut Punch.",
  },
  {
    question: "Can I order a chocolate tray for parties or gifting?",
    answer:
      "Yes — the chocolate tray is designed for parties and gifting. Reach out through the newsletter signup or contact options once published.",
  },
  {
    question: "Where can I see prices?",
    answer:
      "Retail pricing is being finalized. Products currently show Price TBC until Courtney confirms.",
  },
] as const;

export const PRODUCTS: ChoccorProduct[] = [
  {
    id: "prod_baileys_dream",
    handle: "baileys-dream",
    title: "Baileys Dream",
    subtitle: "Irish cream chocolate squares",
    description:
      "One of Courtney's favourites for Baileys lovers — smooth chocolate with a dreamy cream finish.",
    category: "chocolate",
    image: "/products/baileys-dream.webp",
    imageAlt: "Baileys Dream chocolate on cream studio background",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    featured: true,
    homepageSection: "featured",
    ingredients: ["Choco", "Baileys", "Butter", "Vanilla"],
  },
  {
    id: "prod_mango_madness",
    handle: "mango-madness",
    title: "Mango Madness",
    subtitle: "Mango puree chocolate",
    description:
      "Bright mango puree folded into handmade chocolate — a tropical sweet moment.",
    category: "chocolate",
    image: "/products/mango-madness.webp",
    imageAlt: "Mango Madness chocolate on cream studio background",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    featured: true,
    homepageSection: "featured",
    ingredients: ["Mango Puree", "Choco", "Butter", "Vanilla"],
  },
  {
    id: "prod_chocormint",
    handle: "mint-chocolate",
    title: "Chocormint",
    subtitle: "Mint chocolate",
    description:
      "Cool mint meets rich chocolate. Display name pending final confirmation.",
    category: "chocolate",
    image: "/products/mint-chocolate.webp",
    imageAlt: "Mint chocolate piece on cream studio background",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    featured: true,
    homepageSection: "featured",
    openQuestions: [
      "Confirm whether the retail name is Chocormint or Mint Chocolate.",
    ],
  },
  {
    id: "prod_pistachio_almond",
    handle: "pistachio-almond-bar",
    title: "Pistachio Almond Bar",
    description: "A nutty handmade chocolate bar with pistachio and almond.",
    category: "bar",
    image: "/products/pistachio-almond-bar.webp",
    imageAlt: "Pistachio Almond Bar on cream studio background",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    featured: true,
    homepageSection: "featured",
  },
  {
    id: "prod_pistachio_chocolate",
    handle: "pistachio-chocolate",
    title: "Pistachio Chocolate",
    description: "Handmade pistachio chocolate.",
    category: "chocolate",
    image: "/products/pistachio-chocolate.webp",
    imageAlt: "Pistachio Chocolate on cream studio background",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    featured: true,
    homepageSection: "featured",
  },
  {
    id: "prod_coconut_almond",
    handle: "coconut-and-almond",
    title: "Coconut and Almond",
    description: "Coconut and almond in Courtney's handmade chocolate.",
    category: "chocolate",
    image: "/products/coconut-and-almond.webp",
    imageAlt: "Coconut and Almond chocolate on cream studio background",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    featured: true,
    homepageSection: "featured",
  },
  {
    id: "prod_protein_bites",
    handle: "protein-bites",
    title: "Choccor Protein Bites",
    description: "Handmade chocolate protein bites — a sweet, satisfying bite.",
    category: "bites",
    image: "/products/protein-bites.webp",
    imageAlt: "Choccor Protein Bites on cream studio background",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    featured: true,
    homepageSection: "featured",
  },
  {
    id: "prod_chocolate_tray",
    handle: "chocolate-tray",
    title: "Chocolate Tray",
    subtitle: "Party & gifting",
    description:
      "A generous handmade chocolate tray made for celebrations, parties, and thoughtful gifts.",
    category: "tray",
    image: "/products/chocolate-tray.webp",
    imageAlt: "Assorted Choccor chocolate party tray",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    homepageSection: "tray",
  },
  {
    id: "prod_berry_rush",
    handle: "juice-berry-rush",
    title: "Berry Rush",
    subtitle: "Natural juice",
    description: "Choccor natural juice — Berry Rush.",
    category: "juice",
    image: "/products/juice-berry-rush.webp",
    imageAlt: "Berry Rush natural juice bottle mockup",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    homepageSection: "juices",
  },
  {
    id: "prod_avocado_boost",
    handle: "juice-avocado-boost",
    title: "Avocado Boost",
    subtitle: "Natural juice",
    description: "Choccor natural juice — Avocado Boost.",
    category: "juice",
    image: "/products/juice-avocado-boost.webp",
    imageAlt: "Avocado Boost natural juice bottle mockup",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    homepageSection: "juices",
  },
  {
    id: "prod_peanut_punch",
    handle: "juice-peanut-punch",
    title: "Peanut Punch",
    subtitle: "Natural juice",
    description: "Choccor natural juice — Peanut Punch.",
    category: "juice",
    image: "/products/juice-peanut-punch.webp",
    imageAlt: "Peanut Punch natural juice bottle mockup",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    homepageSection: "juices",
  },
  {
    id: "prod_byob_milk_example",
    handle: "build-your-own-bar-milk",
    title: "Build Your Own Bar — Milk",
    subtitle: "Build Your Own Bar — Milk",
    description:
      "Build Your Own Bar in milk chocolate. Box sets are 9 bars in each.",
    category: "custom",
    image: "/products/build-your-own-bar-milk.webp",
    imageAlt: "Build Your Own Bar — Milk chocolate",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    homepageSection: "byob",
    exampleOnly: true,
    openQuestions: [
      "Confirm whether the milk Build Your Own Bar photo needs a more specific SKU name.",
    ],
  },
  {
    id: "prod_byob_half_example",
    handle: "build-your-own-bar-half-and-half",
    title: "Build Your Own Bar — Half & Half",
    subtitle: "Build Your Own Bar — Half & Half",
    description:
      "Build Your Own Bar half & half. Box sets are 9 bars in each.",
    category: "custom",
    image: "/products/build-your-own-bar-half-and-half.webp",
    imageAlt: "Build Your Own Bar — Half & Half chocolate",
    pricePlaceholder: true,
    priceLabel: "Price TBC",
    homepageSection: "byob",
    exampleOnly: true,
    openQuestions: [
      "Confirm whether the half & half Build Your Own Bar photo needs a more specific SKU name.",
    ],
  },
];

export function productsBySection(
  section: NonNullable<ChoccorProduct["homepageSection"]>
) {
  return PRODUCTS.filter((p) => p.homepageSection === section);
}

export function featuredProducts() {
  return PRODUCTS.filter((p) => p.featured && !p.exampleOnly);
}

/** Sellable catalog entries (excludes BYOB photo examples). */
export function sellableProducts() {
  return PRODUCTS.filter((p) => !p.exampleOnly);
}

/** Bars / pieces eligible for a Build a Box of 9. */
export function boxEligibleProducts() {
  return PRODUCTS.filter(
    (p) =>
      !p.exampleOnly &&
      (p.category === "chocolate" ||
        p.category === "bar" ||
        p.category === "bites")
  );
}

export type ShopFilter = "all" | "chocolates" | "juices" | "trays";

export function filterShopProducts<T extends ChoccorProduct>(
  products: T[],
  filter: ShopFilter
): T[] {
  switch (filter) {
    case "chocolates":
      return products.filter(
        (p) =>
          p.category === "chocolate" ||
          p.category === "bar" ||
          p.category === "bites"
      );
    case "juices":
      return products.filter((p) => p.category === "juice");
    case "trays":
      return products.filter(
        (p) => p.category === "tray" || p.category === "custom"
      );
    default:
      return products.filter((p) => !p.exampleOnly);
  }
}

export function collectionLabel(product: ChoccorProduct): string {
  switch (product.category) {
    case "juice":
      return "Natural juices";
    case "tray":
      return "Trays & gifting";
    case "custom":
      return "Build your own";
    case "bites":
      return "Bites";
    case "bar":
      return "Bars";
    default:
      return "Handmade chocolates";
  }
}

export function getProductByHandle(handle: string) {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function relatedProducts(handle: string, limit = 4) {
  const current = getProductByHandle(handle);
  if (!current) return featuredProducts().slice(0, limit);
  const same = sellableProducts().filter(
    (p) => p.handle !== handle && p.category === current.category
  );
  const rest = sellableProducts().filter(
    (p) => p.handle !== handle && p.category !== current.category
  );
  return [...same, ...rest].slice(0, limit);
}
