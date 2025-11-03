// src/Zustand/useAuthStore.js
import { create } from "zustand";
import axios from "axios";

/**
 * Simple helper to safely parse stored session.
 * - First tries JSON.parse (for plain JSON).
 * - If that fails and CryptoJS is available, you can extend this to decrypt.
 */
const safeParseStored = (str) => {
  if (!str) return null;

  try {
    return JSON.parse(str);
  } catch (e) {
    // If you store encrypted data (CryptoJS AES), you'd decrypt here.
    // For example:
    // try {
    //   const bytes = CryptoJS.AES.decrypt(str, SECRET_KEY);
    //   const json = bytes.toString(CryptoJS.enc.Utf8);
    //   return JSON.parse(json);
    // } catch (err) { return null; }
    return null;
  }
};

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  initialized: false,

  /**
   * initialize / restoreSession
   * - Should be called once on app boot.
   * - Restores session (if any) from localStorage/sessionStorage.
   */
  initialize: () => {
    try {
      // Try the common key used in your Login component
      const raw = localStorage.getItem("userData"); // previously: JSON.stringify({ token, user })
      let session = safeParseStored(raw);

      // If your roadmap used separate keys, try them too
      if (!session) {
        const storedUser = localStorage.getItem("app_user");
        const storedToken = localStorage.getItem("app_token");
        const parsedUser = safeParseStored(storedUser);
        const parsedToken = safeParseStored(storedToken);
        if (parsedUser || parsedToken) {
          session = { user: parsedUser || null, token: parsedToken || null };
        }
      }

      // session may be { token, user } or null
      if (session?.token || session?.user) {
        set({
          user: session.user || null,
          token: session.token || null,
          isAuthenticated: !!session.token,
        });
      }
    } catch (err) {
      console.error("Failed to restore session:", err);
    } finally {
      // mark initialized always so the app doesn't hang waiting forever
      set({ initialized: true });
    }
  },

  // alias for backward compatibility
  restoreSession: () => {
    // simply call initialize
    get().initialize();
  },

  // signin (login)
  signin: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("http://194.238.18.1:3004/api/signin", credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const { token, user } = res.data || {};

      // Store plain JSON for now (you can encrypt using CryptoJS before storing)
      localStorage.setItem("userData", JSON.stringify({ token, user }));
      // optionally: sessionStorage.setItem("accessToken", token);

      set({
        user: user || null,
        token: token || null,
        isAuthenticated: !!token,
        loading: false,
      });

      return { success: true, message: res.data?.message || "Login successful" };
    } catch (err) {
      console.error("signin error:", err);
      set({
        loading: false,
        error: err.response?.data?.message || "Login failed",
      });
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  },

  // signup
  signup: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("http://194.238.18.1:3004/api/signup", payload, {
        headers: { "Content-Type": "application/json" },
      });

      // Optional: auto-login if API returns token+user
      const { token, user } = res.data || {};
      if (token || user) {
        localStorage.setItem("userData", JSON.stringify({ token, user }));
        set({ user: user || null, token: token || null, isAuthenticated: !!token });
      }

      set({ loading: false });
      return { success: true, message: res.data?.message || "Signup successful" };
    } catch (err) {
      console.error("signup error:", err);
      set({ loading: false, error: err.response?.data?.message || "Signup failed" });
      return { success: false, message: err.response?.data?.message || "Signup failed" };
    }
  },

  // logout
  logout: () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("app_user");
    localStorage.removeItem("app_token");
    sessionStorage.removeItem("accessToken");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
