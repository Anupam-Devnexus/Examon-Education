import React from "react";
import { motion } from "framer-motion";
import { FaMedal, FaTrophy, FaCalendarAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const ProfileQuizCard = ({ examName, year, result, score, rank, onView }) => {
  const resultIcon = result === "Passed" ? "/passed.svg" : "/fail.svg";
  const resultAlt = result === "Passed" ? "Passed Badge" : "Failed Badge";

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className="relative flex flex-col justify-between 
                 bg-gradient-to-b from-[#EAF5FF] to-[#FFFFFF]
                 border border-gray-200 shadow-sm hover:shadow-lg
                 rounded-2xl overflow-hidden 
                 w-[240px] sm:w-[280px] 
                 transition-all duration-300"
    >
      {/* Card Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Exam Title */}
        <h3 className="text-base font-semibold text-gray-800 leading-tight truncate">
          {examName || "Untitled Exam"}
        </h3>

        <div className="flex items-center justify-between">
          {/* Year */}
          {year && (
            <div className="flex items-center text-gray-500 text-sm gap-2">
              <FaCalendarAlt size={13} />
              <span>{year}</span>
            </div>
          )}

          {/* Result Badge */}
          {result && (
            <img
              src={resultIcon}
              alt={resultAlt}
              className="w-14 h-14 object-contain pointer-events-none select-none"
              loading="lazy"
            />
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Score & Rank */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <FaTrophy className="text-yellow-500" />
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Score:</span> {score ?? "--"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaMedal className="text-blue-500" />
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Rank:</span> {rank ?? "--"}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="flex bg-[var(--primary-color)] p-2 items-center justify-center mx-0 w-full">

      <button
        onClick={onView}
        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm 
                   font-medium tracking-wide py-2 rounded-xl cursor-pointer hover:from-blue-700 hover:to-blue-600 
                   transition w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        View Details
      </button>
      </div>
    </motion.div>
  );
};

ProfileQuizCard.propTypes = {
  examName: PropTypes.string,
  year: PropTypes.string,
  result: PropTypes.oneOf(["Passed", "Failed"]),
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onView: PropTypes.func,
};

export default React.memo(ProfileQuizCard);
