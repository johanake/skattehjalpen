import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../types/router";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.API_URL || "http://localhost:3001/trpc",
      headers() {
        const token = localStorage.getItem("auth_token");
        return token
          ? {
              authorization: `Bearer ${token}`,
            }
          : {};
      },
    }),
  ],
});
