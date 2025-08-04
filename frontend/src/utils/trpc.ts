import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../types/router";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "https://skattehjalpen-production.up.railway.app/trpc",
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
