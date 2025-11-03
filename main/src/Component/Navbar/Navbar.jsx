import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { useExamStore } from "../../Zustand/GetAllExams";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //  UI States
  const [menuOpen, setMenuOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchInputRef = useRef(null);

  //  Zustand Store (Exams)
  const { exams, loading, error, fetchAllExams } = useExamStore();

  //  Fetch exams only once on mount
  useEffect(() => {
    if (exams.length === 0) fetchAllExams();
  }, [fetchAllExams, exams.length]);

  //  Auto-focus search input
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  //  Memoized navigation links
  const navLinks = useMemo(
    () => [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Courses", path: "/courses" },
      { label: "Quiz", path: "/quiz" },
      { label: "Study Material", path: "/study-material" },
      { label: "Blog", path: "/blog" },
      { label: "Contact", path: "/contact" },
    ],
    []
  );

  //  Handlers (memoized for performance)
  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      setMenuOpen(false);
      setExamOpen(false);
      setSearchOpen(false);
    },
    [navigate]
  );

  const handleExamClick = useCallback(

    (_id) => {
      console.log("Navigating to exam ID:", _id);
      navigate(`/exams/${_id}`);
      setExamOpen(false);
    },
    [navigate]
  );

  return (
    <>
      {/* Navbar Wrapper */}
      <nav className="bg-white shadow-md sticky top-0 z-[998] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/*  Logo + Dropdown */}
          <div className="flex items-center gap-6">
            <img
              src="/logo2.svg"
              alt="Logo"
              className="h-12 w-auto cursor-pointer select-none"
              onClick={() => handleNavigate("/")}
            />

            <div className="h-8 w-0.5 bg-gray-300" />

            {/*  Exams Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExamOpen((prev) => !prev)}
                className="px-3 py-1 rounded-xl border-2 border-[var(--secondary-color)] text-gray-700 font-medium hover:text-[var(--primary-color)] transition flex items-center gap-2"
                aria-haspopup="true"
                aria-expanded={examOpen}
              >
                All Exams ▾{" "}
                <span className="text-xs text-gray-500">
                  ({loading ? "..." : exams.length})
                </span>
              </button>

              {examOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white border rounded-md shadow-lg z-10 animate-fade-in max-h-64 overflow-auto">
                  {loading && (
                    <p className="text-sm text-gray-500 p-4 text-center">Loading exams...</p>
                  )}
                  {error && (
                    <p className="text-sm text-red-500 p-4 text-center">Failed to load exams</p>
                  )}
                  {!loading && !error && exams.length === 0 && (
                    <p className="text-sm text-gray-500 p-4 text-center">No exams found</p>
                  )}
                  {!loading &&
                    !error &&
                    exams.map((exam) => (
                      <div
                        key={exam.id}
                        onClick={() => handleExamClick(exam._id)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition text-gray-700"
                      >
                        {exam.name}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/*  Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => handleNavigate(path)}
                  className={`relative text-gray-700 font-medium transition hover:text-[var(--primary-color)] ${isActive ? "text-[var(--primary-color)]" : ""
                    }`}
                >
                  {label}
                  {isActive && (
                    <img
                      src="/nb.svg"
                      alt="Active Indicator"
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-2"
                    />
                  )}
                </button>
              );
            })}

            {/* 🔍 Search Icon */}
            <CiSearch
              className="text-2xl text-gray-600 cursor-pointer hover:text-[var(--primary-color)] transition"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            />

            {/* 🔘 Auth Buttons */}
            <button
              onClick={() => handleNavigate("/login")}
              className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-full hover:brightness-95 transition"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigate("/register")}
              className="border border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-2 rounded-full hover:bg-[var(--primary-color)] hover:text-white transition"
            >
              Sign Up
            </button>
          </div>

          {/*  Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/*  Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 animate-fade-in">
            {navLinks.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => handleNavigate(path)}
                  className="w-full flex gap-4 items-center ml-4 text-left text-gray-700 font-medium"
                >
                  {isActive && (
                    <div className="h-4 border-l-2 border-[var(--primary-color)]"></div>
                  )}
                  <span className={`${isActive ? "text-[var(--primary-color)]" : ""}`}>
                    {label}
                  </span>
                </button>
              );
            })}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleNavigate("/login")}
                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-full w-full"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigate("/register")}
                className="border border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-2 rounded-full w-full"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 🔍 Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[999] animate-fade-in"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative"
            onClick={(e) => e.stopPropagation()} // prevent modal close on click inside
          >
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              aria-label="Close search"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Search Courses & Exams
            </h2>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Type to search..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            <button className="mt-4 w-full bg-[var(--primary-color)] text-white py-2 rounded-md hover:brightness-95 transition">
              Search
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Navbar);
