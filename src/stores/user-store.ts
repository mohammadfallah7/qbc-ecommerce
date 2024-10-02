import { create } from "zustand";

interface UserStore {
  id: string | undefined;
  isAdmin: boolean | undefined;
  login: (id: string, isAdmin: boolean) => void;
  logout: () => void;
  initializeAuth: () => void;
}

const useUser = create<UserStore>((set) => ({
  id: undefined,
  isAdmin: undefined,
  login: (id, isAdmin) => {
    localStorage.setItem("id", id);
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    set(() => ({ id, isAdmin }));
  },
  logout: () => {
    localStorage.removeItem("id");
    localStorage.removeItem("isAdmin");
    set(() => ({ id: undefined, isAdmin: undefined }));
  },
  initializeAuth: () => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");
    const id = localStorage.getItem("id");
    if (isAdmin) set(() => ({ isAdmin }));
    if (id) set(() => ({ id }));
  },
}));

export default useUser;
