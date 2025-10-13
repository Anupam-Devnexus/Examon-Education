import React, { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import TestimonialCard from "../Card/TestimonialCard";
import Data from "../../DataStore/testimonial.json";

const HomeTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef(null);

  // Update visible count based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Duplicate items for seamless infinite scroll
  const extendedData = [
    ...Data.slice(-visibleCount), // last few items at start
    ...Data,
    ...Data.slice(0, visibleCount), // first few items at end
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // Handle seamless reset after transition
  useEffect(() => {
    if (!isTransitioning) return;
    const transitionEnd = () => {
      if (currentIndex < 0) {
        setIsTransitioning(false);
        setCurrentIndex(Data.length - 1);
      } else if (currentIndex >= Data.length) {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }
    };

    const carouselNode = carouselRef.current;
    carouselNode.addEventListener("transitionend", transitionEnd);

    return () => {
      carouselNode.removeEventListener("transitionend", transitionEnd);
    };
  }, [currentIndex, Data.length, isTransitioning]);

  // Re-enable transition after jump
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const translateX = -(currentIndex + visibleCount) * (100 / extendedData.length);

  return (
    <section className="flex flex-col items-center w-full py-10 md:py-16 px-4 md:px-10 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full bg-[var(--primary-color)] rounded-t-xl">
        <div className="w-full md:w-1/2 p-6 flex flex-col gap-2">
          <span className="text-white font-semibold text-sm md:text-base tracking-wide">
            OUR REVIEWS
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            What Our Students Say
          </h2>
        </div>

        <div className="w-full md:w-1/2 h-[20vh] flex items-center justify-end bg-white p-4 rounded-bl-2xl gap-3">
          <button
            onClick={handlePrev}
            className="bg-[var(--primary-color)] text-white rounded-full p-3 hover:scale-110 transition-transform duration-200 shadow-md"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-[var(--primary-color)] text-white rounded-full p-3 hover:scale-110 transition-transform duration-200 shadow-md"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full bg-[var(--primary-color)] p-3 overflow-hidden rounded-b-xl">
        <div
          ref={carouselRef}
          className={`flex ${isTransitioning ? "transition-transform duration-500" : ""}`}
          style={{
            width: `${(extendedData.length * 100) / visibleCount}%`,
            transform: `translateX(${translateX}%)`,
          }}
        >
          {extendedData.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / extendedData.length}%` }}
            >
              <TestimonialCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonial;
