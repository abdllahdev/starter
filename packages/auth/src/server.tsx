import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, haveIBeenPwned, lastLoginMethod, openAPI, organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { Stripe } from "stripe";

import { db } from "@starter/db";
import { sendEmail } from "@starter/email";
import { PasswordResetEmail } from "@starter/email/templates/password-reset-email";
import { VerificationEmail } from "@starter/email/templates/verification-email";
import { serverEnv } from "@starter/env/server";
import { nanoid } from "@starter/shared/nanoid";

const stripeClient = new Stripe(serverEnv.STRIPE_SECRET_KEY, {
  apiVersion: "2026-01-28.clover",
});

export const auth = betterAuth({
  baseURL: serverEnv.API_URL,
  trustedOrigins: serverEnv.CORS_HOST.split(","),
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  basePath: "/api/auth",
  advanced: {
    database: {
      generateId: () => nanoid(12),
    },
    cookiePrefix: "starter",
  },
  socialProviders: {
    google: {
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
    async sendResetPassword({ user, token }) {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        react: (
          <PasswordResetEmail
            userFirstName={user.name.split(" ")[0] ?? user.email}
            resetLink={`${serverEnv.WEB_APP_URL}/auth/reset-password?token=${token}`}
          />
        ),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, token }) {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        react: (
          <VerificationEmail
            userFirstName={user.name.split(" ")[0] ?? user.email}
            verificationLink={`${serverEnv.WEB_APP_URL}/auth/verify-email?token=${token}`}
          />
        ),
      });
    },
  },
  plugins: [
    admin(),
    haveIBeenPwned(),
    lastLoginMethod(),
    openAPI({ disableDefaultReference: true }),
    organization(),
    tanstackStartCookies(),
    stripe({
      stripeClient,
      stripeWebhookSecret: serverEnv.STRIPE_WEBHOOK_SECRET,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "pro",
            priceId: "price_1RLJHkRK2VN7oq4xQzgKTrCy",
            limits: {
              credits: 100,
            },
          },
        ],
      },
    }),
  ],
});
