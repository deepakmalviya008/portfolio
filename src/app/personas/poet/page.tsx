import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PoetHero } from '@/components/personas/poet/hero';
import { PoemCollection } from '@/components/personas/poet/collection';
import { PoetCTA } from '@/components/personas/poet/cta';

export const metadata: Metadata = {
  title: 'Poet (शायर)',
  description: 'Hindi poetry and shayari expressing the depths of human emotion. Where feelings find their voice through verses.',
  openGraph: {
    title: 'Deepak Malviya | Poet (शायर)',
    description: 'Hindi poetry and shayari expressing the depths of human emotion.',
  },
};

export default function PoetPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <PoetHero />
        <PoemCollection />
        <PoetCTA />
      </main>
      <Footer />
    </>
  );
}
