import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuthStore } from "../Zustand/useAuthStore";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();

  // ------------------------------
  //  Form State
  // ------------------------------

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // ------------------------------
  //  Input Handler
  // ------------------------------
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ------------------------------
  //  Validation
  // ------------------------------
  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password.trim())
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------------------
  //  Submit Handler
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await login(formData);

    if (process.env.NODE_ENV === "development") {
      console.log(" Login result:", result);
    }

    if (result.success) {
      toast.success(result.message || "Login successful!");
      navigate("/"); // redirect to home or dashboard
    } else {
      toast.error(result.message || "Login failed, please try again.");
    }
  };

  // ------------------------------
  //  Backdrop Click (closes modal)
  // ------------------------------
  const handleBackdropClick = (e) => {
    if (e.target.id === "login-backdrop") navigate(-1);
  };

  // ------------------------------
  //  UI
  // ------------------------------
  return (
    <div
      id="login-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <ToastContainer position="top-right" autoClose={3000} />

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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full p-2 rounded-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full p-2 rounded-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-[var(--primary-color)]"
                />
                Remember me
              </label>
              <span className="cursor-pointer hover:text-[var(--primary-color)]">
                Forgot password?
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-[var(--primary-color)] text-white py-2 rounded-full hover:brightness-95 transition"
            >
              {loading ? "Logging in..." : <>Login <FaArrowRight /></>}
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
