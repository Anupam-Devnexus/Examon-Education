import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Data from "../../DataStore/quizzes.json";

const HomeQuiz = () => {
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const activeQuiz = Data.quizzes[activeQuizIndex];
  const questions = activeQuiz.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleTabClick = (index) => {
    setActiveQuizIndex(index);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
  };

  const handleOptionClick = (index) => {
    if (!isAnswered) {
      setSelectedOptionIndex(index);
      setIsAnswered(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    }
  };

  const getOptionStyle = (index) => {
    if (!isAnswered) return "hover:bg-blue-50 text-[var(--primary-color)]";
    if (index === currentQuestion.correctAnswerIndex)
      return "bg-green-100 border-green-500 text-green-800";
    if (index === selectedOptionIndex)
      return "bg-red-100 border-red-500 text-red-800";
    return "opacity-60";
  };

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Animation Variants
  const containerVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const questionVariant = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } },
  };

  return (
    <motion.section
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full py-10 px-4 md:px-6 bg-white"
    >
      <div className="max-w-full mx-auto flex flex-col gap-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-[var(--primary-color)] text-center"
        >
          Wanna Test Your Skills? Take a Quick Quiz
        </motion.h1>

        {/* Tabs */}
        <div className="flex overflow-x-auto space-x-3 mb-4 scrollbar-hide">
          {Data.quizzes.map((quiz, index) => (
            <motion.button
              key={quiz.id}
              onClick={() => handleTabClick(index)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className={`whitespace-nowrap border-t-2 border-b-2 cursor-pointer px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                index === activeQuizIndex
                  ? "text-[var(--primary-color)] border-[var(--primary-color)] bg-blue-50"
                  : "text-gray-400 border-gray-400"
              }`}
            >
              {quiz.title}
            </motion.button>
          ))}
        </div>

        {/* Progress */}
        <div className="w-full">
          <div className="w-full bg-gray-200 rounded-full h-1 mb-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
              className="bg-[var(--primary-color)] h-1 rounded-full"
            ></motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-600 text-center"
          >
            Question {currentQuestionIndex + 1} of {questions.length}
          </motion.p>
        </div>

        {/* Animated Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            variants={questionVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white shadow-md rounded-xl p-4 md:p-6 border transition-all duration-300"
          >
            <h2 className="text-lg md:text-xl font-semibold border-r-4 border-[var(--primary-color)] text-[var(--primary-color)] mb-4 pr-2">
              Q{currentQuestionIndex + 1}. {currentQuestion.question}
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, idx) => (
                <motion.li
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className={`border px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${getOptionStyle(
                    idx
                  )}`}
                >
                  <span className="font-medium">
                    {String.fromCharCode(65 + idx)}.
                  </span>{" "}
                  {option}
                </motion.li>
              ))}
            </ul>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-400 transition"
              >
                Previous
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
                className="w-full sm:w-auto px-4 py-2 bg-[var(--primary-color)] text-white rounded-md disabled:opacity-50 hover:bg-blue-700 transition"
              >
                Submit & Next »
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default HomeQuiz;
