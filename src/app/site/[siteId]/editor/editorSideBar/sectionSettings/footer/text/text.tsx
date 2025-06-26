import BackBtn from "@/components/shared/backBtn";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { FooterContent } from "@/types/sectionsTypes/footer";
import React from "react";
import TextEditor from "../textEditor";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateGlobalContent } from "@/reduxStore/action";

interface TextProps {
  footerContent: FooterContent;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  setOpenTextTab: React.Dispatch<React.SetStateAction<boolean>>;
}
function Text({
  footerContent,
  findSelectedSection,
  setOpenTextTab,
}: TextProps) {
  const dispatch = useAppDispatch();
  return (
    <div>
      <BackBtn label="Text" handleBack={() => setOpenTextTab(false)} doneBtn />
      <div className="px-5">
        <TextEditor
          content={footerContent.text}
          placeHolder="Write something"
          onUpdate={(content) => {
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                ...footerContent,
                text: content,
              })
            );
          }}
        />
      </div>
    </div>
  );
}

export default Text;
