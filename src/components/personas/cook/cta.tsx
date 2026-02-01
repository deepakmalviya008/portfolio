'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookCTA() {
  return (
    <section className="section-padding bg-cook/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-cook/10 flex items-center justify-center mx-auto mb-6">
            <ChefHat className="w-8 h-8 text-cook" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have a Recipe Request?
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Looking for a specific recipe or want me to try something new? 
            I am always excited to explore new dishes and share them with you.
          </p>

          <Button asChild size="lg" className="bg-cook hover:bg-cook/90">
            <Link href="/contact?subject=Recipe%20Request">
              Request a Recipe
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
