// /src/app/api/[[...route]]/route.ts
import { Hono } from "hono";
import { handle } from "hono/vercel";
// Import these when needed for validation and authorization
// import { z } from "zod";
// import { zValidator } from "@hono/zod-validator";
// import { authMiddleware } from "@/features/auth/middleware/authMiddleware";

export const runtime = "edge"; // Tùy chọn: chạy trên Edge Runtime

const app = new Hono().basePath("/api");

// Public routes
app.get("/hello", (c) => {
  return c.json({ message: "Hello Next.js!" });
});

// Auth routes
app.post("/auth/login", async (c) => {
  const data = await c.req.json();
  // Implement actual authentication logic here
  return c.json({ id: "1", name: "User", email: data.email });
});

// User routes
app.get("/users", (c) => {
  // Mock implementation - replace with actual data access
  return c.json([
    { id: "1", name: "User 1", email: "user1@example.com" },
    { id: "2", name: "User 2", email: "user2@example.com" }
  ]);
});

app.post("/users", async (c) => {
  const userData = await c.req.json();
  // Mock implementation - replace with actual user creation
  return c.json({ id: "3", ...userData });
});

// Protected routes example
// Uncomment when ready to use authentication
// app.use("/protected/*", authMiddleware);
// app.get("/protected/resource", (c) => {
//   const user = c.get("user");
//   return c.json({ message: "Protected resource", user });
// });

// Export the app type for client usage
export type AppType = typeof app;

// Export handlers
export const GET = handle(app);
export const POST = handle(app);
