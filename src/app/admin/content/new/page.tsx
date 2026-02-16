'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const contentTypes = [
  { value: 'BLOG_POST', label: 'Article / Blog Post' },
  { value: 'PROJECT', label: 'Project' },
  { value: 'POEM', label: 'Poem / Poetry' },
  { value: 'RECIPE', label: 'Recipe' },
  { value: 'TRAVEL_DIARY', label: 'Travel Story' },
];

const personas = [
  { value: 'developer', label: 'Developer' },
  { value: 'traveler', label: 'Traveler' },
  { value: 'poet', label: 'Poet' },
  { value: 'cook', label: 'Cook' },
];

export default function NewContentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'BLOG_POST';

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const [formData, setFormData] = React.useState({
    title: '',
    slug: '',
    type: initialType,
    personaSlug: 'developer',
    excerpt: '',
    body: '',
    featuredImg: '',
    status: 'DRAFT',
  });

  // Auto-generate slug from title
  React.useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

  const handleSubmit = async (status: 'DRAFT' | 'PUBLISHED') => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create content');
      }

      router.push('/admin/content');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/content">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">New Content</h1>
            <p className="text-muted-foreground">Create a new article, poem, recipe, or travel story.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleSubmit('DRAFT')}
            disabled={isSubmitting || !formData.title}
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Draft
          </Button>
          <Button
            onClick={() => handleSubmit('PUBLISHED')}
            disabled={isSubmitting || !formData.title || !formData.body}
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
            Publish
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-card border rounded-xl p-6">
            <label className="block text-sm font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 text-xl font-medium rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter a compelling title..."
            />
          </div>

          {/* Excerpt */}
          <div className="bg-card border rounded-xl p-6">
            <label className="block text-sm font-medium mb-2">
              Excerpt / Summary
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Brief description that appears in listings..."
            />
          </div>

          {/* Body Content */}
          <div className="bg-card border rounded-xl p-6">
            <label className="block text-sm font-medium mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-muted-foreground mb-3">
              You can use HTML tags for formatting. For poems in Hindi, just type in Hindi/Devanagari script.
            </p>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
              rows={15}
              className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-y font-mono text-sm"
              placeholder="Write your content here...

For HTML formatting:
<p>Paragraph text</p>
<h2>Subheading</h2>
<strong>Bold text</strong>
<em>Italic text</em>
<ul><li>List item</li></ul>

For Hindi poetry, just type:
दिल की बात कहूं तो सुनो
ये ज़िन्दगी है एक सफर..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Content Type */}
          <div className="bg-card border rounded-xl p-6">
            <label className="block text-sm font-medium mb-3">Content Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {contentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Persona */}
          <div className="bg-card border rounded-xl p-6">
            <label className="block text-sm font-medium mb-3">Persona</label>
            <select
              value={formData.personaSlug}
              onChange={(e) => setFormData(prev => ({ ...prev, personaSlug: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {personas.map((persona) => (
                <option key={persona.value} value={persona.value}>
                  {persona.label}
                </option>
              ))}
            </select>
          </div>

          {/* Slug */}
          <div className="bg-card border rounded-xl p-6">
            <label className="block text-sm font-medium mb-2">URL Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">/blog/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="flex-1 px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="url-slug"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-card border rounded-xl p-6">
            <label className="block text-sm font-medium mb-2">Featured Image URL</label>
            <input
              type="url"
              value={formData.featuredImg}
              onChange={(e) => setFormData(prev => ({ ...prev, featuredImg: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              placeholder="https://..."
            />
            {formData.featuredImg && (
              <div className="mt-3 relative">
                <img
                  src={formData.featuredImg}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, featuredImg: '' }))}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Tip: Upload images to Cloudinary and paste the URL here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
