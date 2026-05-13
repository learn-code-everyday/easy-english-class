import { t, Trans } from "@lingui/macro";

const getFeatures = () => [
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
  const features = getFeatures();

  return (
    <section className="bg-[var(--app-bg)] px-5 py-16 text-center sm:px-6">
      <h2 className="mb-10 text-3xl font-bold tracking-tight text-slate-950">
        <Trans>Why Choose Us?</Trans>
      </h2>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="rounded-[var(--app-radius)] border border-slate-200 bg-white p-6 shadow-[var(--app-shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--app-shadow-md)]"
          >
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-4xl">
              {f.icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-950">
              {f.title}
            </h3>
            <p className="leading-7 text-slate-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
