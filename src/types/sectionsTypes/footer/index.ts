import { ButtonTypes, SocialLinkIcons } from "@/types/common";

interface FooterSubLink {
  text: string;
  link: string;
  id: string;
  pageId: string;
  linkType: "internal" | "external";
  externalLink: string;
  openNewTab: boolean;
}

// Link group interface
interface LinkGroup {
  text: string;
  id: string;
  subLinks: FooterSubLink[];
}

// Social media link interface
interface SocialLink {
  id: string;
  icon:
    | SocialLinkIcons.Twitter
    | SocialLinkIcons.Facebook
    | SocialLinkIcons.Instagram
    | SocialLinkIcons.Tiktok
    | SocialLinkIcons.Email
    | SocialLinkIcons.Medium
    | SocialLinkIcons.LinkedIn
    | SocialLinkIcons.WhatsApp
    | SocialLinkIcons.Github
    | SocialLinkIcons.Youtube
    | SocialLinkIcons.Behance
    | SocialLinkIcons.Telegram
    | SocialLinkIcons.Discord
    | SocialLinkIcons.Reddit
    | SocialLinkIcons.SoundCloud
    | SocialLinkIcons.Pinterest;

  link: string;
}

// Copyright section interface
interface CopyRight {
  leftArea: string;
  rightArea: string;
}

// Footer content interface
interface FooterContent {
  siteLogo: boolean;
  text: string;
  links: LinkGroup[];
  buttons: ButtonTypes[];
  social: SocialLink[];
  copyRight: CopyRight;
}

// Footer style interface
interface FooterStyle {
  designName: string;
}

export type {
  FooterContent,
  FooterStyle,
  FooterSubLink,
  LinkGroup,
  ButtonTypes,
  SocialLink,
  CopyRight,
};
