import { PolicyStub } from "@/components/content/PolicyStub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "Privacy information for Choccor Gourmet Chocolates.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <PolicyStub
      title="Privacy"
      summary="We're preparing a full privacy policy covering how Choccor handles your information. It will appear here soon."
    />
  );
}
