// src/Zustand/useNotesStore.js
import { create } from "zustand";
import axios from "axios";

//  Create the Zustand store
export const useNotesStore = create((set, get) => ({
    notesData: [],
    loading: false,
    error: null,

    //  API Base URL (Centralized for flexibility)
    base_API: "http://194.238.18.1:3004/api",

    //  Fetch all notes
    fetchNotes: async () => {
        const { base_API } = get();
        set({ loading: true, error: null });

        try {
            const response = await axios.get(`${base_API}/notes/all`);
            if (response.status === 200) {
                set({ notesData: response || [], loading: false });
            } else {
                set({ error: `Unexpected response (${response.status})`, loading: false });
            }
        } catch (error) {
            console.error("❌ Error fetching notes:", error);
            set({
                error: error.response?.data?.message || "Failed to fetch notes",
                loading: false,
            });
        }
    },

    //  Get single note by ID (optional helper)
    fetchNoteById: async (id) => {
        const { base_API } = get();
        set({ loading: true, error: null });

        try {
            const response = await axios.get(`${base_API}/notes/${id}`);
            if (response.status === 200) {
                return response.data?.data;
            } else {
                set({ error: `Unexpected response (${response.status})`, loading: false });
                return null;
            }
        } catch (error) {
            console.error("❌ Error fetching note by ID:", error);
            set({
                error: error.response?.data?.message || "Failed to fetch note",
                loading: false,
            });
            return null;
        }
    },
}));
