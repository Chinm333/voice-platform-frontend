"use client";

import Link from "next/link";

type Candidate = {
    id: number;
    name: string;
    role: string;
    score: number;
    summary: string;
};

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
    const scoreColor =
        candidate.score >= 8
            ? "text-green-600"
            : candidate.score >= 5
                ? "text-yellow-600"
                : "text-red-600";

    return (
        <Link href={`/candidate/${candidate.id}`}>
            <div className="bg-white rounded-2xl p-5 shadow hover:shadow-xl transition duration-200 border border-gray-100 cursor-pointer">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">
                        {candidate.name}
                    </h2>
                    <span className={`font-bold ${scoreColor}`}>
                        {candidate.score}/10
                    </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                    {candidate.role}
                </p>

                <p className="text-sm mt-3 text-gray-700 line-clamp-3">
                    {candidate.summary}
                </p>

                <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                    <span>View Details →</span>
                </div>
            </div>
        </Link>
    );
}
