import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = event.target;
      textarea.style.height = "40px"; // Reset the height to auto
      // Set the height to the scrollHeight, but not more than the maxHeight
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    };

    React.useImperativeHandle(ref, () => textareaRef.current!);

    return (
      <textarea
        className={cn(
          "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-bg-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={(el) => {
          textareaRef.current = el;
          if (typeof ref === "function") {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        style={{
          minHeight: "40px",
          maxHeight: "150px",
          overflowY: "auto",
          height: "40px",
        }}
        onInput={handleInput}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
