import React, { useState, useCallback, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../Zustand/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuthStore();

  const [step, setStep] = useState(1);
  const [counter, setCounter] = useState(60);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Focus fullname initially
  useEffect(() => {
    document.getElementById("fullname")?.focus();
  }, []);

  // Countdown for Resend OTP
  useEffect(() => {
    if (step === 2 && counter > 0) {
      const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter, step]);

  // Form Input Update
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [errors]
  );

  // Validation
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

  // -------------------------
  // STEP 1 → REGISTER
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await signup(formData);

    if (result?.success) {
      toast.success("OTP sent to your email!", { autoClose: 2500 });

      setTimeout(() => {
        setStep(2);
        setCounter(60);
        inputRef.current[0]?.focus();
      }, 1200);
    } else {
      toast.error(result?.message || "Registration failed");
    }
  };

const ConfirmOtp = () => {
  const otpRefs = useRef([]);

  // Collect OTP from all boxes
  const getOtp = () =>
    otpRefs.current.map((el) => el?.value || "").join("");

  // Handle each digit typed
  const handleOtpChange = (value, index) => {
    if (!/^\d$/.test(value)) {
      otpRefs.current[index].value = ""; // Remove invalid char
      return;
    }

    // Move focus to next box
    if (index < 5) otpRefs.current[index + 1]?.focus();
  };

  // Handle backspace navigation
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpRefs.current[index].value && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // VERIFY OTP
  const handleVerify = async () => {
    const finalOtp = getOtp();

    if (finalOtp.length !== 6) {
      toast.error("Enter valid 6-digit OTP");
      return;
    }

    try {
      const res = await fetch("http://194.238.18.1:3004/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: finalOtp,
        }),
      });

      const data = await res.json();

      if (data?.success) {
        toast.success("OTP Verified!", { autoClose: 2000 });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(data?.message || "Invalid OTP");
      }
    } catch {
      toast.error("Server error");
    }
  };

  // RESEND OTP
  const handleResend = async () => {
    try {
      const res = await fetch("http://194.238.18.1:3004/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (data?.success) {
        toast.success("OTP Sent Again!");
        setCounter(60);

        // Clear all boxes
        otpRefs.current.forEach((inp) => (inp.value = ""));
        otpRefs.current[0]?.focus();
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold text-gray-800">Verify OTP</h2>

      <p className="text-sm text-gray-500 text-center">
        Enter the 6-digit code sent to <b>{formData.email}</b>
      </p>

      {/* OTP Boxes */}
      <div className="flex gap-3">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            ref={(el) => (otpRefs.current[i] = el)}
            onChange={(e) => handleOtpChange(e.target.value, i)}
            onKeyDown={(e) => handleOtpKeyDown(e, i)}
            className="w-10 h-12 text-2xl text-center font-bold border border-gray-300
                       rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      {/* Confirm OTP */}
      <button
        onClick={handleVerify}
        className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold text-lg shadow-md hover:bg-blue-700 transition active:scale-95"
      >
        Confirm OTP
      </button>

      {/* Resend OTP */}
      <button
        disabled={counter !== 0}
        onClick={handleResend}
        className={`w-full py-2 rounded-xl font-semibold text-md ${
          counter === 0
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        {counter === 0 ? "Resend OTP" : `Resend OTP in ${counter}s`}
      </button>
    </div>
  );
};

  // Modal Animation
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };



  // -------------------------
  // MAIN RETURN
  // -------------------------
  return (
    <AnimatePresence>
      <motion.div
        id="register-backdrop"
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90%] max-w-3xl overflow-hidden flex flex-col md:flex-row relative">

          {/* Close Btn */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 text-xl"
          >
            ✕
          </button>

          {/* Left Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="https://images.pexels.com/photos/34063100/pexels-photo-34063100.jpeg"
              alt="Register visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center w-full md:w-1/2 p-8">

            {/* Step Animation */}
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Create Your Account
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Register to start your learning journey with Examon Education.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Full Name */}
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full p-2 text-white outline-none rounded-full border ${
                          errors.fullname
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-700"
                        }`}
                      />
                      {errors.fullname && (
                        <p className="text-red-500 text-xs">{errors.fullname}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`w-full text-white outline-none p-2 rounded-full border ${
                          errors.email
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-700"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="text-sm font-medium">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className={`w-full text-white outline-none  p-2 rounded-full border ${
                          errors.password
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-700"
                        }`}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs">{errors.password}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className={`mt-3 w-full flex items-center justify-center gap-2 text-white py-2 rounded-full transition ${
                        loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {loading ? "Registering..." : <>Register <FaArrowRight /></>}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <ConfirmOtp />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Redirect */}
            {step === 1 && (
              <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(Register);
