import { Trans } from "@lingui/macro";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

import IconSVG from "@/components-shared/IconSVG";
import useMenu, { MenuData } from "@/hooks/useMenu";
import { ICON_COMPONENTS } from "@/utils/iconMap";

interface AdminSidebarMenuProps {
  setCollapseShow: (show: boolean) => void;
}

function MenuIcon({
  icon,
  active,
  ...props
}: {
  icon: string;
  active?: boolean;
  size?: number;
  className?: string;
}) {
  // Type assertion for strict safety if needed: (icon as IconKey)
  const IconComp = (ICON_COMPONENTS as any)[icon];
  if (IconComp) {
    return (
      <IconComp
        size={props.size ?? 20}
        className={clsx(
          "transition",
          active ? "text-blue-600" : "text-slate-500",
          props.className
        )}
      />
    );
  }
  return (
    <IconSVG
      src={`/icons/menu/${icon}.svg`}
      size={props.size ?? 20}
      className={clsx(
        "transition",
        active ? "text-blue-600" : "text-slate-500",
        props.className
      )}
    />
  );
}

const AdminSidebarMenu: React.FC<AdminSidebarMenuProps> = ({
  setCollapseShow,
}) => {
  const router = useRouter();
  const [menu, menuCategories] = useMenu();

  const MenuItem: React.FC<{ menuData: MenuData }> = ({ menuData }) => {
    const active =
      menuData.code === "setting"
        ? router.asPath.startsWith("/setting")
        : router.asPath.startsWith(menuData.url || "");

    return (
      <li className="mb-1 items-center">
        <Link
          href={menuData.url}
          onClick={() => setCollapseShow(false)}
          className={clsx(
            "rounded-2xl px-3 py-2.5 transition",
            "hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500",
            "flex items-center gap-3 text-sm",
            active
              ? "bg-blue-50 text-blue-700 font-semibold shadow-sm"
              : "text-slate-700"
          )}
        >
          <MenuIcon icon={menuData.icon} active={active} />
          {menuData.title}
        </Link>
      </li>
    );
  };

  if (
    !menu ||
    menu.length === 0 ||
    !menuCategories ||
    menuCategories.length === 0
  ) {
    return (
      <>
        <hr className="my-4 border-slate-200 md:min-w-full" />
        <h6 className="block rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 no-underline md:min-w-full">
          <Trans>Loading...</Trans>
        </h6>
      </>
    );
  }

  return (
    <div>
      {menuCategories.map((cate, i) => {
        const cateMenu = menu.filter(
          (m) => m?.categoryCode && m.categoryCode === cate
        );
        return (
          cateMenu.length > 0 && (
            <Fragment key={i}>
              <hr className="my-4 border-slate-200 md:min-w-full" />
              <h6 className="block px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 no-underline md:min-w-full">
                {cate}
              </h6>
              <ul className="mt-2 flex list-none flex-col gap-1 md:min-w-full md:flex-col">
                {cateMenu.map((item) => (
                  <MenuItem menuData={item} key={item.code} />
                ))}
              </ul>
            </Fragment>
          )
        );
      })}
    </div>
  );
};

export default AdminSidebarMenu;
