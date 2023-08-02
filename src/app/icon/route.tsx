import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const fontDataBold = await fetch(
    new URL("../../assets/GolosText-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());
  return new ImageResponse(
    (
      <div
        style={{ fontFamily: '"Golos Text Bold"' }}
        tw="text-[#00A824] bg-[#E8E8E8] text-5xl w-full h-full flex items-center justify-center rounded-2xl"
      >
        <div tw="flex">
          M<div tw="text-xl flex mb-auto">2</div>
        </div>
      </div>
    ),
    {
      width: 64,
      height: 64,
      fonts: [
        {
          name: "Golos Text Bold",
          data: fontDataBold,
          style: "normal",
        },
      ],
    },
  );
}
