'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample projects - these will be fetched from database in production
const projects = [
  {
    id: '1',
    title: 'Personal Portfolio',
    description: 'A dynamic, multi-persona portfolio website built with Next.js 14, featuring a custom CMS for content management.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://deepakmalviya.com',
    githubUrl: 'https://github.com/deepakmalviya008/portfolio',
    featured: true,
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with product management, cart functionality, and payment integration.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates and team features.',
    techStack: ['Angular', 'Firebase', 'Material UI', 'RxJS'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];

export function ProjectsSection() {
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A selection of projects that showcase my skills and passion for building
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/blog?category=projects">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
            >
              {project.featured && (
                <Badge variant="developer" className="absolute top-4 right-4">
                  Featured
                </Badge>
              )}

              <h3 className="text-xl font-semibold mb-3 group-hover:text-developer transition-colors">
                {project.title}
              </h3>

              <p className="text-muted-foreground mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-muted rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2 py-1 text-xs bg-muted rounded">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-developer transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-developer transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline">
            <Link href="/blog?category=projects">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
