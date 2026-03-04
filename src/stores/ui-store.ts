"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;

  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  reset: () => void;
}

const initialState = {
  theme: "system" as Theme,
  sidebarOpen: false,
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setTheme: (theme: Theme) => set({ theme}, false, "setTheme"),
        toggleSidebar: () => set((state) => ({sidebarOpen: !state.sidebarOpen}), false, "toggleSidebar"),
        setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }, false, "setSidebarOpen"),
        reset: () => set({ ...initialState }, false, "reset"),
      }),
      {
        name: 'UI-settings-storage',
        storage: createJSONStorage(() => localStorage),
        // This does not perist the sideBarOpen
        partialize: (state) => ({ theme: state.theme }),
      }
    ),
    { name: 'UIStore' }
  )
);

// Selectors (optional but recommended for performance)
export const selectTheme = (state: UIState) => state.theme;
export const selectSidebarOpen = (state: UIState) => state.sidebarOpen;