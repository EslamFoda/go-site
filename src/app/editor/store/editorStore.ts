import { create, SetState } from "zustand";

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

// Define types for Card content
export interface Card {
  id: string;
  title: string;
  text: string;
  image: string;
  button: string;
  buttonColor: "gray" | "primary";
  link: string;
}

// Define types for Cards content
export interface CardsContent {
  label?: string;
  title: string;
  subtitle: string;
  cards: Card[];
}

export interface CardStyle {
  // Define properties specific to Card style
  designName: string;
  designSettings: {
    layout: "top" | "center" | "bottom";
    grid: {
      desktop: number;
      mobile: number;
    };
    height: {
      desktop: number;
      mobile: number;
    };
    titleSize: "s" | "m" | "l";
    align: "start" | "center" | "end";
    displayType: "grid" | "carousel";
    image: boolean;
    cardBackground: boolean;
    cardBorder: boolean;
    leftTitlePosition: boolean;
    button: boolean;
    cardSlider: {
      desktopWidth: number;
      mobileWidth: number;
      autoScroll: boolean;
      scrollSpeed: number;
    };
    sectionBackground: {
      color: string;
      media: string;
      height: string;
      spacing: string;
    };
  };
}

// Define all possible content types
export type SectionContentTypes = {
  banner: BannerContent;
  cards: CardsContent;
  // Add more content types here as needed
};

export type SectionStyleTypes = {
  banner: BannerStyle;
  cards: CardStyle;
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
  selectedItem: Card | null;
  handleSelectedSection: (selectedSectionId: string) => void;
  handleSelectedItem: (item: Card | null) => void;
  updateContent: (
    sectionId: string,
    newContent: Partial<SectionContentTypes[keyof SectionContentTypes]>
  ) => void;
  updateStyle: (
    sectionId: string,
    newStyle: Partial<SectionStyleTypes[keyof SectionStyleTypes]>
  ) => void;
  openSectionDesigns: boolean;
  toggleSectionDesigns: () => void;
  closeSectionDesigns: () => void;
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
  handleSelectedSection: (selectedSectionId: string) =>
    set((state) => ({
      selectedSection:
        state.editor.sections.find(
          (section) => section.id === selectedSectionId
        ) || null,
    })),
  handleSelectedItem: (item: Card | null) =>
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
  openSectionDesigns: false,
  toggleSectionDesigns: () =>
    set((state) => ({ openSectionDesigns: !state.openSectionDesigns })),
  closeSectionDesigns: () => set(() => ({ openSectionDesigns: false })),
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
    set((state) => ({ sectionIndex })),
}));

export default useEditor;
