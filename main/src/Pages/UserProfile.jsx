import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaSignOutAlt,
} from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProfileQuizCard from "../Component/Card/ProfleQuizCard";

/* ==========================================================================
   USER PROFILE COMPONENT
   ========================================================================== */
const UserProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState({});
  const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* --------------------------------------------------------------------------
   *  LOAD USER FROM LOCALSTORAGE
   * -------------------------------------------------------------------------- */
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const { user } = JSON.parse(stored);
      setUser(user);
      setDraft(user);
    } else {
      toast.error("User not logged in.");
      navigate("/login");
    }
  }, [navigate]);

  /* --------------------------------------------------------------------------
   *  QUIZ CHART (FAKE DATA UNTIL REAL DATA AVAILABLE)
   * -------------------------------------------------------------------------- */
  const chartData = useMemo(
    () => [
      { name: "Passed", value: user.passed || 0, color: "#16A34A" },
      { name: "Failed", value: user.failed || 0, color: "#EF4444" },
    ],
    [user]
  );

  /* --------------------------------------------------------------------------
   *  VALIDATION + SAVE HANDLER
   * -------------------------------------------------------------------------- */
  const validate = useCallback(() => {
    const errors = [];
    if (!draft.fullname?.trim()) errors.push("Full name cannot be empty.");
    if (passwords.password || passwords.confirmPassword) {
      if (passwords.password.length < 8)
        errors.push("Password must be at least 8 characters.");
      if (passwords.password !== passwords.confirmPassword)
        errors.push("Passwords do not match.");
    }
    return errors;
  }, [draft, passwords]);

  const handleSave = useCallback(() => {
    const errors = validate();
    if (errors.length) {
      errors.forEach((msg) => toast.error(msg));
      return;
    }

    setLoading(true);
    try {
      // simulate update — just localStorage update
      const updatedUser = {
        ...user,
        fullname: draft.fullname,
        ...(passwords.password && { password: passwords.password }),
      };

      const stored = JSON.parse(localStorage.getItem("auth")) || {};
      localStorage.setItem("auth", JSON.stringify({ ...stored, user: updatedUser }));
      setUser(updatedUser);
      setEditMode(false);
      setPasswords({ password: "", confirmPassword: "" });

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }, [draft, passwords, user, validate]);

  /* --------------------------------------------------------------------------
   *  LOGOUT HANDLER
   * -------------------------------------------------------------------------- */
  const handleLogout = useCallback(() => {
    localStorage.removeItem("auth");
    toast.success("Logged out successfully!");
    navigate("/login");
  }, [navigate]);

  /* --------------------------------------------------------------------------
   *  UI RENDER
   * -------------------------------------------------------------------------- */
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="max-w-7xl p-6 mb-10">
        <div className="flex flex-col md:flex-row justify-between gap-6 bg-white p-6 rounded-2xl shadow-md">
          {/* LEFT PROFILE IMAGE + INFO */}
          <div className="flex flex-col items-center gap-3 w-full md:w-1/4">
            <img
              src={user.profileImg || "/logo2.svg"}
              alt="Profile"
              className="w-32 h-32 md:w-36 md:h-36 rounded-full border object-cover"
            />
            <p className="text-lg font-semibold mt-2 text-gray-800">
              {user.fullname}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 flex items-center gap-2 text-sm text-red-600 border border-red-500 px-4 py-2 rounded-xl hover:bg-red-50 transition-all"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-start">
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
                    className="flex items-center gap-2 text-sm bg-[var(--primary-color)] text-white px-4 py-2 rounded-xl hover:opacity-90 disabled:opacity-70"
                  >
                    <FaSave />
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setDraft(user);
                      setEditMode(false);
                      setPasswords({ password: "", confirmPassword: "" });
                    }}
                    className="flex items-center gap-2 text-sm bg-white border px-4 py-2 rounded-xl hover:shadow-md"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Full Name</label>
                <input
                  name="fullname"
                  value={draft.fullname || ""}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, fullname: e.target.value }))
                  }
                  disabled={!editMode}
                  className={`border rounded-xl px-3 py-2 text-gray-800 ${
                    editMode
                      ? "border-[var(--primary-color)] bg-white"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Email</label>
                <input
                  value={user.email || ""}
                  readOnly
                  className="border rounded-xl px-3 py-2 text-gray-600 border-gray-200 bg-gray-50"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Role</label>
                <input
                  value={user.role || "user"}
                  readOnly
                  className="border rounded-xl px-3 py-2 text-gray-600 border-gray-200 bg-gray-50"
                />
              </div>

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
                      className="border rounded-xl px-3 py-2 pr-10 border-[var(--primary-color)]"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2 top-2 text-gray-500"
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
                      className="border rounded-xl px-3 py-2 border-[var(--primary-color)]"
                      placeholder="Re-enter password"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* CHART + QUIZ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quiz Performance
          </h2>
          <div className="flex items-center gap-10">
            <ResponsiveContainer width="30%" height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div>
              {chartData.map((d) => (
                <p key={d.name} className="text-gray-600 text-sm">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: d.color }}
                  ></span>
                  {d.name}: {d.value}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default UserProfile;
