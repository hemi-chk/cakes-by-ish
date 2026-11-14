import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthCard } from "@/modules/auth/components/auth-card";
import { GoogleButton, OrDivider } from "@/modules/auth/components/google-button";
import { RegisterForm } from "@/modules/auth/components/register-form";
import { getSession, googleEnabled } from "@/modules/auth/server";
import { safeNext } from "@/modules/auth/validation";

export const metadata: Metadata = { title: "Create an account", robots: { index: false } };

export default async function RegisterPage({ searchParams }: PageProps<"/register">) {
  const params = await searchParams;
  const next = safeNext(typeof params.next === "string" ? params.next : null);
  if (await getSession()) redirect(next);

  const google = await googleEnabled();
  const signInHref = next === "/" ? "/sign-in" : `/sign-in?next=${encodeURIComponent(next)}`;

  return (
    <AuthCard
      eyebrow="Order your cake"
      title="Create an account"
      footer={
        <>
          Already have an account?{" "}
          <Link href={signInHref} className="font-medium text-rose-text underline underline-offset-4">
            Sign in
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
      <RegisterForm next={next} />
    </AuthCard>
  );
}
