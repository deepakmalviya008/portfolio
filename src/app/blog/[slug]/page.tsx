import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { prisma } from '@/lib/prisma';
import { Code2, Plane, Feather, ChefHat, Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow, format } from 'date-fns';

const personaConfig = {
  developer: { icon: Code2, color: 'bg-blue-500/10 text-blue-500', label: 'Developer' },
  traveler: { icon: Plane, color: 'bg-orange-500/10 text-orange-500', label: 'Traveler' },
  poet: { icon: Feather, color: 'bg-purple-500/10 text-purple-500', label: 'Poet' },
  cook: { icon: ChefHat, color: 'bg-amber-500/10 text-amber-500', label: 'Cook' },
};

async function getContent(slug: string) {
  try {
    const content = await prisma.content.findFirst({
      where: {
        slug: slug,
        status: 'PUBLISHED',
      },
      include: {
        persona: true,
      },
    });
    return content;
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
}

async function getRelatedContent(personaId: string, currentId: string) {
  try {
    const content = await prisma.content.findMany({
      where: {
        personaId: personaId,
        status: 'PUBLISHED',
        id: {
          not: currentId,
        },
      },
      include: {
        persona: true,
      },
      take: 3,
      orderBy: {
        publishedAt: 'desc',
      },
    });
    return content;
  } catch (error) {
    console.error('Error fetching related content:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const content = await getContent(params.slug);
  
  if (!content) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: content.title,
    description: content.excerpt || `Read ${content.title} by Deepak Malviya`,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const content = await getContent(params.slug);

  if (!content) {
    notFound();
  }

  const relatedContent = content.personaId 
    ? await getRelatedContent(content.personaId, content.id)
    : [];

  const personaSlug = content.persona?.slug || 'developer';
  const config = personaConfig[personaSlug as keyof typeof personaConfig];
  const Icon = config?.icon || Code2;

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link
                href="/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${config?.color || 'bg-primary/10 text-primary'}`}>
                  {content.persona?.name || 'General'}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {content.publishedAt 
                    ? format(new Date(content.publishedAt), 'MMMM d, yyyy')
                    : 'Recently published'
                  }
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  5 min read
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {content.title}
              </h1>

              {/* Excerpt */}
              {content.excerpt && (
                <p className="text-xl text-muted-foreground mb-8">
                  {content.excerpt}
                </p>
              )}

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">DM</span>
                  </div>
                  <div>
                    <p className="font-medium">Deepak Malviya</p>
                    <p className="text-sm text-muted-foreground">Author</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {content.featuredImg && (
          <section className="py-8">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <img
                  src={content.featuredImg}
                  alt={content.title}
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content.body }} />
              </article>
            </div>
          </div>
        </section>

        {/* Related Content */}
        {relatedContent.length > 0 && (
          <section className="section-padding bg-muted/50">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                More from <span className="text-primary">{content.persona?.name}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedContent.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="group bg-background rounded-xl border p-6 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.excerpt || 'Click to read more...'}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Enjoyed this post?
              </h2>
              <p className="text-muted-foreground mb-6">
                Let&apos;s connect! I&apos;d love to hear your thoughts.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/blog">More Posts</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
