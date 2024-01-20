"use client";

import { ThemeSwitcher } from "@/components/Theme";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/cv", label: "My CV" },
    { href: "/message", label: "Message Me" },
  ];

  return (
    <div className="flex w-full justify-between py-8">
      <Link href="/" data-umami-event="Header Home Clicked">
        <h1 className="font-bold text-theme-500">Martin Miglio</h1>
      </Link>
      <div className="flex items-center gap-4">
        {links.map(({ href, label }) => {
          if (href !== pathname) {
            return (
              <Link
                key={href}
                href={href}
                className="hover:underline"
                data-umami-event={`${label} Link Clicked`}
              >
                {label}
              </Link>
            );
          }
          return null;
        })}
        <ThemeSwitcher />
      </div>
    </div>
  );
}
