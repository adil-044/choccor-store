import { HomeExperience } from "@/components/home/HomeExperience";
import { getHomepageProducts } from "@/lib/medusa";

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
