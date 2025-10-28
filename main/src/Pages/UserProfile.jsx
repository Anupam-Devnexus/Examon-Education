import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FaEdit, FaSave, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import ProfileQuizCard from "../Component/Card/ProfleQuizCard";
import Datas from "../DataStore/User.json";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * UserProfile
 * - editable except email and phone (phone is always read-only)
 * - image upload preview
 * - password change (optional) with validation
 * - client-side validation for names, passed/failed counts
 * - toasts for feedback
 * - responsive via Tailwind classes
 *
 * NOTE: Replace the `saveProfileToServer` placeholder with your real API call.
 */

const initialUserFromData = () => {
  // If Datas exists and has userProfile, use it; otherwise fallback
  const src = Datas?.userProfile;
  if (!src) {
    return {
      firstName: "Vansh",
      lastName: "Kaushik",
      email: "vanshkaushik0012@gmail.com",
      phone: "9711034055",
      countryCode: "+91",
      passed: 10,
      failed: 2,
      profileImg: "/logo2.svg",
    };
  }
  return {
    firstName: src.firstName ?? "Vansh",
    lastName: src.lastName ?? "Kaushik",
    email: src.email ?? "vanshkaushik0012@gmail.com",
    phone: src.phone ?? "9711034055",
    countryCode: src.countryCode ?? "+91",
    passed: Number(src.passed ?? 10),
    failed: Number(src.failed ?? 2),
    profileImg: src.profileImg ?? "/logo2.svg",
  };
};

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(initialUserFromData());
  const [draft, setDraft] = useState(user); // draft for edits
  const [chartData, setChartData] = useState([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [loadingSave, setLoadingSave] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password fields (not stored in actual user object here)
  const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });

  useEffect(() => {
    setChartData([
      { name: "Passed", value: Number(user.passed || 0), color: "#16A34A" },
      { name: "Failed", value: Number(user.failed || 0), color: "#EF4444" },
    ]);
  }, [user.passed, user.failed]);

  useEffect(() => {
    setAttemptedQuizzes(Datas?.userProfile?.previousExams ?? []);
  }, []);

  const totalQuiz = Number(user.passed || 0) + Number(user.failed || 0);

  // Validation
  const validateDraft = () => {
    const errors = [];
    if (!draft.firstName || draft.firstName.trim().length < 1) errors.push("First name is required.");
    if (!draft.lastName || draft.lastName.trim().length < 1) errors.push("Last name is required.");
    const passed = Number(draft.passed);
    const failed = Number(draft.failed);
    if (Number.isNaN(passed) || passed < 0 || !Number.isInteger(passed)) errors.push("Passed must be a non-negative integer.");
    if (Number.isNaN(failed) || failed < 0 || !Number.isInteger(failed)) errors.push("Failed must be a non-negative integer.");
    if (passwords.password || passwords.confirmPassword) {
      if (passwords.password.length < 8) errors.push("Password must be at least 8 characters.");
      if (passwords.password !== passwords.confirmPassword) errors.push("Passwords do not match.");
    }
    return errors;
  };

  const showErrorsToast = (errs) => {
    errs.forEach((e) => toast.error(e));
  };

  // Simulated save function - replace with real API call
  const saveProfileToServer = async (payload) => {
    // Example:
    // const resp = await fetch("/api/user/update", { method: "POST", body: JSON.stringify(payload) });
    // return resp.json();
    // Simulate latency:
    return new Promise((resolve) => setTimeout(() => resolve({ ok: true, data: payload }), 700));
  };

  const handleSave = async () => {
    const errs = validateDraft();
    if (errs.length) {
      showErrorsToast(errs);
      return;
    }

    setLoadingSave(true);
    toast.info("Saving profile...");
    try {
      const payload = { ...draft };
      if (passwords.password) payload.password = passwords.password; // send only if user changed
      const res = await saveProfileToServer(payload);
      if (res?.ok) {
        setUser(draft);
        setEditMode(false);
        setPasswords({ password: "", confirmPassword: "" });
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to save profile. Try again.");
      }
    } catch (err) {
      toast.error("An error occurred while saving.");
      // optionally console.log(err);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleCancel = () => {
    setDraft(user);
    setPasswords({ password: "", confirmPassword: "" });
    setEditMode(false);
    toast.info("Edits cancelled.");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Keep numeric fields as numbers when possible
    if (name === "passed" || name === "failed") {
      // allow empty input, otherwise parse integer
      const parsed = value === "" ? "" : parseInt(value.replace(/\D/g, ""), 10);
      setDraft((p) => ({ ...p, [name]: isNaN(parsed) ? "" : parsed }));
    } else {
      setDraft((p) => ({ ...p, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setDraft((p) => ({ ...p, profileImg: imageURL }));
      toast.success("Preview updated. Save to persist.");
      // If you'd like to upload immediately, do that here.
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((p) => ({ ...p, [name]: value }));
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="max-w-full mb-18 mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 bg-white p-6 rounded-2xl shadow-md">
          {/* Left: Avatar */}
          <div className="flex flex-col items-center gap-3 w-full md:w-1/4">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border border-gray-200">
              <img
                src={draft.profileImg || "/logo2.svg"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <label
              htmlFor="profileImage"
              className={`text-sm text-gray-600 border border-gray-300 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-50 transition ${
                !editMode ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {editMode ? "Upload new photo" : "Upload disabled"}
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={!editMode}
              />
            </label>

            {editMode && (
              <button
                type="button"
                className="text-sm text-red-600 hover:underline mt-1"
                onClick={() => {
                  setDraft((p) => ({ ...p, profileImg: "/logo2.svg" }));
                  toast.info("Avatar reset to default. Save to persist.");
                }}
              >
                Reset avatar
              </button>
            )}
          </div>

          {/* Middle: Form */}
          <div className="flex-1 w-full">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-sm text-gray-500 mt-1">Profile details</p>
              </div>

              <div className="flex gap-2">
                {!editMode ? (
                  <button
                    onClick={() => {
                      setDraft(user);
                      setEditMode(true);
                    }}
                    className="flex items-center gap-2 text-sm bg-white border px-3 py-2 rounded-xl hover:shadow-md transition"
                    aria-label="Edit profile"
                  >
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={loadingSave}
                      className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-3 py-2 rounded-xl hover:opacity-95 transition"
                    >
                      <FaSave /> {loadingSave ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-white border px-3 py-2 rounded-xl hover:shadow-md transition"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* First Name */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">First Name</label>
                <input
                  name="firstName"
                  value={draft.firstName}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`border rounded-xl px-3 py-2 text-gray-800 w-full ${
                    editMode
                      ? "border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] bg-white"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Last Name</label>
                <input
                  name="lastName"
                  value={draft.lastName}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`border rounded-xl px-3 py-2 text-gray-800 w-full ${
                    editMode
                      ? "border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] bg-white"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              {/* Email (read-only) */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Email</label>
                <input
                  name="email"
                  value={draft.email}
                  readOnly
                  className="border rounded-xl px-3 py-2 text-gray-600 w-full border-gray-200 bg-gray-50 cursor-not-allowed"
                  title="Email cannot be changed here"
                />
              </div>

              {/* Phone (read-only) */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Phone</label>
                <div className="flex gap-2">
                  <input
                    name="countryCode"
                    value={draft.countryCode}
                    onChange={handleInputChange}
                    disabled={true} // per request: phone can't be changed
                    className="w-20 border rounded-xl px-3 py-2 text-gray-600 border-gray-200 bg-gray-50 cursor-not-allowed"
                    title="Phone country code cannot be changed here"
                  />
                  <input
                    name="phone"
                    value={draft.phone}
                    readOnly
                    className="flex-1 border rounded-xl px-3 py-2 text-gray-600 border-gray-200 bg-gray-50 cursor-not-allowed"
                    title="Phone number cannot be changed here"
                  />
                </div>
              </div>

              {/* Passed */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Passed</label>
                <input
                  name="passed"
                  value={draft.passed === "" ? "" : draft.passed}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  inputMode="numeric"
                  className={`border rounded-xl px-3 py-2 text-gray-800 w-full ${
                    editMode
                      ? "border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] bg-white"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              {/* Failed */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Failed</label>
                <input
                  name="failed"
                  value={draft.failed === "" ? "" : draft.failed}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  inputMode="numeric"
                  className={`border rounded-xl px-3 py-2 text-gray-800 w-full ${
                    editMode
                      ? "border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] bg-white"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              {/* Password Change (optional) - full width on small screens */}
              <div className="sm:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm mb-1">New Password (optional)</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={passwords.password}
                      onChange={handlePasswordChange}
                      disabled={!editMode}
                      placeholder={editMode ? "Enter new password" : "Enable edit to change"}
                      className={`border rounded-xl px-3 py-2 pr-10 text-gray-800 w-full ${
                        editMode
                          ? "border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] bg-white"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2 top-2 text-gray-500"
                      tabIndex={-1}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600 text-sm mb-1">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    disabled={!editMode}
                    placeholder={editMode ? "Confirm new password" : "Enable edit to change"}
                    className={`border rounded-xl px-3 py-2 text-gray-800 w-full ${
                      editMode
                        ? "border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] bg-white"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Chart & Stats */}
          <div className="w-full md:w-1/4 flex flex-col items-center gap-4">
            <div className="w-full h-44 md:h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius="55%"
                    outerRadius="80%"
                    paddingAngle={4}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {chartData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center ">
              <p className="text-sm text-gray-500">Total Quizzes</p>
              <p className="text-2xl font-bold text-gray-800">{totalQuiz}</p>
            </div>

            <div className="flex flex-col items-start gap-2 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-600 rounded-full" /> Passed: {user.passed}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full" /> Failed: {user.failed}
              </span>
            </div>
          </div>
        </div>

        {/* Attempted Quizzes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Attempted Quizzes</h2>
          {attemptedQuizzes && attemptedQuizzes.length > 0 ? (
            <div className="flex gap-5 mb-6 overflow-x-auto pb-4 px-1 snap-x snap-mandatory scroll-smooth">
              {attemptedQuizzes.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 snap-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <ProfileQuizCard
                    examName={item.examName}
                    year={item.year}
                    score={item.score}
                    rank={item.rank}
                    result={item.result}
                    icon="/icons/quiz.svg"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No exams attempted yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
