"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Banner() {
  const titles = ["Master Your Skills with CourseMaster", "Learn Anything, Anytime, Anywhere"];
  const subtitles = ["Join thousands of learners growing their careers.", "Explore top-quality courses."];
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero min-h-screen bg-lineargradient-to-r from-deep-blue/90 to-deep-violet/90">
      <div className="hero-content flex-col lg:flex-row-reverse mt-5">
        <Image
          src="/itStudent.png"
          alt="Student"
          className="max-w-lg "
          width={500}
          height={500}
          priority
        />
        <div className="max-w-sm lg:max-w-xl">
          <h1 className="text-5xl font-bold text-primary">
            {titles[index]}
          </h1>
          <p className="py-6 text-secondary">
            {subtitles[index]}
          </p>
          <button className="btn btn-primary btn-lg">Get Started</button>
        </div>
      </div>
    </div>
  );
}