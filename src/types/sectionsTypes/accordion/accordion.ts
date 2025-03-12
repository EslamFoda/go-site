import { SectionBgColorType, Spacing } from "@/types/common";

interface SectionBackground {
  color: SectionBgColorType;
  media: string;
  height: "fill" | "fit";
  spacing: string;
  align?: "start" | "center" | "end";
}

export enum AccordionIconType {
  "ARROW" = "arrow",
  "PLUS" = "plus",
}
interface DesignSettings {
  leftTitlePosition: boolean;
  icon: AccordionIconType;
  align: "start" | "center" | "end";
  background: boolean;
  border: boolean;
  spacing: Spacing;
  sectionBackground: SectionBackground;
}

export interface AccordionStyle {
  designName: string;
  designSettings: DesignSettings;
}

export interface Accordion {
  id: string;
  title: string;
  text: string;
}

export interface AccordionContent {
  label: string;
  title: string;
  subtitle: string;
  accordions: Accordion[];
}
