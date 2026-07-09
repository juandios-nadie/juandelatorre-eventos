"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { buildQuoteUrl } from "@/lib/quote";
import WhatsAppIcon from "./WhatsAppIcon";

interface SecondaryAction {
  href: string;
  label: string;
  external?: boolean;
  icon?: "facebook";
  placement?: "before" | "after";
  variant?: "gold" | "ghost";
}

interface QuickQuoteFormProps {
  number?: string;
  submitLabel: string;
  secondaryAction?: SecondaryAction;
}

const FIELD_CONFIG = [
  {
    key: "eventDate",
    label: "Fecha del evento",
    placeholder: "Ej. 12 de octubre",
    inputMode: "text",
  },
  {
    key: "location",
    label: "Zona o colonia",
    placeholder: "Ej. Zapopan Centro",
    inputMode: "text",
  },
  {
    key: "guestCount",
    label: "Cantidad aproximada de invitados",
    placeholder: "Ej. 120",
    inputMode: "numeric",
  },
  {
    key: "items",
    label: "Artículos que te gustaron",
    placeholder: "Ej. sillas Tiffany y mesas",
    inputMode: "text",
  },
] as const;

type FieldKey = (typeof FIELD_CONFIG)[number]["key"];
type FormState = Record<FieldKey, string>;

const EMPTY_FORM: FormState = {
  eventDate: "",
  location: "",
  guestCount: "",
  items: "",
};

export default function QuickQuoteForm({
  number = WHATSAPP_NUMBER,
  submitLabel,
  secondaryAction,
}: QuickQuoteFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const quoteUrl = useMemo(
    () =>
      buildQuoteUrl({
        number,
        eventDate: form.eventDate,
        guestCount: form.guestCount,
        location: form.location,
        items: form.items ? [form.items] : [],
      }),
    [form, number]
  );

  function updateField(key: FieldKey, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  const secondary =
    secondaryAction ? <SecondaryActionButton action={secondaryAction} /> : null;
  const submit = (
    <a
      href={quoteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px sm:flex-none"
    >
      <WhatsAppIcon size={18} />
      {submitLabel}
    </a>
  );

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {FIELD_CONFIG.map((field) => (
          <label
            key={field.key}
            className="grid gap-1.5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-brand-champagne transition focus-within:border-brand-gold focus-within:bg-white/[0.09]"
          >
            <span className="text-xs font-bold text-brand-champagne/68">
              {field.label}
            </span>
            <input
              value={form[field.key]}
              onChange={(event) => updateField(field.key, event.target.value)}
              inputMode={field.inputMode}
              placeholder={field.placeholder}
              className="min-w-0 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-brand-champagne/42"
            />
          </label>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {secondaryAction?.placement === "before" && secondary}
        {submit}
        {secondaryAction?.placement !== "before" && secondary}
      </div>
    </div>
  );
}

function SecondaryActionButton({ action }: { action: SecondaryAction }) {
  const className =
    action.variant === "gold"
      ? "inline-flex min-h-14 flex-1 items-center justify-center rounded-full bg-brand-gold px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-gold/88 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px sm:flex-none"
      : "inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full border border-white/16 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px sm:flex-none";

  if (action.external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {action.icon === "facebook" && <FacebookIcon />}
        {action.label}
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
