// /src/features/auth/stores/authStore.ts
import { apiClient, clearAuthToken } from '@/lib/api/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/features/users/schemas/userSchema';

// Define the credentials type
interface Credentials {
  email: string;
  password: string;
}

interface AuthState {
  user: Omit<User, 'password'> | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        try {
          const response = await apiClient.auth.login(credentials);

          if (response.error) {
            throw new Error(response.error);
          }

          if (!response.data) {
            throw new Error('Login failed: No data received');
          }

          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      register: async (userData) => {
        try {
          const response = await apiClient.auth.register(userData);

          if (response.error) {
            throw new Error(response.error);
          }

          if (!response.data) {
            throw new Error('Registration failed: No data received');
          }

          // Registration successful, but user still needs to login
          return;
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        }
      },

      logout: () => {
        // Clear token from client
        clearAuthToken();

        // Reset auth state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      checkAuth: () => {
        const { token, isAuthenticated } = get();

        // If we have a token and are marked as authenticated
        if (token && isAuthenticated) {
          // We could add JWT expiration validation here
          // For now, we just check if we have the token
          return true;
        }

        return false;
      },
    }),
    {
      name: 'auth-storage',
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// Helper hooks for common auth operations
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
