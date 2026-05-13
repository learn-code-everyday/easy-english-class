import { t, Trans } from "@lingui/macro";
import { Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { useAuthStore } from "@/stores/auth/useAuthStore";

import LocaleDropdownMobile from "../LocaleDropdown/Mobile";
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

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open && !openModal) return null;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/20 opacity-100 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden"
          onClick={onClose}
        >
          <nav
            className="absolute left-1/2 top-0 flex max-h-[calc(100vh-24px)] w-full max-w-sm -translate-x-1/2 translate-y-0 flex-col overflow-hidden rounded-b-3xl border border-slate-200 bg-white shadow-2xl transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={t`Main navigation`}
          >
            <div className="flex items-center justify-between gap-3 p-4">
              {auth ? (
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-slate-50 p-2">
                  <Avatar
                    alt={auth.name || auth.email}
                    src={auth.avatar || "/images/user/avatar.png"}
                    sx={{ width: 32, height: 32 }}
                  />
                  <div className="min-w-0 flex-1 text-left">
                    <div className="truncate font-semibold text-slate-900">
                      {auth.name || auth.email}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                      {auth.email}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/"
                  className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-slate-50 p-2"
                  onClick={onClose}
                >
                  <Image
                    width={36}
                    height={36}
                    src="/favicon.png"
                    alt={t`Brand Logo`}
                    className="rounded-lg"
                  />
                  <div className="truncate text-left font-semibold text-slate-900">
                    <Trans>English Class</Trans>
                  </div>
                </Link>
              )}
              <button
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-2xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500"
                onClick={onClose}
                aria-label={t`Close menu`}
              >
                <IoMdClose />
              </button>
            </div>

            <hr className="border-slate-200" />

            <div className="flex flex-1 flex-col gap-1 overflow-auto p-5 pt-4">
              {menu.map((item, index) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      aria-controls={`mobile-menu-${index}`}
                      aria-expanded={openDropdown === item.label}
                      className={`flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        openDropdown === item.label
                          ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
                          : "text-slate-700"
                      }`}
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                    >
                      <span>{item.label}</span>
                      <svg
                        width={16}
                        height={16}
                        fill="none"
                        viewBox="0 0 24 24"
                        className={`transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M7 10l5 5 5-5"
                          stroke="#2563eb"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <div
                        id={`mobile-menu-${index}`}
                        className="ml-3 mt-1 flex animate-fade-in-up flex-col gap-1 border-l border-slate-200 pl-3"
                      >
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href ?? "#"}
                            className={`rounded-2xl px-3 py-2.5 text-sm transition hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 ${
                              pathname === sub.href
                                ? "bg-blue-50 text-blue-700 font-semibold"
                                : "text-slate-600"
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
                    className={`rounded-2xl px-3 py-2.5 text-sm transition hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      pathname === item.href
                        ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
                        : "text-slate-700"
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <hr className="border-slate-200" />
              <LocaleDropdownMobile />
              {auth ? (
                <div className="flex flex-col">
                  <Link
                    href="/manage/dashboard"
                    className="rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Trans>Go to Dashboard</Trans>
                  </Link>
                  <button
                    className="rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-500"
                    onClick={() => {
                      logout?.();
                      onClose();
                    }}
                  >
                    <Trans>Logout</Trans>
                  </button>
                </div>
              ) : (
                <button
                  className="mt-3 rounded-2xl px-3 py-3 text-center text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500"
                  style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
                  onClick={() => {
                    setOpenModal(true);
                    onClose();
                  }}
                >
                  <Trans>Login</Trans>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
      <LoginModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default MobileMenu;
