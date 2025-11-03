import { create } from "zustand";
import axios from "axios";

export const useExamStore = create((set, get) => ({
  exams: [],
  loading: false,
  error: null,

  // Pagination meta
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,

  baseApi: "http://194.238.18.1:3004/api",

  /**
   * ✅ Fetch all exams with pagination support
   * - Handles paginated API responses
   * - Graceful loading/error states
   * - Avoids redundant re-fetches
   */
  fetchAllExams: async (page = 1, forceRefresh = false) => {
    const { exams, baseApi } = get();

    // Prevent unnecessary re-fetching unless forced
    if (exams.length > 0 && !forceRefresh && page === get().currentPage) return;

    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${baseApi}/exams/details?page=${page}`);

      // Validate structure
      if (!response.data || !Array.isArray(response.data.data)) {
        throw new Error("Invalid API response structure");
      }

      const { data, currentPage, totalPages, totalCount } = response.data;

      set({
        exams: data, // ✅ Now stores the "data" array
        currentPage: currentPage || 1,
        totalPages: totalPages || 1,
        totalCount: totalCount || data.length,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("❌ Error fetching exams:", error);
      set({
        error: error.response?.data?.message || error.message || "Failed to fetch exams",
        loading: false,
      });
    }
  },

  /** ✅ Clear all stored exam data (useful on logout or refresh) */
  resetStore: () =>
    set({
      exams: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
    }),
}));
