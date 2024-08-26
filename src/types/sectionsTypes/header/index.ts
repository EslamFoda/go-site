import { v4 as uuidv4 } from "uuid";

export type SubLink = {
  text: string;
  link: string;
  id: string;
};

export type Link = {
  text: string;
  link: string;
  id: string;
  openNewTab: boolean;
  subLinks: SubLink[];
};

type Button = {
  text: string;
  link: string;
  id: string;
};

export type Announcement = {
  position: "above" | "below";
  text: string;
  link: string;
};

export type HeaderContent = {
  Logo: {
    type: string;
    text: string;
  };
  logo: {
    link: string;
    openNewTab: boolean;
  };
  links: Link[];
  buttons: Button[];
  announcement: Announcement;
};

export type MobileMenuIconType = "icon-1" | "icon-2" | "icon-3";
type DesignSettings = {
  logoColor: "none" | "primary";
  mobileMenuIcon: MobileMenuIconType;
  width: "fill" | "fit";
  sticky: boolean;
  float: boolean;
  shadow: boolean;
  border: boolean;
  glass: boolean;
  scrollIndicator: boolean;
  autoHide: boolean;
};

export type HeaderStyle = {
  designName: string;
  designSettings: DesignSettings;
};
