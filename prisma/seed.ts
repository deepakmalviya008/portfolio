import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create Personas
  const personas = await Promise.all([
    prisma.persona.upsert({
      where: { slug: 'developer' },
      update: {},
      create: {
        slug: 'developer',
        name: 'Developer',
        icon: 'Code2',
        tagline: 'Building digital solutions',
        description: 'Full-stack engineer crafting scalable web applications with modern technologies. From concept to deployment, I bring ideas to life through clean, efficient code.',
        accentColor: '#0066FF',
        order: 1,
        isVisible: true,
        seoTitle: 'Developer | Deepak Malviya',
        seoDesc: 'Full Stack Developer specializing in React, Node.js, and modern web technologies.',
      },
    }),
    prisma.persona.upsert({
      where: { slug: 'traveler' },
      update: {},
      create: {
        slug: 'traveler',
        name: 'Traveler',
        icon: 'Plane',
        tagline: 'Exploring the world',
        description: 'Wanderer at heart, collecting stories and sunsets from every corner of the globe. Every journey teaches something new.',
        accentColor: '#FF6B35',
        order: 2,
        isVisible: true,
        seoTitle: 'Traveler | Deepak Malviya',
        seoDesc: 'Travel stories, photography, and adventures from around the globe.',
      },
    }),
    prisma.persona.upsert({
      where: { slug: 'poet' },
      update: {},
      create: {
        slug: 'poet',
        name: 'Poet',
        nameHindi: 'शायर',
        icon: 'Feather',
        tagline: 'Weaving words into emotions',
        taglineHindi: 'शब्दों में भावनाएं',
        description: 'Expressing the depths of human emotion through Hindi poetry. Where feelings find their voice.',
        accentColor: '#6B21A8',
        order: 3,
        isVisible: true,
        seoTitle: 'Poet (शायर) | Deepak Malviya',
        seoDesc: 'Hindi poetry and shayari expressing the depths of human emotion.',
      },
    }),
    prisma.persona.upsert({
      where: { slug: 'cook' },
      update: {},
      create: {
        slug: 'cook',
        name: 'Cook',
        icon: 'ChefHat',
        tagline: 'Creating flavors',
        description: 'Passionate about transforming simple ingredients into memorable culinary experiences. Cooking is love made visible.',
        accentColor: '#F59E0B',
        order: 4,
        isVisible: true,
        seoTitle: 'Cook | Deepak Malviya',
        seoDesc: 'Indian recipes, cooking experiments, and culinary adventures.',
      },
    }),
  ]);

  console.log(`✅ Created ${personas.length} personas`);

  // Create Social Links
  const socialLinks = await Promise.all([
    prisma.socialLink.upsert({
      where: { id: 'github' },
      update: {},
      create: {
        id: 'github',
        platform: 'github',
        url: 'https://github.com/deepakmalviya008',
        icon: 'Github',
        order: 1,
      },
    }),
    prisma.socialLink.upsert({
      where: { id: 'linkedin' },
      update: {},
      create: {
        id: 'linkedin',
        platform: 'linkedin',
        url: 'https://in.linkedin.com/in/deepak-malviya',
        icon: 'Linkedin',
        order: 2,
      },
    }),
    prisma.socialLink.upsert({
      where: { id: 'email' },
      update: {},
      create: {
        id: 'email',
        platform: 'email',
        url: 'mailto:malviyadeepak921@gmail.com',
        icon: 'Mail',
        order: 3,
      },
    }),
  ]);

  console.log(`✅ Created ${socialLinks.length} social links`);

  // Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'projects' },
      update: {},
      create: { name: 'Projects', slug: 'projects' },
    }),
    prisma.category.upsert({
      where: { slug: 'tutorials' },
      update: {},
      create: { name: 'Tutorials', slug: 'tutorials' },
    }),
    prisma.category.upsert({
      where: { slug: 'travel-stories' },
      update: {},
      create: { name: 'Travel Stories', slug: 'travel-stories' },
    }),
    prisma.category.upsert({
      where: { slug: 'poetry' },
      update: {},
      create: { name: 'Poetry', nameHindi: 'कविता', slug: 'poetry' },
    }),
    prisma.category.upsert({
      where: { slug: 'recipes' },
      update: {},
      create: { name: 'Recipes', slug: 'recipes' },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
