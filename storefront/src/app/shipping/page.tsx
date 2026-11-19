import { PolicyStub } from "@/components/content/PolicyStub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping",
  description: "Draft shipping policy — to confirm with Choccor.",
  path: "/shipping/",
});

export default function ShippingPage() {
  return (
    <PolicyStub
      title="Shipping"
      summary="Shipping regions, carriers, timelines, and rates have not been confirmed for publication. Draft only — to confirm with Choccor."
    />
  );
}
