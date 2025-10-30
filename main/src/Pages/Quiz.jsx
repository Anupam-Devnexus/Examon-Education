import React, { useEffect, useState } from "react";
import ExamCard from "../Component/Card/ExamCard";
import { useAllQuiz } from "../Zustand/GetAllQuiz";

const Quiz = () => {
  const { quizData, loading, error, fetchQuiz } = useAllQuiz();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState("All");

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);
  console.log(quizData)

  const filteredQuizzes = quizData.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesExam = selectedExam === "All" || quiz.exam === selectedExam;
    return matchesSearch && matchesExam;
  });

  return (
    <main className="min-h-screen px-4 py-4 md:px-8 bg-gradient-to-b from-[#f9fbff] to-white">
      {/* Header */}
      <header className="bg-[var(--primary-color)] text-white rounded-2xl p-6 shadow-md mb-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
          <img src="/questionmark.svg" alt="" className="w-48 h-48" />
        </div>

        <h1 className="font-bold text-3xl md:text-4xl flex items-center gap-3 relative z-10">
          Quizzes
          <img src="/questionmark.svg" alt="icon" className="w-7 h-7 md:w-9 md:h-9" />
        </h1>
        <p className="text-white/90 z-10 text-base md:text-lg">
          Choose a test and start your preparation journey.
        </p>

        <div className="relative w-full mt-4 z-10">
          <input
            type="text"
            placeholder="🔍 Search quizzes or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-gray-800 rounded-xl px-4 py-2 text-sm md:text-base outline-none shadow-sm focus:ring-2 focus:ring-[var(--secondary-color)]"
          />
        </div>
      </header>

      {/* Filters + Quiz Cards */}
      <section className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar */}
        <aside className="bg-white p-5 rounded-2xl shadow-md w-full md:w-1/4 border border-gray-100 space-y-6 sticky top-24">
          <div>
            <label className="text-[var(--primary-color)] font-semibold block mb-3">
              Exam Filter
            </label>
            <hr />
            <div className="space-y-2 mt-3">
              {["All", "UPSC", "SSC CGL", "RRB NTPC"].map((exam) => (
                <label
                  key={exam}
                  className="flex items-center text-sm text-gray-700 hover:text-[var(--primary-color)] cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="exam"
                    value={exam}
                    checked={selectedExam === exam}
                    onChange={() => setSelectedExam(exam)}
                    className="mr-2 accent-[var(--primary-color)]"
                  />
                  {exam}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Quiz Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-[var(--tertiary-color)] rounded-2xl shadow-inner">
          {loading ? (
            <p className="col-span-full text-center text-gray-500 py-10 animate-pulse">
              Loading quizzes...
            </p>
          ) : error ? (
            <p className="col-span-full text-center text-red-500 py-10">
              {error}
            </p>
          ) : filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <ExamCard key={quiz._id} examData={quiz} />
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center py-10">
              No quizzes found.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Quiz;
