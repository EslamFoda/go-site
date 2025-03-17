import { useMotion } from "@/hooks/useMotion";
import React from "react";

function ProgressBar() {
  const { motion, useScroll, useSpring } = useMotion();
  const { scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return (
    <motion.div
      className="h-1 bg-primary fixed left-[430px] mt-[47px] top-0 right-0  pointer-events-none"
      style={{
        scaleX: springProgress, // Directly use the MotionValue
        transformOrigin: "left",
        zIndex: 97,
      }}
    />
  );
}

export default ProgressBar;
