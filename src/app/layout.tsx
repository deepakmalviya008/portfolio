import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://deepakmalviya.com'),
  title: {
    default: 'Deepak Malviya | Developer • Traveler • Poet • Cook',
    template: '%s | Deepak Malviya',
  },
  description: 'Full Stack Developer, Explorer, Poet (Shayar), and Culinary Enthusiast. Building digital solutions while crafting verses, exploring the world, and creating flavors.',
  keywords: [
    'Deepak Malviya',
    'Full Stack Developer',
    'React Developer',
    'Node.js',
    'Travel Blog',
    'Hindi Poetry',
    'Shayari',
    'Indian Recipes',
    'Web Developer India',
  ],
  authors: [{ name: 'Deepak Malviya', url: 'https://deepakmalviya.com' }],
  creator: 'Deepak Malviya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deepakmalviya.com',
    title: 'Deepak Malviya | Developer • Traveler • Poet • Cook',
    description: 'Full Stack Developer, Explorer, Poet, and Culinary Enthusiast.',
    siteName: 'Deepak Malviya',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Deepak Malviya Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepak Malviya | Developer • Traveler • Poet • Cook',
    description: 'Full Stack Developer, Explorer, Poet, and Culinary Enthusiast.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
