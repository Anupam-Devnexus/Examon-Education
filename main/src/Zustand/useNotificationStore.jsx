import { create } from "zustand";
import { socket } from "../socket";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  socketConnected: false,

  initSocket: () => {
    if (get().socketConnected) return; // prevent double listeners

    console.log("🔌 Initializing Socket...");

    socket.on("connect", () => {
      console.log("⚡ Socket Connected:", socket.id);
      set({ socketConnected: true });
    });

    // Listen to EXACT backend event
    socket.on("new_notification", (data) => {
      console.log("🔥 Live Notification RECEIVED:", data);

      set((state) => ({
        notifications: [data, ...state.notifications],
      }));
    });

    // Full event logger
    socket.onAny((event, data) => {
      console.log("📡 EVENT RECEIVED:", event, data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
      set({ socketConnected: false });
    });
  },
}));
