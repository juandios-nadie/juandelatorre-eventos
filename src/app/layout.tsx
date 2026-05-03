import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  title: "Juan de la Torre Eventos | Renta de Mobiliario en Guadalajara",
  description:
    "Renta de mobiliario y escenarios para eventos en Guadalajara y zona metropolitana. Sillas, mesas, escenarios y más. Contáctanos al 333-446-90-44.",
  keywords: [
    "renta de mobiliario",
    "eventos Guadalajara",
    "renta de escenario",
    "Juan de la Torre Eventos",
    "mobiliario para fiestas",
  ],
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
        <Analytics />
      </body>
    </html>
  );
}
