import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Code2, Plane, Feather, ChefHat, MapPin, Calendar, GraduationCap, Briefcase, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Deepak Malviya - Full Stack Developer, Traveler, Poet, and Cook. Discover my journey, skills, and passions.',
};

const timeline = [
  {
    year: '2024',
    title: 'Full Stack Developer',
    description: 'Building scalable web applications with modern technologies like React, Next.js, and Node.js.',
    icon: Briefcase,
  },
  {
    year: '2022',
    title: 'Started Professional Journey',
    description: 'Began my career as a software developer, working on client projects and honing my skills.',
    icon: Code2,
  },
  {
    year: '2020',
    title: 'Graduated',
    description: 'Completed my education with a focus on computer science and software engineering.',
    icon: GraduationCap,
  },
  {
    year: '2018',
    title: 'Discovered Passion for Code',
    description: 'Wrote my first lines of code and fell in love with the art of programming.',
    icon: Heart,
  },
];

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL'] },
  { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Prisma', 'Supabase', 'Redis'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel', 'VS Code'] },
];

const personas = [
  {
    name: 'Developer',
    slug: 'developer',
    icon: Code2,
    color: 'bg-blue-500/10 text-blue-500',
    description: 'Building digital solutions with clean code and modern technologies.',
  },
  {
    name: 'Traveler',
    slug: 'traveler',
    icon: Plane,
    color: 'bg-orange-500/10 text-orange-500',
    description: 'Exploring the world, one destination at a time.',
  },
  {
    name: 'Poet',
    slug: 'poet',
    icon: Feather,
    color: 'bg-purple-500/10 text-purple-500',
    description: 'Weaving emotions into words, expressing the inexpressible.',
  },
  {
    name: 'Cook',
    slug: 'cook',
    icon: ChefHat,
    color: 'bg-amber-500/10 text-amber-500',
    description: 'Creating culinary experiences that bring joy to the table.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Hi, I&apos;m <span className="text-primary">Deepak Malviya</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  A curious soul who finds joy in code, verses, spices, and sunsets. 
                  I believe in living a multifaceted life where creativity knows no boundaries.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  By day, I craft digital experiences as a Full Stack Developer. 
                  By heart, I&apos;m an explorer who finds poetry in journeys and magic in the kitchen. 
                  Every line of code I write, every poem I compose, and every dish I create 
                  is an expression of who I am.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>India</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <span>Full Stack Developer</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Available for Projects</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-9xl font-bold text-primary/20">DM</div>
                </div>
                {/* Floating persona icons */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-blue-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Plane className="w-8 h-8 text-orange-500" />
                </div>
                <div className="absolute top-1/2 -right-8 w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Feather className="w-7 h-7 text-purple-500" />
                </div>
                <div className="absolute -bottom-8 left-1/2 w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <ChefHat className="w-7 h-7 text-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">My Philosophy</h2>
              <blockquote className="text-xl md:text-2xl text-muted-foreground italic mb-6">
                &ldquo;Life is too short to be just one thing. I choose to be a developer who writes poetry, 
                a traveler who codes, and a cook who finds recipes in every journey.&rdquo;
              </blockquote>
              <p className="text-muted-foreground">
                I believe that the best solutions come from diverse experiences. 
                The patience I learn from cooking makes me a better debugger. 
                The perspectives I gain from travel inspire innovative designs. 
                And the emotions I express through poetry help me create more human-centered experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Personas Section */}
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              My Many <span className="text-primary">Facets</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personas.map((persona) => (
                <Link
                  key={persona.slug}
                  href={`/personas/${persona.slug}`}
                  className="group p-6 bg-background rounded-xl border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl ${persona.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <persona.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {persona.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {persona.description}
                  </p>
                  <span className="inline-flex items-center text-sm text-primary font-medium">
                    Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Technical <span className="text-primary">Skills</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className="p-6 bg-muted/50 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-primary">{skillGroup.category}</h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              My <span className="text-primary">Journey</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
                
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative flex gap-6">
                      <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 pt-2">
                        <span className="text-sm font-medium text-primary">{item.year}</span>
                        <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                        <p className="text-muted-foreground mt-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Let&apos;s Create Something <span className="text-primary">Together</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I&apos;d love to hear from you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/personas/developer">View My Work</Link>
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
