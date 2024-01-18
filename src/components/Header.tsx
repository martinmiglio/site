import { ThemeSwitcher } from "@/components/Theme";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full justify-between py-8">
      <Link href="/" data-umami-event="Header Home Clicked">
        <h1 className="font-bold text-theme-500">Martin Miglio</h1>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          className="hover:underline"
          href="https://github.com/martinmiglio/"
          data-umami-event="My Projects Link Clicked"
        >
          my projects
        </Link>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
