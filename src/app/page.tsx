import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { PersonaCards } from '@/components/home/persona-cards';
import { AboutSnippet } from '@/components/home/about-snippet';
import { ContactCTA } from '@/components/home/contact-cta';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PersonaCards />
        <AboutSnippet />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
