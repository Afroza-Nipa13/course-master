"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  FaHome, 
  FaBook, 
  FaPhoneAlt, 
  FaInfoCircle, 
  FaTachometerAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaUserCog
} from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get user role from session
  const userRole = user?.role || "student";
  
  // Check if current path is in dashboard
  const isInDashboard = pathname?.startsWith("/dashboard");
  
  // Generate dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return "/login";
    
    switch (userRole.toLowerCase()) {
      case "admin":
      case "superadmin":
        return "/dashboard/admin";
      case "instructor":
        return "/dashboard/instructor";
      case "student":
      default:
        return "/dashboard/student";
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation links - Dashboard only appears when logged in
  const navLinks = [
    { href: "/", label: "Home", icon: <FaHome />, alwaysShow: true },
    { 
      href: getDashboardLink(), 
      label: "Dashboard", 
      icon: <FaTachometerAlt />, 
      condition: !!user,
      isDashboard: true 
    },
    { href: "/courses", label: "All Courses", icon: <FaBook />, alwaysShow: true },
    { href: "/contact", label: "Contact Us", icon: <FaPhoneAlt />, alwaysShow: true },
    { href: "/about", label: "About Us", icon: <FaInfoCircle />, alwaysShow: true },
  ];

  // Filter links based on conditions
  const filteredLinks = navLinks.filter(link => 
    link.alwaysShow || (link.condition !== undefined ? link.condition : true)
  );

  // User dropdown links
  const userDropdownLinks = [
    { href: getDashboardLink(), label: "Dashboard", icon: <FaTachometerAlt /> },
    { href: "/profile", label: "My Profile", icon: <FaUserCircle /> },
    ...(userRole === "admin" || userRole === "superadmin" 
      ? [{ href: "/admin/settings", label: "Admin Panel", icon: <FaUserCog /> }] 
      : []
    ),
    { type: "divider" },
    { 
      label: "Logout", 
      icon: <FaSignOutAlt />, 
      onClick: () => signOut({ callbackUrl: "/" }) 
    },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* START */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h8m-8 6h16" 
              />
            </svg>
          </div>
          
          {/* Mobile Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10"
          >
            {filteredLinks.map((link, index) => (
              <li key={index}>
                <Link 
                  href={link.href}
                  className={`${pathname === link.href ? "active" : ""} ${
                    link.isDashboard ? "text-primary font-semibold" : ""
                  }`}
                  onClick={() => document.activeElement?.blur()}
                >
                  {link.icon}
                  {link.label}
                  {link.isDashboard && (
                    <span className="badge badge-primary badge-xs ml-2">
                      {userRole}
                    </span>
                  )}
                </Link>
              </li>
            ))}
            
            {/* Show login/signup in mobile if not logged in */}
            {!user && (
              <>
                <div className="divider my-1"></div>
                <li>
                  <Link href="/login" className="btn btn-sm btn-ghost justify-start">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="btn btn-sm btn-primary justify-start">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* LOGO */}
        <Link href="/" className="btn btn-ghost text-xl font-bold px-2">
          <span className="text-primary">Course</span>Master
          {isInDashboard && (
            <span className="ml-2 badge badge-primary badge-sm">
              {userRole}
            </span>
          )}
        </Link>
      </div>

      {/* CENTER (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {filteredLinks.map((link, index) => (
            <li key={index}>
              <Link 
                href={link.href}
                className={`flex items-center gap-2 ${
                  pathname === link.href 
                    ? "bg-primary/10 text-primary font-semibold" 
                    : ""
                } ${link.isDashboard ? "relative" : ""}`}
              >
                {link.icon}
                {link.label}
                {link.isDashboard && (
                  <span className="absolute -top-1 -right-1 badge badge-primary badge-xs">
                    {userRole}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2">
        {/* Search Bar (Optional) */}
        <div className="hidden sm:block">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search courses..."
              className="input input-bordered input-sm w-40 md:w-56"
            />
          </div>
        </div>

        {/* Logged In Mode */}
        {user ? (
          <div className="flex items-center gap-2" ref={dropdownRef}>
            {/* User Avatar with Dropdown - Using daisyUI dropdown properly */}
            <div className="dropdown dropdown-end">
              <div 
                tabIndex={0} 
                role="button" 
                className="btn btn-ghost btn-circle avatar"
                onClick={toggleDropdown}
              >
                <div className="w-10 rounded-full border-2 border-primary/30">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                      <FaUserCircle className="text-2xl text-primary" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* User Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
              >
                {/* User Info */}
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold truncate">{user.name || "User"}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  <span className="badge badge-primary badge-sm mt-1 capitalize">
                    {userRole}
                  </span>
                </div>
                
                {/* Dropdown Links */}
                {userDropdownLinks.map((item, index) => {
                  if (item.type === "divider") {
                    return <div key={index} className="divider my-1"></div>;
                  }
                  
                  if (item.onClick) {
                    return (
                      <li key={index}>
                        <button 
                          onClick={item.onClick}
                          className="text-error hover:text-error hover:bg-error/10"
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      </li>
                    );
                  }
                  
                  return (
                    <li key={index}>
                      <Link 
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {/* User Info (Desktop) */}
            <div className="hidden md:flex flex-col items-start">
              <span className="font-medium text-sm truncate max-w-[120px]">
                {user.name || "User"}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {userRole}
              </span>
            </div>
          </div>
        ) : (
          /* Not Logged In Mode (Desktop) */
          <div className="hidden lg:flex gap-2">
            <Link href="/login" className="btn btn-sm btn-ghost">
              Sign In
            </Link>
            <Link href="/register" className="btn btn-sm btn-primary">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}