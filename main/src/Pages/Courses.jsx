import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import ContactSection from "../Component/ContactSection";
import Data from "../DataStore/Courses.json";
import CoursesCard from "../Component/Card/CoursesCard";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Debounce search input for smoother UX
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.toLowerCase());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  //  Memoized filtering for performance
  const filteredCourses = useMemo(() => {
    return Data.filter((course) =>
      course.courseDetails.toLowerCase().includes(debouncedTerm)
    );
  }, [debouncedTerm]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <main className="flex flex-col items-center w-full bg-white">
      {/*  Header Section */}
      <section className="relative flex flex-col items-center md:items-start w-full py-20 px-6 md:px-12 bg-gradient-to-r from-[var(--primary-color)] to-blue-800 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-cover bg-center"></div>

        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col gap-4 max-w-7xl w-full text-center md:text-left text-white"
        >
          <h1 className="font-extrabold text-4xl md:text-5xl leading-tight">
            Explore Our Courses
          </h1>
          <p className="text-sm md:text-base md:w-2/3 text-white/90">
            Build your future with India’s most trusted learning platform.  
            Explore, learn, and achieve excellence with our curated programs.
          </p>
        </motion.div>

        {/*  Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex justify-center md:justify-start w-full mt-10"
        >
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-2 shadow-lg w-full max-w-md hover:shadow-xl transition-all duration-300">
            <FaSearch className="text-[var(--primary-color)] text-lg" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow outline-none text-[var(--primary-color)] placeholder:text-gray-400 text-sm md:text-base bg-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/*  Courses Grid */}
      <section className="w-full bg-[#EEF6FC] px-6 md:px-10 lg:px-14 py-16 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl w-full">
          <AnimatePresence>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CoursesCard {...course} />
                </motion.div>
              ))
            ) : (
              <motion.p
                key="no-result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 col-span-full text-sm md:text-base"
              >
                No courses found matching "<span className="font-semibold">{searchTerm}</span>"
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/*  Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full py-8"
      >
        <ContactSection />
      </motion.section>
    </main>
  );
};

export default Courses;
