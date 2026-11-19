import { PolicyStub } from "@/components/content/PolicyStub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "Draft privacy policy — to confirm with Choccor.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <PolicyStub
      title="Privacy"
      summary="A full privacy policy (data collected, newsletter handling, cookies) has not been confirmed. Draft only — to confirm with Choccor."
    />
  );
}
