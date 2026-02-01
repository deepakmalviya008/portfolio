'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample poems - these will be fetched from database
const poems = [
  {
    id: '1',
    title: 'खामोशी की आवाज़',
    titleEnglish: 'Voice of Silence',
    excerpt: 'जब लफ़्ज़ों को होंठों पर आने से डर लगता है,\nतब खामोशी ही सब कुछ कह जाती है...',
    excerptEnglish: 'When words fear to leave the lips, silence speaks it all...',
    genre: 'ग़ज़ल',
    featured: true,
  },
  {
    id: '2',
    title: 'सफ़र',
    titleEnglish: 'Journey',
    excerpt: 'मंज़िल से ज़्यादा खूबसूरत है रास्ता,\nहर मोड़ पर मिलती है एक नई कहानी...',
    excerptEnglish: 'The path is more beautiful than the destination...',
    genre: 'नज़्म',
    featured: true,
  },
  {
    id: '3',
    title: 'वक़्त',
    titleEnglish: 'Time',
    excerpt: 'वक़्त की रेत जो फिसलती है हाथों से,\nयादों का महल बना जाती है...',
    excerptEnglish: 'The sand of time that slips through hands...',
    genre: 'शायरी',
    featured: false,
  },
];

export function PoemCollection() {
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Poetry Collection <span className="text-hindi text-2xl">(कविता संग्रह)</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A glimpse into my world of verses, where emotions take the form of words
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/blog?type=poem">
              View All Poems
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.map((poem, index) => (
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl border bg-card hover:bg-poet/5 hover:border-poet/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <Badge variant="poet">{poem.genre}</Badge>
                {poem.featured && (
                  <Badge variant="outline" className="border-poet/30 text-poet">Featured</Badge>
                )}
              </div>

              <h3 className="text-2xl font-semibold mb-1 text-hindi group-hover:text-poet transition-colors">
                {poem.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{poem.titleEnglish}</p>

              <p className="text-hindi text-foreground/80 leading-relaxed mb-3 whitespace-pre-line">
                {poem.excerpt}
              </p>

              <p className="text-sm text-muted-foreground italic">
                {poem.excerptEnglish}
              </p>

              <Link
                href={`/blog/poems/${poem.id}`}
                className="inline-flex items-center mt-4 text-poet hover:underline"
              >
                Read Full Poem
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline">
            <Link href="/blog?type=poem">
              View All Poems
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
