import { t } from "@lingui/macro";
import React from "react";
import { BiBookReader } from "react-icons/bi";
import {
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaUserGraduate,
} from "react-icons/fa";

import { formatNumber } from "@/helpers/format";

const getStats = () => [
  {
    label: t`Total Students`,
    value: 348,
    icon: <FaUserGraduate />,
  },
  {
    label: t`Total Teachers`,
    value: 23,
    icon: <FaChalkboardTeacher />,
  },
  {
    label: t`Active Classes`,
    value: 15,
    icon: <BiBookReader />,
  },
  {
    label: t`Monthly Revenue`,
    value: 240150,
    icon: <FaMoneyBillWave />,
    isMoney: true,
  },
];

const DashboardStats = () => {
  const stats = getStats();

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="group flex min-h-[132px] items-center gap-4 rounded-[var(--app-radius)] border border-slate-200 bg-white px-5 py-5 shadow-[var(--app-shadow-sm)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[var(--app-shadow-md)]"
        >
          <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white sm:size-14 sm:text-3xl">
            {item.icon}
          </div>
          <div className="min-w-0">
            <div className="mb-1 text-sm font-medium text-slate-500">
              {item.label}
            </div>
            <div
              className={`flex items-end text-nowrap font-bold tracking-tight ${
                item.isMoney
                  ? "text-2xl text-emerald-600 sm:text-3xl"
                  : "text-2xl text-slate-950 sm:text-3xl"
              }`}
            >
              {item.isMoney ? (
                <>
                  <span className="mr-1 text-base text-slate-400 sm:text-lg">
                    $
                  </span>
                  <span>{formatNumber(item.value)}</span>
                </>
              ) : (
                item.value
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
