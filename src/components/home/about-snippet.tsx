'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Code, Globe, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const highlights = [
  { icon: Code, label: '5+ Years', desc: 'Development Experience' },
  { icon: Globe, label: '10+', desc: 'Projects Delivered' },
  { icon: Heart, label: '100%', desc: 'Client Satisfaction' },
  { icon: Sparkles, label: '4', desc: 'Creative Personas' },
];

export function AboutSnippet() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="py-20 md:py-28 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Background Shapes */}
              <motion.div
                style={{ y }}
                className="absolute -top-10 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
              />
              <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
              />

              {/* Main Image Card */}
              <div className="relative bg-gradient-to-br from-card to-card/50 border rounded-3xl p-8 backdrop-blur-sm">
                <div className="text-center">
                  {/* Avatar */}
                  <div className="relative inline-block mb-6">
                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 p-1">
                      <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                        <span className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                          DM
                        </span>
                      </div>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                      Open to Work
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-1">Deepak Malviya</h3>
                  <p className="text-muted-foreground mb-6">Full Stack Developer</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {highlights.map(({ icon: Icon, label, desc }) => (
                      <div key={desc} className="bg-muted/50 rounded-xl p-4">
                        <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="text-xl font-bold">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 bg-card border rounded-xl px-4 py-2 shadow-xl"
              >
                <span className="text-2xl">🚀</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-card border rounded-xl px-4 py-2 shadow-xl"
              >
                <span className="text-2xl">✨</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-primary font-semibold mb-3 text-sm uppercase tracking-wider">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              A developer who believes in{' '}
              <span className="text-primary">living fully</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-lg mb-8">
              <p>
                I&apos;m Deepak, a Full Stack Developer from India with a passion
                for building elegant digital solutions. But there&apos;s more to me than just code.
              </p>
              <p>
                I express emotions through <span className="text-foreground font-medium">Hindi poetry</span>,
                explore the world as a <span className="text-foreground font-medium">traveler</span>,
                and create magic in the <span className="text-foreground font-medium">kitchen</span>.
                Each passion enriches the others.
              </p>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/about">
                  More About Me
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/personas/developer">View Projects</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
