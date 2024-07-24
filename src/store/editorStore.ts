import { BannerContent, BannerStyle } from "@/types/sectionsTypes/banner";
import { Card, CardStyle, CardsContent } from "@/types/sectionsTypes/cards";
import { ListContent, ListItem, ListStyle } from "@/types/sectionsTypes/list";
import { create, SetState } from "zustand";

// Define all possible content types
export type SectionContentTypes = {
  banner: BannerContent;
  cards: CardsContent;
  list: ListContent;
  // Add more content types here as needed
};

export type SectionStyleTypes = {
  banner: BannerStyle;
  cards: CardStyle;
  list: ListStyle;
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

// Define the type for the entire editor store
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
  selectedItem: Card | ListItem | null;
  openSectionDesigns: boolean;
  openPallet: boolean;
  chooseIcon: boolean;
  selectedPallet: string;
  handleSelectedSection: (selectedSectionId: string) => void;
  handleSelectedItem: (item: Card | ListItem | null) => void;
  updateContent: (
    sectionId: string,
    newContent: Partial<SectionContentTypes[keyof SectionContentTypes]>
  ) => void;
  updateStyle: (
    sectionId: string,
    newStyle: Partial<SectionStyleTypes[keyof SectionStyleTypes]>
  ) => void;
  handleSelectedPallet: (pallet: string) => void;
  handleOpenPallet: () => void;
  handleOpenSectionDesigns: () => void;
  closeSectionDesigns: () => void;
  closeChooseIcon: () => void;
  openChooseIcon: () => void;
  updateEditorSections: (
    sections: EditorSection<
      keyof SectionContentTypes,
      keyof SectionStyleTypes
    >[]
  ) => void;
  handleSelectedSectionIndex: (sectionIndex: number) => void;
}

// Create the Zustand store
const useEditor = create<EditorStore>((set: SetState<EditorStore>) => ({
  editor: {
    sections: [
      {
        id: "unique_id_1",
        sectionName: "Banner",
        content: {
          label: "",
          title: "developer",
          subtitle:
            "Eslam** helps you build the best products for your customers. With our expertise and experience, we can help you take your ideas from concept to reality",
          mediaType: "image",
          imageSetting: { imageUrl: "", altText: "" },
          videoSetting: { videoUrl: "" },
          actionType: "buttons",
          buttons: {
            primaryButton: { text: "start your journey" },
            secondaryButton: { text: "learn more" },
          },
        },
        style: {
          designName: "design1",
          designSettings: {
            titleSize: "l",
            align: "center",
            subtitleWidth: "50%",
            height: "460px",
            video: true,
            leftTitlePosition: false,
            leftTitleWidth: "50%",
            showButtons: true,
            sectionBackground: {
              color: "none",
              media: "",
              height: "fit",
              width: "100%",
              spacing: "xl",
              align: "center",
            },
            imageSetting: {
              objectFit: "cover",
              backgroundColor: "primary",
              showImage: true,
            },
          },
        },
      },
    ],
  },
  selectedSection: null,
  selectedItem: null,
  sectionIndex: 0,
  chooseIcon: false,
  selectedPallet: "default-theme",
  openSectionDesigns: false,
  openPallet: false,
  handleSelectedPallet: (pallet: string) =>
    set((state) => ({ selectedPallet: pallet })),
  handleSelectedSection: (selectedSectionId: string) =>
    set((state) => ({
      openPallet: false,
      selectedSection:
        state.editor.sections.find(
          (section) => section.id === selectedSectionId
        ) || null,
    })),
  handleSelectedItem: (item: Card | ListItem | null) =>
    set((state) => ({ selectedItem: item })),
  updateContent: (
    sectionId: string,
    newContent: Partial<SectionContentTypes[keyof SectionContentTypes]>
  ) =>
    set((state) => ({
      editor: {
        sections: state.editor.sections.map((section) =>
          section.id === sectionId
            ? { ...section, content: { ...section.content, ...newContent } }
            : section
        ),
      },
    })),
  updateStyle: (
    sectionId: string,
    newStyle: Partial<SectionContentTypes[keyof SectionStyleTypes]>
  ) =>
    set((state) => ({
      editor: {
        sections: state.editor.sections.map((section) =>
          section.id === sectionId
            ? { ...section, style: { ...section.style, ...newStyle } }
            : section
        ),
      },
    })),
  handleOpenPallet: () =>
    set(() => ({
      openPallet: true,
      openSectionDesigns: false,
      selectedSection: null,
    })),
  handleOpenSectionDesigns: () =>
    set(() => ({ openSectionDesigns: true, openPallet: false })),
  closeSectionDesigns: () => set(() => ({ openSectionDesigns: false })),
  openChooseIcon: () => set(() => ({ chooseIcon: true })),
  closeChooseIcon: () => set(() => ({ chooseIcon: false })),
  updateEditorSections: (
    sections: EditorSection<
      keyof SectionContentTypes,
      keyof SectionStyleTypes
    >[]
  ) =>
    set(() => ({
      editor: { sections },
    })),
  handleSelectedSectionIndex: (sectionIndex: number) =>
    set(() => ({ sectionIndex })),
}));

export default useEditor;
