import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthCard } from "@/modules/auth/components/auth-card";
import { GoogleButton, OrDivider } from "@/modules/auth/components/google-button";
import { SignInForm } from "@/modules/auth/components/sign-in-form";
import { getSession, googleEnabled } from "@/modules/auth/server";
import { safeNext } from "@/modules/auth/validation";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  const params = await searchParams;
  const next = safeNext(typeof params.next === "string" ? params.next : null);
  if (await getSession()) redirect(next);

  const google = await googleEnabled();
  const error = params.error === "google" ? "Google sign-in didn't work. Please try again." : undefined;
  const registerHref = next === "/" ? "/register" : `/register?next=${encodeURIComponent(next)}`;

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Sign in"
      footer={
        <>
          New to Cakes by Ish?{" "}
          <Link href={registerHref} className="font-medium text-rose-text underline underline-offset-4">
            Create an account
          </Link>
        </>
      }
    >
      {google && (
        <>
          <GoogleButton next={next} />
          <OrDivider />
        </>
      )}
      <SignInForm next={next} initialError={error} />
    </AuthCard>
  );
}
