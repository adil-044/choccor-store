import Link from "next/link";

export function PolicyStub({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) {
  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad max-w-3xl">
        <p className="eyebrow">Policies</p>
        <h1 className="display-lg mt-3">{title}</h1>
        <p className="mt-4 inline-flex rounded-sm border border-gold/40 bg-gold/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-cocoa-soft">
          Draft — to confirm with Choccor
        </p>
        <p className="mt-8 text-base leading-relaxed text-muted">{summary}</p>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          This page is a placeholder so navigation and legal entry points exist
          for the static storefront. Do not treat it as final policy language.
        </p>
        <Link href="/contact/" className="btn-secondary mt-10 inline-flex">
          Contact Choccor
        </Link>
      </div>
    </div>
  );
}
