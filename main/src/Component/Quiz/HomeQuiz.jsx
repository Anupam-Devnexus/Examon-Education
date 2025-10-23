import React, { useState } from "react";
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
    if (index === currentQuestion.correctAnswerIndex) return "bg-green-100 border-green-500 text-green-800";
    if (index === selectedOptionIndex) return "bg-red-100 border-red-500 text-red-800";
    return "opacity-60";
  };

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
<div className="min-w-full grid grid-cols-1 gap-3 mt-3 place-items-center" >

 <div className="text-2xl md:text-4xl font-bold text-[var(--primary-color)] mx-auto ">
            Wanna Test your skills! Take a Quick Quiz
        </div>

    <div className="min-w-full mt-4 p-4">
       
      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-3 mb-6 scrollbar-hide">
        {Data.quizzes.map((quiz, index) => (
          <button
            key={quiz.id}
            onClick={() => handleTabClick(index)}
            className={`whitespace-nowrap border-t-2 border-b-2 cursor-pointer px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              index === activeQuizIndex
                ? " text-[var(--primary-color)] border-[var(--primary-color)]"
                : " text-gray-400 border-gray-400"
            }`}
          >
            {quiz.title}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1 mb-4">
        <div
          className="bg-[var(--primary-color)] h-1 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>

      {/* Question Card */}
      <div className="bg-white rounded-xl p-4 transition-all duration-300">
        <h2 className="text-xl font-semibold border-r-2 border-blue-700 text-[var(--primary-color)] mb-4">
          Q{currentQuestionIndex + 1}. {currentQuestion.question}
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={`border px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${getOptionStyle(idx)}`}
            >
              <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
            </li>
          ))}
        </ul>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-400 transition"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className="px-4 py-2 bg-[var(--primary-color)] cursor-pointer text-white rounded-md disabled:opacity-50 hover:bg-blue-700 transition"
          >
            Submit & Next »
          </button>
        </div>
      </div>
    </div>
    </div>

  );
};

export default HomeQuiz;
