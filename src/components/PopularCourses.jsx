// app/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { FaArrowRight, FaFire, FaChartLine, FaTrophy, FaLightbulb } from "react-icons/fa";
import Image from "next/image";

export default function PopularCourses() {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPopularCourses();
  }, []);

  const fetchPopularCourses = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Try to fetch popular courses (most enrolled + highest rated)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses?limit=6&sortBy=enrolledStudents&sortOrder=desc`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setPopularCourses(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch courses");
      }
    } catch (err) {
      console.error("Error fetching popular courses:", err);
      setError("Failed to load popular courses. Showing sample data.");
      
      // Fallback sample data
      setPopularCourses([
        {
          _id: "1",
          title: "Complete Web Development Bootcamp 2024",
          description: "Learn full-stack web development with React, Node.js, MongoDB",
          instructor: { 
            name: "Alex Johnson",
            profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          category: "Web Development",
          tags: ["javascript", "react", "nodejs", "fullstack"],
          price: 2999,
          discountedPrice: 1999,
          duration: "65 hours",
          level: "Beginner",
          imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
          enrolledStudents: 12560,
          rating: 4.8,
          totalReviews: 2540,
          isFeatured: true,
        },
        {
          _id: "2",
          title: "AI & Machine Learning Masterclass",
          description: "Master Artificial Intelligence and Machine Learning algorithms",
          instructor: { 
            name: "Dr. Sarah Chen",
            profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
          },
          category: "Machine Learning",
          tags: ["python", "ai", "tensorflow", "data-science"],
          price: 3999,
          discountedPrice: 2999,
          duration: "85 hours",
          level: "Advanced",
          imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
          enrolledStudents: 8920,
          rating: 4.9,
          totalReviews: 1920,
          isFeatured: true,
        },
        {
          _id: "3",
          title: "Mobile App Development with Flutter",
          description: "Build beautiful cross-platform mobile apps",
          instructor: { 
            name: "Mike Rodriguez",
            profileImage: "https://randomuser.me/api/portraits/men/67.jpg"
          },
          category: "Mobile Development",
          tags: ["flutter", "dart", "mobile", "ios", "android"],
          price: 2499,
          discountedPrice: 1799,
          duration: "50 hours",
          level: "Intermediate",
          imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
          enrolledStudents: 7450,
          rating: 4.7,
          totalReviews: 1320,
        },
        {
          _id: "4",
          title: "Data Science & Analytics Complete Guide",
          description: "Learn data analysis, visualization, and statistical modeling",
          instructor: { 
            name: "Emma Wilson",
            profileImage: "https://randomuser.me/api/portraits/women/65.jpg"
          },
          category: "Data Science",
          tags: ["python", "pandas", "numpy", "tableau"],
          price: 2799,
          discountedPrice: 1999,
          duration: "70 hours",
          level: "Intermediate",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
          enrolledStudents: 6320,
          rating: 4.6,
          totalReviews: 980,
          isFeatured: true,
        },
        {
          _id: "5",
          title: "Cybersecurity Professional Certification",
          description: "Become a certified cybersecurity expert",
          instructor: { 
            name: "David Kim",
            profileImage: "https://randomuser.me/api/portraits/men/22.jpg"
          },
          category: "Cybersecurity",
          tags: ["security", "ethical-hacking", "networking"],
          price: 3499,
          discountedPrice: 2499,
          duration: "90 hours",
          level: "Advanced",
          imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
          enrolledStudents: 5180,
          rating: 4.8,
          totalReviews: 760,
        },
        {
          _id: "6",
          title: "UI/UX Design & Prototyping with Figma",
          description: "Master modern UI/UX design and prototyping",
          instructor: { 
            name: "Lisa Martinez",
            profileImage: "https://randomuser.me/api/portraits/women/33.jpg"
          },
          category: "Design",
          tags: ["figma", "ui-design", "ux", "prototyping"],
          price: 1999,
          discountedPrice: 1399,
          duration: "45 hours",
          level: "Beginner",
          imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
          enrolledStudents: 8920,
          rating: 4.7,
          totalReviews: 1540,
          isFeatured: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Popular Courses Section */}
      <section className="py-16 bg-linear-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          {/* Section Header with Animation */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-4 animate-pulse">
              <FaFire className="text-xl" />
              <span className="font-bold">TRENDING NOW</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Most Popular <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Courses</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join thousands of students learning from our top-rated courses
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8 animate-shake">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="shrink-0">
                    <FaLightbulb className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Course Cards Grid with Staggered Animation */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularCourses.map((course, index) => (
                  <div 
                    key={course._id} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <AnimatedCourseCard course={course} />
                  </div>
                ))}
              </div>

              {/* View All Courses Button with Animation */}
              <div className="text-center mt-16 animate-bounce-in">
                <Link
                  href="/courses"
                  className="group relative inline-flex items-center justify-center gap-4 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Button Content */}
                  <span className="relative z-10">Explore All Courses</span>
                  <FaArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                </Link>
                <p className="text-gray-500 mt-6 animate-pulse">
                  Discover 100+ more courses waiting for you!
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-16 bg-linear-to-r from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-3xl font-bold mb-4">
              Why Students Choose Us
            </h3>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Join our growing community of successful learners
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FaChartLine className="text-4xl" />, value: "10K+", label: "Active Students", color: "from-green-400 to-emerald-600" },
              { icon: <FaTrophy className="text-4xl" />, value: "4.8★", label: "Avg. Rating", color: "from-yellow-400 to-orange-500" },
              { icon: <FaFire className="text-4xl" />, value: "200+", label: "Courses", color: "from-red-400 to-pink-600" },
              { icon: <FaLightbulb className="text-4xl" />, value: "50+", label: "Expert Instructors", color: "from-blue-400 to-purple-600" },
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-float"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-r ${stat.color} mb-4 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h3>
            <p className="text-gray-600">
              Find the perfect course for your career goals
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Web Development", color: "bg-blue-100 hover:bg-blue-200", count: "42 courses" },
              { name: "Data Science", color: "bg-green-100 hover:bg-green-200", count: "28 courses" },
              { name: "Mobile Dev", color: "bg-purple-100 hover:bg-purple-200", count: "35 courses" },
              { name: "UI/UX Design", color: "bg-pink-100 hover:bg-pink-200", count: "24 courses" },
              { name: "Cybersecurity", color: "bg-red-100 hover:bg-red-200", count: "18 courses" },
              { name: "Business", color: "bg-yellow-100 hover:bg-yellow-200", count: "31 courses" },
              { name: "Marketing", color: "bg-indigo-100 hover:bg-indigo-200", count: "22 courses" },
              { name: "Cloud & DevOps", color: "bg-cyan-100 hover:bg-cyan-200", count: "26 courses" },
            ].map((category, index) => (
              <div 
                key={index}
                className={`${category.color} p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h4 className="font-bold text-lg mb-2">{category.name}</h4>
                <p className="text-gray-600 text-sm">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Animated Course Card Component
function AnimatedCourseCard({ course }) {
  return (
    <div className="group relative">
      {/* Card with hover effects */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition-opacity duration-500"></div>
      
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
        {/* Course Image with Overlay */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {course.isFeatured && (
              <span className="bg-linear-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                ⭐ FEATURED
              </span>
            )}
            {course.discountedPrice && (
              <span className="bg-linear-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                🔥 SALE
              </span>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          {/* Category & Level */}
          <div className="flex justify-between items-center mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              {course.category}
            </span>
            <span className="text-xs text-gray-500">{course.level}</span>
          </div>

          {/* Title with Hover Effect */}
          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow">
              <Image
                src={course.instructor.profileImage}
                alt={course.instructor.name}
                className="w-full h-full object-cover"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="font-semibold text-sm">{course.instructor.name}</p>
              <p className="text-xs text-gray-500">Instructor</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="font-semibold">{course.rating}</span>
                <span className="text-gray-500">({course.totalReviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{course.enrolledStudents.toLocaleString()}+</span>
              </div>
            </div>
            <div className="text-gray-500">{course.duration}</div>
          </div>

          {/* Price & Button */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              {course.discountedPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${course.discountedPrice}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${course.price}
                  </span>
                  <span className="text-xs font-bold text-red-600">
                    {Math.round(((course.price - course.discountedPrice) / course.price) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ${course.price}
                </span>
              )}
            </div>
            <Link
              href={`/courses/${course._id}`}
              className="bg-linear-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-sm group-hover:scale-105"
            >
              Enroll Now
            </Link>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-all duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
}
