import { create } from "zustand";

type NavItem = "home" | "shop" | "cart" | "favorites";

interface NavItemStore {
  navItem: NavItem;
  changeNavItem: (item: NavItem) => void;
}

const useNavItem = create<NavItemStore>((set) => ({
  navItem: "home",
  changeNavItem: (item) => set(() => ({ navItem: item })),
}));

export default useNavItem;
