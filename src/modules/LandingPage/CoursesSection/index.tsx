import { t, Trans } from "@lingui/macro";

const courses = [
  {
    name: t`Beginner English`,
    desc: t`A cheerful young adult learning English basics, sitting with a notebook and pen, casual classroom background, bright and friendly atmosphere, warm colors, simple communication icons floating around`,
    image: "/images/english/beginner.jpg",
  },
  {
    name: t`Intermediate English`,
    desc: t`A confident young professional giving a presentation in English, standing in front of a small audience, business casual attire, modern office or seminar room, confident gestures, clear and bright lighting`,
    image: "/images/english/intermediate.jpg",
  },
  {
    name: t`Advanced English`,
    desc: t`A focused student studying for IELTS, surrounded by textbooks and laptop, calm and quiet library environment, serious and determined expression, academic atmosphere with charts and notes visible`,
    image: "/images/english/advanced.jpg",
  },
];

export default function CoursesSection() {
  return (
    <section className="bg-white px-6 py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">
        <Trans>Our courses</Trans>
      </h2>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {courses.map((c, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-lg shadow-lg transition hover:scale-105"
          >
            <img
              src={c.image}
              alt={c.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{c.name}</h3>
              <p className="text-gray-600">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
