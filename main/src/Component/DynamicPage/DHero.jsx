import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

const DHero = ({
  title,
  image,
  bgLeft = "/Ellipse2.svg",
  bgRight = "/Ellipse1.svg",
  onEnroll,
  badges = [],
}) => {
  return (
    <section className="relative h-auto md:h-[70vh] w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 bg-blue-50 overflow-hidden">
      {/* Left Background Shape */}
      <div
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{
          backgroundImage: `url(${bgLeft})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left top",
        }}
      />

      {/* Right Background Shape */}
      <div
        className="absolute top-0 right-0 w-full h-full -z-10"
        style={{
          backgroundImage: `url(${bgRight})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "right center",
        }}
      />

      {/* Left Section */}
      <div className="z-10 flex flex-col gap-6 max-w-2xl text-left">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--primary-color)] text-white"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-[var(--primary-color)] leading-snug">
          {title}
        </h1>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onEnroll}
            className="flex items-center gap-3 px-6 py-3 bg-[var(--primary-color)] text-white rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Enroll Now
            <span className="p-2 rounded-full bg-white text-black">
              <FaArrowRightLong />
            </span>
          </button>

          <button className="p-3 rounded-full bg-black text-white hover:scale-110 transition-transform">
            <CiHeart className="text-xl" />
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="z-10 w-full md:w-[40%] flex justify-center items-center mt-10 md:mt-0">
        <img
          src={image}
          alt="Course Visual"
          className="w-full max-w-md object-contain drop-shadow-xl"
        />
      </div>

      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-20 pointer-events-none" />
    </section>
  );
};

export default DHero;
