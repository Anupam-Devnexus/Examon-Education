import React from "react";
import { motion } from "framer-motion";
import { FaMedal, FaTrophy, FaCalendarAlt } from "react-icons/fa";

const ProfileQuizCard = ({ examName, year, result, score, rank }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative flex flex-col justify-between bg-white border border-gray-200 
                 shadow-sm hover:shadow-lg rounded-2xl overflow-hidden 
                 w-[240px] sm:w-[280px] transition-all duration-300"
    >
      {/* Result Badge */}
      {result && (
        <img
          src={result === "Passed" ? "/passed.svg" : "/fail.svg"}
          alt={result}
          className="absolute top-2 right-2 w-16 h-16 pointer-events-none"
        />
      )}

      {/* Card Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Exam Title */}
        <h3 className="text-base font-semibold text-gray-800 leading-tight">
          {examName}
        </h3>

        {/* Year */}
        {year && (
          <div className="flex items-center text-gray-500 text-sm gap-2">
            <FaCalendarAlt size={13} />
            <span>{year}</span>
          </div>
        )}

        {/* Divider */}
        <div className="h-[1px] w-full bg-gray-200"></div>

        {/* Score & Rank */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <FaTrophy className="text-yellow-500" />
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Score:</span> {score}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaMedal className="text-blue-500" />
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Rank:</span> {rank}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-center py-2 cursor-pointer hover:from-blue-700 hover:to-blue-600 transition">
        <button className="text-white text-sm font-medium tracking-wide">
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileQuizCard;
