// hooks/useMotion.ts
import { motion } from "framer-motion";

// Define the return type of the hook
interface UseMotionReturn {
  motion: typeof motion;
}

// Create the custom hook
export function useMotion(): UseMotionReturn {
  return {
    motion,
  };
}
