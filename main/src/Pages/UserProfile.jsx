import React, { useEffect, useState, useMemo, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FaEdit, FaSave, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileQuizCard from "../Component/Card/ProfleQuizCard";
import Datas from "../DataStore/User.json";
import { useAuthStore } from "../Zustand/useAuthStore";

/* --------------------------------------------------------------------------
 *  INITIAL HELPER: Fallback user data for initial render
 * -------------------------------------------------------------------------- */
const initialUserFromData = () => {
  const src = Datas?.userProfile || {};
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

/* --------------------------------------------------------------------------
 *  MAIN COMPONENT
 * -------------------------------------------------------------------------- */
const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(initialUserFromData());
  const [draft, setDraft] = useState(user);
  const [loadingSave, setLoadingSave] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });

  const { user: authUser, accessToken } = useAuthStore();

  // Derived data
  const chartData = useMemo(
    () => [
      { name: "Passed", value: Number(user.passed || 0), color: "#16A34A" },
      { name: "Failed", value: Number(user.failed || 0), color: "#EF4444" },
    ],
    [user.passed, user.failed]
  );

  const attemptedQuizzes = useMemo(
    () => Datas?.userProfile?.previousExams ?? [],
    []
  );

  const totalQuiz = useMemo(
    () => Number(user.passed || 0) + Number(user.failed || 0),
    [user.passed, user.failed]
  );

  /* --------------------------------------------------------------------------
   *  VALIDATION
   * -------------------------------------------------------------------------- */
  const validateDraft = useCallback(() => {
    const errors = [];
    if (!draft.firstName?.trim()) errors.push("First name is required.");
    if (!draft.lastName?.trim()) errors.push("Last name is required.");

    const passed = Number(draft.passed);
    const failed = Number(draft.failed);
    if (Number.isNaN(passed) || passed < 0) errors.push("Passed must be a non-negative number.");
    if (Number.isNaN(failed) || failed < 0) errors.push("Failed must be a non-negative number.");

    if (passwords.password || passwords.confirmPassword) {
      if (passwords.password.length < 8) errors.push("Password must be at least 8 characters long.");
      if (passwords.password !== passwords.confirmPassword) errors.push("Passwords do not match.");
    }

    return errors;
  }, [draft, passwords]);

  /* --------------------------------------------------------------------------
   *  SAVE FUNCTION (Replace with API call)
   * -------------------------------------------------------------------------- */
  const saveProfileToServer = useCallback(async (payload) => {
    try {
      // Example API call:
      // const response = await axios.post("/api/user/update", payload, { headers: { Authorization: `Bearer ${accessToken}` } });
      // return response.data;

      // Simulated latency for demo
      return await new Promise((resolve) =>
        setTimeout(() => resolve({ ok: true, data: payload }), 700)
      );
    } catch (error) {
      console.error("Save failed:", error);
      return { ok: false };
    }
  }, []);

  /* --------------------------------------------------------------------------
   *  EVENT HANDLERS
   * -------------------------------------------------------------------------- */
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    if (["passed", "failed"].includes(name)) {
      const parsed = value === "" ? "" : parseInt(value.replace(/\D/g, ""), 10);
      setDraft((prev) => ({ ...prev, [name]: isNaN(parsed) ? "" : parsed }));
    } else {
      setDraft((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const { name, value } = e.target;
    setPasswords((p) => ({ ...p, [name]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setDraft((p) => ({ ...p, profileImg: imageURL }));
      toast.success("Preview updated. Save to persist.");
    }
  }, []);

  const handleSave = useCallback(async () => {
    const errs = validateDraft();
    if (errs.length) {
      errs.forEach((e) => toast.error(e));
      return;
    }

    setLoadingSave(true);
    toast.info("Saving profile...");

    const payload = { ...draft };
    if (passwords.password) payload.password = passwords.password;

    const res = await saveProfileToServer(payload);

    if (res.ok) {
      setUser(draft);
      setEditMode(false);
      setPasswords({ password: "", confirmPassword: "" });
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to save profile. Try again.");
    }

    setLoadingSave(false);
  }, [draft, passwords, validateDraft, saveProfileToServer]);

  const handleCancel = useCallback(() => {
    setDraft(user);
    setPasswords({ password: "", confirmPassword: "" });
    setEditMode(false);
    toast.info("Edits cancelled.");
  }, [user]);

  /* --------------------------------------------------------------------------
   *  DEVELOPMENT LOGGING (disabled in production)
   * -------------------------------------------------------------------------- */
  useEffect(() => {
    if (import.meta.env.MODE === "development") {
      console.group("👤 User Profile Debug Info");
      console.log("User:", user);
      console.log("Draft:", draft);
      console.log("Auth User:", authUser);
      console.log("Access Token:", accessToken ? accessToken.slice(0, 30) + "..." : "None");
      console.log("Attempted Quizzes:", attemptedQuizzes);
      console.groupEnd();
    }
  }, [user, draft, authUser, accessToken, attemptedQuizzes]);

  /* --------------------------------------------------------------------------
   *  UI RENDER
   * -------------------------------------------------------------------------- */
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="max-w-full mb-18 mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 bg-white p-6 rounded-2xl shadow-md">
          {/* ------------------- LEFT: PROFILE IMAGE ------------------- */}
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

          {/* ------------------- MIDDLE: FORM ------------------- */}
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
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 text-sm bg-white border px-3 py-2 rounded-xl hover:shadow-md transition"
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

            {/* ------------------- INPUT GRID ------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {["firstName", "lastName"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-gray-600 text-sm mb-1 capitalize">{field}</label>
                  <input
                    name={field}
                    value={draft[field]}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className={`border rounded-xl px-3 py-2 text-gray-800 w-full ${
                      editMode
                        ? "border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] bg-white"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
              ))}

              {/* Read-only fields */}
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Email</label>
                <input
                  name="email"
                  value={draft.email}
                  readOnly
                  className="border rounded-xl px-3 py-2 text-gray-600 w-full border-gray-200 bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Phone</label>
                <div className="flex gap-2">
                  <input
                    name="countryCode"
                    value={draft.countryCode}
                    disabled
                    className="w-20 border rounded-xl px-3 py-2 text-gray-600 border-gray-200 bg-gray-50 cursor-not-allowed"
                  />
                  <input
                    name="phone"
                    value={draft.phone}
                    readOnly
                    className="flex-1 border rounded-xl px-3 py-2 text-gray-600 border-gray-200 bg-gray-50 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Numeric fields */}
              {["passed", "failed"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-gray-600 text-sm mb-1 capitalize">{field}</label>
                  <input
                    name={field}
                    value={draft[field] === "" ? "" : draft[field]}
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
              ))}

              {/* Password Fields */}
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

          {/* ------------------- RIGHT: PIE CHART ------------------- */}
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

            <div className="text-center">
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

        {/* ------------------- ATTEMPTED QUIZZES ------------------- */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Attempted Quizzes</h2>
          {attemptedQuizzes.length > 0 ? (
            <div className="flex gap-5 mb-6 overflow-x-auto pb-4 px-1 snap-x snap-mandatory scroll-smooth">
              {attemptedQuizzes.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 snap-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <ProfileQuizCard {...item} icon="/icons/quiz.svg" />
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
