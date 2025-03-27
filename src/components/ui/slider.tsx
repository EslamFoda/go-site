import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  customText?: React.ReactNode;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, customText, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative cursor-e-resize h-10 w-full grow overflow-hidden rounded-sm ">
        <SliderPrimitive.Range className="absolute h-full bg-muted-bg" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block cursor-e-resize h-10 w-3 rounded-sm bg-[#555] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      {customText && (
        <span className="block absolute top-1 right-2 cursor-e-resize">
          {customText}
        </span>
      )}
    </SliderPrimitive.Root>
  )
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
