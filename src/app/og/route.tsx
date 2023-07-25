import { ImageResponse } from "next/server";
import svgToDataUri from "mini-svg-data-uri";

export const runtime = "edge";

export async function GET() {
  try {
    const fontData = await fetch(
      new URL("../../assets/GolosTextBold.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "white",
            fontFamily: '"Golos Text"',
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none" stroke="#EBE5FB"><path d="M0 .5H99.5V100"/></svg>`,
            )}")`,
          }}
          tw="w-full h-full flex flex-col pl-12"
        >
          <h1 tw="text-[#5221C4] py-8 text-7xl">Martin Miglio</h1>
          <h2 tw="text-[#070311] pt-8 text-8xl">full-stack web dev</h2>
          <h3 tw="text-[#070311] text-5xl">React • Next.js • AWS</h3>
          <h4 tw="text-[#5221C4] opacity-30 p-8 text-5xl mt-auto ml-auto">
            martinmiglio.dev
          </h4>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Golos Text",
            data: fontData,
            style: "normal",
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
