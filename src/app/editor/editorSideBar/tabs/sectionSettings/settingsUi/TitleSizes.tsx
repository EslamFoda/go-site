import {
  BannerStyle,
  CardStyle,
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/app/editor/store/editorStore";
import { Label } from "@/components/ui/label";
import React from "react";

interface TitleSizeProps {
  label: string;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  updateStyle: (
    sectionId: string,
    newStyle: Partial<BannerStyle | CardStyle>
  ) => void;
}

const TitleSize: React.FC<TitleSizeProps> = ({
  label,
  findSelectedSection,
  updateStyle,
}) => {
  const sizes = ["s", "m", "l", "xl"];
  const selectedSectionStyles =
    findSelectedSection.style as SectionStyleTypes["banner"];

  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>{label}</Label>
      <div className="border-[#222]  flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {sizes.map((size) => (
          <div
            key={size}
            onClick={() => {
              updateStyle(findSelectedSection?.id!, {
                designSettings: {
                  ...selectedSectionStyles.designSettings!,
                  titleSize: size as "s" | "m" | "l" | "xl",
                },
              });
            }}
            className={`${
              selectedSectionStyles.designSettings.titleSize === size
                ? "bg-[#222]"
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
