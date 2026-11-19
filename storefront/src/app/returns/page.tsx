import { PolicyStub } from "@/components/content/PolicyStub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Returns",
  description: "Draft returns policy — to confirm with Choccor.",
  path: "/returns/",
});

export default function ReturnsPage() {
  return (
    <PolicyStub
      title="Returns"
      summary="Returns, exchanges, and refunds have not been confirmed for publication. Draft only — to confirm with Choccor."
    />
  );
}
