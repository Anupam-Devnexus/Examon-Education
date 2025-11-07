import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaSignOutAlt,
} from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ProfileQuizCard from "../Component/Card/ProfleQuizCard";
import { useAuthStore } from "../Zustand/useAuthStore";
import { useCourseStore } from "../Zustand/GetAllCourses";
import ViewQuizPop from "../Component/ViewQuizPop";
import { ReviewSection } from "../Component/Review/ReivewSection";

const UserProfile = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { data: coursesData = [], fetchCourses } = useCourseStore();

  const [user, setUser] = useState({});
  const [draft, setDraft] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isQuizPopOpen, setIsQuizPopOpen] = useState(false);

  // Image upload
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");

  /* ---------------------- Load user + courses ---------------------- */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth");
      if (!stored) return navigate("/login");

      fetchCourses?.();
      const parsed = JSON.parse(stored);
      const u = parsed?.user || {};

      setUser(u);
      setDraft(u);
      setImagePreview(u.profileImg || null);
      setSelectedCourse(u.course || "");
    } catch (err) {
      console.error("Auth load failed:", err);
      navigate("/login");
    }
  }, [navigate, fetchCourses]);

  const attemptedQuizzes = useMemo(() => user?.attemptedQuizzes || [], [user]);

  /* ---------------------- Quiz Stats ---------------------- */
  const quizStats = useMemo(() => {
    if (!attemptedQuizzes.length) return { passed: 0, failed: 0, total: 0 };

    return attemptedQuizzes.reduce(
      (acc, q) => {
        const total = q.totalMarks || q.totalQuestions || 1;
        const pct = (q.score / total) * 100;
        if (pct >= 40) acc.passed++;
        else acc.failed++;
        return acc;
      },
      { passed: 0, failed: 0, total: attemptedQuizzes.length }
    );
  }, [attemptedQuizzes]);

  const chartData = [
    { name: "Passed", value: quizStats.passed, color: "#16A34A" },
    { name: "Failed", value: quizStats.failed, color: "#EF4444" },
  ];

  /* ---------------------- Image selection ---------------------- */
  const onImageInputChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  /* ---------------------- Validation ---------------------- */
  const validate = useCallback(() => {
    const errors = [];
    if (!draft.fullname?.trim()) errors.push("Full name cannot be empty.");
    if (!draft.phone?.trim()) errors.push("Phone number cannot be empty.");
    if (passwords.password || passwords.confirmPassword) {
      if (passwords.password.length < 8)
        errors.push("Password must be at least 8 characters.");
      if (passwords.password !== passwords.confirmPassword)
        errors.push("Passwords do not match.");
    }
    return errors;
  }, [draft, passwords]);

  /* ---------------------- Save profile ---------------------- */
  const handleSave = useCallback(async () => {
    const errors = validate();
    if (errors.length) {
      errors.forEach((m) => toast.error(m));
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullname", draft.fullname?.trim() || "");
      formData.append("email", user.email || "");
      formData.append("phone", draft.phone || "");
      formData.append("course", selectedCourse || "");
      if (passwords.password) formData.append("password", passwords.password);
      if (imageFile) formData.append("profileImage", imageFile);

      const res = await axios.post("/api/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = res?.data?.user || {
        ...user,
        fullname: draft.fullname?.trim(),
        phone: draft.phone,
        course: selectedCourse,
        profileImg: imagePreview || user.profileImg,
      };

      const stored = JSON.parse(localStorage.getItem("auth")) || {};
      localStorage.setItem("auth", JSON.stringify({ ...stored, user: updatedUser }));

      setUser(updatedUser);
      setDraft(updatedUser);
      setEditMode(false);
      setPasswords({ password: "", confirmPassword: "" });
      setImageFile(null);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed:", err);
      toast.error(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }, [draft, user, imageFile, imagePreview, passwords, selectedCourse, validate]);

  const handleLogout = useCallback(() => {
    logout();
    toast.success("Logged out successfully!");
  }, [logout]);

  /* ---------------------- UI ---------------------- */
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="max-w-full p-6 mb-10">
        {/* MAIN PROFILE BOX */}
        <div className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-2xl shadow-md">
          {/* LEFT: Image + Logout */}
          <div className="w-full md:w-1/4 flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border bg-gray-100">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={draft.fullname || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-12 h-12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2c0-2.761 2.239-5 5-5s5 2.239 5 5h2c0-3.866-3.134-7-7-7z" />
                    </svg>
                  </div>
                )}
              </div>

              {editMode && (
                <label
                  htmlFor="profileImage"
                  className="absolute -bottom-2 right-0 bg-white border px-2 py-1 rounded-lg text-xs shadow-sm cursor-pointer hover:bg-gray-50"
                >
                  Upload new photo
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={onImageInputChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <p className="text-sm text-gray-500">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-2 flex items-center gap-2 text-sm text-red-600 border border-red-500 px-3 py-1 rounded-xl hover:bg-red-50 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>

          {/* RIGHT: Form */}
          <div className="flex-1 w-full">
            <div className="flex items-start justify-between">
              <h1 className="text-xl font-semibold text-gray-800">Profile Details</h1>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 text-sm bg-white border px-4 py-2 rounded-xl hover:shadow-md"
                >
                  <FaEdit /> Edit
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:opacity-90 disabled:opacity-70"
                  >
                    <FaSave /> {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setDraft(user);
                      setEditMode(false);
                      setPasswords({ password: "", confirmPassword: "" });
                      setImageFile(null);
                      setImagePreview(user.profileImg || null);
                      setSelectedCourse(user.course || "");
                    }}
                    className="flex items-center gap-2 text-sm bg-white border px-4 py-2 rounded-xl hover:shadow-md"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Form grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Fullname */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Full Name</label>
                <input
                  name="fullname"
                  value={draft.fullname || ""}
                  onChange={(e) => setDraft((p) => ({ ...p, fullname: e.target.value }))}
                  disabled={!editMode}
                  className={`border rounded-full px-4 py-2 text-gray-800 ${
                    editMode ? "border-blue-500 bg-white" : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Phone No.</label>
                <input
                  name="phone"
                  value={draft.phone || ""}
                  onChange={(e) => setDraft((p) => ({ ...p, phone: e.target.value }))}
                  disabled={!editMode}
                  className={`border rounded-full px-4 py-2 text-gray-800 ${
                    editMode ? "border-blue-500 bg-white" : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Email</label>
                <input
                  value={user.email || ""}
                  readOnly
                  className="border rounded-full px-4 py-2 text-gray-600 border-gray-200 bg-gray-50"
                />
              </div>

              {/* Course Dropdown */}
              {editMode && (
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm mb-1">Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="border rounded-full px-4 py-2 border-blue-500"
                  >
                    <option value="">-- Select Course --</option>
                    {Array.isArray(coursesData) &&
                      coursesData.map((c, idx) => (
                        <option
                          key={idx}
                          value={c.courseDetails || c.name || c.title}
                        >
                          {c.courseDetails || c.name || c.title}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Passwords */}
              {editMode && (
                <>
                  <div className="flex flex-col relative">
                    <label className="text-gray-600 text-sm mb-1">New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwords.password}
                      onChange={(e) =>
                        setPasswords((p) => ({ ...p, password: e.target.value }))
                      }
                      className="border rounded-full px-4 py-2 pr-10 border-blue-500"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-gray-600 text-sm mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={passwords.confirmPassword}
                      onChange={(e) =>
                        setPasswords((p) => ({
                          ...p,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="border rounded-full px-4 py-2 border-blue-500"
                      placeholder="Re-enter password"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

     {/* QUIZ STATS + REVIEW SECTION */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="mt-8 bg-white rounded-2xl shadow-md p-6"
>
  <div className="flex flex-col gap-10 lg:gap-16">
    {/* QUIZ PERFORMANCE SECTION */}
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center md:text-left">
        Quiz Performance
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8">
        {/* Pie Chart */}
        <div className="w-full md:w-2/3 lg:w-1/2 h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius="80%"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 w-full lg:w-1/3">
          {[
            { label: "Passed", value: quizStats.passed, color: "text-green-600" },
            { label: "Failed", value: quizStats.failed, color: "text-red-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="border rounded-xl p-5 bg-gray-50 text-center shadow-sm hover:shadow-md transition-all"
            >
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* REVIEW SECTION */}
    <div className="border-t border-gray-200 pt-6">
      <ReviewSection />
    </div>
  </div>
</motion.div>


        {/* ATTEMPTED QUIZZES */}
        {attemptedQuizzes.length > 0 ? (
          <div className="mt-10 mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Attempted Quizzes ({attemptedQuizzes.length})
            </h2>

            <div className="relative">
              <div
                className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                style={{ scrollBehavior: "smooth" }}
              >
                {attemptedQuizzes.map((quiz, i) => (
                  <div key={i} className="min-w-[260px] flex-shrink-0 snap-start">
                    <ProfileQuizCard
                      quiz={quiz}
                      onView={() => {
                        setSelectedQuiz(quiz);
                        setIsQuizPopOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Gradient edges */}
              <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
          </div>
        ) : (
          <p className="mt-8 text-center text-gray-500 text-sm">
            No test attempted yet!
          </p>
        )}

        <ViewQuizPop
          isOpen={isQuizPopOpen}
          onClose={() => setIsQuizPopOpen(false)}
          quiz={selectedQuiz}
        />
      </div>
    </>
  );
};

export default React.memo(UserProfile);
