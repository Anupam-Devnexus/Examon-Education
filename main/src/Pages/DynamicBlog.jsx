import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Data from "../DataStore/blog.json";

/**
 * DynamicBlog Page
 * -----------------
 * Displays detailed blog content based on ID from the URL.
 * Includes blog image, metadata, author info, and related courses.
 * Optimized for performance, responsive design, and clean modern UI.
 */

const DynamicBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = Data.data.find((b) => b.id === id);

  // 🔹 Handle invalid blog ID gracefully
  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Blog Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The article you’re looking for doesn’t exist or may have been removed.
        </p>
        <button
          onClick={() => navigate("/blog")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <motion.section
      className="min-h-screen bg-gray-50 py-12 px-4 md:px-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 🔹 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 mb-6 text-sm font-medium transition"
      >
        ← Back to Blogs
      </button>

      {/* 🔹 Blog Container */}
      <article className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden">
        {/* Hero Image */}
        <div className="relative w-full h-72 md:h-96">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Blog Content */}
        <div className="p-6 md:p-10">
          {/* Metadata */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
              {blog.category}
            </span>
            <span>
              {new Date(blog.published_date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>• {blog.read_time}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center mb-8">
            <img
              src={blog.author.profile_image}
              alt={blog.author.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
            <div className="ml-3">
              <p className="font-semibold text-gray-800 text-sm">
                {blog.author.name}
              </p>
              <p className="text-gray-500 text-xs">{blog.author.designation}</p>
            </div>
          </div>

          {/* Blog Body */}
          <div className="prose prose-blue max-w-none text-gray-700">
            <p className="text-base md:text-lg mb-6">
              {blog.content.introduction}
            </p>

            {blog.content.sections.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {section.heading}
                </h2>
                <p className="text-gray-600">{section.text}</p>
              </div>
            ))}

            <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-800 text-lg">
              {blog.content.conclusion}
            </blockquote>
          </div>

          {/* Divider */}
          <div className="my-10 border-t border-gray-200" />

          {/* Related Courses */}
          <div>
            <h3 className="text-2xl font-bold mb-5 text-gray-900">
              Related Courses
            </h3>
            <ul className="grid sm:grid-cols-2 gap-5">
              {blog.related_courses.map((course) => (
                <li
                  key={course.id}
                  className="flex justify-between items-center bg-gray-50 hover:bg-blue-50 p-4 rounded-xl border border-gray-100 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800 text-sm md:text-base">
                      {course.title}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {course.duration} • {course.level}
                    </p>
                  </div>
                  <button
                    onClick={() => alert(`View course: ${course.title}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs transition"
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </motion.section>
  );
};

export default DynamicBlog;
