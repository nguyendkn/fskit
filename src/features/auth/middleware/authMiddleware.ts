// /src/features/auth/middleware/authMiddleware.ts
import { MiddlewareHandler } from "hono";
import { verify } from "jsonwebtoken";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    c.set("user", decoded);
    await next();
  } catch {
    return c.json({ error: "Unauthorized" }, 401);
  }
};
