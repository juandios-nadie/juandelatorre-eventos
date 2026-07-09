import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import EventTypesSection from "@/components/EventTypesSection";
import ProcessSection from "@/components/ProcessSection";
import FeaturedGallery from "@/components/FeaturedGallery";
import FacebookEventsSection from "@/components/FacebookEventsSection";
import QuoteGuideSection from "@/components/QuoteGuideSection";
import ContactSection from "@/components/ContactSection";
import {
  getSiteSettings,
  getCategories,
  getFeaturedItems,
} from "@/lib/sanity";

export const revalidate = 3600;

export default async function Home() {
  const [settings, categories, featuredItems] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getFeaturedItems(),
  ]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only fixed left-4 top-4 z-[60] rounded-full bg-brand-champagne px-4 py-2 text-sm font-bold text-brand-charcoal focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-brand-gold"
      >
        Saltar al contenido
      </a>
      <Navbar quoteHref="/#cotizar" />
      <main id="contenido">
        <HeroSection settings={settings} />
        <TrustBar />
        <ServicesSection categories={categories} />
        <EventTypesSection />
        <ProcessSection />
        <FeaturedGallery items={featuredItems} />
        <FacebookEventsSection facebookUrl={settings?.facebookUrl} />
        <QuoteGuideSection />
        <ContactSection settings={settings} />
      </main>
    </>
  );
}
