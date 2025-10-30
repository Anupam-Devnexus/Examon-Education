import React, { useState, useEffect, useMemo } from "react";
import StudyMaterialPageCard from "../Component/Card/StudyMaterialPageCard";
import { useNotesStore } from "../Zustand/GetNotes";

const StudyMaterial = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [page, setPage] = useState(1);

  const { notesData, loading, error, fetchNotes } = useNotesStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const itemsPerPage = 6;

  // ✅ Flatten data and attach category
  const allNotes = useMemo(() => {
    if (!Array.isArray(notesData)) return [];
    return notesData.flatMap((category) =>
      (category.notes || []).map((note) => ({
        ...note,
        category: category.notesCategory,
      }))
    );
  }, [notesData]);

  // ✅ Extract unique categories
  const categories = useMemo(() => {
    const list = notesData.map((n) => n.notesCategory);
    return ["All", ...new Set(list)];
  }, [notesData]);

  // ✅ Filtering logic
  const filteredData = useMemo(() => {
    return allNotes.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
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

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:py-6 mb-14">
      <main className="flex-1 flex flex-col gap-6">
        {/* Header Section */}
        <header className="flex flex-col gap-3 text-white rounded-2xl bg-[var(--primary-color)] p-5 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-3">
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

          {/* Search and Category Filter */}
          <div className="flex flex-col md:flex-row gap-3 items-center mt-2">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search by topic or exam name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-xl p-3 text-white border border-gray-300 focus:ring-2 focus:ring-white outline-none bg-transparent placeholder:text-gray-200"
              />

            </div>

            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="w-full md:w-auto rounded-xl p-3 bg-white text-gray-800 border border-gray-300 shadow-sm focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <aside className=" md:w-1/4 w-full bg-white shadow-md rounded-xl px-4 h-fit">

              <div className="md:hidden flex justify-between gap-3 items-center">
                <label className="text-gray-700 font-medium">Level:</label>

                <select
                  value={levelFilter}
                  onChange={(e) => {
                    setLevelFilter(e.target.value);
                    setPage(1);
                  }}
                  className="rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  {["All", "Beginner", "Intermediate", "Medium", "Advanced"].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

            </aside>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex items-start gap-3 px-2 w-full">
          {/* Sidebar Level Filter */}
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
                      onChange={(e) => {
                        setLevelFilter(e.target.value);
                        setPage(1);
                      }}
                    />
                    <span>{level}</span>
                  </label>
                )
              )}
            </div>
          </aside>

          {/* Notes Cards */}
          <section className="grid w-full sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading ? (
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
            )}
          </section>
        </div>

        {/* Pagination */}
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
