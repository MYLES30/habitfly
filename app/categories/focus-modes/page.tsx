import Image from "next/image";
import Link from "next/link";

export default function FocusModesPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <Image src="/images/focus-modes-hero.jpg" alt="Focused deep work environment" width={1600} height={1000} className="h-72 w-full object-cover md:h-96" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-slate-900/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white md:p-8">
          <span className="mb-4 inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide">
            Deep Work Sessions
          </span>
          <h1 className="max-w-2xl text-5xl font-black leading-tight md:text-6xl">Focus Modes</h1>
          <p className="mt-4 max-w-2xl text-base text-slate-100 md:text-xl">
            Eliminate distractions and complete high-impact routines with guided timers and structured focus blocks.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pricing" className="rounded-md bg-white px-6 py-3 text-base font-bold text-slate-900 hover:bg-slate-200">
              View Plans
            </Link>
            <Link href="/checkout?trial=7day" className="rounded-md border border-white/50 px-6 py-3 text-base font-bold text-white hover:bg-white/10">
              Start 7-Day Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards with Icons */}
      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center">
          <Image src="/images/feature-focus.svg" alt="Timer icon" width={64} height={64} className="mb-4" />
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Flexible</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Custom deep-work timers</h2>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center">
          <Image src="/images/feature-ai.svg" alt="Template icon" width={64} height={64} className="mb-4" />
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Ready to use</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Session templates</h2>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center">
          <Image src="/images/feature-sync.svg" alt="Snapshot icon" width={64} height={64} className="mb-4" />
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Visual</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Focus progress snapshots</h2>
        </article>
      </section>

      {/* Benefits Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-slate-900 md:text-4xl">Turn Intention Into Finished Sessions</h2>
            <p className="mt-4 text-lg text-slate-700">
              Focus Modes gives your habits dedicated time and structure, making consistency easier even on busy days.
            </p>
            <ul className="mt-6 space-y-3 text-lg text-slate-600">
              <li>• Build timer presets for recurring goals</li>
              <li>• Run distraction-free sessions with fewer context switches</li>
              <li>• Review session quality and completion trends</li>
            </ul>
          </div>
          <div className="mt-8 md:mt-0 md:w-80">
            <Image src="/images/hero-real.jpg" alt="Productivity illustration" width={320} height={320} className="rounded-xl border border-slate-200" />
          </div>
        </div>
      </section>

      {/* Testimonial & Social Proof Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10 flex flex-col md:flex-row md:items-center md:gap-10">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900">What users say</h3>
          <blockquote className="mt-4 text-lg text-slate-700 italic">
            "Focus Modes helped me finish more deep work sessions than ever. The timers and templates are a game changer!"
          </blockquote>
          <p className="mt-2 text-base text-slate-500">— Alex, Product Manager</p>
        </div>
        <div className="mt-8 md:mt-0 md:w-80">
          <Image src="/images/social-proof-real.jpg" alt="Happy user" width={320} height={320} className="rounded-xl border border-slate-200" />
        </div>
      </section>
    </div>
  );
}
