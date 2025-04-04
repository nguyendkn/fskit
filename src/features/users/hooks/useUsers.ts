// /src/features/users/hooks/useUsers.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import type { User, UserCreate } from '../schemas/userSchema';

export function useUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiClient.users.getAll();

      if (response.error) {
        throw new Error(response.error);
      }

      return response.data || [];
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (userData: UserCreate) => {
      const response = await apiClient.users.create(userData);

      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.data) {
        throw new Error('Failed to create user: No data received');
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users: usersQuery.data,
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    createUser: createUserMutation.mutate,
  };
}
