import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser{
  id:number,
  name:string,
  role:string
}

interface AuthState {
  User:  AuthUser | null;
  updateUser: (User: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      User: null,
      updateUser: (User) => set({ User }),
    }),
    {
      name: "auth-storage",
    }
  )
);
