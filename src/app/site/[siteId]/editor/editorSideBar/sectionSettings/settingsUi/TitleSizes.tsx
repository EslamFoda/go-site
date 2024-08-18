import { Label } from "@/components/ui/label";
import React from "react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { SectionsStyleType } from "@/types/common";

interface TitleSizeProps {
  label: string;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  updateStyle: (
    pageId: string,
    sectionId: string,
    newStyle: Partial<SectionStyleTypes[keyof SectionStyleTypes]>
  ) => {
    type: string;
    payload: {
      pageId: string;
      sectionId: string;
      newStyle: Partial<SectionsStyleType>;
    };
  };
  pageId: string;
}

const TitleSize: React.FC<TitleSizeProps> = ({
  label,
  pageId,
  findSelectedSection,
  updateStyle,
}) => {
  const dispatch = useAppDispatch();
  const sizes = ["s", "m", "l", "xl"];
  const selectedSectionStyles =
    findSelectedSection.style as SectionStyleTypes["banner"];

  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>{label}</Label>
      <div className="border-muted-bg  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {sizes.map((size) => (
          <div
            key={size}
            onClick={() => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...selectedSectionStyles.designSettings!,
                    titleSize: size as "s" | "m" | "l" | "xl",
                  },
                })
              );
            }}
            className={`${
              selectedSectionStyles.designSettings.titleSize === size
                ? "bg-muted-bg"
                : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            <span>{size.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleSize;
