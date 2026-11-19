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
        <p className="mt-8 text-base leading-relaxed text-muted">{summary}</p>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Have a question in the meantime?{" "}
          <Link href="/contact/" className="underline underline-offset-4">
            Contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
