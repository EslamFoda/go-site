import { updateSelectedItem, updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import React from "react";
interface DesignProps {
  section: any;
  pageId: string;
}
function Design1({ pageId, section }: DesignProps) {
  const dispatch = useAppDispatch();
  return (
    <section>
      <div
        className="container max-w-container gap-10 w-full py-12"
        onClick={() => {
          dispatch(updateSelectedSection(pageId, section.id));
          dispatch(updateSelectedItem(null));
        }}
      >
        design 1
      </div>
    </section>
  );
}

export default Design1;
