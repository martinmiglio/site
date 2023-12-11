import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full justify-between py-8">
      <h1 className="font-bold text-theme-500">Martin Miglio</h1>
      <div className="flex gap-4">
        <Link
          className="hover:underline"
          href="https://github.com/martinmiglio/"
          data-umami-event="My Projects Link Clicked"
        >
          my projects
        </Link>
      </div>
    </div>
  );
}
