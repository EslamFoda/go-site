import BackBtn from "@/components/shared/backBtn";
import React from "react";
import TextEditor from "../textEditor";
import { CopyRight as CopyRightTypes } from "@/types/sectionsTypes/footer";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateGlobalContent } from "@/reduxStore/action";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";

interface CopyRightProps {
  copyRight: CopyRightTypes;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  setOpenCopyRightTab: React.Dispatch<React.SetStateAction<boolean>>;
}
function CopyRight({
  copyRight,
  findSelectedSection,
  setOpenCopyRightTab,
}: CopyRightProps) {
  const dispatch = useAppDispatch();
  return (
    <div>
      <BackBtn
        doneBtn
        label="Copyright"
        handleBack={() => setOpenCopyRightTab(false)}
      />
      <div className="px-5 space-y-5">
        <TextEditor
          content={copyRight.leftArea}
          placeHolder="Left area"
          onUpdate={(content) =>
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                copyRight: { ...copyRight, leftArea: content },
              })
            )
          }
        />
        <TextEditor
          content={copyRight.rightArea}
          placeHolder="Right area"
          onUpdate={(content) =>
            dispatch(
              updateGlobalContent(findSelectedSection.id, {
                copyRight: { ...copyRight, rightArea: content },
              })
            )
          }
        />
      </div>
    </div>
  );
}

export default CopyRight;
