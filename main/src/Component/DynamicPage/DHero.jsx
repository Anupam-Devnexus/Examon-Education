import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

const DHero = ({
  title,
  image,
  bgLeft = "/Ellipse2.svg",
  bgRight = "/Ellipse1.svg",
  onEnroll,
  badges = ["/ssc.svg"],
  date = "OCT 30th, 2025",
  time = "5:00 PM",
}) => {
  return (
    <section
      className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-10 bg-blue-50 md:h-[75vh] overflow-hidden"
      style={{
        background: "url('/dynamicbg.svg') no-repeat center/cover",
      }}
    >
      {/* ===== Background Shapes ===== */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${bgLeft}), url(${bgRight})`,
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "cover, contain",
          backgroundPosition: "left top, right center",
        }}
      />

      {/* ===== Left Content ===== */}
      <div className="z-10 flex flex-col gap-6 max-w-3xl">
        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, i) => (
              <img key={i} src={badge} alt={`badge-${i}`} className="h-10" />
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--primary-color)] leading-snug drop-shadow-sm">
          {title}
        </h1>

        {/* Date & Time Info */}
        <div className="flex flex-col gap-3">
          {[
            { label: "DATE", value: date },
            { label: "TIME", value: time },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-[#0071BD] shadow-lg p-2 rounded-md"
              style={{
                clipPath: "polygon(0 0, 90% 0, 100% 100%, 0% 100%)",
              }}
            >
              <span className="bg-white px-4 py-2 text-[var(--primary-color)] font-semibold">
                {label}
              </span>
              <span className="text-white font-medium">{value}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={onEnroll}
            className="flex items-center gap-3 px-6 py-3 bg-[var(--primary-color)] text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-md"
          >
            Enroll Now
            <span className="p-2 rounded-full bg-white text-[var(--primary-color)]">
              <FaArrowRightLong />
            </span>
          </button>

          <button className="p-3 rounded-full bg-black text-white hover:scale-110 transition-transform shadow-md">
            <CiHeart className="text-xl" />
          </button>
        </div>
      </div>

      {/* ===== Right Image ===== */}
      <div className="z-10 w-full md:w-[40%] flex justify-center items-center mt-10 md:mt-0">
        <img
          src={image}
          alt="Course Visual"
          className="w-full max-w-md object-contain drop-shadow-3xl"
          loading="lazy"
        />
      </div>

      {/* ===== Subtle Overlay ===== */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-10 pointer-events-none" />
    </section>
  );
};

export default DHero;
