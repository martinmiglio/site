import svgToDataUri from "mini-svg-data-uri";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  try {
    const fontDataBold = await fetch(
      new URL("../../assets/GolosText-Bold.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const fontDataRegular = await fetch(
      new URL("../../assets/GolosText-Regular.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "#E8E8E8",
            fontFamily: '"Golos Text Regular"',
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" fill="none" stroke="#D8DAD3"><path d="M0 .5H99.5V100"/></svg>`,
            )}")`,
          }}
          tw="w-full h-full flex flex-col pl-12"
        >
          <div style={{ fontFamily: '"Golos Text Bold"' }} tw="flex flex-col">
            <h1 tw="text-[#00A824] py-8 text-7xl">Martin Miglio</h1>
            <h2 tw="text-[#32352C] pt-8 text-8xl">full-stack web dev</h2>
          </div>
          <h3 tw="text-[#32352C] text-6xl">React • Next.js • AWS</h3>
          <h4 tw="text-[#00A824] opacity-30 p-8 text-5xl mt-auto ml-auto">
            martinmiglio.dev
          </h4>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Golos Text Regular",
            data: fontDataRegular,
            style: "normal",
          },
          {
            name: "Golos Text Bold",
            data: fontDataBold,
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
