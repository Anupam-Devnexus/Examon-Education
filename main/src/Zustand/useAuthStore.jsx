import { create } from "zustand";
import axios from "axios";

/** 🔒 Utility: Safe JSON parse for localStorage */
const safeParse = (str) => {
  try {
    return str ? JSON.parse(str) : null;
  } catch {
    console.warn("Invalid JSON in localStorage");
    return null;
  }
};

/** 🧠 Zustand Auth Store */
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  initialized: false,

  /** 🚀 Initialize auth state from localStorage */
  initialize: () => {
    const stored = safeParse(localStorage.getItem("userData"));
    if (stored?.token && stored?.user) {
      set({
        user: stored.user,
        token: stored.token,
        isAuthenticated: true,
      });
    }
    set({ initialized: true });
  },

  /** 🔑 Login handler */
  signin: async (credentials) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.post(
        "http://194.238.18.1:3004/api/signin",
        credentials,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { token, user, message } = data;
      if (!token || !user) throw new Error("Invalid login response");

      // Persist session
      localStorage.setItem("userData", JSON.stringify({ token, user }));

      // Update state
      set({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });

      // Broadcast to other tabs/components
      window.dispatchEvent(new Event("auth-changed"));

      return { success: true, message: message || "Login successful" };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      console.error("Login Error:", msg);
      set({ loading: false, error: msg });
      return { success: false, message: msg };
    }
  },

  /** 🧍 Signup handler (auto-login on success) */
  signup: async (payload) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.post(
        "http://194.238.18.1:3004/api/signup",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user, message } = data;
      if (!token || !user) throw new Error("Invalid signup response");

      localStorage.setItem("userData", JSON.stringify({ token, user }));

      set({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });

      window.dispatchEvent(new Event("auth-changed"));

      return { success: true, message: message || "Signup successful" };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Signup failed";
      console.error("Signup Error:", msg);
      set({ loading: false, error: msg });
      return { success: false, message: msg };
    }
  },

  /**  Logout handler */
  logout: () => {
    localStorage.removeItem("userData");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
window.refresh();
    window.dispatchEvent(new Event("auth-changed"));
  },
}));
