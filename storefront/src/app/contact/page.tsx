import { ContactForm } from "./ContactForm";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Choccor Gourmet Chocolates. Unconfirmed fields marked TBC.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad">
        <p className="eyebrow">Studio</p>
        <h1 className="display-lg mt-3">Contact</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Reach out about orders, trays, or Build a Box. Phone and email remain
          TBC until Choccor confirms a single public contact path.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="hairline pt-0">
              <p className="label-caps">Details</p>
              <ul className="mt-4 space-y-3 text-sm text-charcoal/85">
                <li>
                  <span className="text-muted">Owner</span>
                  <br />
                  {SITE.owner}
                </li>
                <li>
                  <span className="text-muted">Phone</span>
                  <br />
                  <span className="price-tbc">TBC</span>
                </li>
                <li>
                  <span className="text-muted">Email</span>
                  <br />
                  TBC
                </li>
                <li>
                  <span className="text-muted">Address / pickup</span>
                  <br />
                  TBC
                </li>
                <li>
                  <span className="text-muted">Facebook</span>
                  <br />
                  <a
                    href={SITE.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 focus-ring rounded-sm"
                  >
                    facebook.com/share/…
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
