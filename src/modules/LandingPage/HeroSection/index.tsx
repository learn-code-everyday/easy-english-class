import { Trans } from "@lingui/macro";
import { useState } from "react";

import LoginModal from "@/components/LoginModal";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export default function HeroSection() {
  const { auth } = useAuthStore();

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 px-6 pt-24 pb-32 text-center text-white">
      <div className="mx-auto max-w-3xl relative z-10">
        <h1 className="mb-4 animate-fade-in-up text-4xl font-bold md:text-5xl">
          <Trans>Master English with Ease</Trans>
        </h1>
        <p className="mb-6 animate-fade-in-up text-lg delay-200 md:text-xl">
          <Trans>
            A comprehensive English course that boosts your confidence in
            communication and certification exams.
          </Trans>
        </p>

        {!auth && (
          <button
            onClick={() => setOpenModal(true)}
            className="rounded-full px-8 py-3 font-semibold bg-white text-blue-600 transition hover:scale-105 cursor-pointer"
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
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
}
