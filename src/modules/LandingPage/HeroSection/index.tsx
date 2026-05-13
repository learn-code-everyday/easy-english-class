import { Trans } from "@lingui/macro";
import { useState } from "react";

import LoginModal from "@/components/LoginModal";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export default function HeroSection() {
  const { auth } = useAuthStore();

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-20 text-center sm:px-6 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_34%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_30%)]" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="mb-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
          <Trans>English Class</Trans>
        </p>
        <h1 className="mb-5 animate-fade-in-up text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
          <Trans>Master English with Ease</Trans>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl animate-fade-in-up text-base leading-8 text-slate-600 delay-200 md:text-xl">
          <Trans>
            A comprehensive English course that boosts your confidence in
            communication and certification exams.
          </Trans>
        </p>

        {!auth && (
          <button
            onClick={() => setOpenModal(true)}
            className="cursor-pointer rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <Trans>Register Now</Trans>
          </button>
        )}

        <LoginModal
          screenView="register"
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </div>
      <div className="absolute bottom-0 left-0 z-10 h-24 w-full bg-gradient-to-t from-[var(--app-bg)] to-transparent" />
    </section>
  );
}
