'use client';

import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';

export function PoetHero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-poet/10 via-background to-background" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-poet/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-poet/10 flex items-center justify-center">
              <Feather className="w-6 h-6 text-poet" />
            </div>
            <span className="text-poet font-medium">
              Poet <span className="text-hindi">(शायर)</span>
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Words Are the Colors of My
            <span className="text-poet"> Soul&apos;s Canvas</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            Expressing the depths of human emotion through Hindi poetry. 
            Where feelings find their voice and hearts speak in verses.
          </p>

          <div className="p-8 rounded-2xl bg-poet/5 border border-poet/20">
            <p className="text-2xl md:text-3xl text-hindi leading-relaxed text-foreground/90">
              &ldquo;शब्दों में बसी है मेरी दुनिया,<br />
              हर लफ़्ज़ में छुपी एक कहानी है।&rdquo;
            </p>
            <p className="mt-4 text-muted-foreground italic">
              &ldquo;My world resides in words,<br />
              Every phrase hides a story within.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
