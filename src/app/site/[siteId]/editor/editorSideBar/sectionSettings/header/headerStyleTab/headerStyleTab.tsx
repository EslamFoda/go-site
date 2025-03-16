import { TabsContent } from "@/components/ui/tabs";
import {
  FirstDesign,
  FourthDesign,
  SecDesign,
  ThirdDesign,
} from "@/icons/header";
import React, { useState } from "react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { HeaderContent, HeaderStyle } from "@/types/sectionsTypes/header";
import { updateGlobalStyle } from "@/reduxStore/action";
import LogoColor from "../../settingsUi/LogoColor";
import FillOrFit from "../../settingsUi/fillOrFit";
import SwitchSetting from "../../settingsUi/SwitchSetting";
import HeightOrWidthSetting from "../../settingsUi/HeightOrWidthSetting";

const HEADER_DESIGNS = [
  { designName: "design1", Icon: FirstDesign },
  { designName: "design2", Icon: SecDesign },
  { designName: "design3", Icon: ThirdDesign },
  { designName: "design4", Icon: FourthDesign },
];

interface HeaderStyleTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  headerStyle: HeaderStyle;
  headerContent: HeaderContent;
}

function HeaderStyleTab({
  findSelectedSection,
  headerStyle,
  headerContent,
}: HeaderStyleTabProps) {
  const dispatch = useAppDispatch();
  const [isSizeDesktop, setIsSizeDesktop] = useState(true);

  if (!headerStyle) return null;

  const {
    autoHide,
    float,
    glass,
    logoColor,
    scrollIndicator,
    shadow,
    sticky,
    width,
    logoSize,
  } = headerStyle.designSettings;

  const handleToggleSize = () => {
    setIsSizeDesktop(!isSizeDesktop);
  };

  const handleStickyChange = (value: boolean) => {
    let newSettings = { ...headerStyle.designSettings, sticky: value };

    if (!value && float) {
      newSettings.float = false;
    }

    dispatch(
      updateGlobalStyle(findSelectedSection?.id, {
        designSettings: newSettings,
      })
    );
  };

  const handleFloatChange = (value: boolean) => {
    let newSettings = { ...headerStyle.designSettings, float: value };

    if (value && !sticky) {
      newSettings.sticky = true;
    }

    dispatch(
      updateGlobalStyle(findSelectedSection?.id, {
        designSettings: newSettings,
      })
    );
  };

  const handleShadowChange = (value: boolean) => {
    let newSettings = { ...headerStyle.designSettings, shadow: value };

    // If shadow is true, turn off border and glass
    if (value) {
      newSettings.glass = false;
    }

    dispatch(
      updateGlobalStyle(findSelectedSection?.id, {
        designSettings: newSettings,
      })
    );
  };

  const handleGlassChange = (value: boolean) => {
    let newSettings = { ...headerStyle.designSettings, glass: value };

    // If glass is true, turn off shadow
    if (value) {
      newSettings.shadow = false;
    }

    dispatch(
      updateGlobalStyle(findSelectedSection?.id, {
        designSettings: newSettings,
      })
    );
  };

  return (
    <TabsContent className="space-y-2 px-5" value="style">
      <div className="grid grid-cols-2 gap-2">
        {HEADER_DESIGNS?.map(({ designName, Icon }, i) => {
          return (
            <div
              onClick={() => {
                dispatch(
                  updateGlobalStyle(findSelectedSection?.id, {
                    designName: designName,
                  })
                );
              }}
              className="h-20 flex items-center justify-center relative border-muted-bg border-solid border-[1px] rounded-sm"
              key={i}
            >
              <Icon active={headerStyle?.designName === designName} />
            </div>
          );
        })}
      </div>
      {headerContent.logo.logoType === "text" && (
        <LogoColor
          iconColorValue={logoColor}
          onValueChange={(value) => {
            dispatch(
              updateGlobalStyle(findSelectedSection?.id, {
                designSettings: {
                  ...headerStyle.designSettings,
                  logoColor: value,
                },
              })
            );
          }}
        />
      )}
      {headerContent.logo.logoType === "image" &&
        (headerContent.logo.logoImage.urlDark ||
          headerContent.logo.logoImage.urlLight) && (
          <HeightOrWidthSetting
            isDesktop={isSizeDesktop}
            label="Size"
            min={10}
            max={100}
            handleToggleSetting={handleToggleSize}
            customText={
              isSizeDesktop ? `${logoSize?.desktop}px` : `${logoSize?.mobile}px`
            }
            value={isSizeDesktop ? [logoSize?.desktop] : [logoSize?.mobile]}
            onValueChange={(value) => {
              const newSize = isSizeDesktop
                ? { desktop: value[0] }
                : { mobile: value[0] };

              dispatch(
                updateGlobalStyle(findSelectedSection?.id, {
                  designSettings: {
                    ...headerStyle.designSettings,
                    logoSize: {
                      ...headerStyle.designSettings.logoSize,
                      ...newSize,
                    },
                  },
                })
              );
            }}
          />
        )}
      <FillOrFit
        label="Width"
        widthValue={width}
        onValueChange={(value) => {
          dispatch(
            updateGlobalStyle(findSelectedSection?.id, {
              designSettings: {
                ...headerStyle.designSettings,
                width: value,
              },
            })
          );
        }}
      />

      <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
        <SwitchSetting
          label="Sticky"
          defaultChecked={sticky}
          onCheckedChange={handleStickyChange}
        />
        {sticky && (
          <SwitchSetting
            label="Auto Hide"
            defaultChecked={autoHide}
            onCheckedChange={(value) => {
              dispatch(
                updateGlobalStyle(findSelectedSection?.id, {
                  designSettings: {
                    ...headerStyle.designSettings,
                    autoHide: value,
                  },
                })
              );
            }}
          />
        )}
        <SwitchSetting
          label="Float"
          defaultChecked={float}
          onCheckedChange={handleFloatChange}
        />
        <SwitchSetting
          label="Shadow"
          defaultChecked={shadow}
          onCheckedChange={handleShadowChange}
        />
        <SwitchSetting
          label="Glass"
          defaultChecked={glass}
          onCheckedChange={handleGlassChange}
        />
        <SwitchSetting
          label="Scroll Indicator"
          defaultChecked={scrollIndicator}
          onCheckedChange={(value) => {
            dispatch(
              updateGlobalStyle(findSelectedSection?.id, {
                designSettings: {
                  ...headerStyle.designSettings,
                  scrollIndicator: value,
                },
              })
            );
          }}
        />
      </div>
    </TabsContent>
  );
}

export default HeaderStyleTab;
