import { LinkTypes } from "@/types/common";
import { ButtonTypes } from "../footer";

export type SubLink = {
  text: string;
  link: string;
  id: string;
  pageId: string;
  linkType: LinkTypes;
  externalLink: string;
  openNewTab: boolean;
};

export type Link = {
  text: string;
  link: string;
  pageId: string;
  id: string;
  linkType: LinkTypes;
  externalLink: string;
  openNewTab: boolean;
  subLinks: SubLink[];
};

export type Announcement = {
  position: "above" | "below";
  text: string;
  link: string;
  linkType: LinkTypes;
  externalLink: string;
  pageId: string;
  openNewTab: boolean;
};

export type HeaderContent = {
  Logo: {
    type: string;
    text: string;
  };
  logo: HeaderLogo;
  links: Link[];
  buttons: ButtonTypes[];
  announcement: Announcement;
  options: HeaderOptions;
};

export interface HeaderLogo {
  linkType: LinkTypes;
  link: string;
  externalLink: string;
  pageId: string;
  openNewTab: boolean;
  logoType: "text" | "image";
  text: string;
  logoImage: {
    lightImgId: string;
    darkImgId: string;
    urlLight: string;
    urlDark: string;
  };
}

export interface HeaderOptions {
  iconType: "icon" | "text";
  menuIcon: MobileMenuIconType;
  openMenuText: string;
  closeMenuText: string;
}

export type MobileMenuIconType =
  | "icon-1"
  | "icon-2"
  | "icon-3"
  | "icon-4"
  | "icon-5";
type DesignSettings = {
  logoColor: "none" | "primary";
  mobileMenuIcon: MobileMenuIconType;
  width: "fill" | "fit";
  sticky: boolean;
  float: boolean;
  shadow: boolean;
  glass: boolean;
  scrollIndicator: boolean;
  autoHide: boolean;
  logoSize: {
    desktop: number;
    mobile: number;
  };
};

export type HeaderStyle = {
  designName: string;
  designSettings: DesignSettings;
};
