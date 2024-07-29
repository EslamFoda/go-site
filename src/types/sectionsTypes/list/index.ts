import {
  AlignType,
  CarouselSettings,
  displayType,
  SectionBgColorType,
  ShapeType,
  TextSizeType,
} from "@/types/common";

export interface ListItem {
  id: string;
  title: string;
  text: string;
  icon: string;
  link: string;
}

export interface ListContent {
  label: string;
  title: string;
  subtitle: string;
  type: string;
  list: ListItem[];
}

interface GridSettings {
  desktop: number;
  mobile: number;
}



interface SectionBackground {
  color?: SectionBgColorType;
  media: string;
  height: "fill" | "fit";
  spacing: string;
  align?: AlignType;
}

interface DesignSettings {
  layout: "row" | "col";
  grid: GridSettings;
  height: number;
  shape: ShapeType;
  iconColor: "none" | "primary";
  textSize: TextSizeType;
  align: AlignType;
  icon: boolean;
  background: boolean;
  border: boolean;
  leftTitlePosition: boolean;
  displayType: displayType;
  carouselSettings: CarouselSettings;
  sectionBackground: SectionBackground;
}

export interface ListStyle {
  designName: string;
  designSettings: DesignSettings;
}
