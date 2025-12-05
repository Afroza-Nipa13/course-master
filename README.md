Course Master Frontend


Overview
CourseMaster is a modern, responsive E-learning platform frontend built with Next.js 14 (App Router), TypeScript, and Redux Toolkit. The application provides an intuitive interface for students to browse, enroll in, and consume courses, while offering administrators robust tools for course management.


Features
🎓 Course Browsing: Server-side pagination, filtering, and searching

🔐 Authentication: JWT-based login/registration with persistent sessions

📱 Responsive Design: Mobile-first approach with Tailwind CSS

📊 Student Dashboard: Progress tracking, enrolled courses, assignments

🎥 Course Player: Video lectures with progress tracking

📝 Assignments & Quizzes: Interactive submission and grading

👑 Admin Panel: Course CRUD, enrollment management, analytics

🌙 Dark/Light Mode: Theme toggle support

Tech Stack
Framework: Next.js 14 (App Router)

Language: TypeScript

Styling: Tailwind CSS

State Management: Redux Toolkit

Forms: React Hook Form with Zod validation

Charts: Recharts (for analytics)

Icons: Lucide React

HTTP Client: Axios with interceptors


Project Structure

text

src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── student/       # Student dashboard
│   │   └── admin/         # Admin dashboard
│   ├── courses/           # Course listing and details
│   ├── api/               # Next.js API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── common/            # Button, Input, Modal, etc.
│   ├── courses/           # CourseCard, CourseFilters, etc.
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/            # Header, Footer, Sidebar
│   └── ui/                # UI primitives
├── lib/                   # Utility functions
│   ├── api/              # Axios configuration
│   ├── auth/             # Authentication helpers
│   ├── constants/        # App constants
│   └── utils/            # Helper functions
├── store/                # Redux store
│   ├── slices/           # Redux slices
│   └── store.ts          # Store configuration
├── types/                # TypeScript interfaces
└── styles/              # Global styles
Getting Started
Prerequisites
Node.js 18+

npm or yarn

Backend server running (see backend README)