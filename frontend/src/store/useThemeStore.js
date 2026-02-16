import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "coffee",
    setTheme: (theme) => {
        console.log("Theme changed: ", theme );
        localStorage.setItem("chat-theme", theme);
        // document.documentElement.setAttribute("data-theme", theme);
        set({ theme });
    },
}));
