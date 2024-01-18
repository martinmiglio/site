import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-grow">
      <h2 className="mb-12 py-6 text-4xl font-extrabold text-theme-950 dark:text-theme-300 sm:text-5xl">
        Hey there, I'm{" "}
        <span className="animate-shine flex-col bg-gradient-to-r from-theme-500 from-35% via-theme-300 to-theme-500 to-65% bg-clip-text text-transparent fill-mode-forwards">
          Martin!
        </span>
      </h2>
      <div className="flex flex-col gap-6 text-lg">
        <p>
          I'm a full-stack software developer with a knack for crafting web
          applications using React, Next.js, and AWS. Currently pursuing a BS in
          Computer Science, I'm embracing the art of mastering the best
          practices in the field.
        </p>
        <p>
          I take pride in maintaining and contributing to open source projects.
          Visit{" "}
          <Link
            className="text-theme-500 hover:underline"
            href="https://github.com/martinmiglio"
            data-umami-event="GitHub Link Clicked"
          >
            my GitHub
          </Link>{" "}
          to see my projects and contributions. Past internships at{" "}
          <Link
            className="hover:underline"
            href="https://opencorporates.com/companies/us_tx/0801291571"
            data-umami-event="IPT Link Clicked"
          >
            I Play Texas
          </Link>{" "}
          and{" "}
          <Link
            className="hover:underline"
            href="https://www.groupgolfer.com/"
            data-umami-event="GG Link Clicked"
          >
            Group Golfer
          </Link>{" "}
          have honed my skills in full-stack development and frontend web
          development using .NET and Python.
        </p>
        <p>
          Beyond coding, I find solace in nature. Camping, hiking, and landscape
          photography are my go-to activities when I'm not immersed in the
          digital realm. Check out some of my captures on Instagram{" "}
          <Link
            className="text-theme-500 hover:underline"
            href="https://instagram.com/migliosights"
            data-umami-event="Instagram Link Clicked"
          >
            @migliosights
          </Link>
          .
        </p>
        <p>
          If you're interested in collaboration or simply want to connect,{" "}
          <Link
            className="text-theme-500 hover:underline"
            href="/message"
            data-umami-event="Message Link Clicked"
          >
            drop me a message
          </Link>
          . Let's build something great together!
        </p>
      </div>
    </div>
  );
}
