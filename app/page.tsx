import Link from "next/link";
import Image from "next/image";
export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* ...existing code... */}

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl mt-8">
        <Image src="/images/hero-real.jpg" alt="Productive workspace for habit building" width={1920} height={1200} className="h-56 sm:h-80 md:h-[700px] w-full object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-20">
          <div className="flex flex-row justify-between items-start w-full">
            <h1 className="text-left text-6xl md:text-8xl font-black uppercase leading-tight text-white drop-shadow-lg tracking-tight">MASTER YOUR HABITS</h1>
            <div className="absolute bottom-12 right-12 flex flex-col items-end text-right text-white space-y-6">
              <p className="text-4xl md:text-5xl font-bold drop-shadow">Start 7-Day Free Trial.</p>
              <p className="text-3xl md:text-4xl font-semibold drop-shadow">Download Now!</p>
              <Link href="/checkout?trial=7day" className="mt-8 inline-block rounded-lg bg-gradient-to-r from-blue-600 to-indigo-800 px-8 py-4 text-2xl font-bold uppercase text-white ring-2 ring-white/40 hover:bg-blue-700 transition">Get Started</Link>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <img src="/images/social-proof-real.jpg" alt="Trust badge" className="h-12 w-12 rounded-full border-2 border-white shadow-md" />
            <span className="text-lg font-semibold text-white">Trusted by 10,000+ users</span>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="space-y-8 mt-16">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight mb-8">Explore Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "AI Analytics",
              desc: "Track streaks, consistency, and growth trends.",
              image: "/images/category-ai.jpg",
              href: "/categories/ai-analytics"
            },
            {
              title: "Wearable Sync",
              desc: "Connect routines with Apple Health and Google Fit.",
              image: "/images/category-sync.jpg",
              href: "/categories/wearable-sync"
            },
            {
              title: "Focus Modes",
              desc: "Eliminate distractions and complete high-impact routines.",
              image: "/images/category-focus.jpg",
              href: "/categories/focus-modes"
            }
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg flex flex-col items-center hover:shadow-xl transition">
              <Image src={item.image} alt={item.title} width={320} height={180} className="rounded-lg mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-base text-slate-700 mb-6">{item.desc}</p>
              <Link href={item.href} className="rounded bg-gradient-to-r from-blue-600 to-indigo-800 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition">Explore</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary CTA/Email Signup Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-4xl font-black">Join the 12% Better Club</h2>
        <p className="mx-auto mt-2 max-w-2xl text-slate-600">Get practical habit systems and weekly consistency tips straight to your inbox.</p>
        <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter Email Address"
            className="flex-1 rounded border-2 border-slate-500 px-4 py-3 text-slate-700 outline-none focus:border-slate-700"
          />
          <Link href="/habit-guide" className="rounded border-2 border-slate-700 px-6 py-3 text-center text-lg font-bold uppercase hover:bg-slate-100">
            Get Free Habit Guide
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-pink-50 p-10 text-center shadow-md mt-16">
        <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">What Our Users Say</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg flex flex-col items-center fade-in">
            <img src="/images/aria-real.jpg" alt="Aria" className="w-14 h-14 rounded-full border border-slate-300 shadow-sm mb-4 object-cover" />
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">&#9733;</span>
              ))}
            </div>
            <p className="text-lg text-slate-700 italic mb-2">“I finally kept a morning routine for 60 days straight.”</p>
            <p className="text-base text-slate-500">— Aria</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg flex flex-col items-center fade-in">
            <img src="/images/noah-real.jpg" alt="Noah" className="w-14 h-14 rounded-full border border-slate-300 shadow-sm mb-4 object-cover" />
            <div className="flex gap-1 mb-2">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">&#9733;</span>
              ))}
            </div>
            <p className="text-lg text-slate-700 italic mb-2">“The reminder and streak view keeps me consistent every week.”</p>
            <p className="text-base text-slate-500">— Noah</p>
          </article>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-200 mt-12">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-row gap-16">
              <div className="space-y-3 text-center">
                <h3 className="text-sm font-semibold text-slate-400">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/terms" className="underline">Terms of Use</a></li>
                  <li><a href="/privacy" className="underline">Privacy Policy</a></li>
                </ul>
              </div>
              <div className="space-y-3 text-center">
                <h3 className="text-sm font-semibold text-slate-400">Follow Us</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://twitter.com/HabitlyApp" target="_blank" rel="noreferrer" className="underline">Twitter</a></li>
                  <li><a href="https://www.facebook.com/habitly/" target="_blank" rel="noreferrer" className="underline">Facebook</a></li>
                  <li><a href="https://community.habitly.com/" target="_blank" rel="noreferrer" className="underline">Community</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
