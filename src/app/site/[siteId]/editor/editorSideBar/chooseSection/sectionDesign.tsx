import { useMotion } from "@/hooks/useMotion";
import { ChevronRight } from "lucide-react";
import React from "react";
const sectionVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface SectionDesignProps {
  sectionName: string;
  desc: string;
  Icon: () => React.JSX.Element;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
function SectionDesign({
  sectionName,
  desc,
  Icon,
  onClick,
}: SectionDesignProps) {
  const { motion } = useMotion();

  return (
    <motion.div
      variants={sectionVariants}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="flex justify-between items-center bg-muted p-[10px] cursor-pointer rounded-sm hover:bg-muted-foreground/65 group"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="p-1 bg-background rounded-sm">
          <Icon />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium">{sectionName}</span>
          <span className="text-[11px] text-muted-foreground group-hover:text-textColor">
            {desc}
          </span>
        </div>
      </div>
      <div>
        <ChevronRight size={16} />
      </div>
    </motion.div>
  );
}

export default SectionDesign;
