'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Feather } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PoetCTA() {
  return (
    <section className="section-padding bg-poet/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-poet/10 flex items-center justify-center mx-auto mb-6">
            <Feather className="w-8 h-8 text-poet" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want a Custom Poem?
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            I write custom poetry for special occasions — weddings, anniversaries, birthdays, 
            or just to express your feelings. Let me craft words that touch hearts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-poet hover:bg-poet/90">
              <Link href="/contact?subject=Custom%20Poem%20Request">
                Request Custom Poetry
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
