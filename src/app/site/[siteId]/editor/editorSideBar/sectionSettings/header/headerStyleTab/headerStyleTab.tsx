import { TabsContent } from "@/components/ui/tabs";
import {
  FirstDesign,
  FourthDesign,
  SecDesign,
  ThirdDesign,
} from "@/icons/header";
import React from "react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { HeaderStyle } from "@/types/sectionsTypes/header";
import { updateStyle } from "@/reduxStore/action";
import LogoColor from "../../settingsUi/LogoColor";
import NavMobMenu from "../../settingsUi/NavMobMenu";
import FillOrFit from "../../settingsUi/fillOrFit";
import SwitchSetting from "../../settingsUi/SwitchSetting";

const BANNER_DESIGNS = [
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
  pageId: string;
}

function HeaderStyleTab({
  findSelectedSection,
  headerStyle,
  pageId,
}: HeaderStyleTabProps) {
  const dispatch = useAppDispatch();
  if (!headerStyle) return null;

  const {
    autoHide,
    float,
    glass,
    logoColor,
    mobileMenuIcon,
    scrollIndicator,
    shadow,
    sticky,
    width,
  } = headerStyle.designSettings;

  const handleStickyChange = (value: boolean) => {
    let newSettings = { ...headerStyle.designSettings, sticky: value };

    if (!value && float) {
      newSettings.float = false;
    }

    dispatch(
      updateStyle(pageId, findSelectedSection?.id, {
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
      updateStyle(pageId, findSelectedSection?.id, {
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
      updateStyle(pageId, findSelectedSection?.id, {
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
      updateStyle(pageId, findSelectedSection?.id, {
        designSettings: newSettings,
      })
    );
  };

  return (
    <TabsContent className="space-y-2 px-5" value="style">
      <div className="grid grid-cols-2 gap-2">
        {BANNER_DESIGNS?.map(({ designName, Icon }, i) => {
          return (
            <div
              onClick={() => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id, {
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
      <LogoColor
        iconColorValue={logoColor}
        onValueChange={(value) => {
          dispatch(
            updateStyle(pageId, findSelectedSection?.id, {
              designSettings: {
                ...headerStyle.designSettings,
                logoColor: value,
              },
            })
          );
        }}
      />
      <NavMobMenu
        menuValue={mobileMenuIcon}
        onValueChange={(value) => {
          dispatch(
            updateStyle(pageId, findSelectedSection?.id, {
              designSettings: {
                ...headerStyle.designSettings,
                mobileMenuIcon: value,
              },
            })
          );
        }}
      />
      <FillOrFit
        label="Width"
        widthValue={width}
        onValueChange={(value) => {
          dispatch(
            updateStyle(pageId, findSelectedSection?.id, {
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
                updateStyle(pageId, findSelectedSection?.id, {
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
              updateStyle(pageId, findSelectedSection?.id, {
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
