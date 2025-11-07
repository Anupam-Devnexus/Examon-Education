import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBlogStore } from "../Zustand/GetBlog.jsx";

/**
 * Blog Page (Production-level)
 * Integrates API response from useBlogStore and renders blogs dynamically.
 */
const Blog = () => {
  const navigate = useNavigate();
  const { blogData, fetchBlogs, loading, error } = useBlogStore();

  useEffect(() => {
    fetchBlogs(); // Fetch blogs on mount
  }, [fetchBlogs]);

  // Parse API response safely
  const blogs = Array.isArray(blogData) ? blogData : [];

  return (
    <section className="min-h-screen bg-gray-50 pb-16">
      {/* HEADER */}
      <div className="text-left flex flex-col items-start justify-center p-6 h-[40vh] bg-[var(--primary-color)]">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-3">
          Our Course Blogs
        </h1>
        <p className="text-gray-200 max-w-2xl">
          Read insights from experts on modern technologies, frameworks, and
          real-world development practices.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--primary-color)]"></div>
          <p className="ml-3 text-gray-600">Loading blogs...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-600 mt-10">
          Failed to load blogs. Please try again later.
        </div>
      )}

      {/* Blog Grid */}
      {!loading && !error && blogs.length > 0 ? (
        <div className="grid gap-10 py-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => {
            const createdDate = new Date(blog.createdAt).toLocaleDateString();

            // Extract a small text snippet from HTML content
            const textContent = blog.blogContent
              ?.replace(/<[^>]+>/g, "") // remove HTML tags
              ?.slice(0, 120);

            return (
              <motion.article
                key={blog._id || index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Blog Image */}
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />

                {/* Blog Info */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>{createdDate}</span>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {textContent || "No description available."}
                  </p>

                  {/* Read More Button */}
                  <button
                    className="mt-auto w-full bg-[var(--primary-color)] cursor-pointer text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-300"
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  >
                    Read More
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      ) : (
        !loading &&
        !error && (
          <div className="text-center text-gray-500 mt-10">
            No blogs available yet.
          </div>
        )
      )}
    </section>
  );
};

export default Blog;
