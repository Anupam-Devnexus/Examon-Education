import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAllQuiz } from "../Zustand/GetAllQuiz";
import { motion } from "framer-motion";

const ViewQuizPage = () => {
  const { id } = useParams(); // quizId from URL like /quiz/:id
  const Data = JSON.parse(localStorage.getItem("auth"));
  const AttemptedQuiz = Data?.user?.attemptedQuizzes || [];
  console.log("AttemptedQuiz:", AttemptedQuiz);

  setTimeout(()=>{
    scrollTo(0, 0);
  },100)

  // Get the attempted quiz data by matching quizId
  const quiz = AttemptedQuiz.find((q) => q.quizId === id);

  const { quizData, fetchQuiz } = useAllQuiz();

  useEffect(() => {
    if (quizData.length === 0) fetchQuiz();
  }, [quizData.length, fetchQuiz]);

  // Merge question data with attempted answers
  const mergedAnswers = useMemo(() => {
    if (!quiz || !quiz.answers || quizData.length === 0) return [];
    const currentQuizData = quizData.find((q) => q._id === id);
    if (!currentQuizData) return [];

    return quiz.answers.map((ans) => {
      const question = currentQuizData.questions.find(
        (q) => q.questionId === ans.questionId
      );
      return {
        ...ans,
        questionText: question?.questionText || "Question not found",
        options: question?.options || [],
      };
    });
  }, [quiz, quizData, id]);

  if (!quiz)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Quiz not found or not attempted yet.</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* ===== HEADER ===== */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary-color)] mb-2">
          {quiz.quizTitle || "Quiz Result"}
        </h1>
        <div className="text-gray-700 flex flex-wrap gap-4">
          <p>
            <span className="font-semibold">Score:</span> {quiz.score} /{" "}
            {quiz.totalMarks}
          </p>
          <p>
            <span className="font-semibold">Attempted At:</span>{" "}
            {new Date(quiz.attemptedAt).toLocaleString()}
          </p>
        </div>
      </motion.div>

      {/* ===== ANSWERS SECTION ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {mergedAnswers.length > 0 ? (
          <div className="space-y-5">
            {mergedAnswers.map((ans, index) => (
              <div
                key={ans.questionId}
                className={`rounded-2xl border p-5 shadow-md transition-all duration-200 ${
                  ans.isCorrect
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                  Q{index + 1}. {ans.questionText}
                </h2>
                <ul className="ml-5 list-disc space-y-1 text-sm sm:text-base text-gray-700">
                  {ans.options.map((opt, i) => (
                    <li
                      key={i}
                      className={`${
                        i === ans.correctAnswerIndex
                          ? "text-green-700 font-semibold"
                          : i === ans.selectedIndex
                          ? "text-red-600"
                          : ""
                      }`}
                    >
                      {opt}
                      {i === ans.correctAnswerIndex && " ✅"}
                      {i === ans.selectedIndex && !ans.isCorrect && " ❌"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No answer details available for this quiz.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default ViewQuizPage;
