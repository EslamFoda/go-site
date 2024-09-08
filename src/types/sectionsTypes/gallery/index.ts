import { AlignType, displayType, SectionBgColorType } from "@/types/common";

// Define types for Card content
export interface Photo {
  id: string;
  url: string;
}

// Define types for Cards content
export interface GalleryContent {
  label?: string;
  title: string;
  subtitle: string;
  photos: Photo[];
}

export interface GalleryStyle {
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
    displayType: displayType;
    leftTitlePosition: boolean;
    carouselSettings: {
      desktopWidth: number;
      mobileWidth: number;
      autoScroll: boolean;
      scrollSpeed: number;
    };
    sectionBackground: {
      color?: SectionBgColorType;
      media?: string;
      height?: "fill" | "fit";
      align?: AlignType;
      width?: string;
      spacing?: string;
    };
  };
}
