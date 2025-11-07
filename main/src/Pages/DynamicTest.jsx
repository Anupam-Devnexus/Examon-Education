import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import QuizPageComponent from "../Component/Quiz/QuizPageComponent";
import CoursesYouLike from "../Component/CoursesYouLike";

const API_BASE = "http://194.238.18.1:3004/api";

const DynamicTest = () => {
  const { _id } = useParams();

  //  Local component states
  const [quizData, setQuizData] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  /**
   *  Fetch quiz details by ID from API
   * - Wrapped in useCallback for memoization
   * - Includes error handling and fallback states
   */
  const fetchQuizById = useCallback(async () => {
    if (!_id) {
      setError("Quiz ID not found in the URL.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/quizzes/${_id}`);
      setQuizData(response.data);
      setError(null);
    } catch (err) {
      console.error("❌ Error fetching quiz:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load quiz. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, [_id]);

  //  Fetch quiz data once when component mounts or quizId changes
  useEffect(() => {
    fetchQuizById();
  }, [fetchQuizById]);

  /**
   *  Handle quiz submission
   * - Fetch token securely from localStorage
   * - Includes server response handling and toast feedback
   */
    const handleSubmitQuiz = useCallback(
    async (answers) => {
      const storedAuth = localStorage.getItem("auth");

      if (!storedAuth) {
        toast.warn("⚠️ Please login before submitting the quiz!");
        return;
      }

      const { token } = JSON.parse(storedAuth);

      if (!token) {
        toast.error("❌ Invalid login session. Please re-login.");
        return;
      }

      try {
        setSubmitting(true);

        const response = await axios.post(
          `${API_BASE}/quizzes/${_id}/submit`,
          { answers },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: false,
            timeout: 10000,
          }
        );

        // ✅ Log complete API response for debugging
        console.log("📩 Quiz submission API response:", response.data);

        // ✅ Update state with result
        setQuizResult(response.data);

        // ✅ Show success message
        toast.success("✅ Quiz submitted successfully!");
      } catch (err) {
        console.error("❌ Quiz submission failed:", err);

        if (err.response?.status === 403) {
          toast.error("⚠️ Unauthorized access. Please login again.");
        } else if (err.response?.status === 404) {
          toast.error("❌ Quiz not found or already submitted.");
        } else {
          toast.error(err.response?.data?.message || "Quiz submission failed!");
        }
      } finally {
        setSubmitting(false);
      }
    },
    [_id]
  );


  //  Loader State (UX-friendly)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Loading quiz...</p>
      </div>
    );
  }

  //  Error State with Retry Button
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
        <p className="text-red-600 font-semibold text-lg mb-4">{error}</p>
        <button
          onClick={fetchQuizById}
          className="px-5 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  //  Fallback if no quiz data found
  if (!quizData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">No quiz found.</p>
      </div>
    );
  }

  //  Final Layout (UI unchanged)
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f9fbff] to-white mb-18 md:mb-1 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        {/*  Main Quiz Section */}
        <section className="lg:col-span-2 mb-18 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 mt-4 md:p-6">
          <QuizPageComponent
            quizData={quizData}
            onSubmit={handleSubmitQuiz}
            submitting={submitting}
            quizResult={quizResult}
          />
        </section>

        {/* 💡 Sidebar for Recommended Courses */}
        <aside className="hidden lg:flex bg-white rounded-2xl transition-all duration-300 p-2 justify-center sticky top-24 mb-18 overflow-hidden">
          <CoursesYouLike title={true} />
        </aside>

        {/* 📱 Mobile Sidebar */}
        <aside className="block lg:hidden mt-10">
          <CoursesYouLike title={false} />
        </aside>
      </div>
    </main>
  );
};

export default DynamicTest;
