import SocialBar from "./SocialBar";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex w-full flex-row flex-wrap items-center justify-between py-8 text-sm opacity-60">
      <div className="pb-1">
        © 2023 Martin Miglio
        <Link
          href="https://github.com/martinmiglio/site"
          className="text-theme-500 hover:underline"
          data-umami-event="View Source Link Clicked"
        >
          <div>view source</div>
        </Link>
      </div>
      <SocialBar />
    </div>
  );
}
