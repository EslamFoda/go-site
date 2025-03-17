// Import section-specific content and style types
import { SelectedItemType } from "@/types/common";
import {
  AccordionContent,
  AccordionStyle,
} from "@/types/sectionsTypes/accordion/accordion";

import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
import { CardStyle, CardsContent } from "@/types/sectionsTypes/cards";
import {
  FluidContent,
  FluidStyle,
  GridCard,
} from "@/types/sectionsTypes/fluid";
import { FooterContent, FooterStyle } from "@/types/sectionsTypes/footer";
import { GalleryContent, GalleryStyle } from "@/types/sectionsTypes/gallery";
import {
  HeaderContent,
  HeaderStyle,
  SubLink,
} from "@/types/sectionsTypes/header";
import { ListContent, ListStyle } from "@/types/sectionsTypes/list";
import { LogosContent, LogosStyle } from "@/types/sectionsTypes/logos";
import { PricingContent, PricingStyle } from "@/types/sectionsTypes/pricing";
import {
  TestimonialContent,
  TestimonialStyle,
} from "@/types/sectionsTypes/testimonials";

// Define all possible content types for sections
export type SectionContentTypes = {
  banner: BannerContent;
  cards: CardsContent;
  list: ListContent;
  accordion: AccordionContent;
  testimonial: TestimonialContent;
  header: HeaderContent;
  gallery: GalleryContent;
  logos: LogosContent;
  fluid: FluidContent;
  footer: FooterContent;
  pricing: PricingContent;
  // Add more content types here as needed
};

// Define all possible style types for sections
export type SectionStyleTypes = {
  banner: BannerStyle;
  cards: CardStyle;
  list: ListStyle;
  accordion: AccordionStyle;
  testimonial: TestimonialStyle;
  header: HeaderStyle;
  gallery: GalleryStyle;
  logos: LogosStyle;
  fluid: FluidStyle;
  footer: FooterStyle;
  pricing: PricingStyle;
  // Add more style types here as needed
};

// Define the type for a single editor section
export interface EditorSection<
  T extends keyof SectionContentTypes,
  U extends keyof SectionStyleTypes
> {
  id: string;
  sectionName: string;
  content: SectionContentTypes[T];
  style: SectionStyleTypes[U];
}

// Define the type for the editor's state in the store
export interface EditorStore {
  editor: {
    pages: EditorPage[]; // Add this line to include pages in the editor
  };
  sectionIndex: number;
  selectedSection: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  > | null;
  selectedItem: SelectedItemType;
  selectedSubLink: SubLink | null;
  openSectionDesigns: boolean;
  openPallet: boolean;
  chooseIcon: boolean;
  chooseImage: boolean;
  chooseBgImage: boolean;
  selectedPallet: string;
  designSettings: DesignSettings;
  activePage: string;
  openPages: boolean;
  openHeaderOptions: boolean;
  openLogoSettings: boolean;
  settings: SiteSettings;
  openPageSetting: boolean;
  dragItem: GridCard;
  isDragging: boolean;
  isDraggableModalActive: boolean;
  fluidCard: GridCard | null;
  draggableModalName: DraggableModalName;
  globalSections: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >[];
  storage: Storage[];
}

export interface Storage {
  id: string;
  url: string;
  publicId: string;
}

export type DraggableModalName = "SETTINGS" | "LAYOUT";

// Define the type for an editor page
export interface EditorPage {
  pageId: string;
  sections: EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[];
  pageSettings: PageSettings;
}

// Define the type for page settings
export interface PageSettings {
  coverImage: string;
  description: string;
  isPublished: boolean;
  isVisibleInSearch: boolean;
  link: string;
  pagePasswordButton: string;
  seoTitle: string;
  showFooter: boolean;
  showHeader: boolean;
  title: string;
  userEditedSlug: boolean;
}

// Define the type for design settings
export interface DesignSettings {
  fonts: {
    titleFont: FontSettings;
    bodyFont: FontSettings;
  };
  colors: {
    primary: string;
    primaryForGround: string;
  };
  borderRadius: string;
  width: {
    pages: number;
    fullWidthPage: boolean;
  };
}

// Define the type for font settings
export interface FontSettings {
  fontFamily: string;
  fontWeight: string;
  fontFamilyUrl: string;
}

export interface SiteSettings {
  email: string | undefined;
  favicon: string;
  homePage: string;
  isTemplate: boolean;
  showMadeBy: boolean;
  name: string;
  link: string;
  siteId: string;
  published: boolean;
  owner_id: string;
}
