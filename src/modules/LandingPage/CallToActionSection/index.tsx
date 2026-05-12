import { Trans } from "@lingui/macro";
import { useState } from "react";

import LoginModal from "@/components/LoginModal";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export default function CallToActionSection() {
  const { auth } = useAuthStore();
  const [openModal, setOpenModal] = useState<boolean>(false);

  if (auth) return <></>;

  return (
    <section className="bg-indigo-600 px-6 py-16 text-center text-white">
      <h2 className="mb-4 text-3xl font-bold">
        <Trans>Ready to Get Started?</Trans>
      </h2>
      <p className="mb-6">
        <Trans>Register now to receive tuition discounts today</Trans>
      </p>
      <button
        onClick={() => setOpenModal(true)}
        className="rounded-full px-8 py-3 font-semibold bg-white text-blue-600 transition hover:scale-105 cursor-pointer"
      >
        <Trans>Register Now</Trans>
      </button>

      <LoginModal
        screenView="register"
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </section>
  );
}
