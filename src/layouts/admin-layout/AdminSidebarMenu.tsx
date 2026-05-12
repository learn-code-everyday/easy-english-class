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
          active ? "text-[#FF7125]" : "text-gray-700",
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
        active ? "text-[#FF7125]" : "text-gray-700",
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
            "rounded-md px-3 py-2 transition",
            "hover:bg-primary hover:bg-opacity-50 hover:bg-[#FAEEE1]",
            "flex items-center gap-4",
            active
              ? "border-l-4 border-[#FF7125] bg-[#FAEEE1] text-[#FF7125] font-semibold"
              : "text-gray-800"
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
        <hr className="my-3 md:min-w-full" />
        <h6 className="block py-1 text-xs font-bold uppercase text-primary-dark no-underline md:min-w-full">
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
              <hr className="my-3 md:min-w-full" />
              <h6 className="block py-1 text-sm uppercase text-[#848484] no-underline md:min-w-full">
                {cate}
              </h6>
              <ul className="flex list-none flex-col md:min-w-full md:flex-col">
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
