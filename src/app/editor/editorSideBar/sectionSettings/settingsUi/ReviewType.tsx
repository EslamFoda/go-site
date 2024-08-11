import { Label } from "@/components/ui/label";
import { QuoteSmIcon } from "@/icons/testimonials";
import { Star } from "lucide-react";
import React from "react";
interface ReviewTypeProps {
  reviewType: "quote" | "star";
  onValueChange: (value: "quote" | "star") => void;
}
function ReviewType({ reviewType, onValueChange }: ReviewTypeProps) {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>Type</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {["quote", "star"].map((shape) => (
          <div
            key={shape}
            onClick={() => {
              onValueChange(shape as "quote" | "star");
            }}
            className={`${
              reviewType === shape ? "bg-muted-bg" : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            {shape === "quote" && <QuoteSmIcon className={reviewType === shape ? "fill-white " : "fill-muted-foreground"}/>}
            {shape === "star" && (
              <Star
                size={16}
                className={
                  reviewType === shape ? "fill-white stroke-none" : "fill-muted-foreground stroke-none"
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewType;
