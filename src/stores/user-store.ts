import { create } from "zustand";
import { UserEntity } from "../types/user-entity";

interface UserStore {
  user: UserEntity | undefined;
  users: UserEntity[];
  id: string | undefined;
  isAdmin: boolean | undefined;
  login: (id: string, isAdmin: boolean) => void;
  logout: () => void;
  deleteUser: (id: number) => void;
  initializeAuth: () => void;
}

const useUser = create<UserStore>((set) => ({
  user: undefined,
  users: [],
  id: undefined,
  isAdmin: undefined,
  login: (id, isAdmin) => {
    localStorage.setItem("id", id);
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    set(() => ({ id, isAdmin }));
  },
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
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
