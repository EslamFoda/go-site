import { useMotion } from "@/hooks/useMotion";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/reduxStore/hooks";
import React from "react";

function ProgressBar() {
  const { previewMode } = useAppSelector((state) => state.editor.present);
  const progressBarClassNames = cn(
    "h-1 bg-primary fixed left-[440px] max-md:left-0  mt-[47px] top-0 right-0  pointer-events-none",
    {
      "left-0 max-md:left-0": previewMode,
    }
  );
  const { motion, useScroll, useSpring } = useMotion();
  const { scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return (
    <motion.div
      className={progressBarClassNames}
      style={{
        scaleX: springProgress, // Directly use the MotionValue
        transformOrigin: "left",
        zIndex: 45,
      }}
    />
  );
}

export default ProgressBar;
