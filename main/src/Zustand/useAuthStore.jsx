// ------------------------------
// AUTH STORE
// Using Zustand + Axios + Secure Cookie Sessions
// ------------------------------

import { create } from "zustand";
import axios from "axios";

// Base API URL (use HTTPS in production)
const API_BASE = "http://194.238.18.1:3004/api";

// Global axios configuration
axios.defaults.withCredentials = true; // allow cookies to be sent automatically

// Zustand store
export const useAuthStore = create((set, get) => ({
    // ------------------------------
    //  Global States
    // ------------------------------
    user: null,             // user object from backend
    accessToken: null,      // short-lived access token (in-memory only)
    loading: false,         // request state
    initialized: false,     // app-level initialization flag

    // ------------------------------
    //  Initialize user session on app load
    // ------------------------------
    initialize: async () => {
        set({ loading: true });
        try {
            // Refresh access token using secure HttpOnly cookie
            const { data } = await axios.get(`${API_BASE}/auth/refresh`);
            set({
                user: data.user,
                accessToken: data.accessToken,
                loading: false,
                initialized: true,
            });
        } catch (err) {
            set({ user: null, accessToken: null, loading: false, initialized: true });
        }
    },

    // ------------------------------
    //  Register new user
    // ------------------------------
    register: async ({ fullname, email, password }) => {
        set({ loading: true });
        try {
            const { data } = await axios.post(
                `${API_BASE}/Signup`,
                {
                    fullname,
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );


            // Automatically login or just return success (depends on backend)
            set({ loading: false });
            return {
                success: true,
                message: data.message || "Registration successful. Please log in.",
            };
        } catch (err) {
            set({ loading: false });
            return {
                success: false,
                message: err.response?.data?.message || "Registration failed.",
            };
        }
    },

    // ------------------------------
    //  Login user
    // ------------------------------
    login: async ({ email, password }) => {
        set({ loading: true });
        try {
            const { data } = await axios.post(`${API_BASE}/Signin`, {
                email,
                password,
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            // backend should return: { user, accessToken }
            set({
                user: data.user,
                accessToken: data.accessToken,
                loading: false,
            });

            return { success: true, message: data.message || "Login successful." };
        } catch (err) {
            set({ loading: false });
            return {
                success: false,
                message: err.response?.data?.message || "Invalid credentials.",
            };
        }
    },

    // ------------------------------
    //  Logout user
    // ------------------------------
    logout: async () => {
        try {
            await axios.post(`${API_BASE}/auth/logout`);
        } catch {
            // ignore logout error
        } finally {
            set({ user: null, accessToken: null });
        }
    },

    // ------------------------------
    //  Refresh access token manually (optional)
    // ------------------------------
    refreshToken: async () => {
        try {
            const { data } = await axios.get(`${API_BASE}/auth/refresh`);
            set({ accessToken: data.accessToken });
        } catch {
            set({ user: null, accessToken: null });
        }
    },
}));
