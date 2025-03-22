import { Storage } from "@/reduxStore/types";
import {
  Accordion,
  AccordionStyle,
} from "../sectionsTypes/accordion/accordion";
import { BannerStyle } from "../sectionsTypes/banner";
import { Card, CardStyle } from "../sectionsTypes/cards";
import { FluidStyle } from "../sectionsTypes/fluid";
import { FooterStyle, LinkGroup, SocialLink } from "../sectionsTypes/footer";
import { GalleryStyle, Photo } from "../sectionsTypes/gallery";
import { HeaderStyle, Link, SubLink } from "../sectionsTypes/header";
import { ListItem, ListStyle } from "../sectionsTypes/list";
import { Logo, LogosStyle } from "../sectionsTypes/logos";
import {
  SubscriptionPlan,
  SubscriptionPlanItem,
} from "../sectionsTypes/pricing";
import { Testimonial, TestimonialStyle } from "../sectionsTypes/testimonials";

export type SelectedItemType =
  | Card
  | ListItem
  | Accordion
  | Testimonial
  | Link
  | Photo
  | SubLink
  | Logo
  | LinkGroup
  | SocialLink
  | SubscriptionPlan
  | SubscriptionPlanItem
  | Storage
  | null;

export type DragItems =
  | Card[]
  | ListItem[]
  | Accordion[]
  | Testimonial[]
  | Link[]
  | SubLink[]
  | Photo[]
  | LinkGroup[]
  | Logo[]
  | SocialLink[]
  | SubscriptionPlan[];
export type SectionsStyleType =
  | BannerStyle
  | CardStyle
  | ListStyle
  | AccordionStyle
  | TestimonialStyle
  | HeaderStyle
  | GalleryStyle
  | LogosStyle
  | FluidStyle
  | FooterStyle;

export type UnsplashImage = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    first_name: string;
  };
  alt_description: string | null;
};

export type TextSizeType = "s" | "m" | "l";

export type AlignType = "start" | "center" | "end";
export type SectionBgColorType = "primary" | "gray" | "none";
export type ShapeType = "square" | "rounded";
export type displayType = "grid" | "carousel";

export interface CarouselSettings {
  desktopWidth: number;
  mobileWidth: number;
  autoScroll: boolean;
  scrollSpeed: number;
}

export interface Font {
  family: string;
  category: string;
  variants: string[];
}

export interface FontOption {
  value: number;
  label: string;
  category: string;
}

export interface VariantOption {
  value: string;
  label: string;
}

export type PageTypes = "about" | "landing" | "";

export interface DroppingItemType {
  w: number;
  h: number;
  icon?: unknown;
}

export enum SocialLinkIcons {
  Twitter = "Twitter",
  Facebook = "Facebook",
  Instagram = "Instagram",
  Tiktok = "Tiktok",
  Email = "Email",
  Medium = "Medium",
  LinkedIn = "LinkedIn",
  WhatsApp = "WhatsApp",
  Github = "Github",
  Youtube = "Youtube",
  Behance = "Behance",
  Telegram = "Telegram",
  Discord = "Discord",
  Reddit = "Reddit",
  SoundCloud = "SoundCloud",
  Pinterest = "Pinterest",
}

export enum PlanType {
  plan1 = "plan1",
  plan2 = "plan2",
  plan3 = "plan3",
}

export interface Spacing {
  top: {
    desktop: number;
    mobile: number;
  };
  bottom: {
    desktop: number;
    mobile: number;
  };
  gap: {
    desktop: number;
    mobile: number;
  };
  padding: {
    desktop: number;
    mobile: number;
  };
}

export interface SectionBackground {
  color: SectionBgColorType;
  media: {
    imageUrl: string;
    imageId: string;
  };
  textColor: "light" | "dark";
  height: "fill" | "fit";
  width: "fill" | "fit";
  spacing?: string;
  overlay: boolean;
  blur: boolean;
  greyScale: boolean;
  parallax: boolean;
  overlayEffect: "s" | "m" | "l";
  blurEffect: "s" | "m" | "l";
  align: AlignType;
}

export interface ButtonTypes {
  text: string;
  link: string;
  id: string;
  pageId: string;
  linkType: LinkTypes;
  externalLink: string;
  openNewTab: boolean;
}

export type LinkTypes = "internal" | "external";
