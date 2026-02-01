import { Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'malviyadeepak921@gmail.com',
    href: 'mailto:malviyadeepak921@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: null,
  },
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/deepakmalviya008',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://in.linkedin.com/in/deepak-malviya',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: '#',
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="space-y-4">
          {contactDetails.map((detail) => (
            <div key={detail.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <detail.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{detail.label}</p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="font-medium">{detail.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Connect on Social</h3>
        <div className="flex gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label={link.label}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
        <h3 className="font-semibold mb-2">Response Time</h3>
        <p className="text-sm text-muted-foreground">
          I typically respond within 24-48 hours. For urgent inquiries, 
          please mention it in the subject line.
        </p>
      </div>
    </div>
  );
}
