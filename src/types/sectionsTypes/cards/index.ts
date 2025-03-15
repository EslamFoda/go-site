import {
  AlignType,
  displayType,
  SectionBackground,
  Spacing,
  TextSizeType,
} from "@/types/common";

// Define types for Card content
export interface Card {
  id: string;
  title: string;
  text: string;
  image: string;
  imgId: string;
  button: string;
  buttonColor: "gray" | "primary";
  link: string;
  pageId: string;
  linkType: "internal" | "external";
  externalLink: string;
  openNewTab: boolean;
}

// Define types for Cards content
export interface CardsContent {
  label: string;
  title: string;
  subtitle: string;
  cards: Card[];
}

export interface CardStyle {
  // Define properties specific to Card style
  designName: string;
  designSettings: {
    layout: "top" | "center" | "bottom";
    layoutV2: "top" | "center" | "bottom";
    grid: {
      desktop: number;
      mobile: number;
    };
    height: {
      desktop: number;
      mobile: number;
    };
    titleSize: TextSizeType;
    align: AlignType;
    displayType: displayType;
    image: boolean;
    cardBackground: boolean;
    cardBorder: boolean;
    glassEffect: boolean;
    leftTitlePosition: boolean;
    button: boolean;
    cardSlider: {
      desktopWidth: number;
      mobileWidth: number;
      autoScroll: boolean;
      scrollSpeed: number;
    };
    spacing: Spacing;
    sectionBackground: SectionBackground;
  };
}
