import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email!");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(`Subscribed successfully with: ${email}`);
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-[var(--primary-color)] p-6  rounded-3xl shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 ">
      
      {/* Image / Hero */}
      <div className="flex-shrink-0">
        <img
          src="/books.svg"
          alt="Books"
          className="w-24 h-24"
        />
      </div>

      {/* Text + Form */}
      <div className="flex flex-col md:flex-1 gap-4">
        <h2 className="text-xl md:text-2xl font-bold leading-tight">
          Subscribe to our Newsletter
        </h2>
        <p className="text-white/80 text-base md:text-md">
          Stay updated with our latest news, insights, and updates. Enter your
          email below!
        </p>

      </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mt-3 w-1/2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-3 rounded-lg outline-none border border-transparent focus:border-white focus:ring-2 focus:ring-white transition bg-white/90 text-gray-900 placeholder-gray-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-indigo-600 hover:bg-white/90"
            }`}
          >
            {loading ? "Submitting..." : "Subscribe"}
          </button>
        </form>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default NewsLetter;
