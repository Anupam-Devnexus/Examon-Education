import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import ProfileQuizCard from "../Component/Card/ProfleQuizCard";
import { useAuthStore } from "../Zustand/useAuthStore";
import { useCourseStore } from "../Zustand/GetAllCourses";
import ViewQuizPop from "../Component/ViewQuizPop";
import ChangePassword from "../Component/Profile/ChangePassword";
import { ReviewSection } from "../Component/Review/ReivewSection";

// ======================================
// CONFIG
// ======================================
const API_BASE = "http://194.238.18.1:3004/api";

// Reusable Axios instance
const api = axios.create({ baseURL: API_BASE, withCredentials: true });

// ======================================
// COMPONENT
// ======================================
const UserProfile = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { data: coursesData = [], fetchCourses } = useCourseStore();

  // ==============================
  // STATE
  // ==============================
  const [user, setUser] = useState(null);
  const [draft, setDraft] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isQuizPopOpen, setIsQuizPopOpen] = useState(false);

  const fileInputRef = useRef(null);

  // ======================================
  // LOAD USER + COURSES
  // ======================================
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (!stored) return navigate("/login");

    fetchCourses?.();
    const parsed = JSON.parse(stored);
    const u = parsed?.user || {};

    setUser(u);
    setDraft(u);
    setImagePreview(u.profileImg || u.profileImage || null);
    setSelectedCourse(u.course || u.preferedCourse || "");
  }, [navigate, fetchCourses]);

  // ======================================
  // QUIZ STATS (Memoized)
  // ======================================
  const attemptedQuizzes = useMemo(() => user?.attemptedQuizzes || [], [user]);

  const quizStats = useMemo(() => {
    if (!attemptedQuizzes.length) return { passed: 0, failed: 0, total: 0 };
    return attemptedQuizzes.reduce(
      (acc, q) => {
        const total = q.totalMarks || q.totalQuestions || 1;
        const pct = (q.score / total) * 100;
        pct >= 40 ? acc.passed++ : acc.failed++;
        return acc;
      },
      { passed: 0, failed: 0, total: attemptedQuizzes.length }
    );
  }, [attemptedQuizzes]);

  const chartData = useMemo(
    () => [
      { name: "Passed", value: quizStats.passed, color: "#16A34A" },
      { name: "Failed", value: quizStats.failed, color: "#EF4444" },
    ],
    [quizStats]
  );

  // ======================================
  // HANDLERS
  // ======================================

  // Handle local image preview
  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
        const previewUrl = URL.createObjectURL(file);
        setImageFile(file);
        setImagePreview(previewUrl);
      }
    },
    [imagePreview]
  );

  // Validate basic profile data
  const validateProfile = useCallback(() => {
    const errors = [];
    if (!draft.phone?.trim()) errors.push("Phone number cannot be empty.");
    return errors;
  }, [draft]);

  // ======================================
  // SAVE PROFILE (with image upload)
  // ======================================
  const handleSave = useCallback(async () => {
    const errors = validateProfile();
    if (errors.length) return errors.forEach((m) => toast.error(m));

    const storedAuth = JSON.parse(localStorage.getItem("auth")) || {};
    const user_id = storedAuth?.user?._id;
    if (!user_id) return toast.error("User ID missing. Please re-login.");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("phone", draft.phone || "");
      formData.append("preferedCourse", selectedCourse || "");

      if (imageFile) formData.append("profileImage", imageFile);
      // For debugging in dev (won’t run in production)
      if (process.env.NODE_ENV !== "production") {
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
      }

      // Send form data to API endpoint
      const res = await api.post(`/profile/update/${user_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(" Profile updated:", res.data);

      const updatedUser = res?.data?.user || {
        ...user,
        phone: draft.phone,
        preferedCourse: selectedCourse,
        profileImage: imagePreview || user.profileImg,
      };

      // Sync localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({ ...storedAuth, user: updatedUser })
      );

      // Update UI state
      setUser(updatedUser);
      setDraft(updatedUser);
      setEditMode(false);
      setImageFile(null);

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("❌ Update Error:", err);
      toast.error(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }, [draft, user, imageFile, imagePreview, selectedCourse, validateProfile]);

  // Reset to initial data
  const handleCancel = useCallback(() => {
    setDraft(user);
    setEditMode(false);
    setImageFile(null);
    setImagePreview(user?.profileImg || user?.profileImage || null);
    setSelectedCourse(user?.course || user?.preferedCourse || "");
  }, [user]);

  const handleLogout = useCallback(() => {
    logout();
    toast.success("Logged out successfully!");
  }, [logout]);

  // ======================================
  // RENDER
  // ======================================
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="max-w-full p-6 mb-14">
        {/* ================= PROFILE SECTION ================= */}
        <div className="flex flex-col md:flex-row items-start gap-6 bg-white p-6 rounded-2xl shadow-md">
          {/* LEFT PANEL */}
          <div className="w-full md:w-1/4 flex flex-col items-center gap-3">
            {/* PROFILE IMAGE */}
            <div className="relative">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border bg-gray-100">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
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
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <p className="text-sm text-gray-500">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="mt-2 flex items-center gap-2 text-sm text-red-600 border border-red-500 px-3 py-1 rounded-xl hover:bg-red-50 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex-1 w-full">
            <div className="flex items-start justify-between">
              <h1 className="text-xl font-semibold text-gray-800">
                Profile Details
              </h1>
              <div className="flex items-center gap-4">
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
                      onClick={handleCancel}
                      className="flex items-center gap-2 text-sm bg-white border px-4 py-2 rounded-xl hover:shadow-md"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                )}
                <div
                  className="text-[var(--primary-color)] cursor-pointer"
                  onClick={() => setShowPassword(true)}
                >
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>

            {/* PROFILE FORM */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* FULL NAME */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Full Name</label>
                <input
                  value={user?.fullname || ""}
                  readOnly
                  className="border rounded-full px-4 py-2 text-gray-600 border-gray-200 bg-gray-50"
                />
              </div>

              {/* PHONE */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Phone No.</label>
                <input
                  value={draft?.phone || ""}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, phone: e.target.value }))
                  }
                  disabled={!editMode}
                  className={`border rounded-full px-4 py-2 text-gray-800 ${editMode
                      ? "border-blue-500 bg-white"
                      : "border-gray-200 bg-gray-50"
                    }`}
                />
              </div>

              {/* EMAIL */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Email</label>
                <input
                  value={user?.email || ""}
                  readOnly
                  className="border rounded-full px-4 py-2 text-gray-600 border-gray-200 bg-gray-50"
                />
              </div>

              {/* COURSE SELECT */}
              {editMode && (
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm mb-1">Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="border rounded-full px-4 py-2 border-blue-500"
                  >
                    <option value="">-- Select Course --</option>
                    {coursesData.map((c, idx) => (
                      <option key={idx} value={c.courseDetails || c.name || c.title}>
                        {c.courseDetails || c.name || c.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= QUIZ SECTION ================= */}
        {attemptedQuizzes.length > 0 ? (
          <div className="mt-10 mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Attempted Quizzes ({attemptedQuizzes.length})
            </h2>
            <div className="relative">
              <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide snap-x snap-mandatory">
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
            </div>
          </div>
        ) : (
          <p className="mt-8 text-center text-gray-500 text-sm">
            No test attempted yet!
          </p>
        )}

        {/* ================= PERFORMANCE SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center md:text-left">
                Quiz Performance
              </h2>

              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8">
                {/* CHART */}
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

                {/* STATS CARDS */}
                <div className="grid grid-cols-2 gap-4 w-full lg:w-1/3">
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

            <div className="border-t border-gray-200 pt-6">
              <ReviewSection />
            </div>
          </div>
        </motion.div>

        {/* POPUPS */}
        <ViewQuizPop
          isOpen={isQuizPopOpen}
          onClose={() => setIsQuizPopOpen(false)}
          quiz={selectedQuiz}
        />

        <ChangePassword
          isOpen={showPassword}
          onClose={() => setShowPassword(false)}
          onSubmit={handleSave}
          loading={pwdLoading}
        />
      </div>
    </>
  );
};

export default React.memo(UserProfile);
