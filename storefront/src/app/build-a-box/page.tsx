import { BuildBoxExperience } from "@/components/box/BuildBoxExperience";
import { boxEligibleProducts } from "@/lib/catalog";
import { withLocalAssetPaths } from "@/lib/medusa";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Build a Box",
  description:
    "Build a Choccor box of 9 handmade chocolate bars. Retail pricing marked Price TBC.",
  path: "/build-a-box/",
  image: "/reference/byob-banner-full.webp",
});

export default function BuildABoxPage() {
  const products = boxEligibleProducts().map(withLocalAssetPaths);
  return <BuildBoxExperience products={products} />;
}
