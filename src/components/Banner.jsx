"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Banner() {
  // Rotating text sets
  const titles = [
    "Master Your Skills with CourseMaster",
    "Learn Anything, Anytime, Anywhere",
    "Upgrade Your Career with Expert Courses",
  ];

  const subtitles = [
    "Join thousands of learners growing their careers every day.",
    "Explore top-quality courses crafted by real industry experts.",
    "Track your learning progress and achieve your goals faster.",
  ];

  const [index, setIndex] = useState(0);

  // Auto change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero min-h-[600px]"
      style={{
        backgroundImage:
          "url(https://plus.unsplash.com/premium_photo-1674811564431-4be5bd37fb6a?w=1200&auto=format&fit=crop&q=60)",
      }}
    >
      <div className="hero-overlay bg-black/40"></div>

      <div className="hero-content flex-col lg:flex-row-reverse z-10">
        <Image
          src="/itStudent.png"
          alt="IT Student"
          className="max-w-sm rounded-lg shadow-2xl"
          width={800}
          height={400}
          priority
        />

        <div className="space-y-4 text-white lg:w-1/2">
          {/* ANIMATED TITLE */}
          <h1 className="text-5xl font-bold transition-opacity duration-700 animate-fadeIn">
            {titles[index].replace("CourseMaster", "")}
            <span className="text-primary">
              {titles[index].includes("CourseMaster") ? "CourseMaster" : ""}
            </span>
          </h1>

          {/* ANIMATED SUBTITLE */}
          <p className="py-6 text-lg transition-opacity duration-700 animate-fadeIn">
            {subtitles[index]}
          </p>

          <button className="btn btn-primary">Start Learning</button>
        </div>
      </div>
    </div>
  );
}
