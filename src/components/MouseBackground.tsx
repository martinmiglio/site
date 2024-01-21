"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export interface MouseBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  radius?: number;
}

export function MouseBackground({
  className,
  radius = 256,
  ...props
}: Readonly<MouseBackgroundProps>) {
  const [mousePosition, setMousePosition] = useState({
    x: -radius,
    y: -radius,
  });

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const style = {
    "--mouse-background-radius": `${radius * 2}px`,
    transform: `translate(${mousePosition.x - radius}px, ${
      mousePosition.y - radius
    }px)`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "absolute left-0 top-0 h-[var(--mouse-background-radius)] w-[var(--mouse-background-radius)] rounded-full bg-theme-50 dark:bg-theme-900",
        className,
      )}
      style={style}
      {...props}
    />
  );
}
