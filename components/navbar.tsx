"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-context";

export function Navbar() {
  // Mock user for demonstration
  const username = "Aria";
  const { quantity } = useCart();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Product" },
    { href: "/pricing", label: "Pricing" },
    { href: "/checkout", label: "Checkout" }
  ];

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="Go to Home" className="inline-flex items-center" title="Go to Home">
            <Image src="/images/Habitly Logo.png" alt="Habitly logo" width={130} height={32} priority className="bg-transparent" />
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-base font-semibold text-slate-700">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-blue-700 transition">
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Mobile nav links */}
          <nav className="flex md:hidden items-center gap-3 text-sm font-semibold text-slate-700">
            <Link href="/product" className="hover:text-blue-700 transition">Product</Link>
            <Link href="/pricing" className="hover:text-blue-700 transition">Pricing</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block text-xs font-semibold text-slate-600">Logged in as {username}</span>
          <input
            type="search"
            placeholder="Search"
            className="hidden md:block w-40 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500 transition"
          />
          <button
            type="button"
            aria-label="Search"
            className="hidden md:inline-flex rounded-full border border-slate-300 px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </button>
          <Link href="/checkout?trial=7day" className="hidden md:inline-block rounded-lg bg-slate-900 px-4 py-2 text-base font-bold text-white hover:bg-blue-700 transition shadow-sm" aria-label="Start trial">
            Start Trial
          </Link>
          <Link href="/checkout" className="rounded-md bg-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-300 md:inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5 inline-block mr-1">
              <path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H7" />
            </svg>
            {quantity}
          </Link>
          <Link href="/signin" className="rounded-md bg-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-300 md:inline-block" aria-label="Sign in">
            Sign in
          </Link>
          <Link href="/signup" className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 md:inline-block" aria-label="Sign up">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
