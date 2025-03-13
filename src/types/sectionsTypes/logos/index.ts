import {
  AlignType,
  displayType,
  SectionBackground,
  Spacing,
} from "@/types/common";

// Define types for Card content
export interface Logo {
  id: string;
  lightImgId: string;
  darkImgId: string;
  urlLight: string;
  urlDark: string;
  size: {
    desktop: number;
    mobile: number;
  };
  link: string;
}

// Define types for Cards content
export interface LogosContent {
  label: string;
  title: string;
  subtitle: string;
  logos: Logo[];
}

export interface LogosStyle {
  // Define properties specific to Card style
  designName: string;
  designSettings: {
    grid: {
      desktop: number;
      mobile: number;
    };
    height: {
      desktop: number;
      mobile: number;
    };
    align: AlignType;
    background: boolean;
    border: boolean;
    displayType: displayType;
    leftTitlePosition: boolean;
    carouselSettings: {
      desktopWidth: number;
      mobileWidth: number;
      autoScroll: boolean;
      scrollSpeed: number;
    };
    spacing: Spacing;
    sectionBackground: SectionBackground;
  };
}
