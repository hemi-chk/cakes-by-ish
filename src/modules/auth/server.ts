import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { cache } from "react";

import { site } from "@/config/site";
import { getDb } from "@/server/db";
import * as schema from "@/server/db/schema";

import { userFields } from "./user-fields";
import { passwordRules } from "./validation";

// Every address the site is served from. Sign-in requests from anywhere else are refused.
const trustedOrigins = [
  "https://cakesbyish.co.uk",
  "https://www.cakesbyish.co.uk",
  "https://cakes-by-ish.ishaniphy.workers.dev",
  "http://localhost:3000",
];

/**
 * Better Auth for this request. Built per request because the D1 binding and secrets only exist inside
 * one; `cache` reuses it for the rest of the same request.
 */
export const getAuth = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  const google = env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET;

  return betterAuth({
    appName: site.name,
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins,
    database: drizzleAdapter(await getDb(), { provider: "sqlite", schema, usePlural: true }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: passwordRules.min,
      maxPasswordLength: passwordRules.max,
    },
    socialProviders: google
      ? { google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, prompt: "select_account" } }
      : undefined,
    // A Google sign-in with the same email as an existing password account joins that account
    account: { accountLinking: { enabled: true, trustedProviders: ["google"] } },
    user: { additionalFields: userFields },
    session: {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
      updateAge: 60 * 60 * 24, // refresh the expiry at most once a day
    },
    // Must be last: lets server actions set the session cookie
    plugins: [nextCookies()],
  });
});

/** The signed-in user's session, or null. Cached for the rest of the request. */
export const getSession = cache(async () => {
  const auth = await getAuth();
  return auth.api.getSession({ headers: await headers() });
});

/** Whether Google sign-in is configured (both Google secrets are set). */
export async function googleEnabled() {
  const { env } = await getCloudflareContext({ async: true });
  return Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);
}
