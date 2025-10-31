// ------------------------------------------------------
// 🔐 AUTH STORE (Production-Ready)
// Using Zustand + Axios + Secure Cookie-Based Sessions
// ------------------------------------------------------

import { create } from "zustand";
import axios from "axios";

// ------------------------------------------------------
// 🌐 API Configuration
// ------------------------------------------------------
// ✅ Use HTTPS in production (never send tokens over HTTP)
const API_BASE = "http://194.238.18.1:3004/api";

// ✅ Allow backend to send/receive cookies (refresh tokens, session cookies, etc.)
axios.defaults.withCredentials = true;

// ✅ Set default content type
axios.defaults.headers["Content-Type"] = "application/json";

// ------------------------------------------------------
// 🧠 Zustand Auth Store
// ------------------------------------------------------
export const useAuthStore = create((set, get) => ({
  // ------------------------------------------------------
  // 🔹 Global State
  // ------------------------------------------------------
  user: null,             // Current logged-in user (object)
  accessToken: null,      // Short-lived JWT (kept in memory only)
  loading: false,         // Tracks async request state
  initialized: false,     // App init flag (used after refresh)

  // ------------------------------------------------------
  // 🚀 Initialize Session on App Load
  // ------------------------------------------------------
  initialize: async () => {
    set({ loading: true });

    try {
      // ✅ Attempt to refresh session using HttpOnly cookie (securely stored by backend)
      const { data } = await axios.get(`${API_BASE}/auth/refresh`);

      // Backend should return { user, accessToken }
      set({
        user: data.user,
        accessToken: data.accessToken,
        loading: false,
        initialized: true,
      });
    } catch (err) {
      // ❌ Session invalid or expired — reset to logged-out state
      console.error("Session init failed:", err.response?.data || err.message);
      set({ user: null, accessToken: null, loading: false, initialized: true });
    }
  },

  // ------------------------------------------------------
  // 🧾 Register New User
  // ------------------------------------------------------
  register: async ({ fullname, email, password }) => {
    set({ loading: true });
    try {
      const { data } = await axios.post(`${API_BASE}/signup`, {
        fullname,
        email,
        password,
      });

      set({ loading: false });

      // ✅ Backend may auto-login or require manual login
      return {
        success: true,
        message: data.message || "Registration successful. Please log in.",
      };
    } catch (err) {
      set({ loading: false });
      console.error("Registration error:", err.response?.data || err.message);

      return {
        success: false,
        message: err.response?.data?.message || "Registration failed.",
      };
    }
  },

  // ------------------------------------------------------
  // 🔑 Login User
  // ------------------------------------------------------
  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const { data } = await axios.post(`${API_BASE}/Signin`, { email, password });

      // ✅ Backend should return { user, accessToken }
      set({
        user: data.user,
        accessToken: data.accessToken,
        loading: false,
      });

      // 🧠 NOTE:
      // The backend should set a secure HttpOnly refresh cookie (for persistence)
      // The accessToken is short-lived and stored only in memory for security.

      return {
        success: true,
        message: data.message || "Login successful.",
      };
    } catch (err) {
      set({ loading: false });
      console.error("Login error:", err.response?.data || err.message);

      return {
        success: false,
        message: err.response?.data?.message || "Invalid credentials.",
      };
    }
  },

  // ------------------------------------------------------
  // 🚪 Logout User
  // ------------------------------------------------------
  logout: async () => {
    try {
      // ✅ Ask backend to clear HttpOnly cookie
      await axios.post(`${API_BASE}/auth/logout`);
    } catch (err) {
      console.warn("Logout warning:", err.response?.data || err.message);
    } finally {
      // ✅ Clear user and accessToken from memory
      set({ user: null, accessToken: null });
    }
  },

  // ------------------------------------------------------
  // ♻️ Manually Refresh Access Token (optional)
  // ------------------------------------------------------
  refreshToken: async () => {
    try {
      // ✅ Request new access token using secure refresh cookie
      const { data } = await axios.get(`${API_BASE}/auth/refresh`);
      set({ accessToken: data.accessToken });
      return true;
    } catch (err) {
      console.error("Token refresh failed:", err.response?.data || err.message);
      set({ user: null, accessToken: null });
      return false;
    }
  },
}));
