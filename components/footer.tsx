import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const resources = [
    { label: "Help Center", href: "https://intercom.help/habitly-app/en/" },
    { label: "API Documentation", href: "https://docs.habitly.com/" },
    { label: "Translate Habitly", href: "https://crowdin.com/project/habitly" },
    { label: "Zapier Integration", href: "https://zapier.com/apps/habitly/integrations" },
    { label: "IFTTT Integration", href: "https://ifttt.com/habitly" }
  ];

  // Removed redundant social links

  const learnMore = [
    { label: "Blog", href: "https://habitly.com/blog" },
    { label: "Contact", href: "mailto:contact@habitly.com" },
    { label: "Habit Tracking Apps Review", href: "https://habitly.com/our-reviews" },
    { label: "PolyPlan: Daily Planner", href: "https://polyplan.app/" }
  ];

  const stores = [
    {
      label: "Download on the App Store",
      href: "https://apps.apple.com/app/apple-store/id1111447047?pt=95512966&ct=landing-page-v2&mt=8",
      badge: { src: "/images/badge-app-store.svg", width: 160, height: 46 }
    },
    {
      label: "Download on the Mac App Store",
      href: "https://apps.apple.com/app/apple-store/id1111447047?pt=95512966&ct=landing-page-v2&mt=8",
      badge: { src: "/images/badge-mac-app-store.svg", width: 184, height: 46 }
    },
    {
      label: "Get it on Google Play",
      href: "https://play.google.com/store/apps/details?id=co.unstatic.habitly",
      badge: { src: "/images/badge-google-play.svg", width: 172, height: 46 }
    }
  ];

  const languages = [
    { label: "Japanese", href: "https://habitly.com/ja" },
    { label: "German", href: "https://habitly.com/de" },
    { label: "Spanish", href: "https://habitly.com/es" }
  ];

  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-400">Contact</h3>
            <p className="text-sm">Email: <a href="mailto:contact@habitly.com" className="hover:text-white">contact@habitly.com</a></p>
            <p className="text-sm">Phone: <a href="tel:+1234567890" className="hover:text-white">+1 234 567 890</a></p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-400">Resources</h3>
            <ul className="space-y-2 text-sm">
              {resources.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-400">Learn more</h3>
            <ul className="space-y-2 text-sm">
              {learnMore.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-400">App Stores</h3>
            <div className="space-y-3 text-sm">
              {stores.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex hover:opacity-90"
                >
                  <Image
                    src={item.badge.src}
                    alt={item.label}
                    width={item.badge.width}
                    height={item.badge.height}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-5 text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-slate-300">
            <Link href="/" className="font-semibold text-white hover:text-slate-200">
              Habitly
            </Link>
            {languages.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-5 text-slate-300">
            <div className="space-x-4">
              <a href="https://trackify.me/terms-of-use" target="_blank" rel="noreferrer" className="font-semibold hover:text-white">
                Terms
              </a>
              <a href="https://trackify.me/privacy-policy" target="_blank" rel="noreferrer" className="font-semibold hover:text-white">
                Privacy Policy
              </a>
            </div>
            <div className="space-x-4">
              <span className="text-slate-400">Follow Us:</span>
              <a href="https://twitter.com/HabitlyApp" target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a>
              <a href="https://www.facebook.com/habitly/" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a>
              <a href="https://community.habitly.com/" target="_blank" rel="noreferrer" className="hover:text-white">Community</a>
            </div>
            <span className="text-slate-500">© 2026 Habitly</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
