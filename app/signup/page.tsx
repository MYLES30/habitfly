"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const signupResponse = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        address,
        billingAddress,
        city,
        province,
        postalCode,
        country,
        phone
      })
    });

    const signupPayload = (await signupResponse.json()) as { error?: string };

    if (!signupResponse.ok) {
      setIsSubmitting(false);
      setErrorMessage(signupPayload.error ?? "Unable to create account.");
      return;
    }

    const loginResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/"
    });

    setIsSubmitting(false);

    if (loginResult?.error) {
      setErrorMessage("Account created, but automatic sign-in failed. Please sign in manually.");
      router.push("/signin");
      return;
    }

    router.push(loginResult?.url ?? "/");
  }

  return (
    <section className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Sign Up</h1>
        <p className="text-sm text-slate-600">Create your account and start building better habits today.</p>
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder="Your address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="billingAddress" className="block text-sm font-medium text-slate-700">Billing Address</label>
          <input
            id="billingAddress"
            name="billingAddress"
            type="text"
            autoComplete="street-address"
            placeholder="Your billing address"
            value={billingAddress}
            onChange={(event) => setBillingAddress(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="city" className="block text-sm font-medium text-slate-700">City</label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder="Your city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="province" className="block text-sm font-medium text-slate-700">Province / State</label>
          <input
            id="province"
            name="province"
            type="text"
            autoComplete="address-level1"
            placeholder="Your province or state"
            value={province}
            onChange={(event) => setProvince(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="postalCode" className="block text-sm font-medium text-slate-700">Postal Code</label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            autoComplete="postal-code"
            placeholder="Your postal code"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="country" className="block text-sm font-medium text-slate-700">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country"
            placeholder="Your country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Your phone number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
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
        {errorMessage ? <p className="text-sm font-medium text-red-600">{errorMessage}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/signin" className="font-semibold text-slate-800 hover:text-slate-900">Sign in</Link>
      </p>
    </section>
  );
}
