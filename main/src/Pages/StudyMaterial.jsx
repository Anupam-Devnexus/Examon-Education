import React, { useState, useMemo } from "react";
import StudyMaterialPageCard from "../Component/Card/StudyMaterialPageCard";
import Data from "../DataStore/StudyMaterials.json";

const StudyMaterial = () => {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  // Filter and search logic
  const filteredData = useMemo(() => {
    return Data.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.exam.examTitle.toLowerCase().includes(search.toLowerCase());
      const matchesLevel =
        levelFilter === "All" ? true : item.level === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [search, levelFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:py-6 mb-14">
      

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6">
        {/* Header Section */}
        <header className="flex flex-col gap-3 text-white rounded-2xl bg-[var(--primary-color)] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-2xl font-semibold">
              <span>Study Material</span>
              <img src="/notebook.svg" alt="notebook" className="w-8 h-8" />
            </div>
          </div>

          <p className="text-sm md:text-base leading-relaxed">
            Access study materials and mock exams for GATE, SSC JE, ESE, and
            other government exams. Choose your level, search topics, and
            download or preview notes instantly.
          </p>

          {/* Search bar */}
          <div className="relative w-full max-w-md mt-2">
            <input
              type="text"
              placeholder="Search by topic or exam name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl p-3 text-white border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute top-3.5 right-3 text-gray-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
              />
            </svg>
          </div>
        </header>
        <div className="flex items-start gap-3 w-full">
            {/* Sidebar Filter */}
      <aside className="md:w-1/4 w-full bg-white shadow-md rounded-2xl p-4 h-fit">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Filter by Level
        </h3>
        <div className="flex md:flex-col flex-wrap gap-3">
          {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
            <label
              key={level}
              className="flex items-center gap-2 cursor-pointer text-gray-700"
            >
              <input
                type="radio"
                name="level"
                value={level}
                checked={levelFilter === level}
                onChange={(e) => {
                  setLevelFilter(e.target.value);
                  setPage(1);
                }}
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </aside>
        {/* Cards Section */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedData.length > 0 ? (
            paginatedData.map((item) => (
              <StudyMaterialPageCard key={item.id} {...item} />
            ))
          ) : (
            <div className="text-gray-500 col-span-full text-center py-10">
              No materials found for your search or filter.
            </div>
          )}
        </section>
        </div>


        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-xl ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 border hover:bg-gray-50"
              }`}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-xl ${
                  page === i + 1
                    ? "bg-[var(--primary-color)] text-white"
                    : "bg-white text-gray-700 border hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-xl ${
                page === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 border hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudyMaterial;
