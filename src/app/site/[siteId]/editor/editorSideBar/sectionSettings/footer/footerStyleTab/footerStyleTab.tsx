import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { useAppDispatch } from "@/reduxStore/hooks";
import { updateGlobalStyle } from "@/reduxStore/action";
import { FooterStyle } from "@/types/sectionsTypes/footer";
import {
  FirstDesign,
  FourthDesign,
  SecondDesign,
  ThirdDesign,
} from "@/icons/footer";

const FOOTER_DESIGNS = [
  { designName: "design1", Icon: FirstDesign },
  { designName: "design2", Icon: SecondDesign },
  { designName: "design3", Icon: ThirdDesign },
  { designName: "design4", Icon: FourthDesign },
];

interface FooterStyleTabProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  footerStyle: FooterStyle;
}

function FooterStyleTab({
  findSelectedSection,
  footerStyle,
}: FooterStyleTabProps) {
  const dispatch = useAppDispatch();
  if (!footerStyle) return null;

  return (
    <TabsContent className="space-y-2 px-5" value="style">
      <div className="grid grid-cols-2 gap-2">
        {FOOTER_DESIGNS?.map(({ designName, Icon }, i) => {
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
              <Icon active={footerStyle?.designName === designName} />
            </div>
          );
        })}
      </div>
    </TabsContent>
  );
}

export default FooterStyleTab;
