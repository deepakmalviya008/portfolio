'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactCTA() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border p-8 md:p-12 lg:p-16 text-center"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-traveler/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Let&apos;s Create Something
              <span className="text-primary"> Beautiful</span> Together
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you have a project in mind, want to collaborate, or just want to say hello — I&apos;d love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="xl">
                <Link href="/contact">
                  Start a Conversation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href="mailto:malviyadeepak921@gmail.com">
                  malviyadeepak921@gmail.com
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
