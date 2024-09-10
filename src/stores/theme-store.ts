import { create } from "zustand";

type Theme = "dark" | "light";

interface ThemeStore {
  theme: Theme;
  changeTheme: (newTheme: Theme) => void;
}

const useTheme = create<ThemeStore>((set) => ({
  theme: "light",
  changeTheme: (newTheme) => set({ theme: newTheme }),
}));

export default useTheme;
