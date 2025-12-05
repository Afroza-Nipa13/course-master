// app/about/page.js
"use client";

import { useState } from "react";
import { 
  FaGraduationCap, 
  FaChalkboardTeacher, 
  FaUsers, 
  FaAward, 
  FaGlobe,
  FaHeart,
  FaRocket,
  FaLightbulb,
  FaHandshake,
  FaCheckCircle,
  FaMobileAlt
} from "react-icons/fa";
import { 
  FaChartLine, 
  FaStar, 
  FaTrophy
} from "react-icons/fa6";
import Image from "next/image";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission");

  const stats = [
    { value: "50,000+", label: "Students Enrolled", icon: FaUsers },
    { value: "500+", label: "Expert Instructors", icon: FaChalkboardTeacher },
    { value: "2,000+", label: "Courses Available", icon: FaGraduationCap },
    { value: "98%", label: "Satisfaction Rate", icon: FaStar },
    { value: "30+", label: "Countries Reached", icon: FaGlobe },
    { value: "24/7", label: "Learning Support", icon: FaMobileAlt },
  ];

  const values = [
    {
      title: "Excellence in Education",
      description: "We maintain the highest standards in course content and instructional quality.",
      icon: FaAward,
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Innovation & Creativity",
      description: "Constantly evolving our platform with cutting-edge teaching methodologies.",
      icon: FaLightbulb,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Student Success",
      description: "Our primary goal is the success and growth of every student.",
      icon: FaTrophy,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Community Building",
      description: "Fostering a supportive learning community where everyone thrives.",
      icon: FaHandshake,
      color: "from-pink-500 to-red-500",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      bio: "Former Stanford professor with 15+ years in educational technology.",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Tech visionary with expertise in scalable learning platforms.",
    },
    {
      name: "Priya Sharma",
      role: "Head of Curriculum",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      bio: "Curriculum design expert with a passion for accessible education.",
    },
    {
      name: "David Wilson",
      role: "Student Success Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Dedicated to ensuring every student achieves their learning goals.",
    },
  ];

  const milestones = [
    { year: "2018", event: "CourseMaster Founded", description: "Started with 10 courses and 500 students" },
    { year: "2019", event: "Mobile App Launch", description: "Expanded learning to mobile devices" },
    { year: "2020", event: "Global Expansion", description: "Reached students in 50+ countries" },
    { year: "2021", event: "AI Integration", description: "Implemented personalized learning paths" },
    { year: "2022", event: "Enterprise Solutions", description: "Launched corporate training programs" },
    { year: "2023", event: "5 Million Students", description: "Milestone achievement in student enrollment" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transforming Education,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
              One Student at a Time
            </span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-10">
            We&apos;re on a mission to make quality education accessible, engaging, 
            and effective for everyone, everywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
              Start Learning Free
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Meet Our Team
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-4">
                  <stat.icon className="text-2xl" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4 mb-12">
            {["mission", "vision", "story"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full font-bold text-lg capitalize transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === "mission" && (
              <div className="text-center">
                <FaRocket className="text-6xl text-blue-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-xl text-gray-700 mb-6">
                  To democratize education by providing affordable, high-quality 
                  learning experiences that empower individuals to achieve their 
                  personal and professional goals.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="p-6 bg-blue-50 rounded-xl">
                    <FaHeart className="text-4xl text-red-500 mb-4" />
                    <h4 className="text-xl font-bold mb-3">Passion for Learning</h4>
                    <p>We believe everyone deserves access to quality education regardless of background.</p>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-xl">
                    <FaChartLine className="text-4xl text-purple-500 mb-4" />
                    <h4 className="text-xl font-bold mb-3">Continuous Innovation</h4>
                    <p>We constantly evolve our platform to provide the best learning experience.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="text-center">
                <FaLightbulb className="text-6xl text-yellow-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                <p className="text-xl text-gray-700 mb-6">
                  To become the world&apos;s leading platform for lifelong learning, 
                  where anyone, anywhere can develop the skills needed for the 
                  jobs of today and tomorrow.
                </p>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-xl mt-12">
                  <h4 className="text-2xl font-bold mb-4">Future Goals</h4>
                  <ul className="space-y-4 text-left">
                    <li className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500" />
                      <span>Reach 1 million active learners by 2025</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500" />
                      <span>Expand course offerings to 100+ emerging technologies</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-500" />
                      <span>Establish partnerships with top universities worldwide</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "story" && (
              <div className="text-center">
                <FaGraduationCap className="text-6xl text-green-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-6">Our Story</h3>
                <p className="text-xl text-gray-700 mb-6">
                  Founded in 2018 by a group of educators and technologists, 
                  CourseMaster began as a small startup with a big dream: to 
                  transform how people learn online.
                </p>
                <div className="mt-12">
                  <h4 className="text-2xl font-bold mb-6">Our Journey</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                        <h5 className="font-bold mb-2">{milestone.event}</h5>
                        <p className="text-gray-600 text-sm">{milestone.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            These principles guide everything we do at CourseMaster
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${value.color} text-white mb-6`}>
                  <value.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Meet Our Leadership</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            The passionate team behind CourseMaster&apos;s success
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-gray-200 group-hover:ring-blue-500 transition-all">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={192}
                    height={192}
                    className="object-cover group-hover:scale-110 transition-transform duration-300 w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <div className="text-blue-600 font-semibold mb-3">{member.role}</div>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Learning Community</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Be part of a global movement transforming education and empowering 
            millions of learners worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
              Explore Courses
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Career Opportunities
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}