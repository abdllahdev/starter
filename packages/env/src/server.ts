import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    // Environment
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

    // Server config
    PORT: z.string().default("8080"),
    LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).default("info"),

    // Database
    DATABASE_URL: z.string().url(),

    // Observability
    AXIOM_TOKEN: z.string().min(1),
    AXIOM_DATASET: z.string().default("starter-server"),
    AXIOM_ENDPOINT: z.string().url().default("https://api.axiom.co"),
    OTEL_SERVICE_NAME: z.string().default("starter-server"),
    OTEL_SERVICE_VERSION: z.string().default("1.0.0"),
    SENTRY_DSN: z.string().url(),

    // CORS
    CORS_ORIGIN: z.string().default("http://localhost:3000"),
    CORS_HOST: z.string().default("http://localhost:3000"),

    // URLs
    API_URL: z.string().url().default("http://localhost:8080"),
    WEB_APP_URL: z.string().url().default("http://localhost:3000"),

    // OAuth
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),

    // Email
    RESEND_API_KEY: z.string().min(1),

    // Payments
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
