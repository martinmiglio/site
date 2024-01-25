import { cn } from "@/lib/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-theme-900 bg-theme-50 px-3 py-2 text-sm placeholder:text-theme-900/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-theme-100 dark:bg-theme-900 dark:placeholder:text-theme-50/60",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
