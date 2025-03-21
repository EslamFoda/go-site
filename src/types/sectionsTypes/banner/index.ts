import {
  AlignType,
  ButtonTypes,
  SectionBackground,
  SectionBgColorType,
  Spacing,
} from "@/types/common";

// Define types for Banner content
export interface BannerContent {
  label: string;
  title: string;
  subtitle: string;
  mediaType: "image" | "video";
  imageSetting?: { imageUrl?: string; altText?: string; id?: string };
  videoSetting?: { videoUrl: string };
  actionType: "buttons" | "form";
  buttons: ButtonTypes[];
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
    mobile: "flex-col" | "flex-col-reverse";
    showButtons: boolean;
    showForm: boolean;
    showVideo: boolean;
    spacing: Spacing;
    sectionBackground: SectionBackground;
    imageSetting: {
      objectFit: "cover" | "contain";
      backgroundColor: SectionBgColorType;
      showImage: boolean;
    };
  };
}
