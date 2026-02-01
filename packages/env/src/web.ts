import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const webEnv = createEnv({
  // Server-side variables (SSR only, never exposed to browser)
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    AXIOM_TOKEN: z.string(),
    AXIOM_ENDPOINT: z.string().url().default("https://api.axiom.co"),
    AXIOM_DATASET: z.string().default("starter-web"),
    OTEL_SERVICE_NAME: z.string().default("starter-web"),
    OTEL_SERVICE_VERSION: z.string().default("1.0.0"),
  },

  // Client-side variables (exposed to browser, must have VITE_ prefix)
  clientPrefix: "VITE_",
  client: {
    VITE_SENTRY_DSN: z.string().url(),
    VITE_APP_VERSION: z.string().default("dev"),
    VITE_API_URL: z.string().url().default("http://localhost:8080"),
    VITE_SERVER_URL: z.string().url().optional(),
  },

  // Use process.env for both (Vite handles the mapping)
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  isServer: typeof window === "undefined",
});
