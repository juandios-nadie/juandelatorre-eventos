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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-brand-charcoal/92 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Wordmark */}
        <Link href="/" className="group flex items-center gap-3 leading-none">
          <Image
            src="/logo.jpg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl border border-white/12 object-cover"
          />
          <span className="hidden flex-col sm:flex">
            <span className="font-playfair text-sm font-bold text-brand-gold transition-colors group-hover:text-brand-champagne">
              Juan de la Torre
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-champagne/72 transition-colors group-hover:text-brand-champagne">
              Eventos
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-brand-champagne/82 transition-colors hover:text-brand-gold"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-brand-charcoal md:flex"
        >
          <WhatsAppIcon size={16} />
          Cotizar
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="p-2 text-brand-champagne md:hidden"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-brand-charcoal px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-brand-champagne/82 transition-colors hover:text-brand-gold"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white"
              >
                <WhatsAppIcon size={16} />
                Cotizar por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}
