import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Join Waitlist", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-full border px-6 py-2 text-center font-semibold",
        className,
      )}
      {...props}
    >
      {/* Normal text */}
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>

      {/* Hover text + arrow */}
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight />
      </div>

      
      <div className="text-black absolute right-28 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-600 transition-all duration-300 group-hover:h-full group-hover:w-full group-hover:scale-150 group-hover:rounded-none group-hover:bg-yellow-900"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
