// Revalidate every 60 seconds
export const revalidate = 60;
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { PersonaCards } from '@/components/home/persona-cards';
import { AboutSnippet } from '@/components/home/about-snippet';
import { TechStack } from '@/components/home/tech-stack';
import { FeaturedContent } from '@/components/home/featured-content';
import { ContactCTA } from '@/components/home/contact-cta';
import { unstable_cache } from 'next/cache';

export const metadata: Metadata = {
  title: 'Deepak Malviya | Developer • Traveler • Poet • Cook',
  description: 'Welcome to my personal portfolio. I am a Full Stack Developer who also loves traveling, writing poetry, and cooking.',
};

const getPersonas = unstable_cache(
  async () => {
    const personas = await prisma.persona.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' },
    });
    return personas;
  },
  ['home-personas'],
  { revalidate: 300 }
);

const getFeaturedContent = unstable_cache(
  async () => {
    const content = await prisma.content.findMany({
      where: { status: 'PUBLISHED' },
      include: { persona: true },
      orderBy: { publishedAt: 'desc' },
      take: 6,
    });
    return content;
  },
  ['home-featured'],
  { revalidate: 60 }
);

export default async function HomePage() {
  const [personas, featuredContent] = await Promise.all([
    getPersonas(),
    getFeaturedContent(),
  ]);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PersonaCards personas={personas} />
        <AboutSnippet />
        <TechStack />
        {featuredContent.length > 0 && (
          <FeaturedContent content={featuredContent} />
        )}
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
