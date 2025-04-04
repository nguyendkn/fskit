// /src/lib/rpc/index.ts
import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";

// Create the client with proper typing
type ClientType = ReturnType<typeof hc<AppType>>;

// Force typing to ensure compatibility with all app routes
export const client: ClientType = hc<AppType>("/");
