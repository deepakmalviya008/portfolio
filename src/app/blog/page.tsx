// Revalidate every 60 seconds
export const revalidate = 60;
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { prisma } from '@/lib/prisma';
import { Code2, Plane, Feather, ChefHat, Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { unstable_cache } from 'next/cache';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read articles, stories, poems, and recipes from Deepak Malviya.',
};

const personaConfig = {
  developer: { icon: Code2, color: 'bg-blue-500/10 text-blue-500', label: 'Developer' },
  traveler: { icon: Plane, color: 'bg-orange-500/10 text-orange-500', label: 'Traveler' },
  poet: { icon: Feather, color: 'bg-purple-500/10 text-purple-500', label: 'Poet' },
  cook: { icon: ChefHat, color: 'bg-amber-500/10 text-amber-500', label: 'Cook' },
};

// Cached data fetching
const getContent = unstable_cache(
  async () => {
    const content = await prisma.content.findMany({
      where: { status: 'PUBLISHED' },
      include: { persona: true },
      orderBy: { publishedAt: 'desc' },
    });
    return content;
  },
  ['blog-content'],
  { revalidate: 60 }
);

const getPersonas = unstable_cache(
  async () => {
    const personas = await prisma.persona.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' },
    });
    return personas;
  },
  ['personas'],
  { revalidate: 300 }
);

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { persona?: string; type?: string };
}) {
  const [content, personas] = await Promise.all([getContent(), getPersonas()]);
  
  // Filter content based on search params
  let filteredContent = content;
  
  if (searchParams.persona) {
    filteredContent = filteredContent.filter(
      (item) => item.persona?.slug === searchParams.persona
    );
  }
  
  if (searchParams.type) {
    filteredContent = filteredContent.filter(
      (item) => item.type === searchParams.type
    );
  }

  const contentTypes = [
    { value: 'BLOG_POST', label: 'Articles' },
    { value: 'PROJECT', label: 'Projects' },
    { value: 'POEM', label: 'Poetry' },
    { value: 'RECIPE', label: 'Recipes' },
    { value: 'TRAVEL_DIARY', label: 'Travel Stories' },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Blog & <span className="text-primary">Stories</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore my thoughts, experiences, and creations across development, 
                travel, poetry, and cooking.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-4 border-b sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-40">
          <div className="container-custom">
            <div className="flex flex-wrap items-center gap-3">
              {/* Persona Filters */}
              <Link href="/blog" prefetch={true}>
                <Button
                  variant={!searchParams.persona ? 'default' : 'outline'}
                  size="sm"
                >
                  All
                </Button>
              </Link>
              {personas.map((persona) => {
                const config = personaConfig[persona.slug as keyof typeof personaConfig];
                const Icon = config?.icon || Code2;
                return (
                  <Link key={persona.slug} href={`/blog?persona=${persona.slug}`} prefetch={true}>
                    <Button
                      variant={searchParams.persona === persona.slug ? 'default' : 'outline'}
                      size="sm"
                      className="gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {persona.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-12">
          <div className="container-custom">
            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((item) => {
                  const personaSlug = item.persona?.slug || 'developer';
                  const config = personaConfig[personaSlug as keyof typeof personaConfig];
                  const Icon = config?.icon || Code2;
                  
                  return (
                    <article
                      key={item.id}
                      className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Featured Image */}
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        {item.featuredImg ? (
                          <img
                            src={item.featuredImg}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
                            <Icon className="w-12 h-12 text-primary/30" />
                          </div>
                        )}
                        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${config?.color || 'bg-primary/10 text-primary'}`}>
                          {item.persona?.name || 'General'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.publishedAt 
                              ? formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })
                              : 'Recently'
                            }
                          </span>
                        </div>

                        <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h2>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {item.excerpt || 'Click to read more...'}
                        </p>

                        <Link
                          href={`/blog/${item.slug}`}
                          className="inline-flex items-center text-sm text-primary font-medium hover:underline"
                          prefetch={true}
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No content found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchParams.persona || searchParams.type
                    ? 'Try adjusting your filters.'
                    : 'Content will appear here once published.'}
                </p>
                <Button asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
