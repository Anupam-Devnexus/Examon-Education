import React from "react";
import { CiStar } from "react-icons/ci";
import { FaUserLarge } from "react-icons/fa6";

const TestimonialCard = ({ img, name, exam, date, star = 5, review }) => {
  return (
    <div className="bg-white rounded-xl p-6 flex flex-col justify-between gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      
      {/* ---------- Top: Avatar + Rating ---------- */}
      <div className="flex items-center justify-between w-full">
        {img ? (
          <img
            src={img}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <FaUserLarge className="w-12 h-12 text-gray-400" />
        )}

        <div className="flex gap-1">
          {Array.from({ length: star }).map((_, i) => (
            <CiStar key={i} className="text-yellow-400 w-5 h-5" />
          ))}
        </div>
      </div>

      {/* ---------- Review Text ---------- */}
      <div className="flex flex-col gap-2">
        <img src="/double.svg" alt="quote" className="w-6 h-6" />
        <p className="text-gray-700 text-sm md:text-base italic leading-relaxed">
          {review ||
            "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. A nunc mauris scelerisque sed egestas pharetra, quis pharetra arcu blandit.”"}
        </p>
      </div>

      {/* ---------- Footer: Info ---------- */}
      <div className="border-l-2 border-gray-900 pl-3 flex flex-col gap-1">
        <span className="font-semibold text-lg text-gray-900">
          {name || "Vansh Kaushik"}
        </span>
        <span className="text-gray-500 text-sm">{exam || "UPSC 2023"}</span>
        <span className="text-gray-400 text-xs">{date || "31/12/2023"}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
