"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CandidateSummaryCard from "./CandidateSummaryCard";

type Candidate = {
  id: number;
  name: string;
  role: string;
  score: number;
  summary: string;
  decision: string;
};

type CandidateApiResponse = {
  total: number;
  page: number;
  limit: number;
  data: Candidate[];
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "https://voice-platform-backend.onrender.com";

type DashboardClientProps = {
  page: number;
  limit: number;
};

export default function DashboardClient({ page, limit }: DashboardClientProps) {
  const [data, setData] = useState<CandidateApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchCandidates() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${apiBaseUrl}/api/candidates?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
          const text = await response.text().catch(() => "");
          throw new Error(text || `API error: ${response.status}`);
        }

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await response.text().catch(() => "");
          throw new Error(text || "API returned non-JSON response.");
        }

        const result = (await response.json()) as CandidateApiResponse;

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load candidates.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCandidates();

    return () => {
      isMounted = false;
    };
  }, [page, limit]);

  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const prevPage = Math.max(page - 1, 1);
  const nextPage = Math.min(page + 1, totalPages);

  if (loading) {
    return (
      <div className="glass-panel mt-8 rounded-[1.75rem] p-10 text-center">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Loading candidates...
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          Warming up the backend. This can take a minute on the free tier.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel mt-8 rounded-[1.75rem] p-10 text-center">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          Unable to load candidates
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data?.data.map((candidate) => (
          <CandidateSummaryCard key={candidate.id} candidate={candidate} />
        ))}
      </div>

      {data?.data.length === 0 ? (
        <div className="glass-panel mt-8 rounded-[1.75rem] p-10 text-center">
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">
            No candidates yet
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Run an interview first, then the completed evaluation will appear here
            automatically.
          </p>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-full border border-[var(--line)] bg-white/65 px-5 py-4 text-sm backdrop-blur md:flex-row">
        <Link
          href={`/dashboard?page=${prevPage}`}
          className={`rounded-full px-5 py-3 font-semibold transition ${
            page === 1
              ? "pointer-events-none bg-white/60 text-[var(--muted)] opacity-55"
              : "bg-[var(--foreground)] text-white hover:bg-[var(--accent-strong)]"
          }`}
        >
          Previous
        </Link>
        <span className="text-[var(--muted)]">
          Showing page {page} of {totalPages}
        </span>
        <Link
          href={`/dashboard?page=${nextPage}`}
          className={`rounded-full px-5 py-3 font-semibold transition ${
            page === totalPages
              ? "pointer-events-none bg-white/60 text-[var(--muted)] opacity-55"
              : "bg-[var(--foreground)] text-white hover:bg-[var(--accent-strong)]"
          }`}
        >
          Next
        </Link>
      </div>
    </>
  );
}
