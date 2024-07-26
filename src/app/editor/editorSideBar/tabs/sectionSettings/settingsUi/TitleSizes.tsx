import { Label } from "@/components/ui/label";
import React from "react";
import { CardStyle } from "@/types/sectionsTypes/cards";
import { BannerStyle } from "@/types/sectionsTypes/banner";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { ListStyle } from "@/types/sectionsTypes/list";

interface TitleSizeProps {
  label: string;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  updateStyle: (
    sectionId: string,
    newStyle: Partial<SectionStyleTypes[keyof SectionStyleTypes]>
  ) => {
    type: string;
    payload: {
      sectionId: string;
      newStyle: Partial<BannerStyle | CardStyle | ListStyle>;
    };
  };
}

const TitleSize: React.FC<TitleSizeProps> = ({
  label,
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
                updateStyle(findSelectedSection?.id!, {
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
