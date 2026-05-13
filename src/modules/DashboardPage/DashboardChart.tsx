import { Trans } from "@lingui/macro";

import StudentGrowthBarChart from "./StudentGrowthBarChart";
import UserRatioPieChart from "./UserRatioPieChart";

const studentGrowth = [
  { month: "Jan", students: 210 },
  { month: "Feb", students: 250 },
  { month: "Mar", students: 280 },
  { month: "Apr", students: 300 },
  { month: "May", students: 330 },
  { month: "Jun", students: 348 },
];

const userRatio = [
  { name: "Students", value: 348 },
  { name: "Teachers", value: 23 },
];

const DashboardCharts = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-2">
      <section className="w-full rounded-[var(--app-radius)] border border-slate-200 bg-white p-5 shadow-[var(--app-shadow-sm)] sm:p-6">
        <h2 className="mb-4 text-base font-semibold text-slate-950 sm:text-lg">
          <Trans>Student Growth (6 months)</Trans>
        </h2>
        <StudentGrowthBarChart data={studentGrowth} />
      </section>
      <section className="w-full rounded-[var(--app-radius)] border border-slate-200 bg-white p-5 shadow-[var(--app-shadow-sm)] sm:p-6">
        <h2 className="mb-4 text-base font-semibold text-slate-950 sm:text-lg">
          <Trans>Students vs Teachers</Trans>
        </h2>
        <UserRatioPieChart data={userRatio} />
      </section>
    </div>
  );
};

export default DashboardCharts;
