import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../Zustand/useAuthStore";
import { useCourseStore } from "../Zustand/GetAllCourses";
import ChangePassword from "../Component/Profile/ChangePassword";
import ProfileQuizCard from "../Component/Card/ProfleQuizCard";
import { ReviewSection } from "../Component/Review/ReivewSection";
import UserProfileHeader from "../Component/Profile/UserProfileHeader";

const API_BASE = "http://194.238.18.1:3004/api";
const api = axios.create({ baseURL: API_BASE, withCredentials: true });

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Access router state
  const { logout } = useAuthStore();
  const { fetchCourses } = useCourseStore();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ phone: "" });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const fileInputRef = useRef(null);

  // ===============================
  // FETCH USER + COURSES
  // ===============================
  useEffect(() => {
    fetchCourses?.();

    // 1️⃣ Try getting user from router state
    const stateUser = location?.state?.user;

    // 2️⃣ Fallback to localStorage mock data if user is null
    const authData = localStorage.getItem("auth");
    const parsedUser = authData ? JSON.parse(authData)?.user : null;

    const finalUser = stateUser || parsedUser;

    if (!finalUser) {
      navigate("/login");
      return;
    }

    // 3️⃣ Store/prepare user data
    setUser(finalUser);
    setForm({ phone: finalUser.phone || "" });
    setSelectedCourse(finalUser.course || finalUser.preferedCourse || "");
    setImagePreview(finalUser.profileImg || finalUser.profileImage || null);
  }, [location, navigate, fetchCourses]);

  // ===============================
  // LOGOUT
  // ===============================
  const handleLogout = useCallback(() => {
    logout();
    localStorage.removeItem("auth");
    toast.success("Logged out successfully!");
    navigate("/login");
  }, [logout, navigate]);

  // ===============================
  // PASSWORD CHANGE
  // ===============================
  const handleSavePassword = useCallback(
    async (newPwd) => {
      if (!user?._id) return;
      setPwdLoading(true);
      try {
        await api.patch(`/user/${user._id}/password`, { password: newPwd });
        toast.success("Password changed successfully!");
        setShowPassword(false);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to change password.");
      } finally {
        setPwdLoading(false);
      }
    },
    [user]
  );

  // ===============================
  // QUIZ DATA
  // ===============================
  const attemptedQuizzes = user?.attemptedQuizzes || [];
  console.log("Attempted Quizzes:", attemptedQuizzes);

  const quizStats = useMemo(() => {
    if (!attemptedQuizzes.length) return { passed: 0, failed: 0 };
    return attemptedQuizzes.reduce(
      (acc, q) => {
        const total = q.totalMarks || q.totalQuestions || 1;
        const pct = (q.score / total) * 100;
        pct >= 40 ? acc.passed++ : acc.failed++;
        return acc;
      },
      { passed: 0, failed: 0 }
    );
  }, [attemptedQuizzes]);

  const chartData = useMemo(
    () => [
      { name: "Passed", value: quizStats.passed, color: "#22C55E" },
      { name: "Failed", value: quizStats.failed, color: "#EF4444" },
    ],
    [quizStats]
  );

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="min-h-screen mb-18 py-8 px-4 md:px-10 relative">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-8 border-b pb-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          My Profile
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-400 rounded-xl font-medium shadow-sm hover:bg-red-50 hover:shadow-md transition-all duration-200"
          >
            <span>Logout</span>
            <FaSignOutAlt />
          </button>

          <button
            onClick={() => setShowPassword(true)}
            className="p-3 rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 transition-all"
            title="Change Password"
          >
            <BsThreeDotsVertical className="text-gray-600 text-lg" />
          </button>
        </div>
      </header>

      {/* PROFILE HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-10"
      >
        <UserProfileHeader
          user={user}
          form={form}
          setForm={setForm}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          imagePreview={imagePreview}
          fileInputRef={fileInputRef}
        />
      </motion.div>

      {/* QUIZ SECTION */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
             Attempted Quizzes
          </h2>
          <span className="text-gray-500 text-sm font-medium">
            {attemptedQuizzes.length} Attempted
          </span>
        </div>

        {attemptedQuizzes.length > 0 ? (
          <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide snap-x snap-mandatory">
            {attemptedQuizzes.map((quiz, i) => (
              <div
                key={i}
                className="min-w-[260px] flex-shrink-0 snap-start transition-transform hover:scale-[1.03]"
              >
                <ProfileQuizCard quiz={quiz} onView={() => setSelectedQuiz(quiz)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <img
              src="/no-data.svg"
              alt="No quiz"
              className="h-28 w-28 opacity-60 mb-3"
            />
            <p className="text-sm md:text-base">No quizzes attempted yet!</p>
          </div>
        )}
      </section>

      {/* PERFORMANCE SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
           Quiz Performance Overview
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-2/3 lg:w-1/2 h-[260px] md:h-[320px]">
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

          <div className="grid grid-cols-2 gap-6 w-full lg:w-1/3">
            {[
              { label: "Passed", value: quizStats.passed, color: "text-green-600" },
              { label: "Failed", value: quizStats.failed, color: "text-red-600" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 p-6 bg-gray-50 text-center shadow-sm hover:shadow-md transition-all"
              >
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6">
          <ReviewSection />
        </div>
      </motion.section>

      {showPassword && (
        <ChangePassword
          isOpen={showPassword}
          onClose={() => setShowPassword(false)}
          onSubmit={handleSavePassword}
          loading={pwdLoading}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default React.memo(UserProfile);
