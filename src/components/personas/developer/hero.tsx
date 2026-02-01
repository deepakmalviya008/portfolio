'use client';

import { motion } from 'framer-motion';
import { Code2, Github, Linkedin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DeveloperHero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-developer/10 via-background to-background" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-developer/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-developer/10 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-developer" />
            </div>
            <span className="text-developer font-medium">Developer</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Building Tomorrow&apos;s
            <span className="text-developer"> Solutions</span> Today
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Full-stack engineer passionate about creating scalable, user-centric web applications. 
            From elegant frontends to robust backends, I bring ideas to life through code.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-developer hover:bg-developer/90">
              <a href="https://github.com/deepakmalviya008" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 w-5 h-5" />
                View GitHub
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://in.linkedin.com/in/deepak-malviya" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 w-5 h-5" />
                Connect on LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="/resume.pdf" target="_blank">
                <FileText className="mr-2 w-5 h-5" />
                Download Resume
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
