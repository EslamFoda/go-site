import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { HeaderContent } from "@/types/sectionsTypes/header";
import React from "react";
interface Design1Props {
  section: any;
  pageId: string;
}
function Design1({ pageId, section }: Design1Props) {
  const dispatch = useAppDispatch();
  const headerContent = section.content as HeaderContent;
  console.log(headerContent, "header content");

  return (
    <section
      onClick={() => dispatch(updateSelectedSection(pageId, section.id))}
    >
      Design1
      <h1>{headerContent?.Logo.text}</h1>
    </section>
  );
}

export default Design1;
