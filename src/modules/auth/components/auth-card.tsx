/** Centred card that holds the sign-in and register forms. */
export function AuthCard({
  eyebrow,
  title,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <section aria-labelledby="auth-title" className="flex justify-center bg-cream px-5 py-14 lg:py-20">
      <div className="w-full max-w-[440px]">
        <div className="text-center">
          <p className="type-eyebrow text-rose-text">{eyebrow}</p>
          <h1 id="auth-title" className="type-display-md mt-3">
            {title}
          </h1>
        </div>
        <div className="mt-8 rounded-[10px] border border-line bg-white/70 p-6 shadow-[0_8px_24px_rgba(62,42,46,0.06)] sm:p-8">
          {children}
        </div>
        <p className="mt-6 text-center text-sm text-cocoa-body">{footer}</p>
      </div>
    </section>
  );
}
