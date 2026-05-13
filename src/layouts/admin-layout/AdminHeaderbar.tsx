import { t } from "@lingui/macro";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { FiMenu } from "react-icons/fi";

import LocaleDropdown from "@/components/LocaleDropdown";
import { useCurrentHeader } from "@/hooks/useCurrentHeader"; // (copy hook trên vào file này hoặc export ra riêng)
import { useAuthStore } from "@/stores/auth/useAuthStore";

interface Props {
  setCollapseShow: Dispatch<SetStateAction<boolean>>;
}

const AdminHeaderBar: React.FC<Props> = ({ setCollapseShow }) => {
  const { auth } = useAuthStore();
  const headerText = useCurrentHeader();

  return (
    <header className="fixed inset-x-0 z-30 ml-0 mt-0 border-b border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl md:ml-64 lg:ml-72 lg:px-8">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="block md:hidden">
          <img src={"/logo.png"} alt="logo" width={46} height={46} />
        </Link>

        {/* Show Header in center */}
        <div className="text-center text-lg font-semibold text-slate-900">
          {headerText}
        </div>

        <div className="hidden md:flex items-center">
          {auth && <LocaleDropdown />}
        </div>

        {/* Mobile Toggle button */}
        <button
          className="cursor-pointer rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
          type="button"
          onClick={() => setCollapseShow(true)}
          aria-label={t`Open menu`}
        >
          <FiMenu size={26} />
        </button>
      </div>
    </header>
  );
};

export default AdminHeaderBar;
