import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/app/editor/store/editorStore";
import { Label } from "@/components/ui/label";
import React from "react";
interface AlignProps {
  updateStyle: (
    sectionId: string,
    newStyle: Partial<SectionStyleTypes[keyof SectionStyleTypes]>
  ) => void;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
}
function LayoutSetting({ updateStyle, findSelectedSection }: AlignProps) {
  const selectedSectionStyles =
    findSelectedSection.style as SectionStyleTypes["cards"];
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>Layout</Label>
      <div className="border-[#222] flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {["top", "center", "bottom"].map((alignment) => (
          <div
            key={alignment}
            onClick={() => {
              updateStyle(findSelectedSection.id, {
                designSettings: {
                  ...selectedSectionStyles.designSettings,
                  layout: alignment as "top" | "center" | "bottom",
                },
              });
            }}
            className={`${
              selectedSectionStyles.designSettings.layout === alignment
                ? "bg-[#222]"
                : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            {alignment === "top" && <AlignStartIcon />}
            {alignment === "center" && <AlignCenterIcon />}
            {alignment === "bottom" && <AlignEndIcon />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LayoutSetting;
const AlignStartIcon = () => {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke="white" d="M22 15H2M22 21H2M5 3H19V9H5V3Z"></path>
    </svg>
  );
};
const AlignCenterIcon = () => {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 3H2M22 21H2M5 9H19V15H5V9Z" stroke="white"></path>
    </svg>
  );
};
const AlignEndIcon = () => {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 3H2M22 9H2M5 15H19V21H5V15Z" stroke="white"></path>
    </svg>
  );
};
