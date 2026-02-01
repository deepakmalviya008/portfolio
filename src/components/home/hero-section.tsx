'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code2, Plane, Feather, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

const roles = [
  { text: 'Developer', icon: Code2, color: 'text-developer' },
  { text: 'Traveler', icon: Plane, color: 'text-traveler' },
  { text: 'Poet', icon: Feather, color: 'text-poet' },
  { text: 'Cook', icon: ChefHat, color: 'text-cook' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-traveler/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-4"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Deepak <span className="text-primary">Malviya</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8"
          >
            {roles.map((role, index) => (
              <span key={role.text} className="flex items-center gap-1.5">
                {index > 0 && <span className="text-muted-foreground mx-1">•</span>}
                <role.icon className={`w-5 h-5 ${role.color}`} />
                <span className="text-lg md:text-xl font-medium">{role.text}</span>
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            A curious soul who finds joy in code, verses, spices, and sunsets. Building digital solutions while exploring the world and crafting stories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="xl">
              <Link href="#personas">
                Explore My World
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
