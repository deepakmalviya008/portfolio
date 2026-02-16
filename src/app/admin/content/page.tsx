import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { 
  Plus, 
  Search, 
  FileText,
  Code2,
  Plane,
  Feather,
  ChefHat,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

export const metadata: Metadata = {
  title: 'Content Management',
  description: 'Manage your portfolio content',
};

const personaIcons = {
  developer: Code2,
  traveler: Plane,
  poet: Feather,
  cook: ChefHat,
};

const typeLabels = {
  BLOG_POST: 'Article',
  PROJECT: 'Project',
  POEM: 'Poem',
  RECIPE: 'Recipe',
  TRAVEL_DIARY: 'Travel Story',
  GALLERY_ALBUM: 'Gallery',
};

const statusColors = {
  DRAFT: 'bg-yellow-500/10 text-yellow-600',
  PUBLISHED: 'bg-green-500/10 text-green-600',
  ARCHIVED: 'bg-gray-500/10 text-gray-600',
};

async function getContent(type?: string, status?: string) {
  try {
    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status.toUpperCase();

    const content = await prisma.content.findMany({
      where,
      include: { persona: true },
      orderBy: { createdAt: 'desc' },
    });
    return content;
  } catch (error) {
    console.error('Error fetching content:', error);
    return [];
  }
}

export default async function ContentPage({
  searchParams,
}: {
  searchParams: { type?: string; status?: string };
}) {
  const content = await getContent(searchParams.type, searchParams.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Content</h1>
          <p className="text-muted-foreground">
            Manage your articles, poems, recipes, and more.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/content/new">
            <Plus className="w-4 h-4 mr-2" />
            New Content
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/content">
          <Button variant={!searchParams.type && !searchParams.status ? 'default' : 'outline'} size="sm">
            All
          </Button>
        </Link>
        <Link href="/admin/content?status=published">
          <Button variant={searchParams.status === 'published' ? 'default' : 'outline'} size="sm">
            Published
          </Button>
        </Link>
        <Link href="/admin/content?status=draft">
          <Button variant={searchParams.status === 'draft' ? 'default' : 'outline'} size="sm">
            Drafts
          </Button>
        </Link>
        <div className="w-px h-6 bg-border mx-2 self-center" />
        {Object.entries(typeLabels).map(([value, label]) => (
          <Link key={value} href={`/admin/content?type=${value}`}>
            <Button variant={searchParams.type === value ? 'secondary' : 'ghost'} size="sm">
              {label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Content List */}
      <div className="bg-card border rounded-xl overflow-hidden">
        {content.length > 0 ? (
          <div className="divide-y">
            {content.map((item) => {
              const IconComponent = personaIcons[item.persona?.slug as keyof typeof personaIcons] || FileText;
              const typeLabel = typeLabels[item.type as keyof typeof typeLabels] || item.type;
              const statusColor = statusColors[item.status as keyof typeof statusColors] || statusColors.DRAFT;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{item.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                        {item.status.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{item.persona?.name || 'No persona'}</span>
                      <span>•</span>
                      <span>{typeLabel}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/blog/${item.slug}`} target="_blank">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/content/${item.id}`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No content found</h3>
            <p className="text-muted-foreground mb-4">
              {searchParams.type || searchParams.status
                ? 'Try adjusting your filters.'
                : 'Get started by creating your first piece of content.'}
            </p>
            <Button asChild>
              <Link href="/admin/content/new">
                <Plus className="w-4 h-4 mr-2" />
                Create Content
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
