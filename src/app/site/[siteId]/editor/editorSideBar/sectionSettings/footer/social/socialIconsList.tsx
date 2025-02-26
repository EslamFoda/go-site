import { updateGlobalContent } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";
import { SocialLinkIcons } from "@/types/common";
import { SocialLink } from "@/types/sectionsTypes/footer";
import React from "react";
import { v4 } from "uuid";
import { iconMap } from "./socialIcons";

const SOCIAL_ICONS = [
  SocialLinkIcons.Twitter,
  SocialLinkIcons.Facebook,
  SocialLinkIcons.Instagram,
  SocialLinkIcons.Tiktok,
  SocialLinkIcons.Email,
  SocialLinkIcons.Medium,
  SocialLinkIcons.LinkedIn,
  SocialLinkIcons.WhatsApp,
  SocialLinkIcons.Github,
  SocialLinkIcons.Youtube,
  SocialLinkIcons.Behance,
  SocialLinkIcons.Telegram,
  SocialLinkIcons.Discord,
  SocialLinkIcons.Reddit,
  SocialLinkIcons.SoundCloud,
  SocialLinkIcons.Pinterest,
];
interface SocialIconsListProps {
  findSelectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >;
  social: SocialLink[];
}
function SocialIconsList({
  findSelectedSection,
  social,
}: SocialIconsListProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="grid grid-cols-6 gap-y-3 border-muted-bg border-solid p-2 border-[1px] rounded-sm">
      {SOCIAL_ICONS.map((icon) => {
        const isSocial = social.map((item) => item.icon) as SocialLinkIcons[];

        if (isSocial.includes(icon)) return null;
        return (
          <div
            key={icon}
            onClick={() => {
              dispatch(
                updateGlobalContent(findSelectedSection.id, {
                  social: [...social, { id: v4(), icon, link: "" }],
                })
              );
            }}
            className="hover:bg-muted h-10 rounded-md flex items-center justify-center cursor-pointer"
          >
            {iconMap[icon]}
          </div>
        );
      })}
    </div>
  );
}

export default SocialIconsList;
