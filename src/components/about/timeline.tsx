'use client';

import { motion } from 'framer-motion';

const milestones = [
  { year: '2024', title: 'Building This Portfolio', description: 'Creating a comprehensive personal brand platform' },
  { year: '2023', title: 'Full Stack Development', description: 'Deepening expertise in React, Next.js, and Node.js' },
  { year: '2022', title: 'Started Professional Journey', description: 'Began working on real-world projects' },
  { year: '2020', title: 'Learning to Code', description: 'Discovered the joy of programming' },
];

export function Timeline() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Key milestones that shaped who I am today</p>
        </motion.div>
        <div className="max-w-2xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div key={milestone.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="relative pl-8 pb-8 last:pb-0 border-l-2 border-primary/20">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary">{milestone.year}</span>
              <h3 className="text-lg font-semibold mt-1">{milestone.title}</h3>
              <p className="text-muted-foreground">{milestone.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
