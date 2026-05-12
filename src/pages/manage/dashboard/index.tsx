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
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap-reverse items-center justify-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold">
          <Trans>Welcome back,</Trans> {renderUserRole} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          <Trans>Here&apos;s your dashboard overview.</Trans>
        </p>
      </div>

      <DashboardStats />

      <DashboardCharts />
    </div>
  );
};

DashboardAdmin.Layout = AdminLayout;
export default DashboardAdmin;
