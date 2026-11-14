"use client";

import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { userFields } from "./user-fields";

/** Browser side of Better Auth. Talks to /api/auth on the same site. */
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields({ user: userFields })],
});

export const { useSession, signIn, signUp, signOut } = authClient;
