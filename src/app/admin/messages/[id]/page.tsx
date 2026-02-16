import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { 
  ArrowLeft, 
  Mail, 
  Calendar,
  User,
  MessageSquare,
  CheckCircle,
  Archive,
  Trash2,
  Reply,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';

async function getMessage(id: string) {
  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });
    return message;
  } catch (error) {
    console.error('Error fetching message:', error);
    return null;
  }
}

async function markAsRead(id: string) {
  'use server';
  await prisma.contactMessage.update({
    where: { id },
    data: { status: 'READ' },
  });
  revalidatePath('/admin/messages');
}

async function updateStatus(id: string, status: string) {
  'use server';
  await prisma.contactMessage.update({
    where: { id },
    data: { status: status as any },
  });
  revalidatePath('/admin/messages');
  revalidatePath(`/admin/messages/${id}`);
}

async function deleteMessage(id: string) {
  'use server';
  await prisma.contactMessage.delete({
    where: { id },
  });
  revalidatePath('/admin/messages');
  redirect('/admin/messages');
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const message = await getMessage(params.id);
  return {
    title: message ? `Message from ${message.name}` : 'Message Not Found',
  };
}

export default async function MessageDetailPage({ params }: { params: { id: string } }) {
  const message = await getMessage(params.id);

  if (!message) {
    notFound();
  }

  // Mark as read when viewing
  if (message.status === 'UNREAD') {
    await markAsRead(message.id);
  }

  const statusColors = {
    UNREAD: 'bg-blue-500/10 text-blue-600',
    READ: 'bg-gray-500/10 text-gray-600',
    REPLIED: 'bg-green-500/10 text-green-600',
    ARCHIVED: 'bg-yellow-500/10 text-yellow-600',
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/messages">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Message from {message.name}</h1>
            <p className="text-muted-foreground">
              {format(new Date(message.createdAt), 'MMMM d, yyyy at h:mm a')}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[message.status as keyof typeof statusColors]}`}>
          {message.status.toLowerCase()}
        </span>
      </div>

      {/* Message Card */}
      <div className="bg-card border rounded-xl overflow-hidden">
        {/* Sender Info */}
        <div className="p-6 border-b bg-muted/30">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-primary">
                {message.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{message.name}</h2>
              <a 
                href={`mailto:${message.email}`}
                className="text-primary hover:underline flex items-center gap-1"
              >
                <Mail className="w-4 h-4" />
                {message.email}
              </a>
            </div>
          </div>
        </div>

        {/* Subject */}
        {message.subject && (
          <div className="px-6 py-4 border-b">
            <p className="text-sm text-muted-foreground">Subject</p>
            <p className="font-medium">{message.subject}</p>
          </div>
        )}

        {/* Message Body */}
        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Message</p>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{message.message}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-card border rounded-xl p-6">
        <h3 className="font-medium mb-4">Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={`mailto:${message.email}?subject=Re: ${message.subject || 'Your message'}`}>
              <Reply className="w-4 h-4 mr-2" />
              Reply via Email
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          </Button>
          
          <form action={updateStatus.bind(null, message.id, 'REPLIED')}>
            <Button type="submit" variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Replied
            </Button>
          </form>

          <form action={updateStatus.bind(null, message.id, 'ARCHIVED')}>
            <Button type="submit" variant="outline">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
          </form>

          <form action={deleteMessage.bind(null, message.id)}>
            <Button type="submit" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
