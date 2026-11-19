import { PolicyStub } from "@/components/content/PolicyStub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Returns",
  description: "Returns information for Choccor Gourmet Chocolates.",
  path: "/returns/",
});

export default function ReturnsPage() {
  return (
    <PolicyStub
      title="Returns"
      summary="We're finalizing our returns policy. Guidance for exchanges and refunds will appear here soon."
    />
  );
}
