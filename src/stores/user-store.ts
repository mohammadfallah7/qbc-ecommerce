import { create } from "zustand";
import { UserEntity } from "../types/user-entity";

interface UserStore {
  user: UserEntity | undefined;
  users: UserEntity[];
  id: string | undefined;
  isAdmin: boolean | undefined;
  register: (newUser: UserEntity) => void;
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
  register: (newUser) => {
    set((state) => ({
      users: [...state.users, newUser],
      user: newUser,
      token: "JWT",
    }));
  },
  login: (id, isAdmin) => {
    localStorage.setItem("id", id);
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  },
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
  logout: () => {
    localStorage.removeItem("token");
    set(() => ({ user: undefined, token: undefined }));
  },
  initializeAuth: () => {
    const id = localStorage.getItem("id");
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin") || "");
    if (id) set(() => ({ id }));
    if (isAdmin) set(() => ({ isAdmin }));
  },
}));

export default useUser;
