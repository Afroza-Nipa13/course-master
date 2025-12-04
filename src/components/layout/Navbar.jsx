// components/layout/Navbar.jsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Navbar({ onMenuClick, user }) {
  const { data: session } = useSession();
  const currentUser = user || session?.user;
  const [searchQuery, setSearchQuery] = useState('');

  if (!currentUser) return null;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      {/* Search bar */}
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search courses, assignments..."
            type="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        {/* Notifications */}
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Separator */}
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

        {/* User info */}
        <div className="flex items-center gap-x-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
              {currentUser.name}
            </span>
            <span className="text-xs text-gray-500 capitalize">
              {currentUser.role}
            </span>
          </div>
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              {currentUser.image ? (
                <Image
                  src={currentUser.image}
                  alt={currentUser.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <span className="text-blue-600 font-semibold">
                  {currentUser.name?.charAt(0) || 'U'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}