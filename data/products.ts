export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  billingPeriod: "monthly" | "semi-annual" | "annual";
  features: string[];
};

export const products: Product[] = [
  {
    id: "dht-pro",
    name: "Digital Habit Tracker Pro Monthly",
    description: "Track goals, build routines, and review streaks from one dashboard.",
    price: 29,
    image: "/images/pro-monthly.jpg",
    billingPeriod: "monthly",
    features: ["Habit streak analytics", "Custom reminders", "Weekly progress reports"]
  },
  {
    id: "dht-pro-semi",
    name: "Digital Habit Tracker Pro Semi-Annual",
    description: "Pro plan billed every 6 months for users who want better value.",
    price: 159,
    image: "/images/pro-semi.jpg",
    billingPeriod: "semi-annual",
    features: ["Habit streak analytics", "Priority reminders", "Deep progress insights"]
  },
  {
    id: "dht-pro-annual",
    name: "Digital Habit Tracker Pro Annual",
    description: "Best-value annual Pro package for long-term consistency.",
    price: 299,
    image: "/images/pro-annual.jpg",
    billingPeriod: "annual",
    features: ["All Pro features", "Yearly performance report", "Premium templates"]
  },
  {
    id: "dht-team-monthly",
    name: "Digital Habit Tracker Team Monthly",
    description: "Shared habit boards and accountability for small groups.",
    price: 79,
    image: "/images/team-monthly.jpg",
    billingPeriod: "monthly",
    features: ["Team dashboard", "Shared challenges", "Member insights"]
  },
  {
    id: "dht-team-semi",
    name: "Digital Habit Tracker Team Semi-Annual",
    description: "Team collaboration package billed every 6 months.",
    price: 429,
    image: "/images/team-semi.jpg",
    billingPeriod: "semi-annual",
    features: ["Team dashboard", "Challenge leaderboard", "Manager summary emails"]
  },
  {
    id: "dht-team-annual",
    name: "Digital Habit Tracker Team Annual",
    description: "Annual team package for sustained accountability and growth.",
    price: 799,
    image: "/images/team-annual.jpg",
    billingPeriod: "annual",
    features: ["All Team features", "Quarterly analytics review", "Dedicated onboarding"]
  },
  {
    id: "dht-premium-monthly",
    name: "Digital Habit Tracker Premium Monthly",
    description: "Premium plan for advanced habit analytics and integrations.",
    price: 49,
    image: "/images/premium-monthly.jpg",
    billingPeriod: "monthly",
    features: ["Advanced analytics", "Third-party integrations", "Custom habit templates"]
  },
  {
    id: "dht-premium-annual",
    name: "Digital Habit Tracker Premium Annual",
    description: "Annual premium package for power users.",
    price: 499,
    image: "/images/premium-annual.jpg",
    billingPeriod: "annual",
    features: ["Advanced analytics", "Priority support", "Exclusive habit templates"]
  },
  {
    id: "dht-enterprise",
    name: "Digital Habit Tracker Enterprise",
    description: "Enterprise solution for large organizations with custom onboarding.",
    price: 1999,
    image: "/images/enterprise.jpg",
    billingPeriod: "annual",
    features: ["Custom onboarding", "Enterprise analytics", "Dedicated account manager"]
  }
];
