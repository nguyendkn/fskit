import { apiClient } from '@/lib/api/client';
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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        try {
          const response = await apiClient.auth.login(credentials);

          if (!response.data) {
            throw new Error(response.error || 'Login failed');
          }

          localStorage.setItem('token', response.data.token);

          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          });
        } catch (error: any) {
          console.error('Login error:', error);
          throw error;
        }
      },

      register: async (userData) => {
        try {
          const response = await apiClient.auth.register(userData);

          if (!response.data) {
            throw new Error(response.error || 'Registration failed');
          }

          // Registration successful, but user still needs to login
          return;
        } catch (error: any) {
          console.error('Registration error:', error);
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
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
