"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function HabitGuidePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setStatusType("error");
      setStatusMessage("Please enter your email.");
      return;
    }

    setIsSubmitting(true);
    setStatusType(null);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/habit-guide/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to subscribe right now.");
      }

      setStatusType("success");
      setStatusMessage(data.message ?? "Thanks! Your free habit guide is on its way.");
      setEmail("");
    } catch (submitError) {
      setStatusType("error");
      setStatusMessage(submitError instanceof Error ? submitError.message : "Unable to subscribe right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-900 px-8 py-10 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Free Resource</p>
          <h1 className="mt-2 text-4xl font-black leading-tight md:text-5xl">Get Your Free Habit Guide</h1>
          <p className="mt-3 max-w-3xl text-slate-200">
            Learn a practical 7-day framework to build routines, stay consistent, and track meaningful progress without burnout.
          </p>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-[1.3fr_1fr] md:p-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">What You Get</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 1</p>
                <p className="mt-2 text-sm font-medium text-slate-900">Choose 1-2 Keystone Habits</p>
              </article>
              <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 2</p>
                <p className="mt-2 text-sm font-medium text-slate-900">Use Daily Triggers and Reminders</p>
              </article>
              <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 3</p>
                <p className="mt-2 text-sm font-medium text-slate-900">Measure Streaks and Adjust Weekly</p>
              </article>
            </div>
            <p className="text-sm text-slate-600">
              This guide is built for busy users who want a simple system they can actually follow every day.
            </p>
          </div>

          <section className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xl font-bold text-slate-900">Send Me the Guide</h3>
            <p className="text-sm text-slate-600">Enter your email and start your first consistency sprint today.</p>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-700"
              />
              <div className="flex items-start gap-2">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-xs text-slate-700">
                  I consent to Habitly using my data for providing habit tracking services only. My information will not be shared or sold, and will be used exclusively for Habitly communications and features, as per the <Link href="/privacy" className="underline text-blue-600 hover:text-blue-700">Privacy Policy</Link>.
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isSubmitting ? "Submitting..." : "Get Free Habit Guide"}
              </button>
            </form>
            {statusMessage ? (
              <p
                className={`rounded-md border px-3 py-2 text-sm ${
                  statusType === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-rose-200 bg-rose-50 text-rose-700"
                }`}
              >
                {statusMessage}
              </p>
            ) : null}
            <p className="text-xs text-slate-500">No spam. Just actionable weekly habit tips.</p>
          </section>
        </div>
      </section>

      <div className="text-center">
        <Link href="/" className="text-sm font-medium text-slate-700 underline hover:text-slate-900">
          Back to home
        </Link>
      </div>
    </div>
  );
}
