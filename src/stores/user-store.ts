import { create } from "zustand";
import { UserEntity } from "../types/user-entity";

interface UserStore {
  user: UserEntity | undefined;
  token: string | undefined;
  users: UserEntity[];
  register: (newUser: UserEntity) => void;
  logout: () => void;
  initializeAuth: () => void;
  deleteUser: (id: number) => void;
}

const useUser = create<UserStore>((set) => ({
  user: undefined,
  token: undefined,
  users: [],
  register: (newUser) => {
    localStorage.setItem("token", "JWT");
    set((state) => ({
      users: [...state.users, newUser],
      user: newUser,
      token: "JWT",
    }));
  },
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
  logout: () => {
    localStorage.removeItem("token");
    set(() => ({ user: undefined, token: undefined }));
  },
  initializeAuth: () => {
    const token = localStorage.getItem("token");
    if (token) set(() => ({ token }));
  },
}));

export default useUser;
