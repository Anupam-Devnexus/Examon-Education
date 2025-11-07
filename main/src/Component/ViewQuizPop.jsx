// src/Component/ViewQuizPop.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * ViewQuizPop
 * Clean, modern, and lightweight quiz summary modal.
 * Designed for production with smooth animations & minimal overhead.
 */
const ViewQuizPop = ({ isOpen, onClose, quiz }) => {
  if (!isOpen || !quiz) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-5xl  max-h-[85vh] overflow-y-auto p-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-lg sm:text-3xl font-bold text-[var(--primary-color)]">
              {quiz.quizTitle || "Quiz Details"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 cursor-pointer hover:text-red-500 transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* Basic Info */}
          <div className="space-y-1 mb-5 flex items-center justify-between text-sm sm:text-base text-gray-700">
            <p>
              <span className="font-bold text-[var(--primary-color)]">Score:</span> {quiz.score} /{" "}
              {quiz.totalMarks}
            </p>
            <p>
              <span className="font-bold text-[var(--primary-color)]">Attempted At:</span>{" "}
              {new Date(quiz.attemptedAt).toLocaleString()}
            </p>
          </div>

          {/* Answers Section */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
              Answers Overview
            </h3>
            <div className="space-y-3">
              {quiz.answers?.map((ans, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-3 sm:p-4 transition-all duration-200 ${
                    ans.isCorrect
                      ? "bg-green-50 border-green-300"
                      : "bg-red-50 border-red-300"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    <span className="font-semibold">Q{i + 1}:</span>{" "}
                    {ans.question || ans.questionId}
                  </p>

                  {ans.options && (
                    <ul className="ml-4 list-disc space-y-0.5 text-sm text-gray-700">
                      {ans.options.map((opt, j) => (
                        <li
                          key={j}
                          className={`${
                            j === ans.correctAnswerIndex
                              ? "font-semibold text-green-600"
                              : j === ans.selectedIndex
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ViewQuizPop;
