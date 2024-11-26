import { Layouts } from "react-grid-layout";

export interface GridCard {
  i: string;
  content: string;
  w: number;
  h: number;
  type: "button" | "image";
}



export interface FluidContent {
  gridLayout: Layouts;
  gridCards: GridCard[];
}

export interface DesignSettings {
  logoColor: "none" | string;
  mobileMenuIcon: "icon-1" | "icon-2" | "icon-3";
  width: "fill" | "fit";
  sticky: boolean;
  float: boolean;
  shadow: boolean;
  glass: boolean;
  scrollIndicator: boolean;
  autoHide: boolean;
}

export interface FluidStyle {
  designName: string;
  designSettings: DesignSettings;
}
