import { Trans } from "@lingui/macro";

import MainLayout from "@/layouts/MainLayout";

// pages/terms.tsx
export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <h1 className="mb-4 text-2xl font-bold">
        <Trans>Terms of Service</Trans>
      </h1>
      <p>
        <Trans>
          By using our website and services, you agree to comply with all our
          policies and regulations. Please read these terms carefully. If you
          have any questions, feel free to contact us.
        </Trans>
      </p>
      {/* ...Add more content if needed */}
    </div>
  );
}

TermsOfService.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};
