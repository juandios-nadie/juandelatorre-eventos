import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { BASE_URL } from "@/lib/constants";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const OG_TITLE = "Juan de la Torre Eventos | Renta de Mobiliario en Guadalajara";
const OG_DESCRIPTION =
  "Renta de mobiliario y escenarios para eventos en Guadalajara y zona metropolitana. Sillas, mesas, escenarios y más. Contáctanos al 333-446-90-44.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: OG_TITLE,
    template: "%s | Juan de la Torre Eventos",
  },
  description: OG_DESCRIPTION,
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  keywords: [
    "renta de mobiliario",
    "eventos Guadalajara",
    "renta de escenario",
    "Juan de la Torre Eventos",
    "mobiliario para fiestas",
    "sillas para eventos",
    "mesas para eventos",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: BASE_URL,
    siteName: "Juan de la Torre Eventos",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: "/images/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Juan de la Torre Eventos — renta de mobiliario en Guadalajara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ["/images/hero.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfairDisplay.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
