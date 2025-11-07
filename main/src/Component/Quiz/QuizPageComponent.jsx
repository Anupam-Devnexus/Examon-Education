import React, { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const API_BASE = "http://194.238.18.1:3004/api";

const DynamicTest = ({ quizData }) => {
  const [answers, setAnswers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (quizData?.questions?.length) {
      setAnswers(
        quizData.questions.map((q, idx) => ({
          questionId: q._id || `q${idx + 1}`,
          selectedIndex: null,
          correctAnswerIndex: q.correctAnswerIndex ?? null,
        }))
      );
    }
  }, [quizData]);

  const handleOptionSelect = useCallback((questionIndex, optionIndex) => {
    setAnswers((prev) =>
      prev.map((ans, idx) =>
        idx === questionIndex ? { ...ans, selectedIndex: optionIndex } : ans
      )
    );
  }, []);

  const handleNext = useCallback(() => {
    currentQuestionIndex < quizData.questions.length - 1
      ? setCurrentQuestionIndex((i) => i + 1)
      : handleSubmit();
  }, [currentQuestionIndex, quizData]);

  const handleSkip = useCallback(() => {
    currentQuestionIndex < quizData.questions.length - 1
      ? setCurrentQuestionIndex((i) => i + 1)
      : handleSubmit();
  }, [currentQuestionIndex, quizData]);

  const handleSubmit = useCallback(async () => {
    const hasAnyAnswer = answers.some((a) => a.selectedIndex !== null);
    if (!hasAnyAnswer)
      return toast.warn(" Please answer or skip at least one question!");

    const storedAuth = localStorage.getItem("auth");
    if (!storedAuth) return toast.warn("⚠️ Please login before submitting!");

    const { token } = JSON.parse(storedAuth);
    if (!token) return toast.error("❌ Invalid session. Please login again.");

    try {
      setSubmitting(true);
      await axios.post(
        `${API_BASE}/quizzes/${quizData._id}/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );
      console.log("✅ Quiz submitted successfully", answers);
      toast.success("✅ Quiz submitted successfully!");
      setHasSubmitted(true);
    } catch (err) {
      console.error("❌ Submission failed:", err);
      toast.error(err.response?.data?.message || "Submission failed!");
    } finally {
      setSubmitting(false);
    }
  }, [answers, quizData]);

  const currentQuestion = quizData?.questions?.[currentQuestionIndex];
  if (!quizData?.questions?.length) return <p>Loading quiz...</p>;

  /** 🧮 Calculate Marks & Percentage **/
  const { score, total, percentage } = useMemo(() => {
    if (!hasSubmitted) return { score: 0, total: 0, percentage: 0 };
    const totalQ = answers.length;
    const correct = answers.filter(
      (a, i) =>
        a.selectedIndex !== null &&
        a.selectedIndex === quizData.questions[i].correctAnswerIndex
    ).length;
    const percent = ((correct / totalQ) * 100).toFixed(2);
    return { score: correct, total: totalQ, percentage: percent };
  }, [hasSubmitted, answers, quizData]);

  const isFail = percentage < 40;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-4 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {quizData?.title || "Quiz"}
        </h2>
        <p className="text-gray-500 mt-1">{quizData?.description}</p>
      </div>

      {/* Quiz Section */}
      {!hasSubmitted && currentQuestion && (
        <div className="space-y-6">
          <div className="border rounded-2xl shadow-sm p-5 bg-white transition-all">
            <h3 className="font-semibold text-lg text-gray-800 mb-3">
              {currentQuestionIndex + 1}.{" "}
              {currentQuestion.text || currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected =
                  answers[currentQuestionIndex]?.selectedIndex === optionIndex;
                return (
                  <label
                    key={optionIndex}
                    onClick={() =>
                      handleOptionSelect(currentQuestionIndex, optionIndex)
                    }
                    className={`cursor-pointer flex items-center gap-3 border p-3 rounded-xl transition-all ${isSelected
                        ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                        : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      checked={isSelected}
                      readOnly
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

      {/* ✅ Result Section */}
      {hasSubmitted && (
        <div className="mt-10 space-y-8">
          <div
            className={`text-center border rounded-xl p-6 shadow-sm ${isFail
                ? "bg-red-50 border-red-300 text-red-700"
                : "bg-green-50 border-green-300 text-green-700"
              }`}
          >
            <h3 className="text-2xl font-bold mb-2">
              {isFail ? "❌ You Failed" : "🎉 You Passed!"}
            </h3>
            <p className="text-lg font-semibold">
              Score: {score} / {total}
            </p>
            <p className="text-md mt-1 font-medium">
              Percentage: <span className="font-semibold">{percentage}%</span>
            </p>
          </div>

          {/* Detailed Review */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-800">
              📋 Review Your Answers
            </h4>
            {quizData.questions.map((q, index) => {
              const userAnswerIndex = answers[index]?.selectedIndex;
              const correctAnswerIndex = q.correctAnswerIndex;
              const skipped = userAnswerIndex === null;

              return (
                <div
                  key={q._id || index}
                  className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <p className="font-medium text-gray-800 mb-4">
                    {index + 1}. {q.text || q.question}{" "}
                    {skipped && (
                      <span className="ml-2 text-yellow-600 text-sm font-medium">
                        (Skipped)
                      </span>
                    )}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((option, optionIndex) => {
                      let optionClass = "bg-gray-50 border-gray-200";
                      if (skipped && optionIndex === correctAnswerIndex)
                        optionClass =
                          "bg-yellow-100 border-yellow-400 text-yellow-800";
                      else if (optionIndex === correctAnswerIndex)
                        optionClass =
                          "bg-green-100 border-green-400 text-green-800";
                      else if (optionIndex === userAnswerIndex)
                        optionClass = "bg-red-100 border-red-400 text-red-800";

                      return (
                        <div
                          key={optionIndex}
                          className={`border p-3 rounded-xl ${optionClass}`}
                        >
                          <span>{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTest;
