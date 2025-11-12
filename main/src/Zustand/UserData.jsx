import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // 🔹 State
      user: null,
      token: null,
      isAuthenticated: false,

      // ✅ Core Auth Updaters
      setUserData: ({ user, token }) => {
        set({
          user,
          token,
          isAuthenticated: token,
        });
      },

      /** ⛳ Simplified Login helper */
      login: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      /** 🧼 Update user fields mid-session */
      updateUser: (updates) => {
        const currentUser = get().user || {};
        set({
          user: { ...currentUser, ...updates },
        });
      },

      /** 🚪 Logout cleanly */
      logout: () => {
        // remove persisted data
        localStorage.removeItem("auth");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth", // LocalStorage key
      getStorage: () => localStorage,
      partialize: (state) => ({
        // Persist only necessary fields
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
