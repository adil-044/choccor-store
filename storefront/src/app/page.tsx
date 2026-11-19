import { HomeExperience } from "@/components/home/HomeExperience";
import { getHomepageProducts } from "@/lib/medusa";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: SITE.fullName,
  description:
    "More than just chocolate — handmade gourmet chocolates and natural juices by Courtney Foreman.",
  path: "/",
  image: "/products/chocolate-tray.webp",
});

export default async function HomePage() {
  const { featured, juices, tray, byob, source } = await getHomepageProducts();

  return (
    <HomeExperience
      featured={featured}
      juices={juices}
      tray={tray}
      byob={byob}
      source={source}
    />
  );
}
