import { Label } from "@/components/ui/label";
import React from "react";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { SectionsStyleType } from "@/types/common";
interface AlignProps {
  updateStyle: (
    sectionId: string,
    newStyle: Partial<SectionStyleTypes[keyof SectionStyleTypes]>
  ) => {
    type: string;
    payload: {
      sectionId: string;
      newStyle: Partial<SectionsStyleType>;
    };
  };
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  layoutV2?: boolean;
}
function LayoutSetting({
  updateStyle,
  findSelectedSection,
  layoutV2 = false,
}: AlignProps) {
  const dispatch = useAppDispatch();
  const layoutOptions = [
    {
      align: layoutV2 ? "bottom" : "top",
      Icon: layoutV2 ? AlignStartIcon2 : AlignStartIcon,
    },
    { align: "center", Icon: layoutV2 ? AlignCenterIcon2 : AlignCenterIcon },
    {
      align: layoutV2 ? "top" : "bottom",
      Icon: layoutV2 ? AlignEndIcon2 : AlignEndIcon,
    },
  ];
  const selectedSectionStyles =
    findSelectedSection.style as SectionStyleTypes["cards"];
  return (
    <div className="space-y-1 flex items-center justify-between">
      <Label>Layout</Label>
      <div className="border-muted-bg flex border-solid border-[1px] rounded-sm h-10 w-4/6">
        {layoutOptions.map(({ align, Icon }) => (
          <div
            key={align}
            onClick={() => {
              if (layoutV2) {
                dispatch(
                  updateStyle(findSelectedSection.id, {
                    designSettings: {
                      ...selectedSectionStyles.designSettings,
                      layoutV2: align as "top" | "center" | "bottom",
                    },
                  })
                );
              } else {
                dispatch(
                  updateStyle(findSelectedSection.id, {
                    designSettings: {
                      ...selectedSectionStyles.designSettings,
                      layout: align as "top" | "center" | "bottom",
                    },
                  })
                );
              }
            }}
            className={`${
              layoutV2
                ? selectedSectionStyles.designSettings.layoutV2 === align
                  ? "bg-muted-bg"
                  : ""
                : selectedSectionStyles.designSettings.layout === align
                ? "bg-muted-bg"
                : ""
            } flex items-center justify-center cursor-pointer w-full`}
          >
            <Icon
              active={
                selectedSectionStyles.designSettings.layout === align ||
                selectedSectionStyles.designSettings.layoutV2 === align
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LayoutSetting;
const AlignStartIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={`${active ? "stroke-foreground" : "stroke-primary"}`}
        d="M22 15H2M22 21H2M5 3H19V9H5V3Z"
      ></path>
    </svg>
  );
};
const AlignStartIcon2 = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 16H6M2 3H22V21H2V3Z"
        className={`${active ? "stroke-foreground" : "stroke-primary"}`}
        stroke-miterlimit="10"
      ></path>
    </svg>
  );
};
const AlignCenterIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 3H2M22 21H2M5 9H19V15H5V9Z"
        className={`${active ? "stroke-foreground" : "stroke-primary"}`}
      ></path>
    </svg>
  );
};
const AlignCenterIcon2 = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 12H6M2 3H22V21H2V3Z"
        className={`${active ? "stroke-foreground" : "stroke-primary"}`}
        stroke-miterlimit="10"
      ></path>
    </svg>
  );
};
const AlignEndIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 3H2M22 9H2M5 15H19V21H5V15Z"
        className={`${active ? "stroke-foreground" : "stroke-primary"}`}
      ></path>
    </svg>
  );
};
const AlignEndIcon2 = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 8H6M2 3H22V21H2V3Z"
        className={`${active ? "stroke-foreground" : "stroke-primary"}`}
        stroke-miterlimit="10"
      ></path>
    </svg>
  );
};
