import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/deepakmalviya008', icon: Github },
  { name: 'LinkedIn', href: 'https://in.linkedin.com/in/deepak-malviya', icon: Linkedin },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Email', href: 'mailto:malviyadeepak921@gmail.com', icon: Mail },
];

const footerLinks = {
  personas: [
    { name: 'Developer', href: '/personas/developer' },
    { name: 'Traveler', href: '/personas/traveler' },
    { name: 'Poet', href: '/personas/poet' },
    { name: 'Cook', href: '/personas/cook' },
  ],
  site: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                DM
              </span>
              <span>Deepak Malviya</span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Full Stack Developer, Explorer, Poet, and Culinary Enthusiast. 
              Building digital solutions while crafting verses, exploring the world, 
              and creating flavors.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Personas */}
          <div>
            <h4 className="font-semibold mb-4">Personas</h4>
            <ul className="space-y-3">
              {footerLinks.personas.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.site.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Deepak Malviya. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
