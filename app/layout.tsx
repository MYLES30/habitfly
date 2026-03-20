import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Digital Habit Tracker Store",
  description: "E-commerce website for Digital Habit Tracker"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
