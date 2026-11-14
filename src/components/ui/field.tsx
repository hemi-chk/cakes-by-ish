import { CircleAlert } from "lucide-react";
import { useId } from "react";

import { cn } from "@/lib/utils";

type FieldProps = Omit<React.ComponentProps<"input">, "id"> & {
  label: string;
  /** Short hint under the field, e.g. "At least 8 characters" */
  helper?: string;
  error?: string;
};

/**
 * Labelled text input — DESIGN_SPEC.md §5.8. The helper and error are linked with aria-describedby so
 * screen readers read them with the field.
 */
export function Field({ label, helper, error, className, ...props }: FieldProps) {
  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const describedBy = [helper && helperId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-cocoa">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "mt-2 h-12 w-full rounded-[8px] border bg-white px-3.5 text-base text-cocoa transition-colors outline-none placeholder:text-cocoa-soft/70",
          "focus-visible:border-rose focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cocoa",
          error ? "border-danger" : "border-line-strong",
        )}
        {...props}
      />
      {helper && !error && (
        <p id={helperId} className="mt-1.5 text-[13px] text-cocoa-soft">
          {helper}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-danger">
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.8} />
          {error}
        </p>
      )}
    </div>
  );
}

/** Message for the whole form, e.g. "Wrong email or password". Announced as soon as it appears. */
export function FormError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="flex items-start gap-2 rounded-[8px] bg-danger-bg px-3.5 py-3 text-sm text-danger">
      <CircleAlert aria-hidden="true" className="mt-px size-4 shrink-0" strokeWidth={1.8} />
      <span>{children}</span>
    </p>
  );
}
