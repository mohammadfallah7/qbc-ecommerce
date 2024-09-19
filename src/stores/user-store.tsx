import { create } from "zustand";
import { UserEntity } from "../types/user-entity";

interface UserStore {
  user: UserEntity | undefined;
  register: (newUser: UserEntity) => void;
  logout: () => void;
}

const useUser = create<UserStore>((set) => ({
  user: {
    name: "محمد فلاح",
    email: "mohammad@gmail.com",
    password: "15853516",
    isAdmin: false,
  },
  users: [],
  register: (newUser) => set(() => ({ user: newUser })),
  logout: () => set(() => ({ user: undefined })),
}));

export default useUser;
