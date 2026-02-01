'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DeveloperCTA() {
  return (
    <section className="section-padding bg-developer/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-developer/10 flex items-center justify-center mx-auto mb-6">
            <Code2 className="w-8 h-8 text-developer" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have a Project in Mind?
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-developer hover:bg-developer/90">
              <Link href="/contact">
                Let&apos;s Work Together
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:malviyadeepak921@gmail.com">
                malviyadeepak921@gmail.com
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
