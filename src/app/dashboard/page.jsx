// app/dashboard/page.jsx - Dashboard router
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardRouter() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
      return;
    }

    // Redirect based on role
    const userRole = session.user?.role || 'student';
    
    switch (userRole) {
      case 'admin':
      case 'superadmin':
        router.push('/dashboard/admin');
        break;
      case 'instructor':
        router.push('/dashboard/instructor');
        break;
      case 'student':
      default:
        router.push('/dashboard/student');
        break;
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}