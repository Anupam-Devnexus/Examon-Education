import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import QuizPageComponent from "../Component/Quiz/QuizPageComponent";
import CoursesYouLike from "../Component/CoursesYouLike";

const API_BASE = "http://194.238.18.1:3004/api";

const DynamicTest = () => {
  const { _id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  //  Fetch quiz by ID
  const fetchQuizById = useCallback(async () => {
    if (!_id) {
      setError("Quiz ID not found in the URL.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/quizzes/${_id}`);
      setQuizData(data);
    } catch (err) {
      console.error("Error fetching quiz:", err);
      setError(
        err.response?.data?.message || "Failed to load quiz. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [_id]);

  useEffect(() => {
    fetchQuizById();
  }, [fetchQuizById]);

  //  Handle quiz submission
  const handleSubmitQuiz = useCallback(
    async (answers) => {
      try {
        const stored = JSON.parse(localStorage.getItem("auth"));
        const token = stored?.token;
        console.log("Submitting quiz with token:", token);

        if (!token) {
          toast.warn(" Please login before submitting the quiz!");
          return;
        }

        setSubmitting(true);

        const { data } = await axios.post(
          `${API_BASE}/quizzes/${id}/submit`,
          { answers },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setQuizResult(data);
        toast.success(" Quiz submitted successfully!");
      } catch (err) {
        console.error("Quiz submission failed:", err);
        toast.error(err.response?.data?.message || "Quiz submission failed!");
      } finally {
        setSubmitting(false);
      }
    },
    [_id]
  );

  //  Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Loading quiz...</p>
      </div>
    );
  }

  // Error State
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

  //  No Quiz Found
  if (!quizData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Quiz not found.</p>
      </div>
    );
  }

  //  Render Main Layout (no UI changes)
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f9fbff] to-white mb-18 md:mb-1 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* Quiz Section */}
        <section className="lg:col-span-2 mb-18 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 mt-4 md:p-6">
          <QuizPageComponent
            quizData={quizData}
            onSubmit={handleSubmitQuiz}
            submitting={submitting}
            quizResult={quizResult}
          />
        </section>

        {/* Sidebar Recommendation Section */}
        <aside className="hidden lg:flex bg-white rounded-2xl transition-all duration-300 p-2 justify-center sticky top-24 mb-18 overflow-hidden">
          <CoursesYouLike title={true} />
        </aside>

        {/* Mobile Version */}
        <aside className="block lg:hidden mt-10">
          <CoursesYouLike title={false} />
        </aside>
      </div>
    </main>
  );
};

export default DynamicTest;
