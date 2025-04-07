// /src/features/users/schemas/userSchema.ts
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  avatar: z.string().optional(),
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8).optional(), // Make password optional for API responses
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof userSchema>;

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type UserCreate = z.infer<typeof userCreateSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
