import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/reduxStore/hooks";
import { updateStyle } from "@/reduxStore/action";
import { createClient } from "@/utlis/supabase/client";
import { SectionStyleTypes } from "@/reduxStore/types";

function useSectionUpdater(pageId: string) {
  const dispatch = useAppDispatch();
  const {
    editor: { pages },
    settings,
  } = useAppSelector((state) => state.editor.present);
  const selectedSection = useAppSelector(
    (state) => state.editor.present.selectedSection
  );
  const supabase = createClient();

  const findSelectedSection = useCallback(() => {
    return pages
      ?.find((page) => page.pageId === pageId)
      ?.sections?.find((section) => section.id === selectedSection?.id);
  }, [pages, pageId, selectedSection]);

  const updateSectionContentAndStyle = useCallback(async () => {
    try {
      const { data } = await supabase
        .from("sites")
        .update({ pages })
        .eq("siteId", settings.siteId)
        .select();
      console.log("Supabase update result:", data);
    } catch (error) {
      console.error("Error updating section content and style:", error);
    }
  }, [pages, settings.siteId, supabase]);

  const updateStyleAndSync = useCallback(
    (
      sectionId: string,
      newStyle: Partial<SectionStyleTypes[keyof SectionStyleTypes]>
    ) => {
      dispatch(updateStyle(pageId, sectionId, newStyle));
      updateSectionContentAndStyle();
    },
    [dispatch, pageId, updateSectionContentAndStyle]
  );

  return {
    findSelectedSection,
    updateSectionContentAndStyle,
    updateStyleAndSync,
  };
}

export default useSectionUpdater;
