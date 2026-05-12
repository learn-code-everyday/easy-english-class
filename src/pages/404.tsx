import { Trans } from "@lingui/macro";
import Link from "next/link";
import { useRouter } from "next/router";

import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import MainLayout from "@/layouts/MainLayout";

export default function Custom404() {
  const { asPath } = useRouter();
  const isAdminPage = asPath.startsWith("/manage");

  if (isAdminPage) {
    return (
      <AdminLayout>
        <Error404Content isAdminPage={isAdminPage} />
      </AdminLayout>
    );
  }

  return (
    <MainLayout>
      <Error404Content isAdminPage={isAdminPage} />
    </MainLayout>
  );
}

function Error404Content({ isAdminPage }: { isAdminPage: boolean }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <img src="/images/errors/page404.jpg" className="mb-5" alt="404" />
      <div className="flex gap-3">
        <button
          onClick={() => router.back()}
          className="px-5 py-2 rounded-lg bg-[#d6dffd] text-[#8583f5] font-medium shadow hover:bg-[#b3bafc] transition"
        >
          <Trans>Go back</Trans>
        </button>
        <Link
          href={isAdminPage ? "/manage/dashboard" : "/"}
          className="px-5 py-2 rounded-lg bg-[#8583f5] text-white font-medium shadow hover:bg-[#6b74e5] transition"
        >
          <Trans>Go home</Trans>
        </Link>
      </div>
    </div>
  );
}
