// Import section-specific content and style types
import {
  Accordion,
  AccordionContent,
  AccordionStyle,
} from "@/types/sectionsTypes/accordion";
import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
import { Card, CardStyle, CardsContent } from "@/types/sectionsTypes/cards";
import { ListContent, ListItem, ListStyle } from "@/types/sectionsTypes/list";
import {
  Testimonial,
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
  // Add more content types here as needed
};

// Define all possible style types for sections
export type SectionStyleTypes = {
  banner: BannerStyle;
  cards: CardStyle;
  list: ListStyle;
  accordion: AccordionStyle;
  testimonial: TestimonialStyle;
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
  selectedItem: Card | ListItem | Accordion | Testimonial | null;
  openSectionDesigns: boolean;
  openPallet: boolean;
  chooseIcon: boolean;
  selectedPallet: string;
  designSettings: DesignSettings;
  activePage: string;
  openPages: boolean;
  settings: SiteSettings;
}

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
}
