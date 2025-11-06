import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Data from "../DataStore/blog.json";

/**
 * Blog Page
 * Displays list of blogs using data from blog.json
 */

const Blog = () => {
  const blogs = Data?.data || [];
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gray-50 mb-22">
      {/* Header */}
      <div className="text-left flex flex-col items-start justify-center p-4 h-[40vh] bg-[var(--primary-color)] ">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-2">
          Our Course Blogs
        </h1>
        <p className="text-gray-200 max-w-2xl">
          Read insights from experts on modern technologies, frameworks, and
          real-world development practices.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-10 py-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <motion.article
            key={blog.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-56 object-cover"
              loading="lazy"
            />

            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>{blog.category}</span> •
                <span>{new Date(blog.published_date).toLocaleDateString()}</span>
                • <span>{blog.read_time}</span>
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {blog.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center mt-auto pt-3 border-t border-gray-100">
                <img
                  src={blog.author.profile_image}
                  alt={blog.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-700 text-sm">
                    {blog.author.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {blog.author.designation}
                  </p>
                </div>
              </div>

              {/* Read More */}
              <button
                className="mt-5 w-full bg-[var(--primary-color)] cursor-pointer text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-300"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                Read More
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
