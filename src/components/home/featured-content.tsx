'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Plane, Feather, ChefHat, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

const personaConfig = {
  developer: { icon: Code2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  traveler: { icon: Plane, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  poet: { icon: Feather, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  cook: { icon: ChefHat, color: 'text-amber-500', bg: 'bg-amber-500/10' },
};

interface Content {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImg?: string | null;
  publishedAt?: Date | null;
  persona?: {
    slug: string;
    name: string;
  } | null;
}

export function FeaturedContent({ content }: { content: Content[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-primary font-medium mb-2 block">Latest Work</span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Recent <span className="text-primary">Creations</span>
            </h2>
          </div>
          <Button asChild variant="outline" className="group w-fit">
            <Link href="/blog">
              View All
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.slice(0, 6).map((item, index) => {
            const personaSlug = item.persona?.slug || 'developer';
            const config = personaConfig[personaSlug as keyof typeof personaConfig] || personaConfig.developer;
            const Icon = config.icon;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${item.slug}`} className="block h-full">
                  <div className="h-full bg-card border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                    {/* Image */}
                    <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                      {item.featuredImg ? (
                        <img
                          src={item.featuredImg}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5">
                          <Icon className={`w-16 h-16 ${config.color} opacity-20`} />
                        </div>
                      )}
                      
                      {/* Persona Badge */}
                      <div className={`absolute top-4 left-4 ${config.bg} ${config.color} px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm`}>
                        {item.persona?.name || 'General'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {item.publishedAt && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <Calendar className="w-3 h-3" />
                          {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                        </div>
                      )}
                      
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      {item.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
