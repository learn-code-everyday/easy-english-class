import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

import { LOCALE_LABEL, SUPPORTED_LOCALES } from "@/helpers/locales";
import { useActiveLocale } from "@/hooks/useActiveLocale";

export default function LocaleDropdownMobile() {
  const activeLocale = useActiveLocale();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLocaleChange = (locale: string) => {
    router.push(
      { pathname: router.pathname, query: { ...router.query, lng: locale } },
      undefined,
      { shallow: true }
    );
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {/* Button */}
      <button
        className={clsx(
          "mb-2 flex w-full items-center justify-between rounded-2xl px-3 py-2.5",
          "text-sm font-medium text-slate-700 transition",
          "hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500",
          isOpen && "bg-blue-50 text-blue-700 font-semibold shadow-sm"
        )}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="font-semibold">{LOCALE_LABEL(activeLocale)}</span>
        <span className="flex items-center gap-2">
          <img
            className="h-6 w-9"
            src={`/flags/${activeLocale}.png`}
            alt={activeLocale}
          />
          <HiChevronDown
            size={22}
            className={clsx(
              "ml-1 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </span>
      </button>
      {/* Dropdown */}
      {isOpen && (
        <div className="ml-3 flex w-auto flex-col gap-1 border-l border-slate-200 pl-3">
          {SUPPORTED_LOCALES.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={clsx(
                "flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-sm transition",
                locale === activeLocale
                  ? "bg-blue-50 font-semibold text-blue-700"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              )}
            >
              <span>{LOCALE_LABEL(locale)}</span>
              <img
                className="h-5 w-8"
                src={`/flags/${locale}.png`}
                alt={locale}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
