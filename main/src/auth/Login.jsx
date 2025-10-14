import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleBackdropClick = (e) => {
    if (e.target.id === "login-backdrop") navigate(-1);
  };

  return (
    <div
      id="login-backdrop"
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
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your credentials to access your account.
          </p>

          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[var(--primary-color)]" />
                Remember me
              </label>
              <span className="cursor-pointer hover:text-[var(--primary-color)]">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              className="mt-3 w-full flex items-center justify-center gap-2 bg-[var(--primary-color)] text-white py-2 rounded-full hover:brightness-95 transition"
            >
              Login <FaArrowRight />
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-[var(--primary-color)] font-semibold hover:underline"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
