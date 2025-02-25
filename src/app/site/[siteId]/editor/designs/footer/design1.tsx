import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import React from "react";
interface Design1Props {
  section: any;
  pageId: string;
}

function Design1({ pageId, section }: Design1Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="h-96" onClick={() => dispatch(updateSelectedSection(pageId, section.id))}>
      Design1
    </div>
  );
}

export default Design1;
