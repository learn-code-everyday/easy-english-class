import { t } from "@lingui/macro";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

import ProfileDropdown from "@/components/ProfileDropdown";

import AdminSidebarBranch from "./AdminSidebarBranch";
import AdminSidebarMenu from "./AdminSidebarMenu";

interface Props {
  collapseShow: boolean;
  setCollapseShow: Dispatch<SetStateAction<boolean>>;
}

const AdminSidebar: React.FC<Props> = ({ collapseShow, setCollapseShow }) => {
  return (
    <>
      {/* Overlay sidebar for mobile */}
      <div
        className={clsx(
          "fixed inset-0 z-50 transition-all duration-300 md:hidden",
          collapseShow
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        )}
        style={{
          background: collapseShow ? "rgba(0,0,0,0.18)" : "transparent",
        }}
        onClick={() => setCollapseShow(false)}
      >
        <nav
          className={clsx(
            "absolute left-1/2 top-0 w-full max-w-sm -translate-x-1/2 rounded-b-3xl border border-slate-200 bg-white shadow-2xl transition-transform duration-300",
            collapseShow ? "translate-y-0" : "-translate-y-full"
          )}
          style={{ zIndex: 100 }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
          role="dialog"
          aria-modal="true"
          aria-label={t`Admin navigation`}
        >
          <div className="flex justify-between p-4">
            <ProfileDropdown />
            <button
              className="flex size-10 items-center justify-center rounded-full text-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={() => setCollapseShow(false)}
              aria-label={t`Close menu`}
            >
              ✕
            </button>
          </div>
          <hr className="border-slate-200" />
          <div className="p-5 pt-4">
            <AdminSidebarBranch />
            <AdminSidebarMenu setCollapseShow={setCollapseShow} />
          </div>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <nav
        className={clsx(
          "hidden border-r border-slate-200 bg-white px-5 pb-10 shadow-sm md:fixed md:inset-y-0 md:left-0 md:block md:w-64 md:overflow-y-auto lg:w-72"
        )}
      >
        <AdminSidebarBranch />
        <AdminSidebarMenu setCollapseShow={setCollapseShow} />
      </nav>
    </>
  );
};
export default AdminSidebar;
