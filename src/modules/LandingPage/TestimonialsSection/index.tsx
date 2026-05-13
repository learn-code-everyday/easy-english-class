import { t, Trans } from "@lingui/macro";

const getTestimonials = () => [
  {
    name: "Lan",
    text: t`The teachers are incredibly dedicated; I scored IELTS 6.5 after 6 months!`,
    image: "/images/english/lan.jpg",
  },
  {
    name: "Minh",
    text: t`The flexible schedule perfectly fits working students.`,
    image: "/images/english/minh.jpg",
  },
];

export default function TestimonialsSection() {
  const testimonials = getTestimonials();

  return (
    <section className="bg-[var(--app-bg)] px-5 py-16 text-center sm:px-6">
      <h2 className="mb-10 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        <Trans>What Our Students Say</Trans>
      </h2>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="rounded-[var(--app-radius)] border border-slate-200 bg-white p-6 shadow-[var(--app-shadow-sm)] transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-[var(--app-shadow-md)] sm:p-8"
          >
            <img
              src={t.image}
              alt={t.name}
              className="mx-auto mb-6 h-24 w-24 rounded-full object-cover ring-4 ring-blue-50"
              loading="lazy"
              decoding="async"
            />
            <p className="mb-4 text-lg italic leading-8 text-slate-700">
              “{t.text}”
            </p>
            <h3 className="text-xl font-semibold text-blue-700">{t.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
