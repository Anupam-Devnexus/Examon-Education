import React, { useState, useCallback, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../Zustand/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuthStore();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.getElementById("fullname")?.focus();
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [errors]
  );

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await signup(formData);

    if (result.success) {
      toast.success(result.message || "Registration successful!", { autoClose: 2500 });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      toast.error(result.message || "Registration failed");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "register-backdrop") navigate('/');
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        id="register-backdrop"
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90%] max-w-3xl overflow-hidden flex flex-col md:flex-row relative">
          {/* Close Button */}
          <button
            onClick={() => navigate("/")}
            aria-label="Close Register"
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
          >
            ✕
          </button>

          {/* Left Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="https://images.pexels.com/photos/34063100/pexels-photo-34063100.jpeg"
              alt="Register visual"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right Form */}
          <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Register to start your learning journey with Examon Education.
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full p-2 rounded-full border ${
                    errors.fullname
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 dark:border-gray-700 focus:ring-blue-400"
                  } focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white`}
                  aria-invalid={!!errors.fullname}
                  aria-describedby="fullname-error"
                />
                {errors.fullname && (
                  <p id="fullname-error" className="text-red-500 text-xs mt-1">
                    {errors.fullname}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full p-2 rounded-full border ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 dark:border-gray-700 focus:ring-blue-400"
                  } focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white`}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`w-full p-2 rounded-full border ${
                    errors.password
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 dark:border-gray-700 focus:ring-blue-400"
                  } focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white`}
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                />
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`mt-3 w-full flex items-center justify-center gap-2 text-white py-2 rounded-full transition ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Registering..." : <>Register <FaArrowRight /></>}
              </button>
            </form>

            {/* Redirect to Login */}
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(Register);
