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
    align: "start" | "center" | "end";
    subtitleWidth: string;
    height: string;
    video: boolean;
    leftTitlePosition: boolean;
    leftTitleWidth: string;
    showButtons: boolean;
    sectionBackground: {
      color?: "primary" | "gray" | "none";
      media?: string;
      height?: "fill" | "fit";
      align?: "start" | "center" | "end";
      width?: string;
      spacing?: string;
    };
    imageSetting: {
      objectFit: "cover" | "contain";
      backgroundColor: "primary" | "gray" | "none";
      showImage: boolean;
    };
  };
}
