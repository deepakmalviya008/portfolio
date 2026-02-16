import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// Admin emails - should match the layout.tsx
const ADMIN_EMAILS = [
  'malviyadeepak921@gmail.com',
];

async function getAdminUser() {
  const { userId } = auth();
  
  if (!userId) {
    return null;
  }

  const user = await currentUser();
  
  if (!user) {
    return null;
  }

  const userEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!userEmail || !ADMIN_EMAILS.includes(userEmail.toLowerCase())) {
    return null;
  }

  return { clerkId: userId, email: userEmail };
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const adminUser = await getAdminUser();
    
    if (!adminUser) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { title, slug, type, personaSlug, excerpt, body: contentBody, featuredImg, status } = body;

    // Validate required fields
    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    // Get persona by slug
    const persona = await prisma.persona.findUnique({
      where: { slug: personaSlug },
    });

    if (!persona) {
      return NextResponse.json(
        { error: 'Invalid persona. Please make sure personas are seeded in database.' },
        { status: 400 }
      );
    }

    // Find or create the user in our database
    let dbUser = await prisma.user.findUnique({
      where: { email: adminUser.email },
    });

    if (!dbUser) {
      // Create user if doesn't exist
      dbUser = await prisma.user.create({
        data: {
          clerkId: adminUser.clerkId,
          email: adminUser.email,
          name: 'Deepak Malviya',
          role: 'OWNER',
        },
      });
    }

    // Check if slug already exists
    const existingContent = await prisma.content.findFirst({
      where: { slug, personaId: persona.id },
    });

    if (existingContent) {
      return NextResponse.json(
        { error: 'A content with this slug already exists for this persona' },
        { status: 400 }
      );
    }

    // Create content with author
    const content = await prisma.content.create({
      data: {
        title,
        slug,
        type,
        excerpt: excerpt || null,
        body: contentBody || '',
        featuredImg: featuredImg || null,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        persona: {
          connect: { id: persona.id },
        },
        author: {
          connect: { id: dbUser.id },
        },
      },
    });

    return NextResponse.json(
      { success: true, content },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { error: 'Failed to create content. Check server logs for details.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const adminUser = await getAdminUser();
    
    if (!adminUser) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status.toUpperCase();

    const content = await prisma.content.findMany({
      where,
      include: { persona: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}