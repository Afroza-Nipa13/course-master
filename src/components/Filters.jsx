// components/Filters.js
"use client";

import { useState, useEffect } from "react";
import { FaFilter, FaTimes, FaStar, FaDollarSign, FaClock, FaUsers } from "react-icons/fa";

export default function Filters({
  categories = [],
  levels = [],
  tags = [],
  priceRange = { min: 0, max: 1000 },
  onFilterChange,
  initialFilters = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: initialFilters.category || "",
    level: initialFilters.level || "",
    minPrice: initialFilters.minPrice || priceRange.min,
    maxPrice: initialFilters.maxPrice || priceRange.max,
    tags: initialFilters.tags || [],
    rating: initialFilters.rating || 0,
    duration: initialFilters.duration || "",
    sortBy: initialFilters.sortBy || "createdAt",
    sortOrder: initialFilters.sortOrder || "desc",
  });

  // Duration options
  const durationOptions = [
    { value: "", label: "Any Duration" },
    { value: "short", label: "Short (< 10 hours)" },
    { value: "medium", label: "Medium (10-50 hours)" },
    { value: "long", label: "Long (> 50 hours)" },
  ];

  // Rating options
  const ratingOptions = [
    { value: 0, label: "Any Rating" },
    { value: 4.5, label: "4.5 & above" },
    { value: 4, label: "4.0 & above" },
    { value: 3.5, label: "3.5 & above" },
    { value: 3, label: "3.0 & above" },
  ];

  // Sort options
  const sortOptions = [
    { value: "createdAt-desc", label: "Newest First" },
    { value: "createdAt-asc", label: "Oldest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating-desc", label: "Highest Rated" },
    { value: "enrolledStudents-desc", label: "Most Popular" },
    { value: "title-asc", label: "Title: A to Z" },
    { value: "title-desc", label: "Title: Z to A" },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleTagToggle = (tag) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    handleFilterChange("tags", newTags);
  };

  const handlePriceChange = (type, value) => {
    const numValue = value === "" ? "" : Number(value);
    if (type === "min") {
      handleFilterChange("minPrice", numValue);
    } else {
      handleFilterChange("maxPrice", numValue);
    }
  };

  const handleSortChange = (value) => {
    const [sortBy, sortOrder] = value.split("-");
    handleFilterChange("sortBy", sortBy);
    handleFilterChange("sortOrder", sortOrder);
  };

  const resetFilters = () => {
    const resetFilters = {
      category: "",
      level: "",
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      tags: [],
      rating: 0,
      duration: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    };
    setFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate active filter count
  const activeFilterCount = [
    filters.category,
    filters.level,
    filters.rating > 0,
    filters.duration,
    filters.tags.length > 0,
    filters.minPrice > priceRange.min || filters.maxPrice < priceRange.max,
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <FaFilter />
        {activeFilterCount > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FaFilter /> Filters
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <FiltersContent
                filters={filters}
                categories={categories}
                levels={levels}
                tags={tags}
                priceRange={priceRange}
                durationOptions={durationOptions}
                ratingOptions={ratingOptions}
                sortOptions={sortOptions}
                onFilterChange={handleFilterChange}
                onTagToggle={handleTagToggle}
                onPriceChange={handlePriceChange}
                onSortChange={handleSortChange}
                formatPrice={formatPrice}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
          <FiltersContent
            filters={filters}
            categories={categories}
            levels={levels}
            tags={tags}
            priceRange={priceRange}
            durationOptions={durationOptions}
            ratingOptions={ratingOptions}
            sortOptions={sortOptions}
            onFilterChange={handleFilterChange}
            onTagToggle={handleTagToggle}
            onPriceChange={handlePriceChange}
            onSortChange={handleSortChange}
            formatPrice={formatPrice}
            resetFilters={resetFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>
      </div>
    </>
  );
}

// Reusable Filters Content Component
function FiltersContent({
  filters,
  categories,
  levels,
  tags,
  priceRange,
  durationOptions,
  ratingOptions,
  sortOptions,
  onFilterChange,
  onTagToggle,
  onPriceChange,
  onSortChange,
  formatPrice,
  resetFilters,
  activeFilterCount,
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaFilter /> Filters
          {activeFilterCount > 0 && (
            <span className="bg-blue-100 text-blue-600 text-sm rounded-full px-2 py-1">
              {activeFilterCount} active
            </span>
          )}
        </h2>
        {resetFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Sort By</h3>
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Level Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Level</h3>
        <div className="space-y-2">
          {levels.map((level) => (
            <label
              key={level}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
            >
              <input
                type="radio"
                name="level"
                value={level}
                checked={filters.level === level}
                onChange={(e) => onFilterChange("level", e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="flex-1">{level}</span>
              {filters.level === level && (
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </label>
          ))}
          <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
            <input
              type="radio"
              name="level"
              value=""
              checked={filters.level === ""}
              onChange={(e) => onFilterChange("level", e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="flex-1">All Levels</span>
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <FaDollarSign /> Price Range
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Min: {formatPrice(filters.minPrice)}</span>
            <span>Max: {formatPrice(filters.maxPrice)}</span>
          </div>
          <div className="flex gap-3">
            <input
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.minPrice}
              onChange={(e) => onPriceChange("min", e.target.value)}
              placeholder="Min"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.maxPrice}
              onChange={(e) => onPriceChange("max", e.target.value)}
              placeholder="Max"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="pt-2">
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={10}
              value={filters.maxPrice}
              onChange={(e) => onPriceChange("max", e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <FaStar /> Rating
        </h3>
        <div className="space-y-2">
          {ratingOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                value={option.value}
                checked={filters.rating === option.value}
                onChange={(e) => onFilterChange("rating", Number(e.target.value))}
                className="w-4 h-4 text-blue-600"
              />
              <div className="flex items-center gap-2 flex-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < Math.floor(option.value)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      size={14}
                    />
                  ))}
                </div>
                <span className="text-sm">{option.label}</span>
              </div>
              {filters.rating === option.value && (
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <FaClock /> Duration
        </h3>
        <select
          value={filters.duration}
          onChange={(e) => onFilterChange("duration", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {durationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tags Filter */}
      {tags.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-700">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  filters.tags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {tags.length > 10 && (
            <p className="text-sm text-gray-500 mt-2">
              +{tags.length - 10} more tags
            </p>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-800">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Category: {filters.category}
              </span>
            )}
            {filters.level && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Level: {filters.level}
              </span>
            )}
            {filters.rating > 0 && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Rating: {filters.rating}+
              </span>
            )}
            {filters.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Apply Button (for mobile) */}
      {!resetFilters && (
        <button
          onClick={() => {
            // This would close the mobile filter
            if (typeof window !== "undefined" && window.innerWidth < 1024) {
              document.dispatchEvent(new CustomEvent("closeMobileFilters"));
            }
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-4"
        >
          Apply Filters
        </button>
      )}
    </>
  );
}