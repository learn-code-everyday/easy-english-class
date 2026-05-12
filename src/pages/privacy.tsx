import { Trans } from "@lingui/macro";

import MainLayout from "@/layouts/MainLayout";

// pages/privacy.tsx
export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <h1 className="mb-4 text-2xl font-bold">
        <Trans>Privacy Policy</Trans>
      </h1>
      <p>
        <Trans>
          We are committed to protecting your personal information and will not
          share it with third parties. All data is used solely to improve user
          experience and enhance our services.
        </Trans>
      </p>
      {/* ...Add more content if needed */}
    </div>
  );
}

PrivacyPolicy.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};

// export async function getServerSideProps() {
//     const homepage = pagesData.find(
//         (page) => page.seoPage === SEOPages.TERMS_AND_CONDITIONS,
//     ) || {
//         title: '',
//         description: '',
//         image: '',
//     };

//     return { props: { pageSEO: homepage } };
