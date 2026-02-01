'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const skillCategories = [
  {
    name: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'HTML/CSS', 'SQL'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'Angular', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  },
  {
    name: 'Tools & Cloud',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Firebase'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function SkillsSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over years of hands-on experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="p-6 rounded-2xl border bg-card"
            >
              <h3 className="text-lg font-semibold mb-4 text-developer">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-developer/10 text-developer rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
