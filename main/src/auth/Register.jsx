import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleBackdropClick = (e) => {
    if (e.target.id === "register-backdrop") navigate(-1);
  };

  return (
    <div
      id="register-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-3xl overflow-hidden flex flex-col md:flex-row relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.pexels.com/photos/34063100/pexels-photo-34063100.jpeg"
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Your Account 🚀
          </h2>
          <p className="text-gray-500 mb-6">
            Register to start your learning journey with Examon Education.
          </p>

          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>

            <button
              type="submit"
              className="mt-3 w-full flex items-center justify-center gap-2 bg-[var(--primary-color)] text-white py-2 rounded-full hover:brightness-95 transition"
            >
              Register <FaArrowRight />
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[var(--primary-color)] font-semibold hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
