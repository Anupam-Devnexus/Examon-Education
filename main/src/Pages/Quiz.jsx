import React, { useState } from "react";
import Data from "../DataStore/quizzes.json";
import ExamCard from "../Component/Card/ExamCard";

const Quiz = () => {
  const { quizzes } = Data;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState("All");

  // Filter logic
  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesExam = selectedExam === "All" || quiz.exam === selectedExam;

    return matchesSearch && matchesExam;
  });

  return (
    <main className="min-h-screen px-4 py-4 md:px-8 bg-gradient-to-b from-[#f9fbff] to-white mb-18">
      {/* Header */}
      <header className="bg-[var(--primary-color)] text-white rounded-2xl p-6 shadow-md mb-10 flex flex-col items-start gap-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
          <img src="/questionmark.svg" alt="" className="w-48 h-48 object-contain" />
        </div>

        <h1 className="font-bold text-3xl md:text-4xl flex items-center gap-3 z-10">
          Quizzes
          <img
            src="/questionmark.svg"
            alt="Quiz Icon"
            className="w-7 h-7 md:w-9 md:h-9"
          />
        </h1>
        <p className="text-white/90 z-10 text-base md:text-lg">
          Choose a test and start your preparation journey.
        </p>

        <div className="relative w-full  z-10">
          <input
            type="text"
            placeholder=" Search quizzes or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-gray-800 rounded-xl px-4 py-2 text-sm md:text-base outline-none shadow-sm focus:ring-2 focus:ring-[var(--secondary-color)]"
          />
        </div>
      </header>

      {/* Filters + Quiz Cards */}
      <section className="flex flex-col md:flex-row gap-8 items-start">
        {/* Filter Sidebar */}
        <aside className="bg-white p-3 rounded-2xl shadow-md w-full md:w-1/4 border border-gray-100 space-y-6 sticky top-24">
          {/* Search */}
          <div>
            {/* <label className="text-[var(--primary-color)] font-semibold block mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by title or tag"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
            /> */}
          </div>

          {/* Exam Filter */}
          <div>
            <label className="text-[var(--primary-color)] font-semibold block mb-2">
              Exams
            </label>
            <hr />
            <div className="space-y-2">
              {["All", "UPSC", "SSC CGL", "RRB NTPC"].map((exam) => (
                <label
                  key={exam}
                  className="flex items-center text-sm mt-4 text-gray-700 hover:text-[var(--primary-color)] cursor-pointer transition-colors"
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

        {/* Quiz Cards Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-[var(--tertiary-color)] rounded-2xl shadow-inner">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <ExamCard key={quiz.id} examData={quiz} />
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center py-10">
              No quizzes match your search or filters.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Quiz;
