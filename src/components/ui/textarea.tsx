"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string; // Make id a required prop
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [height, setHeight] = React.useState<number>(40);

    const handleInput = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "40px"; // Reset the height to minimum
        const newHeight = Math.min(textarea.scrollHeight, 150);
        textarea.style.height = `${newHeight}px`;
        setHeight(newHeight);
        localStorage.setItem(`textarea-height-${id}`, newHeight.toString());
      }
    }, [id]);

    React.useEffect(() => {
      const storedHeight = localStorage.getItem(`textarea-height-${id}`);
      if (storedHeight) {
        setHeight(Number(storedHeight));
      }
      handleInput(); // Adjust height on mount
    }, [id, handleInput]);

    React.useImperativeHandle(ref, () => textareaRef.current!);

    return (
      <textarea
        id={id}
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
          height: `${height}px`,
        }}
        onInput={handleInput}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
