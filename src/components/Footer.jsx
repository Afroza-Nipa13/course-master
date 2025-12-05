"use client"
import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Social links data
  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/coursemaster',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current hover:scale-110 transition-transform">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/c/coursemaster',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current hover:scale-110 transition-transform">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/coursemaster',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current hover:scale-110 transition-transform">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/coursemaster',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current hover:scale-110 transition-transform">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ]

  // Navigation links data
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ]

  return (
    <footer className="footer bg-deep-blue text-gray-300 border-t border-primary-light/20">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-8">
          {/* Brand Logo & Name */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-40 rounded-lg bg-linear-to-br from-primary-light to-secondary-light flex items-center justify-center">
                <span className="text-white font-bold text-xl">Course Master</span>
              </div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
                Course Master
              </h2>
            </div>
            <p className="text-gray-400 text-center lg:text-left max-w-md">
              Master your skills with our comprehensive courses. Learn from industry experts and take your career to the next level.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-primary-light font-semibold mb-3">Explore</h3>
              <ul className="space-y-2">
                {navLinks.slice(0, 3).map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="hover:text-secondary-light transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-primary-light font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                {navLinks.slice(4).map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="hover:text-secondary-light transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-primary-light font-semibold mb-3">Connect</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-deep-violet/50 flex items-center justify-center hover:bg-primary-light/30 transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-400">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5c.829 0 1.5-.672 1.5-1.5s-.671-1.5-1.5-1.5zm0-5c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"/>
            </svg>
            <p>© {currentYear} Course Master. All rights reserved.</p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <a href="mailto:contact@coursemaster.com" className="hover:text-secondary-light transition-colors">
              contact@coursemaster.com
            </a>
            <span className="hidden sm:inline">•</span>
            <span>Made with ❤️ for learners</span>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Course Master is a registered trademark. All course content is property of their respective owners.</p>
        </div>
      </div>
    </footer>
  )
}