import { User, UserCreate } from '@/features/users/schemas/userSchema';

type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};

// Store auth token
let authToken: string | null = null;

// Set auth token (typically after login)
export function setAuthToken(token: string) {
  authToken = token;
}

// Clear auth token (typically after logout)
export function clearAuthToken() {
  authToken = null;
}

// Generic fetch function with proper error handling
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    // Prepare headers
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    // Add auth token if available
    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    // Make the request
    const response = await fetch(`/api${endpoint}`, {
      ...options,
      headers,
    });

    // Handle JSON response
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    }

    if (!response.ok) {
      return {
        error: data?.error || 'An unknown error occurred',
        status: response.status,
      };
    }

    return {
      data: data as T,
      status: response.status,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error',
      status: 500,
    };
  }
}

// API client with typed methods
export const apiClient = {
  // Auth endpoints
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      const response = await fetchApi<{ user: User; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      // Store the token if login was successful
      if (response.data?.token) {
        setAuthToken(response.data.token);
      }

      return response;
    },

    register: async (userData: UserCreate) => {
      return fetchApi<User>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },

    me: async () => {
      return fetchApi<{ user: Omit<User, 'password'> }>('/protected/me');
    },
  },

  // User endpoints
  users: {
    getAll: async () => {
      return fetchApi<User[]>('/users');
    },

    create: async (userData: UserCreate) => {
      return fetchApi<User>('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },
  },

  // Example protected resource
  protected: {
    getResource: async () => {
      return fetchApi<{ message: string; user: Omit<User, 'password'> }>('/protected/resource');
    },
  },
};
