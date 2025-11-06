import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Data from "../DataStore/blog.json";

/**
 * DynamicBlog Page
 * -----------------
 * Displays detailed blog content based on ID from the URL.
 * Includes hero image, metadata, author details, blog sections, and related courses.
 * Designed with accessibility, responsiveness, and animations in mind.
 */

const DynamicBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = Data.data.find((b) => b.id === id);

  // 🔹 Handle invalid blog ID
  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Blog Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The article you’re looking for doesn’t exist or may have been moved.
        </p>
        <button
          onClick={() => navigate("/blog")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.section
      className="min-h-screen bg-gray-50 py-10 px-5 md:px-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🔹 Back Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="text-[var(--primary-color)] cursor-pointer hover:text-blue-700 hover:underline mb-6 text-sm font-medium"
      >
        ← Back to Blogs
      </button>

      {/* 🔹 Main Blog Container */}
      <article className="max-w-full mb-12 mx-auto bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Hero Image */}
        <div className="relative w-full h-80 md:h-96 overflow-hidden">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Blog Content */}
        <div className="p-6 md:p-10">
          {/* Blog Metadata */}
          <div className="flex flex-wrap gap-2 text-gray-500 text-sm mb-4">
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
            • <span>{blog.read_time}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-snug">
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center mb-8">
            <img
              src={blog.author.profile_image}
              alt={blog.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="ml-3">
              <p className="font-semibold text-gray-800 text-sm">
                {blog.author.name}
              </p>
              <p className="text-gray-500 text-xs">
                {blog.author.designation}
              </p>
            </div>
          </div>

          {/* Blog Body */}
          <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-6">{blog.content.introduction}</p>

            {blog.content.sections.map((section, idx) => (
              <section key={idx} className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {section.heading}
                </h2>
                <p className="text-gray-700 text-base">{section.text}</p>
              </section>
            ))}

            <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-800 text-lg font-medium">
              {blog.content.conclusion}
            </blockquote>
          </div>

          {/* Divider */}
          <div className="my-10 border-t border-gray-200"></div>

          {/* Related Courses */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Related Courses
            </h3>

            <ul className="grid sm:grid-cols-2 gap-5">
              {blog.related_courses.map((course) => (
                <li
                  key={course.id}
                  className="p-5 bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-100 flex justify-between items-center transition-all duration-300"
                >
                  <div>
                    <p className="font-medium text-gray-800 text-sm md:text-base">
                      {course.title}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {course.duration} • {course.level}
                    </p>
                  </div>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs md:text-sm transition-all"
                    onClick={() => alert(`View course: ${course.title}`)}
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
