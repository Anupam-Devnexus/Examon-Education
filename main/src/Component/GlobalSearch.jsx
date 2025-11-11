import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const BASE_API = "http://194.238.18.1:3004/api";

const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const fetchSearchResults = useCallback(async (term, controller) => {
    if (!term.trim()) {
      setResults([]);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `${BASE_API}/search?query=${encodeURIComponent(term)}`,
        { signal: controller.signal }
      );

      if (!res.ok) throw new Error("Network response not ok");

      const data = await res.json();
      setResults(data?.results || []);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Search error:", err);
        setError("Failed to fetch search results. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search with cancellation
  useEffect(() => {
    const controller = new AbortController();
    const handler = setTimeout(() => fetchSearchResults(query, controller), 400);

    return () => {
      controller.abort();
      clearTimeout(handler);
    };
  }, [query, fetchSearchResults]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg mx-4 transform transition-all animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== Header ===== */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Global Search</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            aria-label="Close search modal"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* ===== Search Input ===== */}
        <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-[var(--primary-color)] transition">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across your data..."
            className="w-full outline-none text-gray-800 placeholder-gray-400"
            aria-label="Search"
          />
        </div>

        {/* ===== Results Section ===== */}
        <div className="max-h-80 overflow-y-auto custom-scroll">
          {loading && (
            <div className="text-center text-gray-500 py-4">Searching...</div>
          )}

          {error && (
            <div className="text-center text-red-500 py-4">{error}</div>
          )}

          {!loading && !error && results.length > 0 && (
            <ul className="space-y-2">
              {results.map((item, idx) => (
                <li
                  key={idx}
                  className="p-3 border rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <p className="font-medium text-gray-800">
                    {highlightText(item.title || item.name || "Untitled", query)}
                  </p>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  )}
                </li>
              ))}
            </ul>
          )}

          {!loading && !error && query && results.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ===== Utility to highlight matched text =====
function highlightText(text, term) {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <span key={i} className="bg-yellow-200 font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default GlobalSearchModal;
