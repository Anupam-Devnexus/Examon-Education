import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizPageComponent from "../Component/Quiz/QuizPageComponent";
import CoursesYouLike from "../Component/CoursesYouLike";

const DynamicTest = () => {
  const { id } = useParams();
  const [quizId, setQuizId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setQuizId(id);
      setLoading(false);
    } else {
      setError("Quiz ID not found in route.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f9fbff] to-white mb-18 md:mb-1 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        
        {/* Quiz Section */}
        <section className="lg:col-span-2 mb-18 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 mt-4 md:p-6">
          <QuizPageComponent quizId={quizId} />
        </section>

        {/* Sidebar Recommendation Section */}
        <aside className="hidden lg:flex bg-white rounded-2xl  transition-all duration-300 p-2 justify-center sticky h-[85vh]">
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
