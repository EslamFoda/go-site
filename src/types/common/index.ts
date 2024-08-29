import { Accordion, AccordionStyle } from "../sectionsTypes/accordion";
import { BannerStyle } from "../sectionsTypes/banner";
import { Card, CardStyle } from "../sectionsTypes/cards";
import { HeaderStyle, Link, SubLink } from "../sectionsTypes/header";
import { ListItem, ListStyle } from "../sectionsTypes/list";
import { Testimonial, TestimonialStyle } from "../sectionsTypes/testimonials";

export type SelectedItemType = Card | ListItem | Accordion | Testimonial | Link | SubLink | null;
export type SectionsStyleType =
  | BannerStyle
  | CardStyle
  | ListStyle
  | AccordionStyle
  | TestimonialStyle
  | HeaderStyle;
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
