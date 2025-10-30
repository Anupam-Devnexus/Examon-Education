// src/Zustand/GetAllCourses.js
import { create } from "zustand";
import axios from "axios";

const API_BASE = "http://194.238.18.1:3004/api";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const useCourseStore = create((set, get) => ({
  data: [],
  categories: [],
  selectedCategory: "All",
  currentPage: 1,
  totalPages: 1,
  perPage: 8,
  loading: false,
  error: null,

  // ✅ Fetch all courses once
  fetchCourses: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${API_BASE}/course/all`);
      const apiData = response.data;

      // Flatten courses
      const formattedCourses = apiData.data.flatMap((category) =>
        category.courses.map((course) => ({
          id: course._id,
          img: course.img,
          actualprice: course.actualprice,
          previousprice: course.previousprice,
          percent: course.percent,
          courseDetails: course.title,
          insideCourses: course.insideCourses,
          perks: course.perks,
          Discount: course.Discount,
          amount: course.amount,
          examCategory: category.examCategory,
        }))
      );

      const categories = ["All", ...apiData.data.map((c) => c.examCategory)];

      set({
        data: formattedCourses,
        categories,
        loading: false,
        totalPages: Math.ceil(formattedCourses.length / get().perPage),
      });
    } catch (err) {
      console.error("Fetch courses failed:", err);
      set({
        error:
          err.response?.data?.message || "Failed to fetch courses. Please try again.",
        loading: false,
      });
    }
  },

  // ✅ Filter by category
  fetchCoursesByCategory: (category) => {
    const { data, perPage } = get();

    const filtered =
      category === "All"
        ? data
        : data.filter((c) => c.examCategory === category);

    set({
      selectedCategory: category,
      totalPages: Math.ceil(filtered.length / perPage),
      currentPage: 1,
    });
  },

  // ✅ Pagination
  setPage: (page) => {
    const { totalPages } = get();
    if (page >= 1 && page <= totalPages) set({ currentPage: page });
  },

  resetCourses: () =>
    set({
      data: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      selectedCategory: "All",
    }),
}));
