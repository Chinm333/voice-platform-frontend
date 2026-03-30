"use client";

import { FormEvent, useState } from "react";

type InviteResponse = {
  success: boolean;
  interviewLink: string;
  messageId: string;
};

const initialForm = {
  candidateName: "",
  candidateEmail: "",
  role: "",
};

export default function InterviewInviteForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [interviewLink, setInterviewLink] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/send-interview-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as InviteResponse & { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Failed to send interview invite.");
      }

      setStatus("success");
      setInterviewLink(result.interviewLink);
      setMessage(`Interview email sent successfully to ${form.candidateEmail}.`);
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to send interview invite.");
    }
  }

  async function handleCopy() {
    if (!interviewLink) {
      return;
    }

    await navigator.clipboard.writeText(interviewLink);
    setMessage("Interview link copied to clipboard.");
  }

  return (
    <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
      <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel-strong)] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--muted)]">Interview delivery</p>
            <h2 className="mt-1 text-2xl font-semibold text-[var(--foreground)]">
              Generate and email the invite
            </h2>
          </div>
          <div className="rounded-full bg-[#edf6e9] px-3 py-1 text-sm font-semibold text-[#2f6b2f]">
            SMTP Ready
          </div>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
              Candidate name
            </span>
            <input
              required
              value={form.candidateName}
              onChange={(event) =>
                setForm((current) => ({ ...current, candidateName: event.target.value }))
              }
              className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              placeholder="Aarav Sharma"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--ink-soft)]">
              Candidate email
            </span>
            <input
              required
              type="email"
              value={form.candidateEmail}
              onChange={(event) =>
                setForm((current) => ({ ...current, candidateEmail: event.target.value }))
              }
              className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              placeholder="candidate@example.com"
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

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {status === "submitting" ? "Sending invite..." : "Generate interview link and send"}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!interviewLink}
              className="rounded-full border border-[var(--line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--ink-soft)] transition hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-55"
            >
              Copy latest link
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-3">
          <div className="rounded-2xl bg-[#fff4eb] p-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--accent-strong)] uppercase">
              What happens
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
              The platform generates a candidate-specific interview URL and emails it directly
              using the SMTP credentials configured in your backend environment.
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

          {interviewLink ? (
            <div className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3">
              <p className="text-xs font-semibold tracking-[0.16em] text-[var(--muted)] uppercase">
                Latest interview link
              </p>
              <p className="mt-2 break-all text-sm text-[var(--ink-soft)]">{interviewLink}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
