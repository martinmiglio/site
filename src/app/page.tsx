import SocialBar from "@/components/SocialBar";
import Link from "next/link";

export default function PortfolioHome() {
  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="flex w-full justify-between py-8">
        <h1 className="font-bold text-theme-500">Martin Miglio</h1>
        <div className="flex gap-4">
          <Link
            className="hover:underline"
            href="https://github.com/martinmiglio/"
          >
            my projects
          </Link>
        </div>
      </div>
      <div className="flex-grow">
        <h2 className="mb-12 py-6 text-4xl font-extrabold sm:text-5xl">
          Hey there, I'm Martin!
        </h2>
        <div className="flex flex-col gap-6 text-lg opacity-80">
          <p>
            I'm a full-stack software developer with a knack for crafting web
            applications using React, Next.js, and AWS. Currently pursuing a BS
            in Computer Science, I'm embracing the art of mastering the best
            practices in the field.
          </p>
          <p>
            I take pride in maintaining and contributing to open source
            projects. Visit{" "}
            <Link
              className="text-theme-500 hover:underline"
              href="https://github.com/martinmiglio"
            >
              my GitHub
            </Link>{" "}
            to see my projects and contributions. Past internships at{" "}
            <Link
              className="hover:underline"
              href="https://opencorporates.com/companies/us_tx/0801291571"
            >
              I Play Texas
            </Link>{" "}
            and{" "}
            <Link
              className="hover:underline"
              href="https://www.groupgolfer.com/"
            >
              Group Golfer
            </Link>{" "}
            have honed my skills in full-stack development and frontend web
            development using .NET and Python.
          </p>
          <p>
            Beyond coding, I find solace in nature. Camping, hiking, and
            landscape photography are my go-to activities when I'm not immersed
            in the digital realm. Check out some of my captures on Instagram{" "}
            <Link
              className="text-theme-500 hover:underline"
              href="https://instagram.com/migliosights"
            >
              @migliosights
            </Link>
            .
          </p>
          <p>
            If you're interested in collaboration or simply want to connect,
            drop me a message. Let's build something great together!
          </p>
        </div>
      </div>
      <div className="flex w-full flex-row flex-wrap items-center justify-between py-8 text-sm opacity-60">
        <div className="pb-1">
          © 2023 Martin Miglio
          <Link
            href="https://github.com/martinmiglio/site"
            className="text-theme-500 hover:underline"
          >
            <div>view source</div>
          </Link>
        </div>
        <SocialBar />
      </div>
    </div>
  );
}
