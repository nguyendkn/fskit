// /src/features/auth/stores/authStore.ts
import { client } from '@/lib/rpc'
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/features/users/schemas/userSchema";

// Define the credentials type
interface Credentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (credentials) => {
        // Triển khai logic login
        /* @ts-expect-error Type issues with Hono client */
        const response = await client.api.auth.login.$post({
          json: credentials,
        });
        if (!response.ok) throw new Error("Login failed");

        const userData = await response.json();
        set({ user: userData, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
