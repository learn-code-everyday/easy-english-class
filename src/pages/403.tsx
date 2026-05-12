import { Trans } from "@lingui/macro";
import Link from "next/link";
import { useRouter } from "next/router";

import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import MainLayout from "@/layouts/MainLayout";

export default function Custom403() {
  const { asPath, query } = useRouter();
  const isAdminPage = query.admin === "1" || asPath.startsWith("/manage");

  if (isAdminPage) {
    return (
      <AdminLayout>
        <Error403Content isAdminPage={isAdminPage} />
      </AdminLayout>
    );
  }

  return (
    <MainLayout>
      <Error403Content isAdminPage={isAdminPage} />
    </MainLayout>
  );
}

function Error403Content({ isAdminPage }: { isAdminPage: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <img src="/images/errors/page403.png" className="mb-5 w-full" alt="403" />
      <h1 className="mt-8 text-3xl font-bold text-[#FF7125]">
        ❌ <Trans>Access Denied</Trans>
      </h1>
      <p className="mt-4 max-w-xl text-center text-lg text-current">
        <Trans>You don&apos;t have permission to access this page.</Trans>
        <br />
        <Trans>Try going back to dashboard.</Trans>
      </p>
      <div className="mt-8 flex gap-3 justify-center">
        <Link
          href={isAdminPage ? "/manage/dashboard" : "/"}
          className="px-5 py-2 rounded-lg bg-[#8583f5] text-white font-medium shadow hover:bg-[#6b74e5] transition"
        >
          <Trans>Go back</Trans>{" "}
          {isAdminPage ? <Trans>Dashboard</Trans> : <Trans>Home</Trans>}
        </Link>
      </div>
    </div>
  );
}
