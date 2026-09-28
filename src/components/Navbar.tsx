"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { WHATSAPP_URL } from "@/lib/constants";
import WhatsAppIcon from "./WhatsAppIcon";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#contacto", label: "Contacto" },
];

interface NavbarProps {
  quoteHref?: string;
  quoteLabel?: string;
}

export default function Navbar({
  quoteHref = WHATSAPP_URL,
  quoteLabel = "Cotizar por WhatsApp",
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const quoteIsExternal = quoteHref.startsWith("http");
  const quoteButtonClass =
    "items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-sm font-extrabold text-brand-charcoal transition duration-300 hover:bg-brand-champagne focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal active:scale-[0.98]";
  const mobileQuoteClass =
    "flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-5 py-3 text-sm font-extrabold text-brand-charcoal transition active:scale-[0.98]";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-charcoal/86 text-white backdrop-blur-xl">
      <nav className="section-shell flex h-[4.5rem] items-center justify-between">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-3 leading-none focus:outline-none"
        >
          <Image
            src="/logo.jpg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg border border-white/15 object-cover"
          />
          <span className="flex flex-col">
            <span className="text-[0.72rem] font-extrabold tracking-[-0.02em] text-white transition-colors group-hover:text-brand-gold sm:text-sm">
              Juan de la Torre
            </span>
            <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.28em] text-white/64 transition-colors group-hover:text-white/82 sm:text-[9px]">
              Eventos
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="py-3 text-sm font-semibold text-white/68 transition-colors hover:text-white focus:outline-none focus-visible:text-brand-gold"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {quoteIsExternal ? (
          <a
            href={quoteHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:flex ${quoteButtonClass}`}
          >
            <WhatsAppIcon size={16} />
            {quoteLabel}
          </a>
        ) : (
          <Link href={quoteHref} className={`hidden md:flex ${quoteButtonClass}`}>
            <WhatsAppIcon size={16} />
            {quoteLabel}
          </Link>
        )}

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="relative flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/12 text-white transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="sr-only">
            {menuOpen ? "Cerrar navegación" : "Abrir navegación"}
          </span>
          <span aria-hidden="true" className="grid w-5 gap-1.5">
            <span
              className={`h-px w-5 bg-current transition-transform ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-current transition-transform ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-brand-charcoal px-4 pb-6 md:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col pt-3">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 items-center border-b border-white/10 text-base font-semibold text-white/72 transition-colors hover:text-white focus:outline-none focus-visible:text-brand-gold"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              {quoteIsExternal ? (
                <a
                  href={quoteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={mobileQuoteClass}
                >
                  <WhatsAppIcon size={16} />
                  {quoteLabel}
                </a>
              ) : (
                <Link
                  href={quoteHref}
                  onClick={() => setMenuOpen(false)}
                  className={mobileQuoteClass}
                >
                  <WhatsAppIcon size={16} />
                  {quoteLabel}
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
