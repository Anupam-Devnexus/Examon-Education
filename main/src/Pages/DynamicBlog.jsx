import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify"; // ✅ To safely render HTML
import { useBlogStore } from "../Zustand/GetBlog";

/**
 * DynamicBlog Page
 * -----------------
 * Displays detailed blog content based on ID from the URL.
 * Optimized for safety, responsiveness, and clarity.
 */
const DynamicBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogData: allBlogs = [], fetchBlogs, loading } = useBlogStore();

  // Fetch blogs only if not already available
  useEffect(() => {
    if (!allBlogs || allBlogs.length === 0) fetchBlogs();
  }, [allBlogs?.length, fetchBlogs]);

  // Find current blog
  const blog = allBlogs.find((b) => b._id === id);

  // Handle loading or not found
  if (loading || !allBlogs.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Blog Not Found</h2>
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

  console.log("Rendering blog:", blog);
  const Content  = blog?.blogContent;
console.log("Blog content:", Content);
  return (
    <motion.section
      className="min-h-screen mb-10 bg-gray-50 py-10 px-4 md:px-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 mb-6 text-sm font-medium transition"
      >
        ← Back to Blogs
      </button>

      {/* Blog Card */}
      <article className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden">
        {/* Hero Image */}
        <div className="relative w-full h-72 md:h-96">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Metadata */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
              {blog.category || "General"}
            </span>
            <span>
              {new Date(blog.updatedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            {blog.read_time && <span>• {blog.read_time}</span>}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            {blog.title}
          </h1>

          {/* Author Info */}
          {blog.author && (
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
                <p className="text-gray-500 text-xs">
                  {blog.author.designation}
                </p>
              </div>
            </div>
          )}

          {/* Blog Body */}
          <div
            className="prose prose-blue max-w-none text-gray-700 prose-headings:text-gray-900"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog?.blogContent),
            }}
          />

         
        </div>
      </article>
    </motion.section>
  );
};

export default DynamicBlog;
