import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCamera, FaSave, FaEdit, FaTimes, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useCourseStore } from "../../Zustand/GetAllCourses";

const API_BASE = "http://194.238.18.1:3004/api";

const ProfileEditDropdown = ({ user, onUpdate }) => {
  const { data: coursesData = [] } = useCourseStore();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("auth"))?.user || {};
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  const user_id = storedUser._id || user?._id;

  const initialData = {
    fullname: storedUser.fullname || user?.fullname || "",
    email: storedUser.email || user?.email || "",
    phone: storedUser.phone || user?.phone || "",
    course: storedUser?.preferedCourse || user?.preferedCourse || "",
    image: storedUser.profileImage || user?.profileImage || null,
  };

  const [form, setForm] = useState(initialData);
  const [preview, setPreview] = useState(initialData.image);
  const fileRef = useRef(null);

  const handleChange = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        handleChange("image", file);
      }
    },
    [handleChange]
  );

  const handleSave = async () => {
    if (!form.phone.trim()) return toast.warn("Phone number is required");
    if (!form.course) return toast.warn("Please select a course");
    if (!token) return toast.error("Unauthorized! Please login again.");

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("phone", form.phone);
      payload.append("course", form.course);
      if (form.image instanceof File) payload.append("profileImage", form.image);

      const res = await axios.patch(`${API_BASE}/profile/update/${user_id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      //  Show success message
      toast.success("Profile updated successfully!");

      //  Update localStorage with the new user info
      const existingAuth = JSON.parse(localStorage.getItem("auth")) || {};
      const updatedUser = { ...existingAuth.user, ...res.data.user };

      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...existingAuth,
          user: updatedUser,
        })
      );

      //  Update UI
      onUpdate?.(res.data.user);
      setEditMode(false);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update profile";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };


  const handleCancel = () => {
    setEditMode(false);
    setForm(initialData);
    setPreview(initialData.image);
  };

  return (
    <div className="relative w-full max-w-full mx-auto">
      <AnimatePresence>
        <motion.div
          key="dropdown"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className=" bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6"
        >
          {/* Header */}
          <div className="flex justify-end items-center mb-5">
            {/* <h2 className="text-lg font-semibold text-gray-800">Profile Details</h2> */}
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-end gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                <FaEdit /> Edit
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
                >
                  {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>
          <div className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Profile Photo */}
            <div className="flex flex-col items-center">

              <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                {preview ? (
                  <img src={preview} alt="profile" className="object-cover w-full h-full" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <FaCamera size={28} />
                  </div>
                )}
                {editMode && (
                  <>
                    <button
                      type="button"
                      onClick={() => fileRef.current.click()}
                      className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                    >
                      <FaCamera size={14} />
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>
              {editMode && <p className="text-xs text-gray-500 mt-2">Upload new photo</p>}
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <Field label="Full Name" value={form.fullname} readOnly />
              <Field label="Email" value={form.email} readOnly />
              <Field
                label="Phone Number"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                disabled={!editMode}
              />

              <div>
                <div className="flex items-center justify-between">

                  <label className="block text-sm text-gray-600 mb-1">Select Course</label>
                  <span className="text-xs" >

                    <span className="text-xs text-gray-500">
                      Your:{" "}
                      {form.course
                        ? form.course
                        : "No course selected"}
                    </span>
                  </span>
                </div>
                <select
                  value={form.course}
                  onChange={(e) => handleChange("course", e.target.value)}
                  disabled={!editMode}
                  className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none transition ${editMode
                      ? "border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                >
                  <option value="">-- Select Course --</option>
                  {coursesData.map((c, i) => (
                    <option key={i} value={c.courseDetails || c.name || c.title}>
                      {c.courseDetails || c.name || c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Field = ({ label, value, onChange, readOnly, disabled }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      disabled={disabled}
      className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none transition ${disabled || readOnly
          ? "border-gray-200 bg-gray-50 text-gray-600"
          : "border-blue-400 focus:ring-2 focus:ring-blue-100"
        }`}
    />
  </div>
);

export default React.memo(ProfileEditDropdown);
