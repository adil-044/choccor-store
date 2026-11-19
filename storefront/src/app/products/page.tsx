import { ShopExperience } from "@/components/shop/ShopExperience";
import { getCatalogProducts } from "@/lib/medusa";
import { pageMetadata } from "@/lib/seo";

/** Keep /products/ as an alias of the shop collection for older links. */
export const metadata = pageMetadata({
  title: "Shop",
  description:
    "Shop Choccor handmade chocolates, trays, and natural juices.",
  path: "/products/",
  image: "/products/baileys-dream.webp",
});

export default async function ProductsAliasPage() {
  const { products } = await getCatalogProducts();
  return <ShopExperience products={products} />;
}
