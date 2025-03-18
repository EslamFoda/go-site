import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { X } from "lucide-react";
import { useMotion } from "@/hooks/useMotion";

interface DraggableModalProps {
  children: React.ReactNode;
  headText: string;
  isOpen: boolean;
  closeModal: () => void;
}

const DraggableModal: React.FC<DraggableModalProps> = ({
  children,
  headText,
  isOpen,
  closeModal,
}) => {
  const { motion, AnimatePresence } = useMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(position);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const modalWidth = modalRef.current.offsetWidth;
      const modalHeight = modalRef.current.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const newPosition = {
        x: (windowWidth - modalWidth) / 2,
        y: (windowHeight - modalHeight) / 2,
      };
      
      if (positionRef.current.x === 0 && positionRef.current.y === 0) {
        setPosition(newPosition);
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, closeModal]);

  const handleDrag = (e: any, ui: any) => {
    setPosition({ x: ui.x, y: ui.y });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 101 }}
        >
          <Draggable
            nodeRef={modalRef}
            position={position}
            onDrag={handleDrag}
            onStart={() => setIsDragging(true)}
            onStop={() => setIsDragging(false)}
            bounds="parent"
            handle=".drag-handle"
          >
            <div
              ref={modalRef}
              className={`rounded-[4px] w-96 bg-background overflow-hidden antialiased pointer-events-auto shadow-2xl shadow-zinc-900 cursor-default transition-all duration-300 ease-out ${
                isDragging ? "" : "transition-transform"
              }`}
            >
              <div className="h-1 w-full bg-primary"></div>
              <div className="drag-handle flex items-center justify-between p-2 w-full cursor-move border-b rounded-t-3xl">
                <span className="text-lg">{headText}</span>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={closeModal}
                  className="p-1 rounded-full bg-primary hover:bg-primary/70 transition-colors"
                >
                  <X size={16} className="stroke-secondary" />
                </button>
              </div>
              <div className="p-2">{children}</div>
            </div>
          </Draggable>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DraggableModal;