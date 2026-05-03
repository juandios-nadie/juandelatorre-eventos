import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedGallery from "@/components/FeaturedGallery";
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
        <ServicesSection categories={categories} />
        <FeaturedGallery items={featuredItems} />
        <ContactSection settings={settings} />
      </main>
    </>
  );
}
