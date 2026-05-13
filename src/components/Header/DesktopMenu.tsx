import { Trans } from "@lingui/macro";
import { Menu, MenuItem, Avatar, Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation"; // App Router
import React, { useState } from "react";

import Dropdown from "@/components-shared/Dropdown";
import { useAuthStore } from "@/stores/auth/useAuthStore";

import LocaleDropdown from "../LocaleDropdown";
import LoginModal from "../LoginModal";

interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
}

interface DesktopMenuProps {
  menu: MenuItem[];
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ menu }) => {
  const pathname = usePathname();
  const { auth, logout } = useAuthStore();

  const [openModal, setOpenModal] = useState<boolean>(false);

  // Dropdown menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout?.();
    handleClose();
  };

  return (
    <>
      <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
        {menu.map((item) =>
          item.children ? (
            <Dropdown
              key={item.label}
              label={item.label}
              items={item.children.map((child) => ({
                ...child,
                href: child.href ?? "#",
                active: pathname === child.href,
              }))}
            />
          ) : (
            <Link
              key={item.href}
              href={String(item.href)}
              className={
                "rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" +
                (pathname === item.href
                  ? " bg-blue-50 text-blue-700 font-semibold"
                  : "")
              }
              prefetch
            >
              {item.label}
            </Link>
          )
        )}
        <LocaleDropdown />
      </nav>
      <div className="hidden lg:block">
        {!auth ? (
          <>
            <Button
              onClick={() => setOpenModal(true)}
              className="ml-3 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 lg:inline-block"
            >
              <Trans>Login</Trans>
            </Button>
            <LoginModal open={openModal} onClose={() => setOpenModal(false)} />
          </>
        ) : (
          <>
            <Button
              onClick={handleClick}
              aria-controls={open ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              className="ml-4 hidden items-center gap-2 text-blue-700 lg:flex"
              sx={{
                borderRadius: 999,
                px: 1.5,
                py: 0.75,
                textTransform: "none",
                "&:hover": { backgroundColor: "#eff6ff" },
              }}
            >
              <Avatar
                alt={auth.name || auth.email}
                src={auth.avatar || "/default-avatar.png"}
                sx={{ width: 32, height: 32 }}
              />
              <div className="flex flex-col items-start">
                <span className="font-semibold">{auth.name}</span>
              </div>
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: {
                  minWidth: 190,
                  py: 1,
                  mt: 1,
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
                },
              }}
            >
              <MenuItem
                component={Link}
                href="/manage/dashboard"
                onClick={handleClose}
                sx={{ fontWeight: "bold" }}
              >
                <Trans>Go to Dashboard</Trans>
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                <Trans>Logout</Trans>
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </>
  );
};

export default DesktopMenu;
