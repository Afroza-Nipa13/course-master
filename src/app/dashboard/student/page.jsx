// app/dashboard/student/page.jsx - Simple Version
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaBook, FaCalendarAlt, FaFileAlt, FaGraduationCap, FaPlayCircle } from 'react-icons/fa';

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'student') {
    router.push('/dashboard');
    return null;
  }

  const quickActions = [
    {
      title: 'My Courses',
      icon: <FaBook />,
      description: 'Continue your learning journey',
      action: () => router.push('/dashboard/student/my-courses'),
      color: 'btn-primary'
    },
    {
      title: 'Assignments',
      icon: <FaFileAlt />,
      description: 'Submit and track assignments',
      action: () => router.push('/dashboard/student/assignments'),
      color: 'btn-secondary'
    },
    {
      title: 'Schedule',
      icon: <FaCalendarAlt />,
      description: 'View class schedule',
      action: () => router.push('/dashboard/student/schedule'),
      color: 'btn-accent'
    },
    {
      title: 'Grades',
      icon: <FaGraduationCap />,
      description: 'Check your grades',
      action: () => router.push('/dashboard/student/grades'),
      color: 'btn-info'
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold">Welcome, {session.user?.name}!</h1>
          <p className="mt-2 opacity-90">
            Ready to continue your learning? You have 2 assignments due this week.
          </p>
          <div className="badge badge-lg bg-white text-blue-600 mt-3">
            Student
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
               onClick={action.action}>
            <div className="card-body items-center text-center">
              <div className={`text-4xl mb-4 ${action.color.replace('btn-', 'text-')}`}>
                {action.icon}
              </div>
              <h3 className="card-title">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
              <div className="card-actions mt-4">
                <button className={`btn ${action.color} btn-sm`}>
                  Go to {action.title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Deadlines */}
      <div className="card bg-base-100 shadow mb-8">
        <div className="card-body">
          <h2 className="card-title flex items-center gap-2">
            <FaCalendarAlt className="text-orange-500" />
            Upcoming Deadlines
          </h2>
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <h4 className="font-semibold">React Components Assignment</h4>
                <p className="text-sm text-gray-600">Advanced React Development</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Due: Jan 20</p>
                <p className="text-sm text-orange-600">2 days left</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-semibold">Database Design Project</h4>
                <p className="text-sm text-gray-600">Database Management</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Due: Jan 25</p>
                <p className="text-sm text-blue-600">1 week left</p>
              </div>
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <button 
              onClick={() => router.push('/dashboard/student/assignments')}
              className="btn btn-primary"
            >
              View All Assignments
            </button>
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title flex items-center gap-2">
            <FaPlayCircle className="text-green-500" />
            Continue Learning
          </h2>
          <p className="text-gray-600 mb-4">
            Pick up where you left off or explore new topics.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => router.push('/dashboard/student/my-courses')}
              className="btn btn-primary"
            >
              Resume Course
            </button>
            <button 
              onClick={() => router.push('/courses')}
              className="btn btn-outline"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

