// types.ts

import {
  Accordion,
  AccordionContent,
  AccordionStyle,
} from "@/types/sectionsTypes/accordion";
import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
import { Card, CardStyle, CardsContent } from "@/types/sectionsTypes/cards";
import { ListContent, ListItem, ListStyle } from "@/types/sectionsTypes/list";

// Define all possible content types
export type SectionContentTypes = {
  banner: BannerContent;
  cards: CardsContent;
  list: ListContent;
  accordion: AccordionContent;
  // Add more content types here as needed
};

export type SectionStyleTypes = {
  banner: BannerStyle;
  cards: CardStyle;
  list: ListStyle;
  accordion: AccordionStyle;
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
  selectedItem: Card | ListItem | Accordion | null;
  openSectionDesigns: boolean;
  openPallet: boolean;
  chooseIcon: boolean;
  selectedPallet: string;
}
