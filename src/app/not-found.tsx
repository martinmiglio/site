import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <h1 className="text-center text-9xl">404</h1>
      <h2 className="text-center text-4xl">Page Not Found</h2>
      <p className="m-8 text-center opacity-70">
        <Link
          href="/"
          className="text-theme-500 hover:underline"
          data-umami-event="Home Link Clicked"
        >
          go home
        </Link>
      </p>
    </div>
  );
}
