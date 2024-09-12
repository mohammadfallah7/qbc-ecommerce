import { create } from "zustand";

interface NavItemStore {
  navItem: string;
  changeNavItem: (item: string) => void;
}

const useNavItem = create<NavItemStore>((set) => ({
  navItem: "home",
  changeNavItem: (item) => set(() => ({ navItem: item })),
}));

export default useNavItem;
