import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import PageHeader from "@/components/PageHeader";
import { GetAuthToken } from "@/graphql/auth";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";

import AdminHeaderBar from "./AdminHeaderbar";
import AdminSidebar from "./AdminSidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  const { auth, authStatus, logout, verifiedToken } = useAuthStore();
  const token = GetAuthToken();
  const router = useRouter();
  const [collapseShow, setCollapseShow] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }

    if (authStatus === AuthStatuses.LOADED) {
      if (!auth || verifiedToken !== token) {
        logout?.();
      }
    }
  }, [authStatus, auth, logout, router, token, verifiedToken]);

  if (!token || verifiedToken !== token || authStatus !== AuthStatuses.LOADED) {
    return null;
  }

  return (
    <>
      <AdminSidebar
        collapseShow={collapseShow}
        setCollapseShow={setCollapseShow}
      />
      <div className="flex min-h-screen flex-col bg-[var(--app-bg)] md:ml-64 lg:ml-72">
        <AdminHeaderBar setCollapseShow={setCollapseShow} />
        <main className="mt-[72px] flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <PageHeader />
          {children}
        </main>
      </div>
    </>
  );
}
