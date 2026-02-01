'use client';

import { motion } from 'framer-motion';
import { ChefHat, Clock, Users } from 'lucide-react';

export function CookHero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cook/10 via-background to-background" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-cook/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-cook/10 flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-cook" />
            </div>
            <span className="text-cook font-medium">Cook</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Cooking Is Love Made
            <span className="text-cook"> Visible</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            From family recipes passed down through generations to modern experiments, 
            the kitchen is where I create memories and share love through food.
          </p>

          <div className="flex items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cook" />
              <span>Home Cooking</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-cook" />
              <span>Family Recipes</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
