'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TravelerCTA() {
  return (
    <section className="section-padding bg-traveler/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-traveler/10 flex items-center justify-center mx-auto mb-6">
            <Plane className="w-8 h-8 text-traveler" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want Travel Recommendations?
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Planning your next adventure? I am happy to share tips, itineraries, 
            and hidden gems from places I have explored.
          </p>

          <Button asChild size="lg" className="bg-traveler hover:bg-traveler/90">
            <Link href="/contact?subject=Travel%20Tips">
              Get Travel Tips
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
