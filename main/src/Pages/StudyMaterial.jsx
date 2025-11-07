import React, { useState, useEffect, useMemo } from "react";
import StudyMaterialPageCard from "../Component/Card/StudyMaterialPageCard";
import PyqCard from "../Component/Card/PyqCard";
import { usePyqStore } from "../Zustand/GetPyq";
import { useNotesStore } from "../Zustand/GetNotes";

const StudyMaterial = () => {
  // --- Local State ---
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("notes"); // "notes" | "pyq"

  // --- Zustand Stores ---
  const { notesData, loading, error, fetchNotes } = useNotesStore();
  const { pyqData, loading: pyqLoading, error: pyqError, fetchPyq } = usePyqStore();

  // --- Fetch Data on Mount ---
  useEffect(() => {
    fetchNotes();
    fetchPyq();
  }, [fetchNotes, fetchPyq]);

  const itemsPerPage = 3;

  //  Flatten Notes Data
  const allNotes = useMemo(() => {
    if (!Array.isArray(notesData)) return [];
    return notesData.flatMap((category) =>
      (category.notes || []).map((note) => ({
        ...note,
        category: category.notesCategory,
      }))
    );
  }, [notesData]);

  //  Extract Categories
  const categories = useMemo(() => {
    const list = notesData.map((n) => n.notesCategory);
    return ["All", ...new Set(list)];
  }, [notesData]);

  //  Filter Notes
  const filteredNotes = useMemo(() => {
    return allNotes.filter((item) => {
      const matchesSearch = item.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" ? true : item.category === categoryFilter;
      const matchesLevel =
        levelFilter === "All"
          ? true
          : item.level?.toLowerCase() === levelFilter.toLowerCase();
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [allNotes, search, categoryFilter, levelFilter]);

  //  Flatten & Filter PYQ
  const allPyq = useMemo(() => {
    if (!Array.isArray(pyqData)) return [];
    return pyqData.flatMap((group) =>
      (group.questionspaper || []).map((q) => ({
        ...q,
        category: group.pyqCategory,
      }))
    );
  }, [pyqData]);

  const filteredPyq = useMemo(() => {
    return allPyq.filter((item) =>
      item.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [allPyq, search]);

  //  Pagination Logic
  const currentData = viewMode === "notes" ? filteredNotes : filteredPyq;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const paginatedData = currentData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  //  Reset Page on Filter/View Change
  useEffect(() => setPage(1), [search, categoryFilter, levelFilter, viewMode]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:py-6 mb-14">
      <main className="flex-1 flex flex-col gap-6">
        {/* --- Header Section --- */}
        <header className="flex flex-col gap-3 text-white rounded-2xl bg-[var(--primary-color)] p-5 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 text-2xl font-semibold">
              <span>Study Material</span>
              <img src="/notebook.svg" alt="notebook" className="w-8 h-8" />
            </div>

            {/* Toggle Switch (Notes / PYQ) */}
            <div className="flex items-center gap-2 bg-gray-300  rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("notes")}
                className={`px-4 cursor-pointer py-2 text-sm font-medium transition-all ${viewMode === "notes"
                  ? "bg-[var(--primary-color)] text-white"
                  : "text-gray-800 hover:bg-gray-100"
                  }`}
              >
                Notes
              </button>
              <button
                onClick={() => setViewMode("pyq")}
                className={`px-4 cursor-pointer py-2 text-sm font-medium transition-all ${viewMode === "pyq"
                  ? "bg-[var(--primary-color)] text-white"
                  : "text-gray-800 hover:bg-gray-100"
                  }`}
              >
                PYQ
              </button>
            </div>
          </div>

          <p className="text-sm md:text-base leading-relaxed">
            Access study materials and PYQs for GATE, SSC JE, ESE, and other
            government exams. Choose your level, search topics, and download or
            preview instantly.
          </p>

          {/* --- Search & Filters (Notes only) --- */}
          {viewMode === "notes" && (
            <div className="flex flex-col md:flex-row gap-3 items-center mt-2">
              {/* Search Input */}
              <div className="relative w-full md:max-w-md">
                <input
                  type="text"
                  placeholder="Search by topic or exam name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl p-3 text-white border border-gray-300 focus:ring-2 focus:ring-white outline-none bg-transparent placeholder:text-gray-200"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full md:w-auto rounded-xl p-3 bg-white text-gray-800 border border-gray-300 shadow-sm focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Level Filter (Mobile) */}
              <aside className="md:hidden flex justify-between gap-3 items-center">
                <label className="text-gray-700 font-medium">Level:</label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  {["All", "Beginner", "Intermediate", "Medium", "Advanced"].map(
                    (level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    )
                  )}
                </select>
              </aside>
            </div>
          )}

          {/* --- PYQ Search (separate input) --- */}
          {viewMode === "pyq" && (
            <div className="mt-2 w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search by PYQ title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl p-3 text-white border border-gray-300 focus:ring-2 focus:ring-white outline-none bg-transparent placeholder:text-gray-200"
              />
            </div>
          )}
        </header>

        {/* --- Main Content --- */}
        <div className="flex items-start gap-3 px-2 w-full">
          {/* Sidebar Level Filter (Notes only) */}
          {viewMode === "notes" && (
            <aside className="hidden md:block md:w-1/4 w-full bg-white shadow-md rounded-2xl p-4 h-fit">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Filter by Level
              </h3>
              <div className="flex-row md:flex-col flex-wrap gap-3">
                {["All", "Beginner", "Intermediate", "Medium", "Advanced"].map(
                  (level) => (
                    <label
                      key={level}
                      className="flex items-center gap-2 cursor-pointer text-gray-700"
                    >
                      <input
                        type="radio"
                        name="level"
                        value={level}
                        checked={levelFilter === level}
                        onChange={(e) => setLevelFilter(e.target.value)}
                      />
                      <span>{level}</span>
                    </label>
                  )
                )}
              </div>
            </aside>
          )}

          {/* --- Content Grid --- */}
          <section className="grid w-full sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {viewMode === "notes" ? (
              loading ? (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Loading study materials...
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-10 text-red-500">
                  {error}
                </div>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <StudyMaterialPageCard key={item._id} {...item} />
                ))
              ) : (
                <div className="text-gray-500 col-span-full text-center py-10">
                  No materials found for your filters.
                </div>
              )
            ) : pyqLoading ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                Loading PYQs...
              </div>
            ) : pyqError ? (
              <div className="col-span-full text-center py-10 text-red-500">
                {pyqError}
              </div>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <PyqCard
                  key={item._id}
                  title={item.title}
                  year={item.year}
                  pdf={item.pdf}
                />
              ))
            ) : (
              <div className="text-gray-500 col-span-full text-center py-10">
                No PYQs found.
              </div>
            )}
          </section>
        </div>

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-xl ${page === 1
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
                className={`px-4 py-2 rounded-xl ${page === i + 1
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
              className={`px-4 py-2 rounded-xl ${page === totalPages
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
