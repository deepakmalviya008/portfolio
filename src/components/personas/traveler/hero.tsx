'use client';

import { motion } from 'framer-motion';
import { Plane, MapPin, Camera } from 'lucide-react';

const stats = [
  { label: 'Countries', value: '10+', icon: MapPin },
  { label: 'Cities', value: '25+', icon: MapPin },
  { label: 'Photos', value: '1000+', icon: Camera },
];

export function TravelerHero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-traveler/10 via-background to-background" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-traveler/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-traveler/10 flex items-center justify-center">
              <Plane className="w-6 h-6 text-traveler" />
            </div>
            <span className="text-traveler font-medium">Traveler</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Not All Who Wander Are
            <span className="text-traveler"> Lost</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Collecting moments, not things. Every journey teaches something new, 
            every destination adds a chapter to my story.
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-md">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-traveler mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
