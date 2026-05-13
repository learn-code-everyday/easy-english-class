import { t, Trans } from "@lingui/macro";
import { Typography } from "@mui/material";
import { getYear } from "date-fns";
import Image from "next/image";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";

const getSocialNetworks = () => [
  {
    id: 1,
    href: "https://www.facebook.com/aoang.360457",
    label: t`Facebook`,
    icon: <FaFacebookF size={30} />,
  },
  {
    id: 2,
    href: "https://t.me/bee06011995",
    label: t`Telegram`,
    icon: <FaTelegramPlane size={30} />,
  },
];

function Footer() {
  const now = new Date();
  const year = getYear(now);
  const listSocialNetwork = getSocialNetworks();

  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <Image width={80} height={80} src="/favicon.png" alt="logo" />

        <Typography className="text-sm text-slate-500">
          ©{year} <Trans>English Class All Rights Reserved</Trans>
        </Typography>

        <div className="flex flex-wrap gap-5">
          {listSocialNetwork.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={item.label}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
