'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings,
  Menu,
  X,
  Home,
  Image,
  Feather,
  ChefHat,
  Plane,
  Code2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'All Content', href: '/admin/content', icon: FileText },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
];

const contentTypes = [
  { name: 'Articles', href: '/admin/content?type=BLOG_POST', icon: FileText },
  { name: 'Projects', href: '/admin/content?type=PROJECT', icon: Code2 },
  { name: 'Poetry', href: '/admin/content?type=POEM', icon: Feather },
  { name: 'Recipes', href: '/admin/content?type=RECIPE', icon: ChefHat },
  { name: 'Travel', href: '/admin/content?type=TRAVEL_DIARY', icon: Plane },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Build current URL for comparison
  const currentUrl = searchParams.toString() 
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="font-bold text-lg flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm">
            DM
          </span>
          Admin
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-64 bg-card border-r transform transition-transform duration-200',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b">
            <Link href="/admin" className="font-bold text-xl flex items-center gap-2">
              <span className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                DM
              </span>
              <span>Admin Panel</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Main Navigation */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Main
              </p>
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/admin' && pathname.startsWith(item.href));
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Content Types */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Content Types
              </p>
              <ul className="space-y-1">
                {contentTypes.map((item) => {
                  const isActive = currentUrl === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-muted text-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                View Site
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile top padding */}
      <div className="lg:hidden h-14" />
    </>
  );
}