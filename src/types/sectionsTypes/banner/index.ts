import { AlignType, SectionBgColorType } from "@/types/common";

// Define types for Banner content
export interface BannerContent {
  label?: string;
  title: string;
  subtitle: string;
  mediaType: "image" | "video";
  imageSetting?: { imageUrl?: string; altText?: string };
  videoSetting?: { videoUrl: string };
  actionType: "buttons";
  buttons: {
    primaryButton: { text: string };
    secondaryButton: { text: string };
  };
}

export interface BannerStyle {
  designName: string;
  designSettings: {
    titleSize: "s" | "m" | "l" | "xl";
    align: AlignType;
    subtitleWidth: string;
    height: string;
    video: boolean;
    leftTitlePosition: boolean;
    leftTitleWidth: string;
    showButtons: boolean;
    sectionBackground: {
      color?: SectionBgColorType;
      media?: string;
      height?: "fill" | "fit";
      align?: AlignType;
      width?: string;
      spacing?: string;
    };
    imageSetting: {
      objectFit: "cover" | "contain";
      backgroundColor: SectionBgColorType;
      showImage: boolean;
    };
  };
}
