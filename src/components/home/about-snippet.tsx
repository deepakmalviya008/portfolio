'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AboutSnippet() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              {/* Placeholder - replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-traveler/20 flex items-center justify-center">
                <span className="text-6xl font-bold text-primary/30">DM</span>
              </div>
              {/* Uncomment when you have an image:
              <Image
                src="/images/deepak-profile.jpg"
                alt="Deepak Malviya"
                fill
                className="object-cover"
                priority
              />
              */}
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-traveler/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hi, I&apos;m <span className="text-primary">Deepak</span>
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground mb-8">
              <p>
                A Full Stack Developer from India with a passion for creating elegant, 
                user-centric web experiences. But there&apos;s more to me than just code.
              </p>
              <p>
                When I&apos;m not building applications, you&apos;ll find me exploring new 
                destinations, penning down thoughts in Hindi poetry, or experimenting 
                with flavors in my kitchen.
              </p>
              <p>
                I believe in living a multi-dimensional life where creativity flows 
                across different domains. Each passion feeds into the other, making 
                me a better creator, thinker, and human.
              </p>
            </div>

            <Button asChild size="lg">
              <Link href="/about">
                Read My Full Story
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
