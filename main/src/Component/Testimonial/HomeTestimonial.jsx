import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import TestimonialCard from "../Card/TestimonialCard";
import Data from "../../DataStore/testimonial.json";

const HomeTestimonial = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [pageIndex, setPageIndex] = useState(0);

  // Responsive card count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const totalPages = Math.ceil(Data.length / visibleCount);

  const handlePrev = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const handleNext = () => {
    if (pageIndex < totalPages - 1) setPageIndex(pageIndex + 1);
  };

  const currentItems = Data.slice(
    pageIndex * visibleCount,
    pageIndex * visibleCount + visibleCount
  );

  return (
    <section className="w-full py-10 md:py-16 px-4 md:px-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center bg-[var(--primary-color)] rounded-t-xl">
        <div className="w-full md:w-1/2 p-6 space-y-2">
          <span className="text-white font-semibold text-sm md:text-base tracking-wide">
            OUR REVIEWS
          </span>
          <h2 className="text-white text-2xl md:text-4xl font-bold">
            What Our Students Say
          </h2>
        </div>

        <div className="w-full md:w-1/2 h-[20vh] flex justify-end items-center bg-white p-4 rounded-bl-2xl space-x-3">
          <button
            onClick={handlePrev}
            disabled={pageIndex === 0}
            className={`p-3 rounded-full bg-[var(--primary-color)] text-white hover:scale-110 transition-transform duration-200 shadow-md ${
              pageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Previous testimonials"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={pageIndex === totalPages - 1}
            className={`p-3 rounded-full bg-[var(--primary-color)] text-white hover:scale-110 transition-transform duration-200 shadow-md ${
              pageIndex === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Next testimonials"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="w-full bg-[var(--primary-color)] p-6 rounded-b-xl grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {currentItems.map((item, index) => (
          <TestimonialCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default HomeTestimonial;
