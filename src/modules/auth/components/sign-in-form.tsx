"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FormError } from "@/components/ui/field";
import { useZodForm } from "@/lib/use-zod-form";

import { signIn } from "../client";
import { signInSchema } from "../validation";

export function SignInForm({ next, initialError }: { next: string; initialError?: string }) {
  const router = useRouter();
  const form = useZodForm(signInSchema, { email: "", password: "" });
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = form.validate();
    if (!data) return;

    setLoading(true);
    setError(undefined);
    const { error } = await signIn.email({ email: data.email, password: data.password });
    if (error) {
      setLoading(false);
      setError(
        error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD"
          ? "That email and password don't match. Check them and try again."
          : "Something went wrong signing you in. Please try again.",
      );
      return;
    }
    router.replace(next);
    router.refresh();
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <FormError>{error}</FormError>
      <Field label="Email" type="email" autoComplete="email" inputMode="email" {...form.field("email")} />
      <Field label="Password" type="password" autoComplete="current-password" {...form.field("password")} />
      <Button type="submit" className="mt-2 w-full" disabled={loading}>
        {loading ? <Loader2 aria-label="Signing in" className="size-4 animate-spin" /> : "Sign in"}
      </Button>
    </form>
  );
}
