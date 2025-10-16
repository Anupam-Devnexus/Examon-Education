import React, { useState, useEffect, useMemo } from 'react';
import ContactSection from '../Component/ContactSection';
import Data from "../DataStore/Courses.json";
import CoursesCard from '../Component/Card/CoursesCard';
import { FaSearch } from "react-icons/fa";

const Courses = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');

    // Debounce logic
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm.toLowerCase());
        }, 300); // 300ms debounce

        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Filtered courses
    const filteredCourses = useMemo(() => {
        return Data.filter(course =>
            course.courseDetails.toLowerCase().includes(debouncedTerm)
        );
    }, [debouncedTerm]);

    return (
        <section className="py-16 flex flex-col items-center w-full">
            {/* Header Section */}
            <div className="flex flex-col gap-4 px-6 text-center md:text-left max-w-7xl w-full">
                <h1 className="font-extrabold text-3xl md:text-5xl text-[var(--primary-color)]">
                    Courses
                </h1>
                <p className="text-[var(--text-color)] text-sm md:text-base md:w-2/3">
                    Explore our wide range of courses designed to help you excel in your career.
                    Search and find the course that best fits your needs.
                </p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center md:justify-start w-full px-6 md:px-14 mt-8">
                <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-2 shadow-md w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by Courses"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow outline-none text-[var(--primary-color)] placeholder:text-[var(--text-color)]"
                    />
                    <FaSearch className="text-[var(--primary-color)]" />
                </div>
            </div>

            {/* Courses Grid */}
            <div className="w-full bg-[#EEF6FC] mt-12 px-6 md:px-14 py-12 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <CoursesCard key={course.id} {...course} />
                        ))
                    ) : (
                        <p className="text-center text-[var(--text-color)] col-span-full">
                            No courses found matching "{searchTerm}"
                        </p>
                    )}
                </div>
            </div>

            {/* Contact Section */}
            <div className="w-full mt-16">
                <ContactSection />
            </div>
        </section>
    );
};

export default Courses;
