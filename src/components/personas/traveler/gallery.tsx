'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const travels = [
  {
    id: '1',
    destination: 'Rajasthan',
    country: 'India',
    description: 'Land of kings, colors, and timeless stories',
    image: '/placeholder-travel-1.jpg',
  },
  {
    id: '2',
    destination: 'Himachal Pradesh',
    country: 'India',
    description: 'Where mountains touch the clouds',
    image: '/placeholder-travel-2.jpg',
  },
  {
    id: '3',
    destination: 'Goa',
    country: 'India',
    description: 'Sun, sand, and endless horizons',
    image: '/placeholder-travel-3.jpg',
  },
];

export function TravelGallery() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Travel Diaries</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Stories from the road, captured in words and photographs
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/blog?type=travel">
              All Travel Stories
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travels.map((travel, index) => (
            <motion.div
              key={travel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              
              {/* Placeholder gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-traveler/30 to-traveler/10" />

              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex items-center gap-1 text-traveler mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{travel.country}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{travel.destination}</h3>
                <p className="text-white/80">{travel.description}</p>
              </div>

              <Link href={`/blog/travel/${travel.id}`} className="absolute inset-0 z-30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
