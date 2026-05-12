import { t, Trans } from "@lingui/macro";
import { Avatar, Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

import { useAuthStore } from "@/stores/auth/useAuthStore";

import LocaleDropdown from "../LocaleDropdown";
import LoginModal from "../LoginModal";

interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  menu: MenuItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, menu }) => {
  const { auth, logout } = useAuthStore();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/30 md:hidden transition-opacity duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <nav
        className={`absolute right-0 top-0 flex h-full w-full xs:w-64 flex-col gap-2 bg-white p-0 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER ROW */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3 rounded w-full hover:bg-blue-50">
            <Avatar
              alt={auth?.name || auth?.email}
              src={auth?.avatar || "/images/user/avatar.png"}
              sx={{ width: 32, height: 32 }}
            />
            <div className="text-left flex-1">
              <div className="font-semibold text-blue-700">
                {auth?.name || auth?.email}
              </div>
              <div className="text-xs text-gray-500 max-w-full xs:max-w-[160px] truncate">
                {auth?.email}
              </div>
            </div>
          </div>
          <button
            className="p-2 text-2xl text-gray-600 hover:text-blue-700 rounded-full focus:outline-none"
            onClick={onClose}
            aria-label={t`Close menu`}
          >
            <IoMdClose />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 flex flex-col gap-2 px-6 py-4 overflow-auto">
          {menu.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="flex w-full items-center justify-between gap-1 rounded px-3 py-2 hover:bg-blue-50"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label
                    )
                  }
                >
                  <span>{item.label}</span>
                  <svg width={16} height={16} fill="none" viewBox="0 0 24 24">
                    <path
                      d="M7 10l5 5 5-5"
                      stroke="#2563eb"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {openDropdown === item.label && (
                  <div className="ml-4 mt-1 flex animate-fade-in-up flex-col">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href ?? "#"}
                        className={`rounded px-3 py-2 hover:bg-blue-100 ${
                          pathname === sub.href
                            ? "text-blue-700 font-bold underline"
                            : ""
                        }`}
                        onClick={onClose}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href ?? "#"}
                className={`rounded px-3 py-2 hover:bg-blue-50 ${
                  pathname === item.href
                    ? "text-blue-700 font-bold underline"
                    : ""
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            )
          )}
          <hr />
          {/* User Info or Login button */}
          <LocaleDropdown />
          {auth ? (
            <div className="flex flex-col">
              <Link
                href="/manage/dashboard"
                className="rounded px-3 py-2 hover:bg-blue-50"
              >
                <Trans>Management Site</Trans>
              </Link>
              <button
                className="px-3 py-2 text-left text-red-600 hover:bg-red-50"
                onClick={() => {
                  logout?.();
                  onClose();
                }}
              >
                <Trans>Logout</Trans>
              </button>
            </div>
          ) : (
            <>
              <Button
                className="mt-4 rounded-full bg-blue-600 px-3 py-2 text-center font-semibold text-white transition hover:bg-blue-700"
                onClick={() => {
                  onClose();
                  setOpenModal(true);
                }}
              >
                <Trans>Login</Trans>
              </Button>
              <LoginModal
                open={openModal}
                onClose={() => setOpenModal(false)}
              />
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
