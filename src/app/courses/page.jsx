// app/courses/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CourseCard from "@/components/CourseCard";

import Pagination from "@/components/Pagination";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

export default function CoursesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({});
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get("level") || "");
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "desc");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [showFilters, setShowFilters] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      
      // Build query string
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedLevel && { level: selectedLevel }),
        ...(priceRange.min && { minPrice: priceRange.min }),
        ...(priceRange.max && { maxPrice: priceRange.max }),
        sortBy,
        sortOrder,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses?${params}`
      );
      
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.data);
        setPagination(data.pagination);
        setFilters(data.filters);
        
        // Update URL without page reload
        router.push(`/courses?${params}`, { scroll: false });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch courses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentPage, sortBy, sortOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCourses();
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedLevel("");
    setPriceRange({ min: "", max: "" });
    setSortBy("createdAt");
    setSortOrder("desc");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-xl mb-8">Learn from industry experts with hands-on projects</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses by title, instructor, or keyword..."
                className="w-full px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
              >
                <FaSearch />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FaFilter /> Filters
                </h2>
                <button
                  onClick={handleResetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Category</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">All Categories</option>
                  {filters.categories?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Level</h3>
                <select
                  value={selectedLevel}
                  onChange={(e) => {
                    setSelectedLevel(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">All Levels</option>
                  {filters.levels?.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: e.target.value })
                    }
                    className="w-1/2 p-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: e.target.value })
                    }
                    className="w-1/2 p-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FaSortAmountDown /> Sort By
                </h3>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sortByValue, sortOrderValue] = e.target.value.split("-");
                    setSortBy(sortByValue);
                    setSortOrder(sortOrderValue);
                  }}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="enrolledStudents-desc">Most Popular</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setCurrentPage(1);
                  fetchCourses();
                }}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Course Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {searchTerm ? `Results for "${searchTerm}"` : "All Courses"}
                </h2>
                <p className="text-gray-600">
                  Showing {courses.length} of {pagination.total} courses
                </p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-gray-200 p-3 rounded-lg"
              >
                <FaFilter />
              </button>
            </div>

            {/* Course Grid */}
            {courses.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}