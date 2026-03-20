# Digital Habit Tracker E-commerce Website

A Next.js + TypeScript + Tailwind CSS e-commerce storefront with Stripe Checkout integration.

Completed Stripe checkout sessions are persisted in `data/orders.json` through webhook processing.

Homepage hero uses `public/brand-hero.jpg` as the cover image. Add your provided image file there.

Current desktop visuals use local SVG assets in `public/images/`:
- `hero-habits.svg`
- `feature-ai.svg`
- `feature-sync.svg`
- `feature-focus.svg`
- `social-proof.svg`

Primary hero now uses a real photo at `public/images/hero-real.jpg`.

Category cards now use real photos:
- `public/images/category-ai.jpg`
- `public/images/category-sync.jpg`
- `public/images/category-focus.jpg`

Trust/Social proof now uses:
- `public/images/social-proof-real.jpg`

## Pages

- Home
- Product
- Pricing
- Checkout (Stripe)
- Sign in
- Sign Up
- About
- Contact

## Stripe setup

1. Copy `.env.example` to `.env.local`.
2. Set `STRIPE_SECRET_KEY` from your Stripe dashboard.
3. Set `NEXT_PUBLIC_APP_URL` to your app URL (local: `http://localhost:3000`).
4. Set `PAYPAL_BUSINESS_EMAIL` to your PayPal merchant email for PayPal checkout.
5. Set `NEXTAUTH_URL` (local: `http://localhost:3000`).
6. Set `NEXTAUTH_SECRET` to a long random secret.
7. Run Stripe webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

8. Copy the generated signing secret into `STRIPE_WEBHOOK_SECRET`.

Checkout now supports both **Credit Card** and **PayPal** selection.

## Order storage

- Webhook endpoint: `/api/stripe/webhook`
- Orders API: `/api/orders`

## Authentication

- NextAuth credentials endpoint: `/api/auth/[...nextauth]`
- Signup endpoint: `/api/auth/signup`
- User accounts are stored in `data/users.json` with bcrypt-hashed passwords.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```
