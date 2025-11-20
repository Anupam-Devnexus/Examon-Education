import { create } from "zustand";
import { socket } from "../socket";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,

  initSocket: () => {
    socket.on("new-notification", (data) => {
      set((state) => ({
        notifications: [data, ...state.notifications],
        unreadCount: state.unreadCount + 1
      }));
    });
  },

  markAllRead: () => {
    set({
      unreadCount: 0
    });
  }
}));
