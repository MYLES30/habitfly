"use client";
import Image from "next/image";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AiAnalyticsPage() {
    // Sample chart data
    const chartData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Habit Streak",
          data: [3, 4, 5, 6, 5, 7, 8],
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 8,
        }
      ]
    };
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top' as const
        },
        title: {
          display: true,
          text: "Weekly Habit Streak"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    };
  return (
    <div className="space-y-12">
      {/* Hero Section with AI Branding */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
        <Image src="/images/ai-analytics-hero.jpg" alt="AI analytics dashboard" width={1600} height={1000} className="h-80 w-full object-cover md:h-[400px]" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-slate-900/20" />
        <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
          <span className="mb-4 inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide">
            AI Powered Insights
          </span>
          <h1 className="max-w-3xl text-5xl font-black leading-tight md:text-6xl">AI Analytics for Habits</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-100 md:text-xl">
            Visualize your progress, forecast streaks, and get actionable recommendations with Habitly's advanced AI engine.
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

      {/* Graph Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col items-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Habit Trends</h2>
        <div className="w-full max-w-xl mb-6 bg-white rounded-lg p-4 shadow">
          <Line data={chartData} options={chartOptions} />
        </div>
        <p className="text-slate-700 text-center max-w-2xl">
          See your streaks, consistency scores, and habit performance visualized. Our AI models detect patterns and forecast your progress, helping you stay on track and improve every week.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            label: "Automated Weekly Summaries",
            desc: "Receive AI-generated reports on your habit trends and progress."
          },
          {
            label: "Live Consistency Score",
            desc: "Track your consistency in real time, powered by machine learning."
          },
          {
            label: "Personalized Recovery Prompts",
            desc: "Get smart reminders and recovery tips when you miss a day."
          }
        ].map((item) => (
          <article key={item.label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.label}</h3>
            <p className="text-sm text-slate-700">{item.desc}</p>
          </article>
        ))}
      </section>

      {/* AI Call to Action */}
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-200 p-8 text-center shadow-sm">
        <h2 className="text-3xl font-black text-slate-900 mb-4">Unlock AI-Powered Habit Success</h2>
        <p className="text-lg text-slate-700 mb-6">
          Habitly's analytics engine uses advanced AI to turn your check-ins into actionable insights. Discover your best routines, spot weak patterns, and get personalized recommendations to boost your consistency.
        </p>
        <Link href="/checkout?trial=7day" className="inline-block rounded bg-slate-900 px-8 py-4 text-lg font-bold text-white shadow hover:bg-slate-700">
          Try AI Analytics Free
        </Link>
      </section>
    </div>
  );
}
