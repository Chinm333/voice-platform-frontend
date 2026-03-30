import Link from "next/link";
import { notFound } from "next/navigation";

async function getCandidate(id: string) {
    const res = await fetch(`http://localhost:5000/api/candidates?id=${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    }

    const result = await res.json();
    if (!result.data.length) return null;
    return result.data[0];
}

type CandidatePageProps = {
    params: Promise<{ id: string }>;
};

export default async function CandidatePage({ params }: CandidatePageProps) {
    const { id } = await params;
    const candidate = await getCandidate(id);

    if (!candidate) {
        notFound();
    }

    return (
        <main className="px-6 py-8 md:px-10 md:py-10">
            <div className="mx-auto max-w-5xl">
                <div className="mb-5">
                    <Link
                        href="/dashboard"
                        className="inline-flex rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--ink-soft)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
                    >
                        Back to dashboard
                    </Link>
                </div>

                <div className="glass-panel rounded-[2rem] p-6 md:p-8">
                    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold tracking-[0.2em] text-[var(--accent-strong)] uppercase">
                                Candidate profile
                            </p>
                            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
                                {candidate.name}
                            </h1>
                            <p className="mt-3 text-base text-[var(--muted)]">{candidate.role}</p>
                            <p className="mt-6 text-sm leading-7 text-[var(--ink-soft)] md:text-base">
                                {candidate.summary}
                            </p>
                        </div>

                        <div className="grid min-w-full gap-3 sm:grid-cols-2 md:min-w-[280px] md:max-w-[320px]">
                            <div className="rounded-[1.5rem] bg-[#fff4eb] p-5">
                                <p className="text-sm text-[var(--muted)]">Interview score</p>
                                <div className="mt-2 text-4xl font-semibold text-[var(--accent-strong)]">
                                    {candidate.score}/10
                                </div>
                            </div>
                            <div className="rounded-[1.5rem] bg-[#edf6e9] p-5">
                                <p className="text-sm text-[var(--muted)]">Decision</p>
                                <div className="mt-2 text-lg font-semibold text-[#2f6b2f]">
                                    {candidate.decision}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="glass-panel rounded-[1.75rem] p-6">
                        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                            Interview answers
                        </h2>

                        <div className="mt-6 space-y-4">
                            {candidate.answers.map((ans: string, i: number) => (
                                <div
                                    key={i}
                                    className="rounded-[1.5rem] border border-[var(--line)] bg-white/72 p-5"
                                >
                                    <p className="text-xs font-semibold tracking-[0.18em] text-[var(--accent-strong)] uppercase">
                                        Answer {i + 1}
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                                        {ans}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-panel rounded-[1.75rem] p-6">
                            <h2 className="mb-4 text-xl font-semibold text-[#2f6b2f]">
                                Strengths
                            </h2>
                            <ul className="space-y-3 text-sm leading-7 text-[var(--ink-soft)]">
                                {candidate.strengths?.map((s: string, i: number) => (
                                    <li
                                        key={i}
                                        className="rounded-2xl border border-[var(--line)] bg-white/72 px-4 py-3"
                                    >
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass-panel rounded-[1.75rem] p-6">
                            <h2 className="mb-4 text-xl font-semibold text-[#b33f3f]">
                                Weaknesses
                            </h2>
                            <ul className="space-y-3 text-sm leading-7 text-[var(--ink-soft)]">
                                {candidate.weaknesses?.map((w: string, i: number) => (
                                    <li
                                        key={i}
                                        className="rounded-2xl border border-[var(--line)] bg-white/72 px-4 py-3"
                                    >
                                        {w}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
