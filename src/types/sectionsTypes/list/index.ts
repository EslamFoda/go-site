import {
  AlignType,
  CarouselSettings,
  displayType,
  SectionBackground,
  ShapeType,
  Spacing,
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

interface DesignSettings {
  layout: "row" | "col";
  layout2: "row" | "col";
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
  spacing: Spacing;
  carouselSettings: CarouselSettings;
  sectionBackground: SectionBackground;
}

export interface ListStyle {
  designName: string;
  designSettings: DesignSettings;
}
