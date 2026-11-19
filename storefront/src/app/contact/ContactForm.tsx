"use client";

import { FormEvent, useState } from "react";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <p className="rounded-md border border-[var(--line)] bg-cream-soft px-5 py-4 text-sm text-muted">
        This contact form is not connected to a backend yet. Nothing was sent —
        please use Facebook or wait until Choccor publishes a contact email.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="rounded-md border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-muted">
        Form UI only — not yet connected. Submissions are not delivered.
      </p>
      <div>
        <label htmlFor="contact-name" className="label-caps">
          Name
        </label>
        <input id="contact-name" name="name" required className="field-input mt-2" />
      </div>
      <div>
        <label htmlFor="contact-email" className="label-caps">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="field-input mt-2"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="label-caps">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="field-input mt-2 resize-y"
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Send message
        <span className="text-gold" aria-hidden>
          ❦
        </span>
      </button>
      <p className="text-xs text-muted">
        Prefer social?{" "}
        <a
          href={SITE.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          Message Choccor on Facebook
        </a>
        .
      </p>
    </form>
  );
}
