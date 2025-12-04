// components/layout/Sidebar.jsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  HomeIcon,
  BookOpenIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Logo from '@/components/ui/Logo';

export default function Sidebar({ user, onClose }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const currentUser = user || session?.user;
  const userRole = currentUser?.role || 'student';
  
  // Admin navigation items
  const adminNavigation = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: HomeIcon },
    { name: 'Courses', href: '/dashboard/admin/courses', icon: BookOpenIcon },
    { name: 'Batches', href: '/dashboard/admin/batches', icon: CalendarIcon },
    { name: 'Students', href: '/dashboard/admin/students', icon: UserGroupIcon },
    { name: 'Enrollments', href: '/dashboard/admin/enrollments', icon: ClipboardDocumentCheckIcon },
    { name: 'Assignments', href: '/dashboard/admin/assignments', icon: DocumentTextIcon },
    { name: 'Analytics', href: '/dashboard/admin/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: CogIcon },
  ];

  // Student navigation items
  const studentNavigation = [
    { name: 'Dashboard', href: '/dashboard/student', icon: HomeIcon },
    { name: 'My Courses', href: '/dashboard/student/my-courses', icon: BookOpenIcon },
    { name: 'Assignments', href: '/dashboard/student/assignments', icon: DocumentTextIcon },
    { name: 'Grades', href: '/dashboard/student/grades', icon: AcademicCapIcon },
    { name: 'Schedule', href: '/dashboard/student/schedule', icon: CalendarIcon },
    { name: 'Resources', href: '/dashboard/student/resources', icon: ClipboardDocumentCheckIcon },
    { name: 'Profile', href: '/dashboard/student/profile', icon: UserIcon },
  ];

  // Instructor navigation items
  const instructorNavigation = [
    { name: 'Dashboard', href: '/dashboard/instructor', icon: HomeIcon },
    { name: 'My Courses', href: '/dashboard/instructor/courses', icon: BookOpenIcon },
    { name: 'Assignments', href: '/dashboard/instructor/assignments', icon: DocumentTextIcon },
    { name: 'Students', href: '/dashboard/instructor/students', icon: UserGroupIcon },
    { name: 'Gradebook', href: '/dashboard/instructor/gradebook', icon: AcademicCapIcon },
    { name: 'Schedule', href: '/dashboard/instructor/schedule', icon: CalendarIcon },
  ];

  // Get navigation based on user role
  const getNavigation = () => {
    switch (userRole) {
      case 'admin':
      case 'superadmin':
        return adminNavigation;
      case 'instructor':
        return instructorNavigation;
      case 'student':
      default:
        return studentNavigation;
    }
  };

  const navigation = getNavigation();

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-4 border-b">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${isActive
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon
                className={`
                  mr-3 h-5 w-5 shrink-0
                  ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
                `}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User profile section */}
      <div className="shrink-0 border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{currentUser?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
          >
            <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}