// /src/features/users/hooks/useUsers.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import type { User, UserCreate } from "../schemas/userSchema";

export function useUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      /* @ts-expect-error Type issues with Hono client */
      const res = await client.api.users.$get();
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json() as User[];
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (userData: UserCreate) => {
      /* @ts-expect-error Type issues with Hono client */
      const res = await client.api.users.$post({ json: userData });
      if (!res.ok) throw new Error("Failed to create user");
      return res.json() as User;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    users: usersQuery.data,
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    createUser: createUserMutation.mutate,
  };
}
