import { t, Trans } from "@lingui/macro";

const features = [
  {
    title: t`Native Teachers`,
    desc: t`Learn with 100% American and British instructors`,
    icon: "🧑‍🏫",
  },
  {
    title: t`Guaranteed Results`,
    desc: t`Money-back if you dont achieve your goals`,
    icon: "💯",
  },
  {
    title: t`Flexible Schedule`,
    desc: t`Learn anytime, anywhere`,
    icon: "⏰",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 px-6 py-16 text-center">
      <h2 className="mb-12 text-3xl font-bold">
        <Trans>Why Choose Us?</Trans>
      </h2>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="rounded-lg bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-4 text-5xl">{f.icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
