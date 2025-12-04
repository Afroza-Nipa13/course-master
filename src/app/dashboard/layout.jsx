// app/dashboard/layout.jsx - Simple Version
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!session) {
    router.push('/login');
    return null;
  }

  // Get user role for conditional styling
  const userRole = session?.user?.role || 'student';
  
  // Role-specific background colors (optional)
  const getRoleColor = () => {
    switch (userRole) {
      case 'admin':
      case 'superadmin':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50';
      case 'instructor':
        return 'bg-gradient-to-br from-green-50 to-emerald-50';
      case 'student':
      default:
        return 'bg-gradient-to-br from-gray-50 to-blue-50';
    }
  };

  return (
    <div className={`min-h-screen ${getRoleColor()}`}>
      {/* Main content area */}
      <main className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}