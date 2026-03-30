"use client";

import Link from "next/link";

type Candidate = {
    id: number;
    name: string;
    role: string;
    score: number;
    summary: string;
    decision: string;
};

export default function CandidateSummaryCard({ candidate }: { candidate: Candidate }) {
    const scoreColor =
        candidate.score >= 8
            ? "text-green-600"
            : candidate.score >= 5
                ? "text-yellow-600"
                : "text-red-600";

    return (
        <Link href={`/candidate/${candidate.id}`}>
            <div className="glass-panel h-full rounded-[1.75rem] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(82,54,33,0.18)]">
                <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold">
                        {candidate.name}
                    </h2>
                    <span className={`rounded-full bg-white/80 px-3 py-1 text-sm font-bold ${scoreColor}`}>
                        {candidate.score}/10
                    </span>
                </div>

                <p className="mt-2 text-sm text-[var(--muted)]">
                    {candidate.role}
                </p>

                <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--ink-soft)]">
                    {candidate.summary}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 text-xs text-[var(--muted)]">
                    <span className="rounded-full bg-white/70 px-3 py-1 font-semibold">
                        Decision: {candidate.decision}
                    </span>
                    <span className="font-semibold text-[var(--accent-strong)]">
                        View details -
                    </span>
                </div>
            </div>
        </Link>
    );
}
