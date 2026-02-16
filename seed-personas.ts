const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const personas = [
    { slug: 'developer', name: 'Developer', icon: 'Code2', tagline: 'Building digital solutions', order: 1, isVisible: true },
    { slug: 'traveler', name: 'Traveler', icon: 'Plane', tagline: 'Exploring the world', order: 2, isVisible: true },
    { slug: 'poet', name: 'Poet', icon: 'Feather', tagline: 'Weaving words into emotions', order: 3, isVisible: true },
    { slug: 'cook', name: 'Cook', icon: 'ChefHat', tagline: 'Creating culinary experiences', order: 4, isVisible: true },
  ];

  for (const persona of personas) {
    await prisma.persona.upsert({
      where: { slug: persona.slug },
      update: {},
      create: persona,
    });
  }

  console.log('Personas seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());