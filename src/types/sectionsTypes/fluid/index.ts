import { ButtonVariantProps } from "@/components/ui/button";
import { Layouts } from "react-grid-layout";

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

export type ButtonDisplay = "Text only" | "Icon only" | "Text and icon";

export type ButtonAlignment = "start" | "center" | "end";
export type IconPositionTypes = "right" | "left" | "below" | "above";

export interface FluidButtonSettings {
  text: string;
  link?: string;
  size: ButtonVariantProps["size"];
  variant: ButtonVariantProps["variant"];
  buttonDisplay: ButtonDisplay;
  alignment: ButtonAlignment;
  buttonIcon: string;
  textIconGap: number;
  iconPosition: IconPositionTypes;
}
export interface FluidImageSettings {
  src: string;
  link?: string;
}

export interface GridCardButton {
  i: string;
  content: string;
  settings: FluidButtonSettings;
  w: number;
  h: number;
  type: "button"; // Discriminator
}

export interface GridCardImage {
  i: string;
  content: string;
  settings: FluidImageSettings;
  w: number;
  h: number;
  type: "image"; // Discriminator
}

// Union of GridCard types
export type GridCard = GridCardButton | GridCardImage;
