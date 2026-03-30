import Link from "next/link";
import DashboardClient from "../components/DashboardClient";

type DashboardPageProps = {
    searchParams: Promise<{ page?: string }>;
};

export default async function Dashboard({ searchParams }: DashboardPageProps) {
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams?.page || 1);
    const limit = 10;

    return (
        <main className="px-6 py-8 md:px-10 md:py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 flex items-center justify-between rounded-full border border-[var(--line)] bg-white/60 px-5 py-3 shadow-[0_16px_40px_rgba(82,54,33,0.08)] backdrop-blur">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 rounded-full px-2 py-1 text-sm font-semibold tracking-[0.16em] text-[var(--accent-strong)] uppercase transition hover:opacity-80"
                    >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--foreground)] text-white">
                            H
                        </span>
                        <span>VoiceHire AI</span>
                    </Link>
                    <Link
                        href="/"
                        className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--ink-soft)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
                    >
                        Home
                    </Link>
                </div>

                <div className="glass-panel rounded-[2rem] p-6 md:p-8">
                    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold tracking-[0.2em] text-[var(--accent-strong)] uppercase">
                                Hiring dashboard
                            </p>
                            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
                                Candidate evaluations at a glance
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
                                Review AI interview outcomes, compare scores, and open
                                any candidate for a fuller read on the signal behind the number.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm sm:min-w-[280px]">
                            <div className="rounded-2xl bg-white/75 p-4">
                                <p className="text-[var(--muted)]">Candidates</p>
                                <p className="mt-1 text-2xl font-semibold">--</p>
                            </div>
                            <div className="rounded-2xl bg-white/75 p-4">
                                <p className="text-[var(--muted)]">Page</p>
                                <p className="mt-1 text-2xl font-semibold">--</p>
                            </div>
                        </div>
                    </div>
                </div>

                <DashboardClient page={page} limit={limit} />
            </div>
        </main>
    );
}
