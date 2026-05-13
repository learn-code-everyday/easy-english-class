import clsx from "clsx";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <FiChevronDown
          className={`ml-1 text-blue-600 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          size={16}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ul
          className="absolute left-0 top-full z-40 m-0 w-60 animate-fade-in-up rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur"
          role="menu"
        >
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                role="menuitem"
                className={clsx(
                  pathname === item.href &&
                    "bg-blue-50 text-blue-700 font-semibold",
                  "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
