import BackBtn from "@/components/shared/backBtn";
import { useMotion } from "@/hooks/useMotion";
import { EditorPage } from "@/reduxStore/types";
import { useParams } from "next/navigation";
import React from "react";
import DraggableSection from "./draggableSection";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { updateEditorSections } from "@/reduxStore/action";
import { useScrollTo } from "@/hooks/useScrollTo";
interface PageSectionsProps {
  pages: EditorPage[];
  setOpenPageSections: React.Dispatch<React.SetStateAction<boolean>>;
}
function PageSections({ pages, setOpenPageSections }: PageSectionsProps) {
  const { pageId } = useParams();
  const dispatch = useAppDispatch();
  const { motion } = useMotion();
  const { scrollToTop, scrollToBottom } = useScrollTo();
  const currentPage = useAppSelector((state) =>
    state.editor.present.editor.pages.find((page) => page.pageId === pageId)
  );

  const pageSections =
    pages.find((page) => page.pageId === pageId)?.sections || [];

  const pageTitle = currentPage?.pageSettings.title || "";

  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // dropped outside the list
    const newItems = [...pageSections];
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    dispatch(dispatch(updateEditorSections(pageId, newItems)));
  };

  const headerAndFooterClass =
    "flex items-center cursor-pointer justify-between h-10 w-full hover:bg-muted rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm";

  return (
    <div>
      <BackBtn
        doneBtn
        btnContainerClassName="w-full"
        label={pageTitle}
        handleBack={() => setOpenPageSections(false)}
      />
      <motion.div
        className="p-4 space-y-2"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.2 }}
      >
        {currentPage?.pageSettings.showHeader && (
          <div className={headerAndFooterClass} onClick={() => scrollToTop()}>
            Header
          </div>
        )}
        <DraggableSection
          items={pageSections || []}
          handleDragEnd={handleDragEnd}
        />
        {currentPage?.pageSettings.showFooter && (
          <div
            className={headerAndFooterClass}
            onClick={() => scrollToBottom()}
          >
            Footer
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default PageSections;
