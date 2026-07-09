import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import EventTypesSection from "@/components/EventTypesSection";
import ProcessSection from "@/components/ProcessSection";
import FeaturedGallery from "@/components/FeaturedGallery";
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
      <Navbar />
      <main>
        <HeroSection settings={settings} />
        <TrustBar />
        <ServicesSection categories={categories} />
        <EventTypesSection />
        <ProcessSection />
        <FeaturedGallery items={featuredItems} />
        <QuoteGuideSection />
        <ContactSection settings={settings} />
      </main>
    </>
  );
}
