import { stripeClient } from "@better-auth/stripe/client";
import {
  adminClient,
  apiKeyClient,
  lastLoginMethodClient,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { webEnv } from "@starter/env/web";

export const authClient = createAuthClient({
  baseURL: webEnv.VITE_API_URL,
  plugins: [
    adminClient(),
    stripeClient({
      subscription: true,
    }),
    lastLoginMethodClient(),
    organizationClient(),
    apiKeyClient(),
    adminClient(),
  ],
  fetchOptions: {
    credentials: "include",
  },
});
