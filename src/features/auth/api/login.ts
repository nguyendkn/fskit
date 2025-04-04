// /src/features/auth/api/login.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "@/features/users/schemas/userSchema";

const auth = new Hono();

auth.post("/login", zValidator("json", loginSchema), async () => {
  // Xử lý login
});
