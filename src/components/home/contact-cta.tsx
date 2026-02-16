'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8"
          >
            <MessageCircle className="w-10 h-10 text-primary" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let&apos;s Build Something{' '}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to chat about 
            code, travel, poetry, or food? I&apos;d love to hear from you!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="group h-14 px-8 text-base">
              <Link href="/contact">
                <Mail className="mr-2 w-5 h-5" />
                Get in Touch
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base">
              <a href="mailto:malviyadeepak921@gmail.com">
                malviyadeepak921@gmail.com
              </a>
            </Button>
          </div>

          {/* Response Time */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            ⚡ Usually responds within 24 hours
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
