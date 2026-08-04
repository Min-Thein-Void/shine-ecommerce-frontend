import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  id: number;
  image: string | null;
  phone: string | null;
  address: string | null;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  userProfile: UserProfile | null;
}

interface AuthState {
  User: AuthUser | null;
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
    },
  ),
);
