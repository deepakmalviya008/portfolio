import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

// Add your email here to restrict admin access
const ADMIN_EMAILS = [
  'malviyadeepak921@gmail.com',
  // Add more admin emails as needed
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  // Check if user is authenticated
  if (!userId) {
    redirect('/sign-in');
  }

  // Get user details from Clerk
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Get primary email
  const userEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  console.log('Admin access attempt by:', userEmail); // Debug log

  // Check if user is admin
  if (!userEmail || !ADMIN_EMAILS.includes(userEmail.toLowerCase())) {
    console.log('Access denied. Email not in admin list:', userEmail);
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}