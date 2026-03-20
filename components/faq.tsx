const faqItems = [
  {
    question: "Is checkout connected to a payment gateway?",
    answer: "No. This project includes a mock checkout page for MVP workflow only."
  },
  {
    question: "Can I manage multiple habits?",
    answer: "Yes, both plans are designed for multiple habits and progress tracking."
  }
];

export function FAQ() {
  return (
    <section className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">FAQ</h2>
      <div className="space-y-3">
        {faqItems.map((item) => (
          <article key={item.question} className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-medium">{item.question}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
