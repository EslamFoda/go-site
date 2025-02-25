import { Accordion, AccordionStyle } from "../sectionsTypes/accordion";
import { BannerStyle } from "../sectionsTypes/banner";
import { Card, CardStyle } from "../sectionsTypes/cards";
import { FluidStyle } from "../sectionsTypes/fluid";
import { FooterStyle, LinkGroup, SocialLink } from "../sectionsTypes/footer";
import { GalleryStyle, Photo } from "../sectionsTypes/gallery";
import { HeaderStyle, Link, SubLink } from "../sectionsTypes/header";
import { ListItem, ListStyle } from "../sectionsTypes/list";
import { Logo, LogosStyle } from "../sectionsTypes/logos";
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
  | SocialLink[];
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
