import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CookHero } from '@/components/personas/cook/hero';
import { RecipeCollection } from '@/components/personas/cook/recipes';
import { CookCTA } from '@/components/personas/cook/cta';

export const metadata: Metadata = {
  title: 'Cook',
  description: 'Crafting flavors and creating memories in the kitchen. Indian recipes, cooking experiments, and culinary adventures.',
  openGraph: {
    title: 'Deepak Malviya | Cook',
    description: 'Crafting flavors and creating memories in the kitchen.',
  },
};

export default function CookPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <CookHero />
        <RecipeCollection />
        <CookCTA />
      </main>
      <Footer />
    </>
  );
}
