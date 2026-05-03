"use client";

import Link from "next/link";
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-charcoal/95 backdrop-blur-sm border-b border-brand-gold/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-playfair text-brand-gold font-bold tracking-widest text-xs uppercase group-hover:text-brand-champagne transition-colors">
            Juan de la Torre
          </span>
          <span className="text-brand-champagne/70 font-light tracking-[0.3em] text-[10px] uppercase mt-0.5 group-hover:text-brand-champagne transition-colors">
            Eventos
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-brand-champagne/80 hover:text-brand-gold text-sm tracking-wide transition-colors"
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
          className="hidden md:flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
        >
          <WhatsAppIcon size={16} />
          Cotizar
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden text-brand-champagne p-1"
          aria-label="Abrir menú"
        >
          {menuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-charcoal border-t border-brand-gold/20 px-6 pb-6">
          <ul className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-brand-champagne/80 hover:text-brand-gold text-sm tracking-wide block transition-colors"
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
                className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-4 py-2.5 rounded-full w-fit"
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
