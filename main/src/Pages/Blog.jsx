import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBlogStore } from "../Zustand/GetBlog.jsx";
import Courses from "../Component/CoursesYouLike.jsx";


const Blog = () => {
  const navigate = useNavigate();
  const { blogData, fetchBlogs, loading, error } = useBlogStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 10;

  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Safely parse blogs
  const blogs = Array.isArray(blogData) ? blogData : [];

  // Extract unique categories
  const categories = useMemo(() => {
    const unique = new Set(blogs.map((b) => b.category || "General"));
    return ["All", ...unique];
  }, [blogs]);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        blog.blogContent?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = category === "All" || blog.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [blogs, debouncedSearch, category]);

  // Reset pagination on filter/search
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, category]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  return (
    <section className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER */}
      <header className="text-left flex flex-col items-start justify-center p-6 h-[40vh] bg-[var(--primary-color)]">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-3">
          Our Course Blogs
        </h1>
        <p className="text-gray-200 max-w-2xl">
          Explore insights from experts on trending technologies, frameworks, and real-world practices.
        </p>
      </header>

      {/* FILTER + SEARCH */}
      <div className="bg-white shadow-md rounded-xl mx-6 -mt-8 p-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[var(--primary-color)] outline-none text-gray-700"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[var(--primary-color)] outline-none text-gray-700"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-full px-2 mt-10 grid grid-cols-1 lg:grid-cols-4">
        {/* BLOG SECTION */}
        <div className="lg:col-span-3">
          {loading && (
            <div className="flex justify-center items-center mt-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--primary-color)]"></div>
              <p className="ml-3 text-gray-600">Loading blogs...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 mt-10">
              Failed to load blogs. Please try again later.
            </div>
          )}

          {!loading && !error && currentBlogs.length > 0 ? (
            <>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {currentBlogs.map((blog, index) => {
                  const createdDate = new Date(blog.createdAt).toLocaleDateString();
                  const textContent = blog.blogContent
                    ?.replace(/<[^>]+>/g, "")
                    ?.slice(0, 120);

                  return (
                    <motion.article
                      key={blog._id || index}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="flex flex-col flex-1 p-5">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <span>{createdDate}</span>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                          {blog.title}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {textContent || "No description available."}
                        </p>
                        <button
                          className="mt-auto w-full bg-[var(--primary-color)] cursor-pointer text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-300 hover:opacity-90"
                          onClick={() => navigate(`/blog/${blog._id}`)}
                        >
                          Read More
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-10">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white hover:bg-gray-100 border-gray-300"
                    }`}
                  >
                    Previous
                  </button>

                  <span className="text-gray-600 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white hover:bg-gray-100 border-gray-300"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            !loading &&
            !error && (
              <div className="text-center text-gray-500 mt-10">
                No blogs found matching your criteria.
              </div>
            )
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-1 w-full space-y-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-full sticky top-24 bg-white rounded-2xl p-2 shadow-md">
            <Courses title={true} />
          </div>

          {/* Mobile Sidebar */}
          <div className="block lg:hidden">
            <Courses title={false} />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Blog;
