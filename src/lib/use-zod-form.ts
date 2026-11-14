"use client";

import { useState } from "react";
import type { z } from "zod";

/**
 * Small form state helper — DESIGN_SPEC.md §5.8: validate on submit, then re-check on every change once
 * the form has been submitted, so errors clear as soon as they're fixed.
 */
export function useZodForm<S extends z.ZodType<Record<string, unknown>>>(schema: S, initial: z.input<S>) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof z.input<S>, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function check(next: z.input<S>) {
    const result = schema.safeParse(next);
    const found: Partial<Record<keyof z.input<S>, string>> = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof z.input<S>;
        found[key] ??= issue.message;
      }
    }
    setErrors(found);
    return result;
  }

  /** Props for a <Field>: value, onChange, error. */
  function field<K extends keyof z.input<S> & string>(name: K) {
    return {
      name,
      value: (values[name] ?? "") as string,
      error: errors[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = { ...(values as Record<string, unknown>), [name]: e.target.value } as z.input<S>;
        setValues(next);
        if (submitted) check(next);
      },
    };
  }

  /** Validates everything; returns the parsed data, or null (and shows the errors). */
  function validate(): z.output<S> | null {
    setSubmitted(true);
    const result = check(values);
    return result.success ? result.data : null;
  }

  return { values, field, validate };
}
