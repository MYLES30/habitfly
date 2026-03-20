const testimonials = [
  {
    name: "Aria",
    quote: "I finally kept a morning routine for 60 days straight.",
    avatar: "/images/avatar1.png",
    rating: 5
  },
  {
    name: "Noah",
    quote: "The reminder and streak view keeps me consistent every week.",
    avatar: "/images/avatar2.png",
    rating: 4
  },
  {
    name: "Maya",
    quote: "Habitly’s analytics helped me spot patterns and improve my productivity.",
    avatar: "/images/avatar3.png",
    rating: 5
  },
  {
    name: "Liam",
    quote: "The team dashboard keeps everyone motivated and accountable.",
    avatar: "/images/avatar4.png",
    rating: 5
  },
  {
    name: "Sophia",
    quote: "I love the gentle reminders—they’re just what I need to stay on track.",
    avatar: "/images/avatar5.png",
    rating: 4
  },
  {
    name: "Ethan",
    quote: "The streak feature makes habit building fun and rewarding.",
    avatar: "/images/avatar6.png",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="space-y-6 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-pink-50 p-8 shadow-md">
      <h2 className="text-4xl font-black text-center text-slate-900 mb-6 tracking-tight">Testimonials</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((item, idx) => (
          <article
            key={item.name}
            className={`relative rounded-xl border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl fade-in`}
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full border border-slate-300 shadow-sm" />
              <div className="flex gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">&#9733;</span>
                ))}
              </div>
            </div>
            <div className="absolute left-4 top-4 text-blue-400 text-3xl">
              <span aria-hidden="true">&#10077;</span>
            </div>
            <p className="text-lg font-semibold text-slate-800 leading-relaxed mb-4">
              <span className="text-blue-600 font-bold">“</span>
              <span className="bg-gradient-to-r from-blue-500 via-pink-400 to-yellow-400 bg-clip-text text-transparent font-extrabold">
                {item.quote}
              </span>
              <span className="text-blue-600 font-bold">”</span>
            </p>
            <p className="mt-2 text-base font-medium text-pink-500 text-right">— {item.name}</p>
          </article>
        ))}
      </div>
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
