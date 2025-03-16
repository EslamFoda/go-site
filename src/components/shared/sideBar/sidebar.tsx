import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotion } from "@/hooks/useMotion";

interface SidebarProps {
  open: boolean;
  onClose?: () => void;
  position?: "left" | "right";
  width?: string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  parentRef: React.RefObject<HTMLElement>;
  closeButton?: React.ReactNode | string;
  closeButtonClassName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  position = "right",
  width = "lg",
  children,
  title,
  description,
  parentRef,
  closeButton = <X size={18} />,
  closeButtonClassName,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { motion } = useMotion();

  // Define width classes based on the width prop
  const widthClasses = {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    xl: "w-[32rem]",
  };

  // Calculate position based on parent element
  useEffect(() => {
    if (open && sidebarRef.current && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const sidebar = sidebarRef.current;

      sidebar.style.top = `${parentRect.top}px`;
      sidebar.style.height = `${window.innerHeight - parentRect.top}px`;
    }
  }, [open, parentRef]);

  if (!open) return null;

  // Animation variants for the sidebar
  const sidebarVariants = {
    hidden: {
      x: position === "right" ? "100%" : "-100%", // Slide out to right or left
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      x: position === "right" ? "100%" : "-100%", // Slide back out
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={cn(
        "fixed bg-background border-l shadow-lg  overflow-auto z-50",
        position === "right" ? "right-0 border-l" : "left-0 border-r",
        widthClasses[width as keyof typeof widthClasses] || widthClasses.md
      )}
      ref={sidebarRef}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sidebarVariants}
    >
      <div className="flex flex-col  h-full">
        <div className="flex p-3 border-b border-muted-bg justify-between items-center">
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <button
            className={cn(
              "h-8 rounded-md flex items-center justify-center w-8",
              closeButtonClassName
            )}
            onClick={onClose}
            aria-label={closeButton ? undefined : "Close sidebar"}
          >
            {closeButton}
          </button>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
