import { Trans } from "@lingui/macro";
import { useState } from "react";

import LoginModal from "@/components/LoginModal";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export default function CallToActionSection() {
  const { auth } = useAuthStore();
  const [openModal, setOpenModal] = useState<boolean>(false);

  if (auth) return <></>;

  return (
    <section
      className="px-5 py-16 text-center sm:px-6"
      style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
    >
      <div className="mx-auto max-w-3xl">
        <h2
          className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: "#ffffff" }}
        >
          <Trans>Ready to Get Started?</Trans>
        </h2>
        <p className="mb-7" style={{ color: "#cbd5e1" }}>
          <Trans>Register now to receive tuition discounts today</Trans>
        </p>
        <button
          onClick={() => setOpenModal(true)}
          className="cursor-pointer rounded-full px-8 py-3 font-semibold shadow-lg transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
        >
          <Trans>Register Now</Trans>
        </button>
      </div>

      <LoginModal
        screenView="register"
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </section>
  );
}
