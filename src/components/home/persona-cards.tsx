'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, Plane, Feather, ChefHat, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const personas = [
  {
    slug: 'developer',
    name: 'Developer',
    icon: Code2,
    tagline: 'Building digital solutions',
    description: 'Full-stack engineer crafting scalable web applications with modern technologies. From concept to deployment.',
    color: 'developer',
    gradient: 'from-developer/20 to-developer/5',
  },
  {
    slug: 'traveler',
    name: 'Traveler',
    icon: Plane,
    tagline: 'Exploring the world',
    description: 'Wanderer at heart, collecting stories and sunsets from every corner of the globe. Adventure awaits.',
    color: 'traveler',
    gradient: 'from-traveler/20 to-traveler/5',
  },
  {
    slug: 'poet',
    name: 'Poet',
    nameHindi: 'शायर',
    icon: Feather,
    tagline: 'Weaving words into emotions',
    description: 'Expressing the depths of human emotion through Hindi poetry. Where feelings find their voice.',
    color: 'poet',
    gradient: 'from-poet/20 to-poet/5',
  },
  {
    slug: 'cook',
    name: 'Cook',
    icon: ChefHat,
    tagline: 'Creating flavors',
    description: 'Passionate about transforming simple ingredients into memorable culinary experiences. Taste the love.',
    color: 'cook',
    gradient: 'from-cook/20 to-cook/5',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function PersonaCards() {
  return (
    <section id="personas" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Many Hats, One Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Life is too short for just one passion. Explore the different facets that make up who I am.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {personas.map((persona) => (
            <motion.div key={persona.slug} variants={cardVariants}>
              <Link href={`/personas/${persona.slug}`} className="block group">
                <div className={cn(
                  "relative h-full p-6 md:p-8 rounded-2xl border bg-gradient-to-br transition-all duration-300",
                  `${persona.gradient}`,
                  "hover:shadow-xl hover:-translate-y-1 hover:border-transparent"
                )}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center",
                      `bg-${persona.color}/10`
                    )}>
                      <persona.icon className={cn("w-7 h-7", `text-${persona.color}`)} />
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold mb-1">
                    {persona.name}
                    {persona.nameHindi && (
                      <span className="text-lg font-normal text-muted-foreground ml-2 text-hindi">
                        ({persona.nameHindi})
                      </span>
                    )}
                  </h3>
                  
                  <p className={cn("text-sm font-medium mb-3", `text-${persona.color}`)}>
                    {persona.tagline}
                  </p>
                  
                  <p className="text-muted-foreground">
                    {persona.description}
                  </p>

                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity",
                    `bg-${persona.color}`
                  )} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
