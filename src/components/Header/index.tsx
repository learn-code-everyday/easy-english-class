"use client";

import { t } from "@lingui/macro";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import { GetAuthToken } from "@/graphql/auth";
import {
  canAccessAssignments,
  isAdmin,
  isTeacher,
} from "@/helpers/auth-access";
import { useAuthStore } from "@/stores/auth/useAuthStore";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const getPublicMenu = ({
  showDashboard,
  showLearning,
}: {
  showDashboard: boolean;
  showLearning: boolean;
}) => {
  const courses = [
    { label: t`Basic Communication`, href: "/courses/basic" },
    { label: t`IELTS Preparation`, href: "/courses/ielts" },
    { label: t`Kids English`, href: "/courses/kids" },
    { label: t`Online Course`, href: "/courses/online" },
  ];

  const aboutUs = [
    { label: t`Our Mission`, href: "/about/mission" },
    { label: t`Our Team`, href: "/about/team" },
    { label: t`FAQ`, href: "/about/faq" },
  ];

  return [
    { label: t`Home`, href: "/" },
    { label: t`Courses`, children: courses },
    ...(showLearning
      ? [
          { label: t`Lessons`, href: "/lessons" },
          { label: t`Assignments`, href: "/assignments" },
        ]
      : []),
    { label: t`Testimonials`, href: "/testimonials" },
    { label: t`About Us`, children: aboutUs },
    { label: t`Contact`, href: "/contact" },
    ...(showDashboard
      ? [{ label: t`Go to Dashboard`, href: "/manage/dashboard" }]
      : []),
  ];
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { auth, verifiedToken } = useAuthStore();
  const token = GetAuthToken();
  const hasSession = Boolean(token || verifiedToken);
  const menu = getPublicMenu({
    showDashboard: hasSession && (isAdmin(auth) || isTeacher(auth)),
    showLearning: hasSession && canAccessAssignments(auth),
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 px-4 shadow-sm backdrop-blur-xl sm:px-6 lg:px-10">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <Image
            width={68}
            height={50}
            src="/favicon.png"
            alt={t`Brand Logo`}
          />
        </Link>

        {/* Desktop menu */}
        <DesktopMenu menu={menu} />

        {/* Burger */}
        <button
          className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 lg:hidden"
          aria-label={mobileMenuOpen ? t`Close menu` : t`Open menu`}
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? (
            <IoMdClose size={32} className="text-blue-700" />
          ) : (
            <FiMenu size={28} className="text-blue-700" />
          )}
        </button>

        {/* Mobile menu */}
        <MobileMenu
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          menu={menu}
        />
      </div>
    </header>
  );
};

export default Header;
