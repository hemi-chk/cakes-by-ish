import { z } from "zod";

// Form rules shared by the browser forms and Better Auth's server checks.

export const passwordRules = { min: 8, max: 128 };

const email = z.email("Enter a valid email address").trim().toLowerCase();

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password"),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
    email,
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9 ()-]{7,20}$/, "Enter a valid phone number")
      .or(z.literal(""))
      .optional(),
    password: z
      .string()
      .min(passwordRules.min, `Use at least ${passwordRules.min} characters`)
      .max(passwordRules.max, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Where to send someone after signing in: the `next` path they came from, if it's a page on this site.
 * Anything else (another site, `//evil.com`) falls back to the homepage.
 */
export function safeNext(next: string | null | undefined) {
  return next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : "/";
}
