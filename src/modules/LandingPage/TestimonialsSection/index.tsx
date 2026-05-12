import { t, Trans } from "@lingui/macro";

const testimonials = [
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
  return (
    <section className="bg-gray-50 px-6 py-20 text-center">
      <h2 className="mb-16 text-4xl font-extrabold tracking-tight text-gray-900">
        <Trans>What Our Students Say</Trans>
      </h2>
      <div className="mx-auto max-w-5xl grid gap-10 md:grid-cols-2">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-white p-8 shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              src={t.image}
              alt={t.name}
              className="mx-auto mb-6 h-24 w-24 rounded-full object-cover ring-4 ring-indigo-500"
              loading="lazy"
              decoding="async"
            />
            <p className="mb-4 italic text-gray-700 text-lg">“{t.text}”</p>
            <h3 className="font-semibold text-indigo-700 text-xl">{t.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
