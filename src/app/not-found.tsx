import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-6 py-16 md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="glass-panel rounded-[2rem] p-8 text-center md:p-12">
          <p className="text-sm font-semibold tracking-[0.2em] text-[var(--accent-strong)] uppercase">
            Candidate not found
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
            That interview record is missing or no longer available.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] md:text-base">
            Head back to the dashboard to review the saved candidate evaluations
            that are currently available in the system.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/dashboard"
              className="rounded-full bg-[var(--foreground)] px-7 py-4 text-base font-semibold text-white transition hover:bg-[var(--accent-strong)]"
            >
              Return to dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
