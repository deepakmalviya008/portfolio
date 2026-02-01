import type {
  User,
  Persona,
  Section,
  Content,
  Media,
  Category,
  Tag,
  Skill,
  SocialLink,
  ContactSubmission,
} from '@prisma/client';

// Extended types with relations
export type PersonaWithSections = Persona & {
  sections: Section[];
  skills: Skill[];
};

export type PersonaWithContent = Persona & {
  content: ContentWithRelations[];
};

export type ContentWithRelations = Content & {
  persona: Persona;
  author: User;
  media: Media[];
  categories: { category: Category }[];
  tags: { tag: Tag }[];
};

export type ContentWithMetadata<T> = Content & {
  metadata: T;
};

// Metadata types for different content types
export interface ProjectMetadata {
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  startDate?: string;
  endDate?: string;
}

export interface RecipeMetadata {
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  isVegetarian: boolean;
  ingredients: { item: string; quantity: string; unit?: string }[];
  steps: { order: number; instruction: string; image?: string }[];
  nutrition?: {
    calories?: number;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
}

export interface PoemMetadata {
  language: 'english' | 'hindi' | 'urdu';
  genre?: string; // ghazal, nazm, etc.
  audioUrl?: string;
  videoUrl?: string;
}

export interface TravelDiaryMetadata {
  destination: string;
  country: string;
  startDate: string;
  endDate?: string;
  coordinates?: { lat: number; lng: number };
  tripType: string; // solo, group, family
  highlights: string[];
}

export interface BlogPostMetadata {
  readTime: number;
  featured: boolean;
}

// Form types
export interface ContentFormData {
  title: string;
  titleHindi?: string;
  slug: string;
  body: string;
  bodyHindi?: string;
  excerpt?: string;
  excerptHindi?: string;
  type: Content['type'];
  personaId: string;
  status: Content['status'];
  featuredImg?: string;
  metadata?: Record<string, unknown>;
  categoryIds?: string[];
  tagNames?: string[];
}

export interface PersonaFormData {
  slug: string;
  name: string;
  nameHindi?: string;
  icon?: string;
  tagline: string;
  taglineHindi?: string;
  description?: string;
  heroImage?: string;
  accentColor?: string;
  order?: number;
  isVisible?: boolean;
  seoTitle?: string;
  seoDesc?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Site settings
export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  ownerName: string;
  ownerBio: string;
  ownerImage: string;
  socialLinks: SocialLink[];
  contactEmail: string;
  headerLinks: { label: string; href: string }[];
  footerLinks: { label: string; href: string }[];
}

// Re-export Prisma types for convenience
export type {
  User,
  Persona,
  Section,
  Content,
  Media,
  Category,
  Tag,
  Skill,
  SocialLink,
  ContactSubmission,
};
