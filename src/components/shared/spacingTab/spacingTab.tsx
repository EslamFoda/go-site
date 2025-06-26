import React, { useState } from "react";
import BackBtn from "../backBtn";
import { BannerStyle } from "@/types/sectionsTypes/banner";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import HeightOrWidthSetting from "@/app/site/[siteId]/editor/editorSideBar/sectionSettings/settingsUi/HeightOrWidthSetting";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateStyle } from "@/reduxStore/action";
import { CardStyle } from "@/types/sectionsTypes/cards";
import { GalleryStyle } from "@/types/sectionsTypes/gallery";
import { TestimonialStyle } from "@/types/sectionsTypes/testimonials";
import { ListStyle } from "@/types/sectionsTypes/list";
import { PricingStyle } from "@/types/sectionsTypes/pricing";
import { AccordionStyle } from "@/types/sectionsTypes/accordion/accordion";
interface SpacingTabProps {
  pageId: string;
  sectionStyle:
    | BannerStyle
    | CardStyle
    | GalleryStyle
    | TestimonialStyle
    | ListStyle
    | PricingStyle
    | AccordionStyle;
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  setOpenSpacingTab: React.Dispatch<React.SetStateAction<boolean>>;
  sectionType: "banner" | "cards";
  showPadding?: boolean;
}
function SpacingTab({
  sectionType,
  findSelectedSection,
  pageId,
  sectionStyle,
  showPadding,
  setOpenSpacingTab,
}: SpacingTabProps) {
  const dispatch = useAppDispatch();
  const [isTopSpaceDesktop, setIsTopSpaceDesktop] = useState(true);
  const [isBottomSpaceDesktop, setIsBottomSpaceDesktop] = useState(true);
  const [isGapDesktop, setIsGapDesktop] = useState(true);
  const [isPaddingDesktop, setIsPaddingDesktop] = useState(true);
  const spacing = sectionStyle?.designSettings?.spacing;

  const handleToggleTopSpace = () => {
    setIsTopSpaceDesktop(!isTopSpaceDesktop);
  };
  const handleToggleBottomSpace = () => {
    setIsBottomSpaceDesktop(!isBottomSpaceDesktop);
  };
  const handleToggleGap = () => {
    setIsGapDesktop(!isGapDesktop);
  };
  const handleTogglePadding = () => {
    setIsPaddingDesktop(!isPaddingDesktop);
  };
  return (
    <div className="pb-5">
      <BackBtn
        label="Spacing"
        handleBack={() => setOpenSpacingTab(false)}
        doneBtn
      />
      <div className="px-5 py-2 space-y-2">
        <HeightOrWidthSetting
          label="Top"
          min={isTopSpaceDesktop ? 20 : 10}
          max={500}
          isDesktop={isTopSpaceDesktop}
          handleToggleSetting={handleToggleTopSpace}
          customText={
            isTopSpaceDesktop
              ? `${spacing.top.desktop}`
              : `${spacing.top.mobile}`
          }
          value={
            isTopSpaceDesktop ? [spacing.top.desktop] : [spacing.top.mobile]
          }
          onValueChange={(value) => {
            const newSpacingTop = isTopSpaceDesktop
              ? { desktop: value[0] }
              : { mobile: value[0] };
            dispatch(
              updateStyle(pageId, findSelectedSection?.id, {
                designSettings: {
                  ...sectionStyle.designSettings!,
                  spacing: {
                    ...spacing,
                    top: {
                      ...spacing.top,
                      ...newSpacingTop,
                    },
                  },
                },
              })
            );
          }}
        />
        <HeightOrWidthSetting
          label="Bottom"
          min={isBottomSpaceDesktop ? 20 : 10}
          max={500}
          isDesktop={isBottomSpaceDesktop}
          handleToggleSetting={handleToggleBottomSpace}
          customText={
            isBottomSpaceDesktop
              ? `${spacing.bottom.desktop}`
              : `${spacing.bottom.mobile}`
          }
          value={
            isBottomSpaceDesktop
              ? [spacing.bottom.desktop]
              : [spacing.bottom.mobile]
          }
          onValueChange={(value) => {
            const newSpacingBottom = isBottomSpaceDesktop
              ? { desktop: value[0] }
              : { mobile: value[0] };
            dispatch(
              updateStyle(pageId, findSelectedSection?.id, {
                designSettings: {
                  ...sectionStyle.designSettings!,
                  spacing: {
                    ...spacing,
                    bottom: {
                      ...spacing.bottom,
                      ...newSpacingBottom,
                    },
                  },
                },
              })
            );
          }}
        />

        <HeightOrWidthSetting
          label="Gap"
          min={0}
          max={
            sectionType === "banner"
              ? isGapDesktop
                ? 100
                : 50
              : isGapDesktop
              ? 40
              : 20
          }
          isDesktop={isGapDesktop}
          handleToggleSetting={handleToggleGap}
          customText={
            isGapDesktop ? `${spacing.gap.desktop}` : `${spacing.gap.mobile}`
          }
          value={isGapDesktop ? [spacing.gap.desktop] : [spacing.gap.mobile]}
          onValueChange={(value) => {
            const newSpacingGap = isGapDesktop
              ? { desktop: value[0] }
              : { mobile: value[0] };
            dispatch(
              updateStyle(pageId, findSelectedSection?.id, {
                designSettings: {
                  ...sectionStyle.designSettings!,
                  spacing: {
                    ...spacing,
                    gap: {
                      ...spacing.gap,
                      ...newSpacingGap,
                    },
                  },
                },
              })
            );
          }}
        />
        {sectionType === "cards" && showPadding && (
          <HeightOrWidthSetting
            label="Padding"
            min={5}
            max={30}
            step={5}
            isDesktop={isPaddingDesktop}
            handleToggleSetting={handleTogglePadding}
            customText={
              isPaddingDesktop
                ? `${spacing.padding.desktop}`
                : `${spacing.padding.mobile}`
            }
            value={
              isPaddingDesktop
                ? [spacing.padding.desktop]
                : [spacing.padding.mobile]
            }
            onValueChange={(value) => {
              const newSpacingPadding = isPaddingDesktop
                ? { desktop: value[0] }
                : { mobile: value[0] };
              dispatch(
                updateStyle(pageId, findSelectedSection?.id, {
                  designSettings: {
                    ...sectionStyle.designSettings!,
                    spacing: {
                      ...spacing,
                      padding: {
                        ...spacing.padding,
                        ...newSpacingPadding,
                      },
                    },
                  },
                })
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SpacingTab;
