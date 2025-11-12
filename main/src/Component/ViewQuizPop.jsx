import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

//  Production-Ready ViewQuizPage with Full Correct/Skipped Answer Display
const ViewQuizPage = () => {
  const { _id: id } = useParams();

  //  Fetch stored user data
  const Data = JSON.parse(localStorage.getItem("auth"));
  const AttemptedQuiz = Data?.user?.attemptedQuizzes || [];

  //  Get the current quiz based on ID from params
  const quiz = AttemptedQuiz.find((q) => q.quizId === id);

  //  Scroll to top on mount
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  //  Handle missing quiz case
  if (!quiz)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-gray-600">
          Quiz not found or not attempted yet.
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto mb-20 px-4 py-6">
      {/* ===== HEADER SECTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-2">
          {quiz.quizTitle || "Quiz Result"}
        </h1>

        <div className="flex flex-col sm:flex-row justify-center gap-4 text-gray-700 text-sm sm:text-base">
          <p>
            <span className="font-semibold">Attempted At:</span>{" "}
            {new Date(quiz.attemptedAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Total Questions:</span>{" "}
            {quiz.questions?.length || 0}
          </p>
          <p>
            <span className="font-semibold">Score:</span> {quiz.score || 0} /{" "}
            {quiz.totalMarks || quiz.questions?.length * 2 || 0}
          </p>
        </div>
      </motion.div>

      {/* ===== QUESTION LIST ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-6"
      >
        {quiz.questions.map((q, index) => {
          const isSkipped = q.userAnswer === null;
          const isCorrect =
            q.userAnswer !== null && q.userAnswer === q.correctAnswer;
          const isWrong =
            q.userAnswer !== null && q.userAnswer !== q.correctAnswer;

          return (
            <motion.div
              key={q.questionId || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className={`rounded-2xl border shadow-md p-5 sm:p-6 transition-all duration-300 ${
                isCorrect
                  ? "bg-green-50 border-green-300"
                  : isSkipped
                  ? "bg-gray-50 border-gray-300"
                  : "bg-red-50 border-red-300"
              }`}
            >
              {/* ===== QUESTION TITLE ===== */}
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3">
                Q{index + 1}. {q.question}
              </h2>

              {/* ===== OPTIONS ===== */}
              <ul className="ml-4 space-y-2">
                {q.options.map((opt, i) => {
                  const isUserChoice = q.userAnswer === i;
                  const isCorrectChoice = q.correctAnswer === i;

                  return (
                    <motion.li
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className={`text-sm sm:text-base px-3 py-2 rounded-lg cursor-default transition-colors duration-200 
                        ${
                          isCorrectChoice
                            ? "bg-green-100 text-green-800 font-medium border border-green-300"
                            : isUserChoice && isWrong
                            ? "bg-red-100 text-red-700 font-medium border border-red-300"
                            : "bg-white text-gray-700 border border-gray-200"
                        }`}
                    >
                      {opt}
                      {isCorrectChoice && (
                        <span className="ml-2 text-green-600 font-semibold">
                           Correct
                        </span>
                      )}
                      {isUserChoice && isWrong && (
                        <span className="ml-2 text-red-600 font-semibold">
                          ❌ Your Answer
                        </span>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              {/* ===== SKIPPED / META INFO ===== */}
              <div className="mt-4 flex flex-wrap gap-4 text-xs sm:text-sm text-gray-600">
                {isSkipped && (
                  <p className="text-yellow-600 font-semibold">
                    ⚠️ You skipped this question.
                  </p>
                )}

                <p>
                  <span className="font-semibold">Topic:</span> {q.topic}
                </p>
                <p>
                  <span className="font-semibold">Difficulty:</span>{" "}
                  {q.difficulty}
                </p>
                <p>
                  <span className="font-semibold">Marks:</span> {q.marks}
                </p>
              </div>

              {/* ===== SHOW CORRECT ANSWER IF SKIPPED OR WRONG ===== */}
              {(isSkipped || isWrong) && (
                <div className="mt-3 text-sm sm:text-base text-green-700 font-medium">
                   Correct Answer:{" "}
                  <span className="text-green-800">
                    {q.options[q.correctAnswer]}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ViewQuizPage;
