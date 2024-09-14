import { produce } from "immer";
import * as types from "./actionTypes";
import { EditorStore } from "./types"; // Ensure EditorAction is defined in types.ts
import { v4 as uuidv4 } from "uuid";

const initialState: EditorStore = {
  editor: {
    pages: [
      {
        pageId: uuidv4(),
        sections: [
          {
            id: uuidv4(),
            sectionName: "Banner",
            content: {
              label: "",
              title: "developer",
              subtitle:
                "Eslam helps you build the best products for your customers. With our expertise and experience, we can help you take your ideas from concept to reality",
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
        pageSettings: {
          coverImage:
            "https://images.unsplash.com/photo-1674062284636-c7b6b6c7a358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDk5MjB8MHwxfHNlYXJjaHw4MXx8bW9iaWxlJTIwc2hvcHxlbnwwfHx8fDE3MDYyNjQxMzR8MA&ixlib=rb-4.0.3&q=80&w=1080",
          description:
            "Shop for the latest mobile phones, tablets, and accessories at our online mobile shop. We offer a wide selection of products from top brands at competitive prices",
          isPublished: true,
          isVisibleInSearch: true,
          link: "home",
          pagePasswordButton: "Continue",
          seoTitle: "Mobile Shop | Buy & Sell New & Used Phones Online",
          showFooter: true,
          showHeader: true,
          title: "homepage",
          userEditedSlug: false,
        },
      },
      {
        pageId: uuidv4(),
        sections: [
          {
            id: uuidv4(),
            sectionName: "Banner",
            content: {
              label: "",
              title: "test page2",
              subtitle: "test page2 description for go site editor",
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
        pageSettings: {
          coverImage:
            "https://images.unsplash.com/photo-1674062284636-c7b6b6c7a358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDk5MjB8MHwxfHNlYXJjaHw4MXx8bW9iaWxlJTIwc2hvcHxlbnwwfHx8fDE3MDYyNjQxMzR8MA&ixlib=rb-4.0.3&q=80&w=1080",
          description:
            "Shop for the latest mobile phones, tablets, and accessories at our online mobile shop. We offer a wide selection of products from top brands at competitive prices",
          isPublished: true,
          isVisibleInSearch: true,
          link: "home",
          pagePasswordButton: "Continue",
          seoTitle: "Mobile Shop | Buy & Sell New & Used Phones Online",
          showFooter: true,
          showHeader: true,
          title: "about",
          userEditedSlug: false,
        },
      },
    ],
  },
  selectedSection: null,
  activePage: "",
  selectedItem: null,
  selectedSubLink: null,
  sectionIndex: 0,
  chooseIcon: false,
  chooseImage: false,
  selectedPallet: "default-theme",
  openSectionDesigns: false,
  openPallet: false,
  openPages: true,
  designSettings: {
    fonts: {
      titleFont: {
        fontFamily: "Space Grotesk",
        fontWeight: "600",
        fontFamilyUrl:
          "https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksjNsFjTDJK.ttf",
      },
      bodyFont: {
        fontFamily: "Space Grotesk",
        fontWeight: "regular",
        fontFamilyUrl:
          "https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsjNsFjTDJK.ttf",
      },
    },
    colors: {
      primary: "",
      primaryForGround: "",
    },
    borderRadius: ".5rem",
    width: {
      pages: 1400,
      fullWidthPage: false,
    },
  },
  settings: {
    email: "",
    favicon: "",
    homePage: "",
    isTemplate: false,
    showMadeBy: true,
    name: "",
    link: "",
    siteId: "",
  },
  openPageSetting: false,
  droppingItem: {
    h: 4,
    w: 3,
  },
};

// Helper function to update state at a given path
const setNestedState = (state: any, path: string[], value: any) => {
  return path.reduce((acc, key, index) => {
    if (index === path.length - 1) {
      acc[key] = value;
    }
    return acc[key];
  }, state);
};

const editorReducer = (state = initialState, action: any): EditorStore =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.UPDATE_SELECTED_SECTION: {
        draft.openPallet = false;
        const page = state.editor.pages.find(
          (p) => p.pageId === action.payload.pageId
        );
        if (page) {
          draft.selectedSection =
            page.sections.find(
              (section) => section.id === action.payload.sectionId
            ) || null;
        }
        break;
      }

      case types.UPDATE_SELECTED_ITEM: {
        draft.selectedItem = action.payload;
        break;
      }

      case types.UPDATE_SELECTED_SUB_LINK: {
        draft.selectedSubLink = action.payload;
        break;
      }

      case types.UPDATE_CONTENT: {
        const page = draft.editor.pages.find(
          (p) => p.pageId === action.payload.pageId
        );
        if (page) {
          const sectionToUpdateContent = page.sections.find(
            (section) => section.id === action.payload.sectionId
          );
          if (sectionToUpdateContent) {
            Object.assign(
              sectionToUpdateContent.content,
              action.payload.newContent
            );
          }
        }
        break;
      }

      case types.UPDATE_STYLE: {
        const page = draft.editor.pages.find(
          (p) => p.pageId === action.payload.pageId
        );
        if (page) {
          const sectionToUpdateStyle = page.sections.find(
            (section) => section.id === action.payload.sectionId
          );
          if (sectionToUpdateStyle) {
            Object.assign(sectionToUpdateStyle.style, action.payload.newStyle);
          }
        }
        break;
      }

      case types.UPDATE_SELECTED_PALLET: {
        draft.selectedPallet = action.payload;
        break;
      }

      case types.TOGGLE_PALLET: {
        draft.openPallet = !draft.openPallet;
        draft.openSectionDesigns = false;
        draft.selectedSection = null;
        draft.openPages = false;
        draft.openPageSetting = false;
        break;
      }

      case types.TOGGLE_SECTION_DESIGNS: {
        draft.openSectionDesigns = !draft.openSectionDesigns;
        draft.openPallet = false;
        draft.openPages = false;
        draft.openPageSetting = false;
        break;
      }

      case types.TOGGLE_CHOOSE_ICON: {
        draft.chooseIcon = !draft.chooseIcon;
        break;
      }

      case types.UPDATE_EDITOR_SECTIONS: {
        const page = draft.editor.pages.find(
          (p) => p.pageId === action.payload.pageId
        );
        if (page) {
          page.sections = action.payload.sections;
        }
        break;
      }

      case types.UPDATE_SECTION_INDEX: {
        draft.sectionIndex = action.payload;
        break;
      }

      case types.OPEN_SECTION_DESIGNS: {
        draft.openSectionDesigns = true;
        draft.openPallet = false;
        draft.openPages = false;
        draft.openPageSetting = false;
        break;
      }

      case types.CLOSE_SECTION_DESIGNS: {
        draft.openSectionDesigns = false;
        draft.openPallet = false;
        draft.openPages = false;
        draft.openPageSetting = false;
        break;
      }

      case types.CLOSE_CHOOSE_ICON: {
        draft.chooseIcon = false;
        break;
      }

      case types.OPEN_CHOOSE_ICON: {
        draft.chooseIcon = true;
        break;
      }

      case types.OPEN_PALLET: {
        draft.openPallet = true;
        draft.openSectionDesigns = false;
        draft.chooseIcon = false;
        draft.chooseImage = false;
        draft.selectedSection = null;
        draft.openPages = false;
        draft.openPageSetting = false;
        break;
      }

      case types.CLOSE_PALLET: {
        draft.openPallet = false;
        break;
      }

      case types.UPDATE_DESIGN_SETTINGS: {
        draft.designSettings = {
          ...draft.designSettings,
          ...action.payload,
        };
        break;
      }

      case types.UPDATE_ACTIVE_PAGE: {
        draft.activePage = action.payload;
        break;
      }

      case types.OPEN_PAGE_SETTINGS: {
        draft.openPages = true;
        draft.openPallet = false;
        draft.openSectionDesigns = false;
        draft.chooseIcon = false;
        draft.chooseImage = false;
        draft.selectedSection = null;
        draft.openPageSetting = false;
        break;
      }

      case types.CLOSE_PAGE_SETTINGS: {
        draft.openPages = false;
        draft.openPallet = false;
        draft.openSectionDesigns = false;
        draft.chooseIcon = false;
        draft.chooseImage = false;
        draft.openPageSetting = false;

        break;
      }

      case types.ADD_NEW_PAGE: {
        draft.editor.pages.push(action.payload);
        break;
      }

      case types.DELETE_PAGE: {
        draft.editor.pages = draft.editor.pages.filter(
          (page) => page.pageId !== action.payload
        );
        break;
      }
      case types.UPDATE_EDITOR: {
        setNestedState(draft, action.payload.path, action.payload.value);
        break;
      }

      case types.OPEN_PAGE_SETTING: {
        draft.openPageSetting = true;
        draft.openPages = false;
        draft.openPallet = false;
        draft.openSectionDesigns = false;
        draft.chooseIcon = false;
        draft.chooseImage = false;
        draft.selectedSection = null;
        break;
      }

      case types.CLOSE_PAGE_SETTING: {
        draft.openPageSetting = false;
        draft.openPages = false;
        draft.openPallet = false;
        draft.openSectionDesigns = false;
        draft.chooseIcon = false;
        draft.chooseImage = false;
        draft.selectedSection = null;
        break;
      }

      case types.UPDATE_PAGE_SETTING: {
        const { pageId, newSettings } = action.payload;
        const page = draft.editor.pages.find((p) => p.pageId === pageId);
        if (page) {
          Object.assign(page.pageSettings, newSettings);
        }
        break;
      }

      case types.UPDATE_SELECTED_PAGE: {
        const { pageId, newSections } = action.payload;
        const page = draft.editor.pages.find((p) => p.pageId === pageId);
        if (page) {
          Object.assign(page.sections, newSections);
        }
        break;
      }

      case types.CLOSE_SIDEBAR: {
        draft.openPallet = false;
        draft.openSectionDesigns = false;
        draft.chooseIcon = false;
        draft.chooseImage = false;
        draft.selectedSection = null;
        draft.openPageSetting = false;
        draft.openPages = true;
        break;
      }

      case types.OPEN_CHOOSE_IMAGE: {
        draft.chooseImage = true;
        break;
      }

      case types.CLOSE_CHOOSE_IMAGE: {
        draft.chooseImage = false;
        break;
      }

      case types.UPDATE_DROPPING_ITEM: {
        draft.droppingItem = action.payload;
        break;
      }

      default:
        return state;
    }
  });

export default editorReducer;
