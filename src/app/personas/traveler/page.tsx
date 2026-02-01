import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TravelerHero } from '@/components/personas/traveler/hero';
import { TravelGallery } from '@/components/personas/traveler/gallery';
import { TravelerCTA } from '@/components/personas/traveler/cta';

export const metadata: Metadata = {
  title: 'Traveler',
  description: 'Exploring the world one journey at a time. Travel stories, photography, and adventures from around the globe.',
  openGraph: {
    title: 'Deepak Malviya | Traveler',
    description: 'Exploring the world one journey at a time.',
  },
};

export default function TravelerPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <TravelerHero />
        <TravelGallery />
        <TravelerCTA />
      </main>
      <Footer />
    </>
  );
}
