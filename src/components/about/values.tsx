'use client';

import { motion } from 'framer-motion';
import { Heart, Lightbulb, Users, Rocket } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Passion-Driven', description: 'Everything I do comes from a place of genuine interest and love.' },
  { icon: Lightbulb, title: 'Continuous Learning', description: 'The tech world evolves daily, and so do I.' },
  { icon: Users, title: 'User-Centric', description: 'Great products solve real problems. I always start with the user in mind.' },
  { icon: Rocket, title: 'Quality First', description: 'I believe in doing things right. Clean code, thoughtful design.' },
];

export function Values() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Believe In</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">The principles that guide my work and life</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="p-6 rounded-2xl border bg-card text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
