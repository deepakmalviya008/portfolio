'use client';

import { motion } from 'framer-motion';

const technologies = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#339933' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Prisma', color: '#2D3748' },
  { name: 'Git', color: '#F05032' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Vercel', color: '#ffffff' },
];

export function TechStack() {
  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container-custom mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm uppercase tracking-wider"
        >
          Technologies I Work With
        </motion.p>
      </div>

      {/* Infinite Scroll */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ 
            repeat: Infinity, 
            duration: 30,
            ease: 'linear',
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...technologies, ...technologies, ...technologies].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-3 px-6 py-3 bg-card border rounded-full"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tech.color }}
              />
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
