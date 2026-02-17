import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Code2, Plane, Feather, ChefHat, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Deepak Malviya | Developer • Traveler • Poet • Cook',
  description: 'Welcome to my personal portfolio. I am a Full Stack Developer who also loves traveling, writing poetry, and cooking.',
};

export const revalidate = 60;

const personaConfig = {
  developer: { icon: Code2, gradient: 'from-blue-500 to-cyan-400', color: 'text-blue-500' },
  traveler: { icon: Plane, gradient: 'from-orange-500 to-amber-400', color: 'text-orange-500' },
  poet: { icon: Feather, gradient: 'from-purple-500 to-pink-400', color: 'text-purple-500' },
  cook: { icon: ChefHat, gradient: 'from-amber-500 to-orange-400', color: 'text-amber-500' },
};

// Type definitions
interface Persona {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
}

interface Content {
  id: string;
  title: string;
  slug: string;
  featuredImg: string | null;
  persona: {
    slug: string;
    name: string;
  } | null;
}

async function getPersonas(): Promise<Persona[]> {
  try {
    const personas = await prisma.persona.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' },
    });
    return personas;
  } catch (error) {
    console.error('Error fetching personas:', error);
    return [];
  }
}

async function getFeaturedContent(): Promise<Content[]> {
  try {
    const content = await prisma.content.findMany({
      where: { status: 'PUBLISHED' },
      include: { persona: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    });
    return content;
  } catch (error) {
    console.error('Error fetching content:', error);
    return [];
  }
}

export default async function HomePage() {
  const [personas, featuredContent] = await Promise.all([
    getPersonas(),
    getFeaturedContent(),
  ]);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container-custom py-20 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium">Available for freelance work</span>
              </div>

              {/* Name */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Deepak
                </span>
              </h1>

              {/* Role */}
              <p className="text-2xl md:text-3xl text-muted-foreground mb-6">
                Full Stack Developer
              </p>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                I craft beautiful digital experiences and explore life through code, 
                poetry, travel, and cooking. Welcome to my creative journey.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href="/personas/developer">
                    View My Work
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link href="/contact">
                    <Mail className="mr-2 w-4 h-4" />
                    Contact Me
                  </Link>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                <a
                  href="https://github.com/deepakmalviya008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/deepak-malviya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:malviyadeepak921@gmail.com"
                  className="w-12 h-12 rounded-full bg-card border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Personas Section */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-primary font-medium mb-2 block">What I Do</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                My Creative <span className="text-primary">Personas</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I believe in living a multifaceted life. Here are the different dimensions I explore.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personas.map((persona: Persona) => {
                const config = personaConfig[persona.slug as keyof typeof personaConfig];
                if (!config) return null;
                const Icon = config.icon;

                return (
                  <Link
                    key={persona.id}
                    href={`/personas/${persona.slug}`}
                    className="group block"
                  >
                    <div className="h-full p-6 bg-card rounded-2xl border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {persona.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {persona.tagline || 'Explore this persona'}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-card border rounded-3xl p-8 text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-500 mx-auto mb-6 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">DM</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Deepak Malviya</h3>
                  <p className="text-muted-foreground mb-4">Full Stack Developer</p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-2xl font-bold text-primary">5+</p>
                      <p className="text-xs text-muted-foreground">Years Exp</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">50+</p>
                      <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">10+</p>
                      <p className="text-xs text-muted-foreground">Clients</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-primary font-medium mb-2 block">About Me</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  A developer who believes in{' '}
                  <span className="text-primary">living fully</span>
                </h2>
                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>
                    I&apos;m Deepak, a Full Stack Developer from India with a passion 
                    for building elegant digital solutions.
                  </p>
                  <p>
                    I express emotions through Hindi poetry, explore the world as a traveler, 
                    and create magic in the kitchen. Each passion enriches the others.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-muted rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <Button asChild size="lg">
                  <Link href="/about">
                    More About Me
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Content */}
        {featuredContent.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container-custom">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="text-primary font-medium mb-2 block">Latest Work</span>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Recent <span className="text-primary">Creations</span>
                  </h2>
                </div>
                <Button asChild variant="outline">
                  <Link href="/blog">View All</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredContent.map((item: Content) => {
                  const config = personaConfig[item.persona?.slug as keyof typeof personaConfig];
                  const Icon = config?.icon || Code2;

                  return (
                    <Link key={item.id} href={`/blog/${item.slug}`} className="group">
                      <div className="bg-card rounded-2xl border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          {item.featuredImg ? (
                            <img src={item.featuredImg} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <Icon className={`w-12 h-12 ${config?.color || 'text-primary'} opacity-30`} />
                          )}
                        </div>
                        <div className="p-5">
                          <p className="text-xs text-primary font-medium mb-2">{item.persona?.name}</p>
                          <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Let&apos;s Build Something{' '}
                <span className="text-primary">Amazing Together</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Have a project in mind? I&apos;d love to hear from you!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    <Mail className="mr-2 w-5 h-5" />
                    Get in Touch
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="mailto:malviyadeepak921@gmail.com">
                    malviyadeepak921@gmail.com
                  </a>
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