// app/dashboard/admin/page.jsx - Minimal Version
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaBook, FaUsers, FaClipboardCheck, FaFileAlt } from 'react-icons/fa';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Client-side role check
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'superadmin')) {
    router.push('/dashboard');
    return null;
  }

  const quickActions = [
    {
      title: 'Manage Courses',
      icon: <FaBook />,
      description: 'Create, edit, and manage courses',
      action: () => router.push('/dashboard/admin/courses'),
      color: 'btn-primary'
    },
    {
      title: 'View Students',
      icon: <FaUsers />,
      description: 'View and manage student enrollments',
      action: () => router.push('/dashboard/admin/students'),
      color: 'btn-secondary'
    },
    {
      title: 'Review Assignments',
      icon: <FaFileAlt />,
      description: 'Grade student submissions',
      action: () => router.push('/dashboard/admin/assignments'),
      color: 'btn-accent'
    },
    {
      title: 'Manage Batches',
      icon: <FaClipboardCheck />,
      description: 'Schedule and manage course batches',
      action: () => router.push('/dashboard/admin/batches'),
      color: 'btn-info'
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome, <span className="font-semibold">{session.user?.name}</span>
        </p>
        <div className="badge badge-primary mt-2 capitalize">
          {session.user?.role}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className={`text-3xl mb-4 ${action.color.replace('btn-', 'text-')}`}>
                {action.icon}
              </div>
              <h3 className="card-title">{action.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{action.description}</p>
              <div className="card-actions">
                <button 
                  onClick={action.action}
                  className={`btn ${action.color} btn-sm`}
                >
                  Go to {action.title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Recent Activity</h2>
          <div className="space-y-4">
            <div className="alert">
              <span>No recent activity to display.</span>
            </div>
            <div className="text-center">
              <p className="text-gray-500">
                Your admin panel is ready. Start by creating your first course!
              </p>
              <button 
                onClick={() => router.push('/dashboard/admin/courses/new')}
                className="btn btn-primary mt-4"
              >
                Create Your First Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}