import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateHindi(date: Date | string): string {
  return new Date(date).toLocaleDateString('hi-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function getReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function absoluteUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SITE_URL}${path}`;
}

// Persona color mapping
export const personaColors: Record<string, { primary: string; light: string; dark: string }> = {
  developer: { primary: '#0066FF', light: '#E6F0FF', dark: '#0052CC' },
  traveler: { primary: '#FF6B35', light: '#FFF0EB', dark: '#E55A2B' },
  poet: { primary: '#6B21A8', light: '#F3E8FF', dark: '#581C87' },
  cook: { primary: '#F59E0B', light: '#FEF3C7', dark: '#D97706' },
};

// Persona icons
export const personaIcons: Record<string, string> = {
  developer: 'Code2',
  traveler: 'Plane',
  poet: 'Feather',
  cook: 'ChefHat',
};
