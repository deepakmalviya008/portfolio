'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Code2, Plane, Feather, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';

const personas = [
  { name: 'Developer', slug: 'developer', icon: Code2, color: 'text-developer' },
  { name: 'Traveler', slug: 'traveler', icon: Plane, color: 'text-traveler' },
  { name: 'Poet', slug: 'poet', icon: Feather, color: 'text-poet' },
  { name: 'Cook', slug: 'cook', icon: ChefHat, color: 'text-cook' },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPersonasOpen, setIsPersonasOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-xl"
          >
            <span className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              DM
            </span>
            <span className="hidden sm:inline">Deepak Malviya</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Personas Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPersonasOpen(!isPersonasOpen)}
                onMouseEnter={() => setIsPersonasOpen(true)}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname.startsWith('/personas')
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                Personas
                <ChevronDown className={cn(
                  'w-4 h-4 transition-transform',
                  isPersonasOpen && 'rotate-180'
                )} />
              </button>

              <AnimatePresence>
                {isPersonasOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setIsPersonasOpen(false)}
                    className="absolute top-full left-0 mt-2 w-56 p-2 bg-popover border rounded-lg shadow-lg"
                  >
                    {personas.map((persona) => (
                      <Link
                        key={persona.slug}
                        href={`/personas/${persona.slug}`}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                          pathname === `/personas/${persona.slug}`
                            ? 'bg-accent'
                            : 'hover:bg-accent'
                        )}
                      >
                        <persona.icon className={cn('w-5 h-5', persona.color)} />
                        <span>{persona.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'block px-4 py-3 rounded-md text-base font-medium transition-colors',
                      pathname === link.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-2 pb-1 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Personas
                </div>

                {personas.map((persona) => (
                  <Link
                    key={persona.slug}
                    href={`/personas/${persona.slug}`}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors',
                      pathname === `/personas/${persona.slug}`
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    <persona.icon className={cn('w-5 h-5', persona.color)} />
                    <span>{persona.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
