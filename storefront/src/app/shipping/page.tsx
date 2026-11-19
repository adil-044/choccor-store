import { PolicyStub } from "@/components/content/PolicyStub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping",
  description: "Shipping information for Choccor Gourmet Chocolates.",
  path: "/shipping/",
});

export default function ShippingPage() {
  return (
    <PolicyStub
      title="Shipping"
      summary="We're finalizing shipping details for Choccor. Regions, timelines, and rates will appear here soon."
    />
  );
}
