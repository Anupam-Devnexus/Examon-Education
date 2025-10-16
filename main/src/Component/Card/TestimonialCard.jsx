import React from "react";
import { CiStar } from "react-icons/ci";
import { FaUserLarge } from "react-icons/fa6";

const TestimonialCard = ({ img, name, exam, date, star = 5, review }) => {
  return (
    <div className="relative bg-[#003E68] text-white rounded-xl p-6 flex flex-col justify-between gap-4 shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full max-w-md h-72 mx-auto">
      
      {/* Decorative Circles (optional) */}
      <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#3498DB] rounded-full opacity-30 z-0"></div>
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#3498DB] rounded-full opacity-20 z-0"></div>

      {/* ---------- Top: Avatar + Rating ---------- */}
      <div className="flex items-center justify-between z-10 relative">
        {img ? (
          <img
            src={img}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
        ) : (
          <FaUserLarge className="w-12 h-12 text-white" />
        )}

        <div className="flex gap-1">
          {Array.from({ length: star }).map((_, i) => (
            <CiStar key={i} className="w-5 h-5 text-white" />
          ))}
        </div>
      </div>

      {/* ---------- Review Text ---------- */}
      <div className="flex flex-col gap-2 z-10 relative">
        <img src="/double.svg" alt="quote" className="w-6 h-6" />
        <p className="text-sm md:text-base italic leading-relaxed">
          {review ||
            "Lorem ipsum dolor sit amet consectetur adipiscing lectus a nunc mauris scelerisque sed egestas blandit erat quis pharetra eros pharetra blandit."}
        </p>
      </div>

      {/* ---------- Footer: Info ---------- */}
      <div className="border-l-2 border-white/30 pl-3 flex flex-col gap-1 z-10 relative">
        <span className="font-semibold text-lg">{name || "Vansh Kaushik"}</span>
        <span className="text-sm">{exam || "SGC Goa"}</span>
        <span className="text-xs">{date || "Sep 15, 2023"}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
