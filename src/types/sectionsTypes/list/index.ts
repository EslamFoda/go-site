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

interface CarouselSettings {
  desktopWidth: number;
  mobileWidth: number;
  autoScroll: boolean;
  scrollSpeed: number;
}

interface SectionBackground {
  color?: "primary" | "gray" | "none";
  media: string;
  height: string;
  spacing: string;
  align?: "start" | "center" | "end";
}

interface DesignSettings {
  layout: "row" | "col";
  grid: GridSettings;
  height: number;
  shape: "square" | "rounded";
  iconColor: "none" | "primary";
  textSize: "s" | "m" | "l";
  align: "start" | "center" | "end";
  icon: boolean;
  background: boolean;
  border: boolean;
  leftTitlePosition: boolean;
  displayType: "grid" | "carousel";
  carouselSettings: CarouselSettings;
  sectionBackground: SectionBackground;
}

export interface ListStyle {
  designName: string;
  designSettings: DesignSettings;
}
