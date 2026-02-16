import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { 
  FileText, 
  MessageSquare, 
  Users, 
  Eye,
  Plus,
  ArrowRight,
  Code2,
  Plane,
  Feather,
  ChefHat
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage your portfolio content',
};

async function getStats() {
  try {
    const [contentCount, messageCount, publishedCount, personaCount] = await Promise.all([
      prisma.content.count(),
      prisma.contactMessage.count(),
      prisma.content.count({ where: { status: 'PUBLISHED' } }),
      prisma.persona.count(),
    ]);

    const recentMessages = await prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    const recentContent = await prisma.content.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { persona: true },
    });

    return {
      contentCount,
      messageCount,
      publishedCount,
      personaCount,
      recentMessages,
      recentContent,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      contentCount: 0,
      messageCount: 0,
      publishedCount: 0,
      personaCount: 0,
      recentMessages: [],
      recentContent: [],
    };
  }
}

const personaIcons = {
  developer: Code2,
  traveler: Plane,
  poet: Feather,
  cook: ChefHat,
};

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    {
      title: 'Total Content',
      value: stats.contentCount,
      icon: FileText,
      color: 'bg-blue-500/10 text-blue-500',
      href: '/admin/content',
    },
    {
      title: 'Published',
      value: stats.publishedCount,
      icon: Eye,
      color: 'bg-green-500/10 text-green-500',
      href: '/admin/content?status=published',
    },
    {
      title: 'Messages',
      value: stats.messageCount,
      icon: MessageSquare,
      color: 'bg-orange-500/10 text-orange-500',
      href: '/admin/messages',
    },
    {
      title: 'Personas',
      value: stats.personaCount,
      icon: Users,
      color: 'bg-purple-500/10 text-purple-500',
      href: '/admin/personas',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your portfolio.</p>
        </div>
        <Button asChild>
          <Link href="/admin/content/new">
            <Plus className="w-4 h-4 mr-2" />
            New Content
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Content */}
        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Content</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/content">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          {stats.recentContent.length > 0 ? (
            <div className="space-y-3">
              {stats.recentContent.map((content) => {
                const IconComponent = personaIcons[content.persona?.slug as keyof typeof personaIcons] || FileText;
                return (
                  <Link
                    key={content.id}
                    href={`/admin/content/${content.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{content.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {content.persona?.name} • {content.status.toLowerCase()}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No content yet</p>
              <Button asChild variant="link" className="mt-2">
                <Link href="/admin/content/new">Create your first post</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Messages</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/messages">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          {stats.recentMessages.length > 0 ? (
            <div className="space-y-3">
              {stats.recentMessages.map((message) => (
                <Link
                  key={message.id}
                  href={`/admin/messages/${message.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {message.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{message.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {message.subject || message.message.slice(0, 50)}
                    </p>
                  </div>
                  {message.status === 'UNREAD' && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No messages yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
            <Link href="/admin/content/new?type=BLOG_POST">
              <FileText className="w-5 h-5" />
              <span>New Article</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
            <Link href="/admin/content/new?type=POEM">
              <Feather className="w-5 h-5" />
              <span>New Poem</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
            <Link href="/admin/content/new?type=RECIPE">
              <ChefHat className="w-5 h-5" />
              <span>New Recipe</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
            <Link href="/admin/content/new?type=TRAVEL_DIARY">
              <Plane className="w-5 h-5" />
              <span>New Travel Story</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
