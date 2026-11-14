// Extra columns on `users` beyond Better Auth's own. Shared by the server config and the browser
// client, so both agree on what sign-up accepts.
export const userFields = {
  phone: { type: "string", required: false },
  // Never accepted from the browser: admins are set in the database
  role: { type: "string", required: false, defaultValue: "customer", input: false },
} as const;
