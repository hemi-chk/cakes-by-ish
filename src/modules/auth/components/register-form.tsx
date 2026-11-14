"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FormError } from "@/components/ui/field";
import { useZodForm } from "@/lib/use-zod-form";

import { signUp } from "../client";
import { passwordRules, registerSchema } from "../validation";

export function RegisterForm({ next }: { next: string }) {
  const router = useRouter();
  const form = useZodForm(registerSchema, { name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState<React.ReactNode>();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = form.validate();
    if (!data) return;

    setLoading(true);
    setError(undefined);
    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone || undefined,
    });
    if (error) {
      setLoading(false);
      setError(
        error.code === "USER_ALREADY_EXISTS" || error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" ? (
          <>
            There&apos;s already an account with this email.{" "}
            <Link href={`/sign-in?next=${encodeURIComponent(next)}`} className="font-medium underline underline-offset-4">
              Sign in instead
            </Link>
          </>
        ) : (
          "Something went wrong creating your account. Please try again."
        ),
      );
      return;
    }
    // Signing up also signs you in
    router.replace(next);
    router.refresh();
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <FormError>{error}</FormError>
      <Field label="Full name" autoComplete="name" {...form.field("name")} />
      <Field label="Email" type="email" autoComplete="email" inputMode="email" {...form.field("email")} />
      <Field
        label="Phone (optional)"
        type="tel"
        autoComplete="tel"
        helper="So we can reach you about your order"
        {...form.field("phone")}
      />
      <Field
        label="Password"
        type="password"
        autoComplete="new-password"
        helper={`At least ${passwordRules.min} characters`}
        {...form.field("password")}
      />
      <Field label="Confirm password" type="password" autoComplete="new-password" {...form.field("confirmPassword")} />
      <Button type="submit" className="mt-2 w-full" disabled={loading}>
        {loading ? <Loader2 aria-label="Creating your account" className="size-4 animate-spin" /> : "Create account"}
      </Button>
    </form>
  );
}
