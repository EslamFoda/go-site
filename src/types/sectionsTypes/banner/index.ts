import { AlignType, SectionBgColorType } from "@/types/common";

// Define types for Banner content
export interface BannerContent {
  label: string;
  title: string;
  subtitle: string;
  mediaType: "image" | "video";
  imageSetting?: { imageUrl?: string; altText?: string; id?: string };
  videoSetting?: { videoUrl: string };
  actionType: "buttons" | "form";
  buttons: BannerButton[];
  form: BannerForm;
}

export interface BannerForm {
  fields: FormFields[];
  button: {
    text: string;
    link: string;
    id: string;
  };
  successMessage: string;
  countryCode: CountryCode;
}

export interface CountryCode {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export interface FormFields {
  id: string;
  type: FieldsType;
  label: string;
  value: string;
  placeholder: string;
  required: boolean;
  active: boolean;
}

export type FieldsType = "text" | "email" | "textarea" | "tel";

interface BannerButton {
  text: string;
  link: string;
  id: string;
  pageId: string;
}

export interface BannerStyle {
  designName: string;
  designSettings: {
    titleSize: "s" | "m" | "l" | "xl";
    align: AlignType;
    subtitleWidth: string;
    height: {
      desktop: number;
      mobile: number;
    };
    video: boolean;
    leftTitlePosition: boolean;
    leftTitleWidth: string;
    showButtons: boolean;
    showForm: boolean;
    showVideo: boolean;
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
