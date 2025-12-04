// components/CourseCard.js
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaUsers, FaClock, FaTag } from "react-icons/fa";

export default function CourseCard({ course }) {
  const discountedPrice = course.discountedPrice || course.price;
  const hasDiscount = course.discountedPrice && course.discountedPrice < course.price;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          width={400}
          height={400}
        />
        {course.isFeatured && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Sale
          </span>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Category & Level */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            {course.category}
          </span>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 line-clamp-2">
          <Link
            href={`/courses/${course._id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {course.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={course.instructor.profileImage}
            alt={course.instructor.name}
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div>
            <p className="font-semibold">{course.instructor.name}</p>
            <p className="text-sm text-gray-500">Instructor</p>
          </div>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4 text-gray-600">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold">{course.rating}</span>
            <span>({course.totalReviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers />
            <span>{course.enrolledStudents.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1"
              >
                <FaTag size={10} /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price & Enroll Button */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            {hasDiscount ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${discountedPrice}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${course.price}
                </span>
                <span className="text-sm font-semibold text-red-600">
                  {Math.round(((course.price - discountedPrice) / course.price) * 100)}% OFF
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
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
