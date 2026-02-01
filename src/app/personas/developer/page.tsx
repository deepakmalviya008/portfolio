import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { DeveloperHero } from '@/components/personas/developer/hero';
import { SkillsSection } from '@/components/personas/developer/skills';
import { ProjectsSection } from '@/components/personas/developer/projects';
import { DeveloperCTA } from '@/components/personas/developer/cta';

export const metadata: Metadata = {
  title: 'Developer',
  description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies. Building scalable solutions from concept to deployment.',
  openGraph: {
    title: 'Deepak Malviya | Developer',
    description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies.',
  },
};

export default function DeveloperPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <DeveloperHero />
        <SkillsSection />
        <ProjectsSection />
        <DeveloperCTA />
      </main>
      <Footer />
    </>
  );
}
