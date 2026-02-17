import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Code2, Plane, Feather, ChefHat, ArrowRight, Github, Linkedin, Mail,
  Sparkles, Zap, Globe, Heart, ExternalLink, Terminal, Palette, Coffee,
  ChevronDown, MousePointer2, Rocket, Star, Award, Users, Briefcase,
  Download, Play, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Deepak Malviya | Developer • Traveler • Poet • Cook',
  description: 'Welcome to my personal portfolio. I am a Full Stack Developer with 5+ years of experience who also loves traveling, writing poetry, and cooking.',
};

export const revalidate = 60;

const personaConfig = {
  developer: {
    icon: Code2,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
    shadow: 'shadow-blue-500/25',
    hoverShadow: 'hover:shadow-blue-500/40',
    description: 'Crafting scalable web solutions with modern tech',
    name: 'Developer',
    tagline: 'Building digital solutions with clean code'
  },
  traveler: {
    icon: Plane,
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500',
    shadow: 'shadow-orange-500/25',
    hoverShadow: 'hover:shadow-orange-500/40',
    description: 'Exploring the world one destination at a time',
    name: 'Traveler',
    tagline: 'Exploring the world, one journey at a time'
  },
  poet: {
    icon: Feather,
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500',
    shadow: 'shadow-purple-500/25',
    hoverShadow: 'hover:shadow-purple-500/40',
    description: 'Weaving emotions into Hindi verses',
    name: 'Poet',
    tagline: 'Weaving emotions into words'
  },
  cook: {
    icon: ChefHat,
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500',
    shadow: 'shadow-amber-500/25',
    hoverShadow: 'hover:shadow-amber-500/40',
    description: 'Creating culinary magic in the kitchen',
    name: 'Cook',
    tagline: 'Creating culinary experiences'
  },
};

const fallbackPersonas = [
  { id: '1', slug: 'developer', name: 'Developer', tagline: 'Building digital solutions with clean code' },
  { id: '2', slug: 'traveler', name: 'Traveler', tagline: 'Exploring the world, one journey at a time' },
  { id: '3', slug: 'poet', name: 'Poet', tagline: 'Weaving emotions into words' },
  { id: '4', slug: 'cook', name: 'Cook', tagline: 'Creating culinary experiences' },
];

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '💚' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Prisma', icon: '◮' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'GraphQL', icon: '◈' },
  { name: 'Redis', icon: '🔴' },
];

const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Tech Explorer'];

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
  excerpt: string | null;
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
    return personas.length > 0 ? personas : fallbackPersonas;
  } catch (error) {
    console.error('Error fetching personas:', error);
    return fallbackPersonas;
  }
}

async function getFeaturedContent(): Promise<Content[]> {
  try {
    return await prisma.content.findMany({
      where: { status: 'PUBLISHED' },
      include: { persona: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    });
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
      <main className="overflow-hidden">
        {/* ==================== HERO SECTION ==================== */}
        <section className="min-h-screen flex items-center justify-center relative pt-16">
          {/* Animated Background */}
          <div className="absolute inset-0 -z-10">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

            {/* Animated Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-r from-primary/40 to-purple-500/40 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

            {/* Floating Particles */}
            <div className="absolute top-20 left-[10%] w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
            <div className="absolute top-40 right-[15%] w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
            <div className="absolute bottom-40 left-[20%] w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
            <div className="absolute bottom-32 right-[25%] w-4 h-4 bg-amber-500 rounded-full animate-bounce" style={{ animationDuration: '2s', animationDelay: '1.5s' }} />
            <div className="absolute top-1/3 left-[5%] w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.3s' }} />
            <div className="absolute bottom-1/3 right-[8%] w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }} />

            {/* Gradient Lines */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
          </div>

          <div className="container-custom py-8 md:py-20 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6 md:mb-8 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium">Available for opportunities</span>
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>

              {/* Main Heading with Animated Gradient */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight animate-fade-in-up">
                <span className="inline-block">Hi, I&apos;m</span>{' '}
                <span className="inline-block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                  Deepak
                </span>
              </h1>

              {/* Animated Code-style Role */}
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <Terminal className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                <div className="font-mono text-sm sm:text-base md:text-xl lg:text-2xl text-muted-foreground overflow-hidden">
                  <span className="text-primary">const</span>{' '}
                  <span className="text-foreground">developer</span>{' '}
                  <span className="text-muted-foreground">=</span>{' '}
                  <span className="text-green-500">&quot;Full Stack Developer&quot;</span>
                  <span className="animate-blink text-primary">|</span>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="flex justify-center mb-4 md:mb-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">5+ Years of Experience</span>
                  <Star className="w-4 h-4 text-amber-500" />
                </div>
              </div>

              {/* Description */}
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                I transform ideas into{' '}
                <span className="text-foreground font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">elegant code</span>,
                capture moments through{' '}
                <span className="text-foreground font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">travel</span>,
                express feelings in{' '}
                <span className="text-foreground font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Hindi poetry</span>,
                and create joy through{' '}
                <span className="text-foreground font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">cooking</span>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 md:mb-12 px-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Button asChild size="lg" className="h-12 md:h-14 px-6 md:px-8 text-base group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 border-0">
                  <Link href="/personas/developer">
                    <span className="relative z-10 flex items-center">
                      <Rocket className="mr-2 w-5 h-5" />
                      Explore My Work
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 md:h-14 px-6 md:px-8 text-base backdrop-blur-sm border-2 hover:bg-primary/5">
                  <Link href="/contact">
                    <Send className="mr-2 w-5 h-5" />
                    Let&apos;s Talk
                  </Link>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 md:gap-4 mb-16 md:mb-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {[
                  { icon: Github, href: 'https://github.com/deepakmalviya008', label: 'GitHub', hoverBg: 'hover:bg-[#333] hover:border-[#333]' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/deepak-malviya', label: 'LinkedIn', hoverBg: 'hover:bg-[#0077b5] hover:border-[#0077b5]' },
                  { icon: Mail, href: 'mailto:malviyadeepak921@gmail.com', label: 'Email', hoverBg: 'hover:bg-primary hover:border-primary' },
                ].map(({ icon: Icon, href, label, hoverBg }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-card/50 backdrop-blur-sm border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:text-white ${hoverBg}`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator - Mouse Icon */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1s' }}>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Scroll</span>
            <div className="w-6 h-10 md:w-7 md:h-12 rounded-full border-2 border-muted-foreground/30 flex justify-center p-2 relative overflow-hidden">
              <div className="w-1 h-2 md:w-1.5 md:h-3 bg-primary rounded-full animate-scroll" />
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
          </div>
        </section>

        {/* ==================== PERSONAS SECTION ==================== */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background" />

          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />

          <div className="container-custom relative">
            <div className="text-center mb-12 md:mb-16 px-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-sm font-medium mb-4">
                <Palette className="w-4 h-4 text-primary" />
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Multiple Dimensions</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Explore My{' '}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Personas
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                Life is too short to be just one thing. Here are the different facets of who I am.
              </p>
            </div>

            {/* Personas Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
              {personas.map((persona: Persona, index: number) => {
                const config = personaConfig[persona.slug as keyof typeof personaConfig];
                if (!config) return null;
                const Icon = config.icon;

                return (
                  <Link
                    key={persona.id}
                    href={`/personas/${persona.slug}`}
                    className="group relative animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 scale-95 group-hover:scale-100`} />

                    {/* Card */}
                    <div className={`relative h-full p-5 md:p-8 bg-card/90 backdrop-blur-sm rounded-2xl md:rounded-3xl border-2 border-border/50 group-hover:border-transparent transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl ${config.hoverShadow}`}>
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 rounded-2xl md:rounded-3xl transition-opacity duration-500`} />

                      {/* Icon */}
                      <div className={`relative w-14 h-14 md:w-18 md:h-18 rounded-xl md:rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg ${config.shadow}`}>
                        <Icon className="w-7 h-7 md:w-9 md:h-9 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="relative text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {persona.name}
                      </h3>
                      <p className="relative text-muted-foreground text-sm md:text-base mb-4">
                        {persona.tagline || config.description}
                      </p>

                      {/* Arrow */}
                      <div className="relative flex items-center text-primary font-semibold text-sm md:text-base">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-3 transition-transform duration-300" />
                      </div>

                      {/* Corner Decoration */}
                      <div className={`absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${config.gradient} rounded-full opacity-5 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500`} />

                      {/* Bottom Border Accent */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} rounded-b-2xl md:rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== TECH STACK MARQUEE ==================== */}
        <section className="py-10 md:py-16 border-y border-border/50 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex animate-marquee whitespace-nowrap">
            {[...techStack, ...techStack, ...techStack].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="mx-3 md:mx-6 flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-card/80 backdrop-blur-sm border rounded-full hover:border-primary/50 hover:scale-105 transition-all cursor-default"
              >
                <span className="text-lg md:text-2xl">{tech.icon}</span>
                <span className="font-medium text-sm md:text-base">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== ABOUT SECTION ==================== */}
        <section className="py-16 md:py-28 relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

          <div className="container-custom px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
              {/* Visual Side */}
              <div className="relative order-2 lg:order-1">
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl animate-pulse" />

                {/* Card */}
                <div className="relative bg-card/90 backdrop-blur-sm border-2 rounded-3xl p-6 md:p-10 shadow-2xl">
                  <div className="text-center">
                    {/* Animated Avatar */}
                    <div className="relative inline-block mb-6 md:mb-8">
                      {/* Rotating Ring */}
                      <div className="absolute inset-0 w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" style={{ animationDuration: '20s' }} />

                      {/* Avatar Container */}
                      <div className="relative w-32 h-32 md:w-40 md:h-40 m-2 rounded-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 p-1 shadow-2xl shadow-primary/25">
                        <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                          <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            DM
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 md:px-4 py-1.5 rounded-full font-semibold shadow-lg flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Open to Work
                      </div>

                      {/* Floating Icons */}
                      <div className="absolute -top-2 -left-2 w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
                        <Code2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                        <Plane className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Deepak Malviya</h3>
                    <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8">Full Stack Developer</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 md:gap-6">
                      {[
                        { value: '5+', label: 'Years Exp', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
                        { value: '20+', label: 'Projects', icon: Rocket, color: 'from-purple-500 to-pink-500' },
                        { value: '10+', label: 'Clients', icon: Users, color: 'from-amber-500 to-orange-500' },
                      ].map((stat) => (
                        <div key={stat.label} className="group p-3 md:p-4 bg-muted/50 rounded-xl md:rounded-2xl hover:bg-muted transition-colors cursor-default">
                          <div className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                            <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          </div>
                          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">About Me</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Building the future,{' '}
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    one line at a time
                  </span>
                </h2>

                <div className="space-y-4 text-muted-foreground text-base md:text-lg mb-8">
                  <p>
                    I&apos;m a passionate <span className="text-foreground font-medium">Full Stack Developer</span> from India with{' '}
                    <span className="text-primary font-semibold">5+ years</span> of experience in building scalable web applications.
                  </p>
                  <p>
                    Beyond code, I find inspiration in traveling to new places, expressing
                    emotions through <span className="text-foreground font-medium">Hindi poetry</span>, and experimenting with flavors in the kitchen.
                  </p>
                  <p>
                    I believe in <span className="text-foreground font-medium">continuous learning</span> and staying updated with the latest technologies to deliver the best solutions.
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {techStack.slice(0, 8).map((tech) => (
                    <span
                      key={tech.name}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-card border-2 rounded-full text-xs md:text-sm font-medium hover:border-primary hover:text-primary hover:scale-105 transition-all cursor-default"
                    >
                      {tech.icon} {tech.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 border-0">
                    <Link href="/about">
                      Learn More About Me
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2">
                    <Link href="/personas/developer">
                      <ExternalLink className="mr-2 w-4 h-4" />
                      View Projects
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== FEATURED CONTENT ==================== */}
        {featuredContent.length > 0 && (
          <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

            <div className="container-custom px-4">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-sm font-medium mb-4">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Latest Work</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    Recent{' '}
                    <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Creations</span>
                  </h2>
                </div>
                <Button asChild variant="outline" className="group w-fit border-2">
                  <Link href="/blog">
                    View All Posts
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {featuredContent.map((item: Content, index: number) => {
                  const config = personaConfig[item.persona?.slug as keyof typeof personaConfig];
                  const Icon = config?.icon || Code2;

                  return (
                    <Link
                      key={item.id}
                      href={`/blog/${item.slug}`}
                      className="group animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="h-full bg-card rounded-2xl md:rounded-3xl border-2 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30">
                        <div className="aspect-video bg-muted relative overflow-hidden">
                          {item.featuredImg ? (
                            <img
                              src={item.featuredImg}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${config?.gradient || 'from-primary to-purple-500'} opacity-20 flex items-center justify-center`}>
                              <Icon className="w-12 h-12 md:w-16 md:h-16 text-foreground/30" />
                            </div>
                          )}
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {/* Badge */}
                          <div className={`absolute top-3 md:top-4 left-3 md:left-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-background/90 backdrop-blur-sm ${config?.color || 'text-primary'} border`}>
                            {item.persona?.name || 'General'}
                          </div>
                        </div>
                        <div className="p-4 md:p-6">
                          <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          {item.excerpt && (
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                              {item.excerpt}
                            </p>
                          )}
                          <div className="flex items-center text-primary font-semibold text-sm">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ==================== CONTACT CTA ==================== */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/10 to-pink-500/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />

          {/* Floating Elements */}
          <div className="absolute top-20 left-[10%] w-4 h-4 bg-primary rounded-full animate-bounce opacity-60" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-20 right-[10%] w-3 h-3 bg-purple-500 rounded-full animate-bounce opacity-60" style={{ animationDuration: '2.5s' }} />

          <div className="container-custom relative px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-6 md:mb-8">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Let&apos;s Connect</span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                Ready to Build Something{' '}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Amazing?
                </span>
              </h2>

              <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
                Whether you have a project idea, want to collaborate, or just want to say hi —
                my inbox is always open!
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button asChild size="lg" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 border-0 shadow-xl shadow-primary/25">
                  <Link href="/contact">
                    <Send className="mr-2 w-5 h-5" />
                    Send a Message
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 md:h-14 px-6 md:px-8 text-sm md:text-base backdrop-blur-sm border-2">
                  <a href="mailto:malviyadeepak921@gmail.com">
                    <Mail className="mr-2 w-4 h-4" />
                    malviyadeepak921@gmail.com
                  </a>
                </Button>
              </div>

              <p className="mt-6 md:mt-8 text-muted-foreground flex items-center justify-center gap-2 text-sm md:text-base">
                <Zap className="w-4 h-4 text-primary animate-pulse" />
                Usually responds within 24 hours
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}