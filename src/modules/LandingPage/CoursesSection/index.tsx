import { t, Trans } from "@lingui/macro";

const getCourses = () => [
  {
    name: t`Beginner English`,
    desc: t`Build everyday vocabulary, pronunciation, and simple conversations with guided practice from day one.`,
    image: "/images/english/beginner.jpg",
  },
  {
    name: t`Intermediate English`,
    desc: t`Strengthen fluency for work, study, and travel through structured speaking, listening, and presentation tasks.`,
    image: "/images/english/intermediate.jpg",
  },
  {
    name: t`Advanced English`,
    desc: t`Refine academic writing, test strategies, and confident discussion skills for higher-level English goals.`,
    image: "/images/english/advanced.jpg",
  },
];

export default function CoursesSection() {
  const courses = getCourses();

  return (
    <section className="bg-white px-5 py-16 sm:px-6">
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-slate-950">
        <Trans>Our courses</Trans>
      </h2>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {courses.map((c, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-[var(--app-radius)] border border-slate-200 bg-white shadow-[var(--app-shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--app-shadow-md)]"
          >
            <img
              src={c.image}
              alt={c.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="mb-2 text-xl font-semibold text-slate-950">
                {c.name}
              </h3>
              <p className="line-clamp-4 leading-7 text-slate-600">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
