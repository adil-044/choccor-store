import { ShopExperience } from "@/components/shop/ShopExperience";
import { getCatalogProducts } from "@/lib/medusa";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shop",
  description:
    "Shop Choccor handmade chocolates, trays, and natural juices. Retail prices marked Price TBC.",
  path: "/shop/",
  image: "/products/baileys-dream.webp",
});

export default async function ShopPage() {
  const { products } = await getCatalogProducts();
  return <ShopExperience products={products} />;
}
