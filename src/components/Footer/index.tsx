import { t, Trans } from "@lingui/macro";
import { Typography } from "@mui/material";
import { getYear } from "date-fns";
import Image from "next/image";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";

const listSocialNetwork = [
  {
    id: 1,
    href: "https://www.facebook.com/aoang.360457",
    icon: <FaFacebookF size={30} />,
  },
  {
    id: 2,
    href: "https://t.me/bee06011995",
    icon: <FaTelegramPlane size={30} />,
  },
];

function Footer() {
  const now = new Date();
  const year = getYear(now);

  return (
    <div className={"h-full px-[51px]"}>
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <Image width={80} height={80} src="/favicon.png" alt="logo" />

        <Typography>
          ©{year} <Trans>English Class All Rights Reserved</Trans>
        </Typography>

        <div className="flex flex-wrap gap-5">
          {listSocialNetwork.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition"
              aria-label={t`Social icon`}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
