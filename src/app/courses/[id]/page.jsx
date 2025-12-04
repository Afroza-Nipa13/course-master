// app/courses/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  FaStar,
  FaUsers,
  FaClock,
  FaPlayCircle,
  FaFilePdf,
  FaLink,
  FaCheckCircle,
  FaShoppingCart,
} from "react-icons/fa";
import Image from "next/image";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchCourse();
  }, [params.id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${params.id}`
      );
      const data = await response.json();
      
      if (data.success) {
        setCourse(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch course details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    if (status === "authenticated") {
      // Redirect to payment page
      router.push(`/checkout/${params.id}`);
    } else {
      // Redirect to login
      router.push(`/login?callbackUrl=/courses/${params.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/courses")}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = course.discountedPrice || course.price;
  const hasDiscount = course.discountedPrice && course.discountedPrice < course.price;

  return (
    <div className="min-h-screen bg-base-100">
      {/* Course Hero Section */}
      <div className="bg-liner-to-r from-blue-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Course Info */}
            <div className="lg:w-2/3">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                  {course.category}
                </span>
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                  {course.level}
                </span>
                {course.isFeatured && (
                  <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                {course.title}
              </h1>
              
              <p className="text-xl mb-6 opacity-90 text-primary">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Image
                    src={course.instructor.profileImage}
                    alt={course.instructor.name}
                    className="w-12 h-12 rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-semibold text-primary">{course.instructor.name}</p>
                    <p className="text-sm opacity-80 text-primary">Instructor</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-2xl font-bold text-primary">{course.rating}</span>
                  <span className="opacity-80 text-primary">({course.totalReviews} reviews)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaUsers />
                  <span>{course.enrolledStudents.toLocaleString()} students</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/20 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Pricing Card */}
            <div className="lg:w-1/3">
              <div className="bg-white text-gray-900 rounded-xl shadow-2xl p-6">
                <div className="text-center mb-6">
                  {hasDiscount ? (
                    <div>
                      <span className="text-4xl font-bold text-gray-900">
                        ${discountedPrice}
                      </span>
                      <span className="text-xl text-gray-500 line-through ml-2">
                        ${course.price}
                      </span>
                      <div className="text-sm font-semibold text-red-600 mt-1">
                        {Math.round(((course.price - discountedPrice) / course.price) * 100)}% OFF
                      </div>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900">
                      ${course.price}
                    </span>
                  )}
                </div>
                
                <button
                  onClick={handleEnroll}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity mb-4 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Enroll Now
                </button>
                
                <p className="text-center text-gray-600 text-sm mb-6">
                  {status === "authenticated"
                    ? "Complete your enrollment"
                    : "Sign in to enroll"}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex border-b mb-8">
          {["overview", "syllabus", "resources", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* What You'll Learn */}
                {course.learningOutcomes && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">What You &apos ll Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {course.prerequisites && course.prerequisites.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {course.prerequisites.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Instructor Bio */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">Instructor</h3>
                  <div className="flex items-start gap-6">
                    <Image
                      src={course.instructor.profileImage}
                      alt={course.instructor.name}
                      className="w-24 h-24 rounded-full"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h4 className="text-xl font-bold mb-2">
                        {course.instructor.name}
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {course.instructor.bio}
                      </p>
                      {course.instructor.email && (
                        <p className="text-gray-600">
                          Email: {course.instructor.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "syllabus" && course.syllabus && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Course Syllabus</h3>
                <div className="space-y-4">
                  {course.syllabus.map((week, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-lg">
                          Week {week.week}: {week.title}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {week.topics?.length || 0} topics
                        </span>
                      </div>
                      {week.topics && week.topics.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {week.topics.map((topic, topicIndex) => (
                            <div
                              key={topicIndex}
                              className="flex items-center gap-2 text-gray-600"
                            >
                              <FaPlayCircle className="text-blue-500" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "resources" && course.resources && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Course Resources</h3>
                <div className="space-y-4">
                  {course.resources.map((resource, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        {resource.type === "video" && (
                          <FaPlayCircle className="text-red-500 text-xl" />
                        )}
                        {resource.type === "pdf" && (
                          <FaFilePdf className="text-red-500 text-xl" />
                        )}
                        {resource.type === "link" && (
                          <FaLink className="text-blue-500 text-xl" />
                        )}
                        <div>
                          <h4 className="font-bold">{resource.title}</h4>
                          <p className="text-sm text-gray-600">
                            {resource.type.toUpperCase()} Resource
                          </p>
                        </div>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto text-blue-600 hover:text-blue-800"
                        >
                          Access Resource →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Course Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-semibold">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold">{course.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-semibold">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Share Course */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Share this course</h3>
              <div className="flex gap-3">
                {["facebook", "twitter", "linkedin", "whatsapp"].map((platform) => (
                  <button
                    key={platform}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-center capitalize"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
