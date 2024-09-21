import { create } from "zustand";
import { UserEntity } from "../types/user-entity";

interface UserStore {
  user: UserEntity | undefined;
  token: string | undefined;
  register: (newUser: UserEntity) => void;
  logout: () => void;
  initializeAuth: () => void;
}

const useUser = create<UserStore>((set) => ({
  user: undefined,
  token: undefined,
  register: (newUser) => {
    localStorage.setItem("token", "JWT");
    set(() => ({ user: newUser, token: "JWT" }));
  },
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
