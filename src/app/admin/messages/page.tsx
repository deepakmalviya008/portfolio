import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { 
  MessageSquare, 
  Mail, 
  Calendar,
  CheckCircle,
  Circle,
  Archive,
  Reply
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow, format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Messages',
  description: 'View contact form submissions',
};

const statusConfig = {
  UNREAD: { label: 'Unread', color: 'bg-blue-500/10 text-blue-600', icon: Circle },
  READ: { label: 'Read', color: 'bg-gray-500/10 text-gray-600', icon: CheckCircle },
  REPLIED: { label: 'Replied', color: 'bg-green-500/10 text-green-600', icon: Reply },
  ARCHIVED: { label: 'Archived', color: 'bg-yellow-500/10 text-yellow-600', icon: Archive },
};

async function getMessages(status?: string) {
  try {
    const where: any = {};
    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

async function getMessageCounts() {
  try {
    const [total, unread] = await Promise.all([
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
    ]);
    return { total, unread };
  } catch (error) {
    return { total: 0, unread: 0 };
  }
}

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const [messages, counts] = await Promise.all([
    getMessages(searchParams.status),
    getMessageCounts(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            {counts.unread > 0 
              ? `You have ${counts.unread} unread message${counts.unread > 1 ? 's' : ''}`
              : 'All messages have been read'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/messages">
          <Button variant={!searchParams.status ? 'default' : 'outline'} size="sm">
            All ({counts.total})
          </Button>
        </Link>
        <Link href="/admin/messages?status=unread">
          <Button variant={searchParams.status === 'unread' ? 'default' : 'outline'} size="sm">
            Unread ({counts.unread})
          </Button>
        </Link>
        <Link href="/admin/messages?status=read">
          <Button variant={searchParams.status === 'read' ? 'secondary' : 'ghost'} size="sm">
            Read
          </Button>
        </Link>
        <Link href="/admin/messages?status=replied">
          <Button variant={searchParams.status === 'replied' ? 'secondary' : 'ghost'} size="sm">
            Replied
          </Button>
        </Link>
        <Link href="/admin/messages?status=archived">
          <Button variant={searchParams.status === 'archived' ? 'secondary' : 'ghost'} size="sm">
            Archived
          </Button>
        </Link>
      </div>

      {/* Messages List */}
      <div className="bg-card border rounded-xl overflow-hidden">
        {messages.length > 0 ? (
          <div className="divide-y">
            {messages.map((message) => {
              const config = statusConfig[message.status as keyof typeof statusConfig] || statusConfig.UNREAD;
              const StatusIcon = config.icon;

              return (
                <Link
                  key={message.id}
                  href={`/admin/messages/${message.id}`}
                  className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-medium text-primary">
                      {message.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${message.status === 'UNREAD' ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {message.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {message.subject || 'No Subject'}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {message.message}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {message.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>

                  {/* Unread indicator */}
                  {message.status === 'UNREAD' && (
                    <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No messages found</h3>
            <p className="text-muted-foreground">
              {searchParams.status
                ? 'Try adjusting your filters.'
                : 'Messages from visitors will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
