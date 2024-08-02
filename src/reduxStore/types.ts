// types.ts

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

// Define all possible content types
export type SectionContentTypes = {
  banner: BannerContent;
  cards: CardsContent;
  list: ListContent;
  accordion: AccordionContent;
  testimonial: TestimonialContent;
  // Add more content types here as needed
};

export type SectionStyleTypes = {
  banner: BannerStyle;
  cards: CardStyle;
  list: ListStyle;
  accordion: AccordionStyle;
  testimonial: TestimonialStyle;
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

// Updated EditorStore interface
export interface EditorStore {
  editor: {
    sections: EditorSection<
      keyof SectionContentTypes,
      keyof SectionStyleTypes
    >[];
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
}

export interface DesignSettings {
  fonts: {
    titleFont: {
      fontFamily: string;
      fontWeight: string;
      fontFamilyUrl: string;
    };
    bodyFont: {
      fontFamily: string;
      fontWeight: string;
      fontFamilyUrl: string;
    };
  };
}
