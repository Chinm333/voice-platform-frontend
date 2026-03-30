import Link from "next/link";
import CallCandidateForm from "./components/CallCandidateForm";

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="px-6 pb-16 pt-8 md:px-10 md:pb-24 md:pt-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[var(--line)] bg-white/55 px-5 py-3 text-sm text-[var(--muted)] shadow-[0_16px_50px_rgba(82,54,33,0.08)] backdrop-blur md:px-7">
          <div className="font-semibold tracking-[0.2em] text-[var(--accent-strong)] uppercase">
            VoiceHire AI
          </div>
          <Link
            href="/dashboard"
            className="rounded-full border border-[var(--line)] px-4 py-2 font-medium text-[var(--ink-soft)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
          >
            Open Dashboard
          </Link>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="py-10 md:py-16">
            <div className="inline-flex rounded-full border border-[var(--line)] bg-white/60 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-[var(--accent-strong)] uppercase backdrop-blur">
              First-round screening, redesigned
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-[var(--foreground)] md:text-7xl">
              Turn every candidate call into a sharp, structured hiring signal.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
              Adaptive AI voice interviews ask better follow-ups, capture stronger
              evidence, and deliver recruiter-ready evaluations without hours of
              manual screening.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-7 py-4 text-center text-base font-semibold tracking-[-0.01em] text-white shadow-[0_18px_40px_rgba(31,26,23,0.22)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]"
                style={{ color: "#ffffff" }}
              >
                <span style={{ color: "#ffffff" }}>Review Candidates</span>
              </Link>
              <div className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/70 px-7 py-4 text-center text-base font-semibold text-[var(--ink-soft)]">
                Direct AI Phone Calls
              </div>
            </div>
          </div>

          <CallCandidateForm />
        </div>
      </section>

      <section className="px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-[var(--accent-strong)] uppercase">
                Workflow
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                How the screening flow works
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
              Built for quick first-round filtering without flattening every
              candidate into the same script.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                "01",
                "Voice interview",
                "Candidates speak naturally with an AI interviewer that keeps the conversation moving.",
              ],
              [
                "02",
                "Adaptive follow-ups",
                "Question depth shifts with each response, so strong candidates get challenged and weaker answers get clarified.",
              ],
              [
                "03",
                "Instant evaluation",
                "Recruiters get a score, decision, strengths, weaknesses, and answer transcript immediately.",
              ],
            ].map(([step, title, text]) => (
              <div key={step} className="glass-panel rounded-[1.75rem] p-6">
                <p className="text-sm font-semibold tracking-[0.18em] text-[var(--accent-strong)] uppercase">
                  {step}
                </p>
                <h3 className="mt-5 text-2xl font-semibold text-[var(--foreground)]">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-8 md:px-10 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            [
              "Cut recruiter load",
              "Automate the repetitive intro call while keeping the interview structured and usable.",
            ],
            [
              "Raise screening quality",
              "Use consistent scoring criteria and summaries across every candidate submission.",
            ],
            [
              "Move faster",
              "Spot high-signal candidates earlier and route them into the next round with confidence.",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-[1.75rem] border border-[var(--line)] bg-[#221d1a] p-6 text-white shadow-[0_24px_60px_rgba(33,29,26,0.28)]"
            >
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
