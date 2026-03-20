import Image from "next/image";
import Link from "next/link";

export default function WearableSyncPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section with Wearable Device Image */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
        <Image src="/images/wearable-sync-hero.jpg" alt="Smartwatch syncing habits" width={1600} height={1000} className="h-80 w-full object-cover md:h-[400px]" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-slate-900/20" />
        <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
          <span className="mb-4 inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide">
            Connected Devices
          </span>
          <h1 className="max-w-3xl text-5xl font-black leading-tight md:text-6xl">Wearable Sync</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-100 md:text-xl">
            Sync your routines across phone and wearable devices. Progress updates happen automatically in real time—no manual entry required.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/pricing" className="rounded-md bg-white px-6 py-3 text-base font-bold text-slate-900 hover:bg-slate-200 shadow">
              View Plans
            </Link>
            <Link href="/checkout?trial=7day" className="rounded-md border border-white/50 px-6 py-3 text-base font-bold text-white hover:bg-white/10">
              Start 7-Day Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Device Gallery Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col items-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Supported Devices</h2>
        <div className="flex gap-6 flex-wrap justify-center mb-6">
          <Image src="/images/apple-watch1.png" alt="Apple Watch 1" width={120} height={120} className="rounded-lg shadow" />
          <Image src="/images/garmin-watch1.png" alt="Garmin Watch 1" width={120} height={120} className="rounded-lg shadow" />
          <Image src="/images/samsung-watch1.png" alt="Samsung Watch 1" width={120} height={120} className="rounded-lg shadow" />
          <Image src="/images/fitbit.png" alt="Fitbit" width={120} height={120} className="rounded-lg shadow" />
        </div>
        <p className="text-slate-700 text-center max-w-2xl mb-8">
          Habitly syncs with Apple Watch, Fitbit, Garmin, Samsung Galaxy Watch, and your smartphone for seamless habit tracking.
        </p>
        {/* Demo Video Section */}
        <div className="w-full max-w-xl rounded-lg overflow-hidden shadow-lg bg-black">
          <video controls poster="/images/wearable-sync-hero.jpg" className="w-full h-64 object-cover">
            <source src="/videos/wearable-sync-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="p-4 text-white text-center text-sm bg-slate-900">Watch how Habitly syncs your habits in real time!</div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            label: "Activity Auto-Sync",
            desc: "Automatically detect movement and workout habits from your wearable devices."
          },
          {
            label: "Smart Reminder Timing",
            desc: "Get reminders based on your real schedule and activity signals."
          },
          {
            label: "Unified Habit Timeline",
            desc: "View your progress across all devices in one dashboard."
          }
        ].map((item) => (
          <article key={item.label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.label}</h3>
            <p className="text-sm text-slate-700">{item.desc}</p>
          </article>
        ))}
      </section>

      {/* Professional Call to Action */}
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-200 p-8 text-center shadow-sm">
        <h2 className="text-3xl font-black text-slate-900 mb-4">Stay Consistent Without Manual Tracking</h2>
        <p className="text-lg text-slate-700 mb-6">
          Wearable Sync removes friction from your habit journey by connecting activity signals directly to your routine progress. Get practical reminders, auto-detected workouts, and a unified dashboard—all powered by Habitly.
        </p>
        <Link href="/checkout?trial=7day" className="inline-block rounded bg-slate-900 px-8 py-4 text-lg font-bold text-white shadow hover:bg-slate-700">
          Try Wearable Sync Free
        </Link>
      </section>
    </div>
  );
}
