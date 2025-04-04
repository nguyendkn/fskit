// /src/features/users/api/index.ts
import { Hono } from "hono";
import { authMiddleware } from "@/features/auth/middleware/authMiddleware";

const users = new Hono();

// Public route
users.get("/", async () => {
  // Lấy danh sách users công khai
});

// Protected routes
users.use("/me", authMiddleware);
users.get("/me", async () => {});

export default users;
