import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

const QuizPageComponent = ({ quizData, onSubmit, submitting, quizResult }) => {
  const [answers, setAnswers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // ✅ Initialize answers when quiz data loads
  useEffect(() => {
    if (quizData?.questions?.length) {
      const normalized = quizData.questions.map((q, idx) => ({
        // Normalize IDs so backend matches — fallback to q.questionId / q.id / index
        questionId: q.questionId || q._id || q.id || `q${idx + 1}`,
        selectedIndex: null,
      }));
      setAnswers(normalized);
    }
  }, [quizData]);

  // ✅ Select answer handler (memoized)
  const handleOptionSelect = useCallback((questionIndex, optionIndex) => {
    setAnswers((prev) =>
      prev.map((ans, idx) =>
        idx === questionIndex ? { ...ans, selectedIndex: optionIndex } : ans
      )
    );
  }, []);

  // ✅ Next Question or Submit if last
  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }, [currentQuestionIndex, quizData]);

  // ✅ Skip question
  const handleSkip = useCallback(() => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }, [currentQuestionIndex, quizData]);

  // ✅ Final submit handler
  const handleSubmit = useCallback(async () => {
    const hasAnyAnswer = answers.some((a) => a.selectedIndex !== null);

    if (!hasAnyAnswer) {
      toast.warn("⚠️ Please answer or skip at least one question!");
      return;
    }

    try {
      await onSubmit(answers);
      setHasSubmitted(true);
    } catch (err) {
      console.error("Quiz submission error:", err);
      toast.error("❌ Failed to submit quiz. Please try again.");
    }
  }, [answers, onSubmit]);

  const currentQuestion = quizData?.questions?.[currentQuestionIndex];
  if (!currentQuestion) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-4 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {quizData?.title || "Quiz"}
        </h2>
        <p className="text-gray-500 mt-1">{quizData?.description}</p>
      </div>

      {/* Questions */}
      {!hasSubmitted && (
        <div className="space-y-6">
          <div
            key={currentQuestion._id || currentQuestionIndex}
            className="border rounded-2xl shadow-sm hover:shadow-md transition-all p-5 bg-white"
          >
            <h3 className="font-semibold text-lg text-gray-800 mb-3">
              {currentQuestionIndex + 1}.{" "}
              {currentQuestion.text || currentQuestion.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected =
                  answers[currentQuestionIndex]?.selectedIndex === optionIndex;

                return (
                  <label
                    key={optionIndex}
                    className={`cursor-pointer flex items-center gap-3 border p-3 rounded-xl transition-all ${
                      isSelected
                        ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                        : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                    }`}
                    onClick={() =>
                      handleOptionSelect(currentQuestionIndex, optionIndex)
                    }
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      checked={isSelected}
                      onChange={() =>
                        handleOptionSelect(currentQuestionIndex, optionIndex)
                      }
                      className="hidden"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleSkip}
                disabled={submitting}
                className="px-5 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition-all disabled:opacity-60"
              >
                Skip
              </button>

              <button
                onClick={handleNext}
                disabled={submitting}
                className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-xl hover:bg-[var(--secondary-color)] transition-all disabled:opacity-60"
              >
                {currentQuestionIndex === quizData.questions.length - 1
                  ? submitting
                    ? "Submitting..."
                    : "Submit"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Result */}
      {hasSubmitted && quizResult && (
        <div className="mt-10 text-center bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-green-700 mb-2">
            🎉 Quiz Submitted!
          </h3>
          <p className="text-lg text-green-800">
            Your Score:{" "}
            <span className="font-semibold">
              {quizResult.score ?? "N/A"} / {quizResult.total ?? "N/A"}
            </span>
          </p>
          {quizResult.message && (
            <p className="text-gray-600 mt-2">{quizResult.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPageComponent;
