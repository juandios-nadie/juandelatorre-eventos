"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { buildQuoteMessage, buildQuoteUrl } from "@/lib/quote";
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
    label: "Notas o artículos específicos",
    placeholder: "Ej. sillas Tiffany, mesa nogal",
    inputMode: "text",
  },
] as const;

type FieldKey = (typeof FIELD_CONFIG)[number]["key"];
type FormState = Record<FieldKey, string> & { eventType: string };

const EVENT_TYPES = ["Boda", "XV años", "Cumpleaños", "Empresa", "Jardín"];
const ITEM_CHIPS = ["Sillas", "Mesas", "Toldos", "Cristalería", "Escenario"];

const EMPTY_FORM: FormState = {
  eventDate: "",
  location: "",
  guestCount: "",
  items: "",
  eventType: "",
};

export default function QuickQuoteForm({
  number = WHATSAPP_NUMBER,
  submitLabel,
  secondaryAction,
}: QuickQuoteFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const quoteItems = useMemo(() => {
    const customItems = form.items.trim() ? [form.items.trim()] : [];
    return [...selectedItems, ...customItems];
  }, [form.items, selectedItems]);

  const quoteInput = useMemo(
    () => ({
      number,
      eventDate: form.eventDate,
      eventType: form.eventType,
      guestCount: form.guestCount,
      location: form.location,
      items: quoteItems,
    }),
    [form, number, quoteItems]
  );

  const quoteUrl = useMemo(() => buildQuoteUrl(quoteInput), [quoteInput]);
  const quotePreview = useMemo(
    () => buildQuoteMessage(quoteInput),
    [quoteInput]
  );

  function updateField(key: FieldKey, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleItem(item: string) {
    setSelectedItems((current) =>
      current.includes(item)
        ? current.filter((selected) => selected !== item)
        : [...current, item]
    );
  }

  const secondary =
    secondaryAction ? <SecondaryActionButton action={secondaryAction} /> : null;
  const submit = (
    <a
      href={quoteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full bg-[#075E54] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#064D45] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px sm:flex-none"
    >
      <WhatsAppIcon size={18} />
      {submitLabel}
    </a>
  );

  return (
    <div>
      <fieldset className="mb-5">
        <legend className="text-xs font-bold text-brand-champagne/76">
          Tipo de evento
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {EVENT_TYPES.map((type) => {
            const selected = form.eventType === type;

            return (
              <button
                key={type}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    eventType: selected ? "" : type,
                  }))
                }
                className={`rounded-full border px-3 py-2 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal ${
                  selected
                    ? "border-brand-gold bg-brand-gold text-brand-charcoal"
                    : "border-white/12 bg-white/[0.06] text-brand-champagne hover:bg-white/[0.1]"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mb-5">
        <legend className="text-xs font-bold text-brand-champagne/76">
          Piezas de interés
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {ITEM_CHIPS.map((item) => {
            const selected = selectedItems.includes(item);

            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleItem(item)}
                className={`rounded-full border px-3 py-2 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal ${
                  selected
                    ? "border-brand-gold bg-brand-gold text-brand-charcoal"
                    : "border-white/12 bg-white/[0.06] text-brand-champagne hover:bg-white/[0.1]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </fieldset>

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
              className="min-w-0 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-brand-champagne/62"
            />
          </label>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
        <p className="text-xs font-bold text-brand-champagne/76">
          Mensaje preparado
        </p>
        <p className="mt-2 max-h-32 overflow-y-auto whitespace-pre-line text-xs leading-6 text-white/64">
          {quotePreview}
        </p>
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
      ? "inline-flex min-h-14 flex-1 items-center justify-center rounded-full bg-brand-gold px-6 py-3.5 text-sm font-bold text-brand-charcoal transition hover:bg-brand-champagne focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal active:translate-y-px sm:flex-none"
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
