import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import React from "react";
interface Design2Props {
  section: any;
  pageId: string;
}

function Design2({ pageId, section }: Design2Props) {
  const dispatch = useAppDispatch();

  return (
    <div
      className="h-96"
      onClick={() => dispatch(updateSelectedSection(pageId, section.id))}
    >
      Design2
    </div>
  );
}

export default Design2;
