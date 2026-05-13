import { Trans } from "@lingui/macro";
import React, { useMemo } from "react";

import { ROLE_LABELS } from "@/constants/role";
import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import DashboardCharts from "@/modules/DashboardPage/DashboardChart";
import DashboardStats from "@/modules/DashboardPage/DashboardStats";
import { useAuthStore } from "@/stores/auth/useAuthStore";

const DashboardAdmin = () => {
  const { auth } = useAuthStore();
  console.log("API URI:", process.env.NEXT_PUBLIC_API_URI);

  const renderUserRole = useMemo(() => {
    if (!auth) return null;
    if (auth.role === "ADMIN") return ROLE_LABELS().ADMIN;
    if (auth.userType && ROLE_LABELS()[auth.userType])
      return ROLE_LABELS()[auth.userType];
    return ROLE_LABELS().UNKNOWN;
  }, [auth]);

  return (
    <div className="min-h-screen">
      <div className="mb-8 rounded-[var(--app-radius)] border border-slate-200 bg-white p-5 shadow-[var(--app-shadow-sm)] sm:p-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-blue-600">
          <Trans>Dashboard</Trans>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            <Trans>Welcome back,</Trans> {renderUserRole} 👋
          </h1>
          <p className="text-sm text-slate-500 sm:text-base">
            <Trans>Here&apos;s your dashboard overview.</Trans>
          </p>
        </div>
      </div>

      <DashboardStats />

      <DashboardCharts />
    </div>
  );
};

DashboardAdmin.Layout = AdminLayout;
export default DashboardAdmin;
