"use client";
import React from "react";
import Link from "next/link";
import { FaHome, FaBook, FaPhoneAlt, FaInfoCircle, FaTachometerAlt } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react"; 
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  // const { data: session } = useSession();
  // const user = session?.user;
  const user = {
    name : "Nipa",

  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      
      {/* START */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          {/* Mobile Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10"
          >
            <li><Link href="/"><FaHome /> Home</Link></li>
            <li><Link href="/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
            <li><Link href="/courses"><FaBook /> All Courses</Link></li>
            <li><Link href="/contact"><FaPhoneAlt /> Contact Us</Link></li>
            <li><Link href="/about"><FaInfoCircle /> About Us</Link></li>
          </ul>
        </div>

        {/* LOGO */}
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          <span className="text-primary">Course</span> Master
        </Link>
      </div>

      {/* CENTER (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1 text-[15px] font-medium">
          <li><Link href="/"><FaHome /> Home</Link></li>
          <li><Link href="/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
          <li><Link href="/courses"><FaBook /> All Courses</Link></li>
          <li><Link href="/contact"><FaPhoneAlt /> Contact Us</Link></li>
          <li><Link href="/about"><FaInfoCircle /> About Us</Link></li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3">

        {/* Logged In Mode */}
        {user ? (
          <div className="flex items-center gap-3">
            {/* Avatar with Hover Name */}
            <div className="relative group cursor-pointer">
              <Image
                // src={user.image || "/default-avatar.png"}
                src={"/default-user.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full border"
                width={40}
                height={40}
                
              />
              
              {/* Hover Name Tooltip */}
              <span className="absolute left-1/2 -translate-x-1/2 
              bottom-[-30px] bg-black text-white text-xs px-2 py-1 rounded 
              opacity-0 group-hover:opacity-100 transition-all">
                {/* {user.name} */}
              </span>
            </div>

            {/* Logout */}
            <button onClick={() => signOut()}
              className="btn btn-sm btn-outline">
              Logout
            </button>
          </div>
        ) : (
          /* Not Logged In Mode */
          <div className="flex gap-2">
            <Link href="/signin" className="btn btn-sm">Sign In</Link>
            <Link href="/signup" className="btn btn-sm btn-primary">Sign Up</Link>
          </div>
        )}

      </div>
    </div>
  );
}
