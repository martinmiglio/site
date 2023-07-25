import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-auto mt-auto flex flex-col items-center justify-center">
        <h1 className="text-center text-9xl">404</h1>
        <h2 className="text-center text-4xl">Page Not Found</h2>
        <p className="m-8 text-center opacity-70">
          <Link href="/" className="text-theme-500 hover:underline">
            go home
          </Link>
        </p>
      </div>
    </div>
  );
}
