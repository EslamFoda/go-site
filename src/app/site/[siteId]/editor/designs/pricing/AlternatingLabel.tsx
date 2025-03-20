import { useMotion } from "@/hooks/useMotion";
import { cn } from "@/lib/utils";
import { SectionBgColorType } from "@/types/common";
import { useEffect, useState } from "react";

interface AlternatingLabelProps {
  isActive: boolean;
  background: SectionBgColorType;
  featuredText?: string;
  offerText?: string;
  interval?: number; // Default to 3000ms if not provided
}

const AlternatingLabel: React.FC<AlternatingLabelProps> = ({
  isActive,
  background,
  featuredText,
  offerText,
  interval = 3000,
}) => {
  const { AnimatePresence, motion } = useMotion();
  const [activeLabel, setActiveLabel] = useState<"featured" | "offer">(
    "featured"
  );
  const labelClassNames = cn(
    "text-xs absolute top-2 min-w-max right-2 bg-background rounded-md py-1 px-2",
    {
      "bg-muted": background === "gray" || background === "primary",
    }
  );

  useEffect(() => {
    if (!isActive || !offerText) {
      setActiveLabel("featured");
      return;
    }

    const labelInterval = setInterval(() => {
      setActiveLabel((prev) => (prev === "featured" ? "offer" : "featured"));
    }, interval);

    return () => clearInterval(labelInterval);
  }, [isActive, interval, offerText]); // Added `offerText` dependency

  return (
    <>
      {isActive ? (
        <AnimatePresence mode="wait">
          {activeLabel === "featured" && featuredText && (
            <motion.div
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween" }}
              className={labelClassNames}
            >
              {featuredText}
            </motion.div>
          )}

          {activeLabel === "offer" && offerText && (
            <motion.div
              key="offer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween" }}
              className={labelClassNames}
            >
              {offerText}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        offerText && <div className={labelClassNames}>{offerText}</div>
      )}
    </>
  );
};

export default AlternatingLabel;
