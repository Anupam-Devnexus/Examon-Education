import React, { useState, useEffect, useRef, useCallback } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Examon Education",
    desc: "Examon Education provides comprehensive learning resources to help students excel in their academic pursuits. Learn smart, grow faster.",
    image:
      "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1760590838/Picture1_jf6uek.png",
    enrollNow: "/enroll-now",
    courses: "/courses",
  },
  {
    title: "Examon 2.0 – Smarter Learning",
    desc: "Experience a new way of learning with interactive lessons and progress tracking. Tailored for your success.",
    image:
      "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1760590838/Picture9_khn89v.png",
    enrollNow: "/enroll-now",
    courses: "/courses",
  },
  {
    title: "Achieve More with Examon",
    desc: "Unlock your academic potential with our expert-designed courses and personalized support.",
    image:
      "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1760590837/Picture7_pt4oyf.png",
    enrollNow: "/enroll-now",
    courses: "/courses",
  },
];

const HomeSlider = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 2500);

    return () => resetTimeout();
  }, [current]);

  const nextSlide = useCallback(() => {
    resetTimeout();
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    resetTimeout();
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const handleNavigate = useCallback(
    (path) => navigate(path),
    [navigate]
  );

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  const Slide = ({ slide, isActive }) => (
    <div
      className={`absolute inset-0 transition-all duration-700 ease-in-out transform  ${isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
        }`}
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-center rounded-xl"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start  p-6 md:p-10 text-white rounded-2xl">
        <h2 className="text-2xl ml-12 sm:text-3xl md:text-5xl font-bold mb-4">
          {slide.title}
        </h2>
        <p className="max-w-full ml-12 sm:max-w-2xl mb-6 text-base sm:text-lg">
          {slide.desc}
        </p>
        <div className="flex gap-3 ml-12  sm:gap-4 flex-wrap">
          <button
            onClick={() => handleNavigate(slide.enrollNow)}
            className="bg-[var(--primary-color)] cursor-pointer hover:bg-[var(--text-color)] transition-all duration-300 text-white px-4 sm:px-6 py-2 rounded-full font-semibold"
          >
            Enroll Now
          </button>
          <button
            onClick={() => handleNavigate(slide.courses)}
            className="border-2 border-white cursor-pointer hover:bg-white hover:text-black transition-all duration-300 px-4 sm:px-6 py-2 rounded-full font-semibold"
          >
            View Courses
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] overflow-hidden rounded-2xl shadow-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <Slide key={index} slide={slide} isActive={index === current} />
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute  top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white/60 text-black rounded-full p-2 sm:p-3 transition z-20"
      >
        <MdNavigateBefore size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute     right-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white/60 text-black rounded-full p-2 sm:p-3 transition z-20"
      >
        <MdNavigateNext size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-5 w-full flex justify-center gap-2 sm:gap-3 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${current === index ? "bg-white scale-125" : "bg-gray-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
