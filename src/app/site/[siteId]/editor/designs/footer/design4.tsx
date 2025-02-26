import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import React from "react";
interface Design4Props {
  section: any;
  pageId: string;
}

function Design4({ pageId, section }: Design4Props) {
  const dispatch = useAppDispatch();

  return (
    <div
      className="h-96"
      onClick={() => dispatch(updateSelectedSection(pageId, section.id))}
    >
      Design4
    </div>
  );
}

export default Design4;
