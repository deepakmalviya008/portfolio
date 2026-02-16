'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Plane, Feather, ChefHat, ArrowUpRight } from 'lucide-react';

const personaConfig = {
  developer: {
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-400',
    hoverGradient: 'group-hover:from-blue-600 group-hover:to-cyan-500',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
    description: 'Building scalable web applications with modern technologies',
  },
  traveler: {
    icon: Plane,
    gradient: 'from-orange-500 to-amber-400',
    hoverGradient: 'group-hover:from-orange-600 group-hover:to-amber-500',
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
    description: 'Exploring the world, one destination at a time',
  },
  poet: {
    icon: Feather,
    gradient: 'from-purple-500 to-pink-400',
    hoverGradient: 'group-hover:from-purple-600 group-hover:to-pink-500',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
    description: 'Weaving emotions into words, in Hindi and English',
  },
  cook: {
    icon: ChefHat,
    gradient: 'from-amber-500 to-orange-400',
    hoverGradient: 'group-hover:from-amber-600 group-hover:to-orange-500',
    bgPattern: 'radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
    description: 'Creating culinary experiences that bring joy',
  },
};

interface Persona {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
}

export function PersonaCards({ personas }: { personas: Persona[] }) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">What I Do</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My Creative <span className="text-primary">Personas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            I believe in living a multifaceted life. Here are the different dimensions I explore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, index) => {
            const config = personaConfig[persona.slug as keyof typeof personaConfig];
            if (!config) return null;
            
            const Icon = config.icon;

            return (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/personas/${persona.slug}`} className="group block h-full">
                  <div 
                    className="relative h-full p-6 rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
                    style={{ backgroundImage: config.bgPattern }}
                  >
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Icon */}
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradient} ${config.hoverGradient} flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                      {persona.name}
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {persona.tagline || config.description}
                    </p>

                    {/* Bottom Accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
