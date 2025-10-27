import React, { useState, useEffect, useMemo } from "react";
import ContactSection from "../Component/ContactSection";
import Data from "../DataStore/Courses.json";
import CoursesCard from "../Component/Card/CoursesCard";
import { FaSearch } from "react-icons/fa";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // 🔹 Debounce search input for smoother UX
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.toLowerCase());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 🔹 Filter courses efficiently using useMemo
  const filteredCourses = useMemo(() => {
    return Data.filter((course) =>
      course.courseDetails.toLowerCase().includes(debouncedTerm)
    );
  }, [debouncedTerm]);

  return (
    <section className="flex flex-col items-center w-full bg-white">
      {/* 🔹 Header Section */}
      <div className="relative flex flex-col items-center md:items-start w-full py-20 px-6 md:px-12 bg-[var(--primary-color)] overflow-hidden">
       

        {/* Header Content */}
        <div className="relative z-10 flex flex-col gap-4 max-w-7xl w-full text-center md:text-left text-white">
          <h1 className="font-extrabold text-3xl md:text-5xl leading-tight">
            Courses
          </h1>
          <p className=" text-sm md:text-base md:w-2/3 text-white/90">
            Explore our wide range of courses designed to help you excel in your
            career. Search and find the course that best fits your goals.
          </p>
        </div>

        {/* 🔹 Search Bar */}
        <div className="relative z-10 flex justify-center md:justify-start w-full mt-10">
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-2 shadow-md w-full max-w-md">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow outline-none text-[var(--primary-color)] placeholder:text-gray-400 text-sm md:text-base"
            />
            <FaSearch className="text-[var(--primary-color)] text-lg" />
          </div>
        </div>
      </div>

      {/* 🔹 Courses Grid */}
      <div className="w-full bg-[#EEF6FC] px-6 md:px-10 lg:px-14 py-16 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl w-full">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CoursesCard key={course.id} {...course} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full text-sm md:text-base">
              No courses found matching "{searchTerm}"
            </p>
          )}
        </div>
      </div>

      {/* 🔹 Contact Section */}
      <div className="w-full mt-20">
        <ContactSection />
      </div>
    </section>
  );
};

export default Courses;
