import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { X } from "lucide-react";
import { useMotion } from "@/hooks/useMotion";

interface DraggableModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const DraggableModal: React.FC<DraggableModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const { motion, AnimatePresence } = useMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        backdropRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const handleDrag = (e: any, ui: any) => {
    setPosition({ x: ui.x, y: ui.y });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
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
              className={`rounded-[4px] w-80 bg-white overflow-hidden antialiased  shadow-2xl shadow-zinc-900 cursor-default transition-all duration-300 ease-out ${
                isDragging ? "" : "transition- transform"
              }`}
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
              }}
            >
              <div className="h-1 w-full bg-primary"></div>
              {/* Drag Handle Area */}
              <div className="drag-handle flex items-center justify-between p-2 w-full cursor-move border-b border-neutral-300 rounded-t-3xl">
                <span className="text-lg text-neutral-900">Drag Here</span>
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={closeModal}
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X size={16} className="stroke-neutral-900" />
                </button>
              </div>
              <div className="p-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900 my-4">
                  Drag the modal
                </h1>
                <p className="text-base lg:text-xl text-neutral-500">
                  Move this window anywhere you want in the page. Click on the
                  button below to bring it back to its initial position.
                </p>
                <button
                  onClick={resetPosition}
                  disabled={position.x === 0 && position.y === 0}
                  className="px-8 py-4 mt-8 rounded-2xl text-neutral-50 bg-violet-800 hover:bg-violet-600 active:bg-violet-900 disabled:bg-neutral-900 disabled:cursor-not-allowed transition-colors"
                >
                  Reset the position
                </button>
              </div>
            </div>
          </Draggable>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DraggableModal;
