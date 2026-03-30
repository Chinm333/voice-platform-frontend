"use client";

import { FormEvent, useState } from "react";

type StartCallResponse = {
  success: boolean;
  data: {
    message?: string;
    task_id?: string;
    call_id?: string;
  };
};

const initialForm = {
  name: "",
  role: "",
  phone: "",
};

export default function CallCandidateForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/start-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as StartCallResponse & { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Failed to start the call.");
      }

      setStatus("success");
      setMessage(
        result.data?.message ||
          `Calling ${form.name} now. The candidate should receive the phone call shortly.`
      );
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to start the call.");
    }
  }

  return (
    <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
      <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel-strong)] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--muted)]">Outbound interview</p>
            <h2 className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
              Call the candidate directly
            </h2>
          </div>
          <div className="rounded-full bg-[#edf6e9] px-3 py-1 text-sm font-semibold text-[#2f6b2f]">
            Bolna Ready
          </div>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
              Candidate name
            </span>
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              placeholder="Rahul"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
              Role
            </span>
            <input
              required
              value={form.role}
              onChange={(event) =>
                setForm((current) => ({ ...current, role: event.target.value }))
              }
              className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              placeholder="Backend Developer"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
              Phone number
            </span>
            <input
              required
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: event.target.value }))
              }
              className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              placeholder="+919876543210"
            />
          </label>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--foreground)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-65"
          >
            {status === "submitting" ? "Calling candidate..." : "Call Candidate"}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="rounded-2xl bg-[#fff4eb] p-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--accent-strong)] uppercase">
              What happens
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
              The platform sends the candidate name and role as Bolna `user_data`,
              then Bolna places the phone call directly to the provided number.
            </p>
          </div>

          {message ? (
            <div
              className={`rounded-2xl p-4 text-sm ${
                status === "error"
                  ? "bg-[#fdecec] text-[#9a2f2f]"
                  : "bg-[#edf6e9] text-[#2f6b2f]"
              }`}
            >
              {message}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
