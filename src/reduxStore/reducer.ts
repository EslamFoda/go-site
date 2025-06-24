import { produce } from "immer";
import * as types from "./actionTypes";
import { EditorStore } from "./types"; // Ensure EditorAction is defined in types.ts
import { v4 as uuidv4 } from "uuid";
import { SocialLinkIcons } from "@/types/common";

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
              title: "",
              subtitle: "",
              mediaType: "image",
              imageSetting: { imageUrl: "", altText: "" },
              videoSetting: { videoUrl: "" },
              actionType: "buttons",
              form: {
                fields: [
                  {
                    id: uuidv4(),
                    type: "text",
                    label: "First name",
                    value: "First name",
                    placeholder: "First name",
                    required: false,
                    active: true,
                  },
                  {
                    id: uuidv4(),
                    type: "text",
                    label: "Last name",
                    value: "Last name",
                    placeholder: "Last name",
                    required: false,
                    active: true,
                  },
                  {
                    id: uuidv4(),
                    type: "email",
                    label: "Email",
                    value: "Email",
                    placeholder: "Email",
                    required: true,
                    active: true,
                  },
                  {
                    id: uuidv4(),
                    type: "tel",
                    label: "Phone",
                    value: "Phone",
                    placeholder: "Phone",
                    required: false,
                    active: false,
                  },
                  {
                    id: uuidv4(),
                    type: "textarea",
                    label: "Message",
                    value: "Message",
                    placeholder: "Message",
                    required: false,
                    active: false,
                  },
                ],
                countryCode: {
                  code: "US",
                  name: "United States",
                  dialCode: "+1",
                  flag: "🇺🇸",
                },
                button: { text: "button 1", link: "", id: uuidv4() },
                successMessage: "Thank you! Your submission has been received",
              },
              buttons: [
                {
                  text: "button 1",
                  link: "",
                  id: uuidv4(),
                  pageId: "",
                  externalLink: "",
                  linkType: "internal",
                  openNewTab: false,
                },
                {
                  text: "button 2",
                  link: "",
                  id: uuidv4(),
                  pageId: "",
                  externalLink: "",
                  linkType: "internal",
                  openNewTab: false,
                },
              ],
            },
            style: {
              designName: "design1",
              designSettings: {
                titleSize: "l",
                align: "center",
                subtitleWidth: "50%",
                height: {
                  desktop: 460,
                  mobile: 350,
                },
                video: true,
                leftTitlePosition: false,
                leftTitleWidth: "50%",
                showButtons: true,
                showForm: false,
                showVideo: false,
                mobile: "flex-col",
                spacing: {
                  top: {
                    desktop: 50,
                    mobile: 15,
                  },
                  bottom: {
                    desktop: 50,
                    mobile: 15,
                  },
                  gap: {
                    desktop: 20,
                    mobile: 10,
                  },
                  padding: {
                    desktop: 20,
                    mobile: 10,
                  },
                },
                sectionBackground: {
                  color: "none",
                  media: {
                    imageUrl: "",
                    imageId: "",
                  },
                  textColor: "light",
                  height: "fit",
                  width: "fill",
                  spacing: "l",
                  overlay: false,
                  blur: false,
                  greyScale: false,
                  parallax: false,
                  overlayEffect: "s",
                  blurEffect: "s",
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
    ],
  },
  selectedSection: null,
  activePage: "",
  selectedItem: null,
  selectedSubLink: null,
  sectionIndex: 0,
  chooseIcon: false,
  chooseImage: false,
  chooseBgImage: false,
  selectedPallet: "default-theme",
  openSectionDesigns: false,
  openPallet: false,
  openPages: true,
  openHeaderOptions: false,
  openLogoSettings: false,
  previewMode: false,
  isSaving: false,
  isGenerating: false,
  copiedSection: null,
  drawerOpen: false,
  selectedItemId: "",
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
    published: false,
    name: "",
    link: "",
    siteId: "",
    owner_id: "",
  },
  openPageSetting: false,
  dragItem: {
    i: "",
    content: "",
    settings: {
      size: "sm",
      text: "Click Me",
      variant: "default",
      buttonDisplay: "Text only",
      alignment: "center",
      buttonIcon: "CaretRight",
      textIconGap: 8,
      iconPosition: "right",
    },
    w: 1,
    h: 1,
    type: "button",
    zIndex: 5,
  },
  isDragging: false,
  isDraggableModalActive: false,
  fluidCard: null,
  draggableModalName: "SETTINGS",
  globalSections: [
    {
      id: uuidv4(),
      sectionName: "Header",
      content: {
        Logo: {
          type: "text",
          text: "logo",
        },
        logo: {
          linkType: "internal",
          link: "",
          externalLink: "",
          pageId: "",
          openNewTab: false,
          logoType: "text",
          text: "logo",
          logoImage: {
            lightImgId: "",
            darkImgId: "",
            urlLight: "",
            urlDark: "",
          },
        },
        links: [
          {
            text: "link 2",
            link: "",
            id: uuidv4(),
            openNewTab: false,
            subLinks: [],
            pageId: "",
            externalLink: "",
            linkType: "internal",
          },
          {
            text: "link 3",
            link: "",
            id: uuidv4(),
            openNewTab: false,
            subLinks: [],
            pageId: "",
            externalLink: "",
            linkType: "internal",
          },
          {
            text: "link 4",
            link: "",
            id: uuidv4(),
            openNewTab: false,
            subLinks: [],
            pageId: "",
            externalLink: "",
            linkType: "internal",
          },
        ],
        buttons: [
          {
            text: "button 1",
            link: "",
            id: uuidv4(),
            pageId: "",
            externalLink: "",
            linkType: "internal",
            openNewTab: false,
          },
          {
            text: "button 2",
            link: "",
            id: uuidv4(),
            pageId: "",
            externalLink: "",
            linkType: "internal",
            openNewTab: false,
          },
        ],
        announcement: {
          position: "above", // above, below
          text: "",
          linkType: "internal",
          link: "",
          externalLink: "",
          pageId: "",
          openNewTab: false,
        },
        options: {
          iconType: "icon",
          menuIcon: "icon-1",
          openMenuText: "Open",
          closeMenuText: "Close",
        },
      },
      style: {
        designName: "design1",
        designSettings: {
          logoColor: "none",
          mobileMenuIcon: "icon-1", // icon-1, icon-2, icon-3
          width: "fill", // fill , fit
          sticky: false,
          float: false,
          shadow: false,
          glass: false,
          scrollIndicator: false,
          autoHide: false,
          logoSize: {
            desktop: 20,
            mobile: 20,
          },
        },
      },
    },
    {
      id: uuidv4(),
      sectionName: "Footer",
      content: {
        siteLogo: true,
        text: "Add a short descriptive text",
        links: [
          {
            text: "group",
            id: uuidv4(),
            subLinks: [
              {
                text: "sub link 1",
                link: "",
                id: uuidv4(),
                pageId: "",
                linkType: "internal",
                externalLink: "",
                openNewTab: false,
              },
              {
                text: "sub link 2",
                link: "",
                id: uuidv4(),
                pageId: "",
                linkType: "internal",
                externalLink: "",
                openNewTab: false,
              },
            ],
          },
          {
            text: "group 2",
            id: uuidv4(),
            subLinks: [
              {
                text: "sub link 1",
                link: "",
                id: uuidv4(),
                pageId: "",
                linkType: "internal",
                externalLink: "",
                openNewTab: false,
              },
              {
                text: "sub link 2",
                link: "",
                id: uuidv4(),
                pageId: "",
                linkType: "internal",
                externalLink: "",
                openNewTab: false,
              },
            ],
          },
          {
            text: "group 3",
            id: uuidv4(),
            subLinks: [
              {
                text: "sub link 1",
                link: "",
                id: uuidv4(),
                pageId: "",
                linkType: "internal",
                externalLink: "",
                openNewTab: false,
              },
              {
                text: "sub link 2",
                link: "",
                id: uuidv4(),
                pageId: "",
                linkType: "internal",
                externalLink: "",
                openNewTab: false,
              },
            ],
          },
        ],
        buttons: [
          {
            text: "button 1",
            link: "",
            id: uuidv4(),
            pageId: "",
            linkType: "internal",
            externalLink: "",
            openNewTab: false,
          },
          {
            text: "button 2",
            link: "",
            id: uuidv4(),
            pageId: "",
            linkType: "internal",
            externalLink: "",
            openNewTab: false,
          },
        ],
        social: [
          { id: uuidv4(), icon: SocialLinkIcons.LinkedIn, link: "" },
          { id: uuidv4(), icon: SocialLinkIcons.Twitter, link: "" },
          { id: uuidv4(), icon: SocialLinkIcons.Instagram, link: "" },
          { id: uuidv4(), icon: SocialLinkIcons.WhatsApp, link: "" },
        ],
        copyRight: {
          leftArea: "All rights reserved.",
          rightArea: "",
        },
      },
      style: {
        designName: "design1",
      },
    },
  ],
  storage: [
    {
      id: "",
      url: "",
      publicId: "",
    },
  ],
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
        draft.drawerOpen = true;
        draft.openPallet = false;
        draft.openPages = false;
        draft.openPageSetting = false;
        draft.openSectionDesigns = false;
        draft.chooseImage = false;
        draft.chooseBgImage = false;
        draft.selectedItemId = null;
        const page = state.editor.pages.find(
          (p) => p.pageId === action.payload.pageId
        );
        if (page) {
          draft.selectedSection =
            page.sections.find(
              (section) => section.id === action.payload.sectionId
            ) ||
            state.globalSections.find(
              (section) => section.id === action.payload.sectionId
            ) ||
            null;
        }
        break;
      }

      case types.UPDATE_SITE_SETTINGS: {
        draft.settings = action.payload;
        break;
      }

      case types.UPDATE_SELECTED_ITEM: {
        draft.chooseBgImage = false;
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
        draft.openHeaderOptions = false;
        draft.openLogoSettings = false;
        draft.selectedItemId = null;
        break;
      }

      case types.TOGGLE_SECTION_DESIGNS: {
        draft.openSectionDesigns = !draft.openSectionDesigns;
        draft.openPallet = false;
        draft.openPages = false;
        draft.openPageSetting = false;
        draft.openHeaderOptions = false;
        draft.openLogoSettings = false;
        draft.selectedItemId = null;
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
        draft.chooseIcon = false;
        draft.chooseImage = false;
        draft.chooseBgImage = false;
        draft.selectedSection = null;
        draft.openPages = false;
        draft.openPageSetting = false;
        draft.selectedItem = null;
        draft.openHeaderOptions = false;
        draft.openLogoSettings = false;
        draft.selectedItemId = null;
        break;
      }

      case types.CLOSE_SECTION_DESIGNS: {
        draft.openSectionDesigns = false;
        draft.openPallet = false;
        draft.openPages = false;
        draft.openPageSetting = false;
        draft.openHeaderOptions = false;
        draft.openLogoSettings = false;
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
        draft.chooseBgImage = false;
        draft.selectedSection = null;
        draft.openPages = false;
        draft.openPageSetting = false;
        draft.openHeaderOptions = false;
        draft.openLogoSettings = false;
        draft.selectedItemId = null;
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

      case types.OPEN_PAGES_TAB: {
        draft.openPages = true;
        draft.openPallet = false;
        draft.openSectionDesigns = false;
        draft.chooseIcon = false;
        draft.chooseImage = false;
        draft.chooseBgImage = false;
        draft.selectedSection = null;
        draft.openPageSetting = false;
        draft.openHeaderOptions = false;
        draft.openLogoSettings = false;
        draft.selectedItemId = null;
        break;
      }

      case types.CLOSE_PAGES_TAB: {
        draft.openPages = false;
        draft.openPallet = false;
        draft.openSectionDesigns = false;
        draft.chooseIcon = false;
        draft.chooseImage = false;
        draft.chooseBgImage = false;
        draft.openPageSetting = false;
        draft.openHeaderOptions = false;
        draft.openLogoSettings = false;
        draft.selectedItemId = null;

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
        draft.chooseBgImage = false;
        draft.selectedSection = null;
        draft.openHeaderOptions = false;
        draft.openLogoSettings = false;
        draft.selectedItemId = null;
        break;
      }

      case types.CLOSE_PAGE_SETTING: {
        draft.openPageSetting = false;
        draft.openPages = false;
        draft.openPallet = false;
        draft.openSectionDesigns = false;
        draft.chooseIcon = false;
        draft.chooseImage = false;
        draft.chooseBgImage = false;
        draft.selectedSection = null;
        draft.openHeaderOptions = false;
        draft.openLogoSettings = false;
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
        draft.chooseBgImage = false;
        draft.selectedSection = null;
        draft.openPageSetting = false;
        draft.openPages = true;
        draft.openHeaderOptions = false;
        draft.openLogoSettings = false;
        draft.selectedItemId = null;
        break;
      }

      case types.OPEN_CHOOSE_IMAGE: {
        draft.chooseImage = true;
        draft.chooseBgImage = false;
        break;
      }
      case types.OPEN_CHOOSE_BG_IMAGE: {
        draft.chooseBgImage = true;
        draft.chooseImage = false;
        break;
      }

      case types.CLOSE_CHOOSE_IMAGE: {
        draft.chooseImage = false;
        break;
      }

      case types.CLOSE_CHOOSE_BG_IMAGE: {
        draft.chooseBgImage = false;
        break;
      }

      case types.UPDATE_IS_DRAGGING_ITEM: {
        draft.dragItem = action.payload;
        break;
      }

      case types.UPDATE_IS_DRAGGING: {
        draft.isDragging = action.payload;
        break;
      }

      case types.UPDATE_IS_DRAGGABLE_MODAL: {
        draft.isDraggableModalActive = action.payload;
        break;
      }

      case types.SET_FLUID_CARD: {
        draft.fluidCard = action.payload;
        break;
      }

      case types.SET_DRAGGABLE_MODAL_NAME: {
        draft.draggableModalName = action.payload;
        break;
      }

      case types.UPDATE_GLOBAL_CONTENT: {
        const sectionToUpdateContent = draft.globalSections.find(
          (section) => section.id === action.payload.sectionId
        );
        if (sectionToUpdateContent) {
          Object.assign(
            sectionToUpdateContent.content,
            action.payload.newContent
          );
        }
        break;
      }
      case types.UPDATE_GLOBAL_STYLE: {
        const sectionToUpdateStyle = draft.globalSections.find(
          (section) => section.id === action.payload.sectionId
        );
        if (sectionToUpdateStyle) {
          Object.assign(sectionToUpdateStyle.style, action.payload.newStyle);
        }
        break;
      }

      case types.UPDATE_STORAGE: {
        draft.storage = action.payload;
        break;
      }

      case types.OPEN_HEADER_OPTIONS: {
        draft.selectedItemId = null;
        draft.openHeaderOptions = true;
        draft.openPageSetting = false;
        draft.openPages = false;
        break;
      }

      case types.CLOSE_HEADER_OPTIONS: {
        draft.openHeaderOptions = false;
        draft.openLogoSettings = false;
        break;
      }

      case types.OPEN_LOGO_SETTINGS: {
        draft.openLogoSettings = true;
        break;
      }

      case types.CLOSE_LOGO_SETTINGS: {
        draft.openLogoSettings = false;
        break;
      }

      case types.TOGGLE_PREVIEW_MODE: {
        draft.previewMode = !draft.previewMode;
        break;
      }
      case types.RESET_EDITOR_STATE: {
        // Completely reset the state to the initial state
        return initialState;
      }

      case types.UPDATE_SAVING_STATUS: {
        draft.isSaving = action.payload;
        break;
      }

      case types.UPDATE_IS_GENERATING: {
        draft.isGenerating = action.payload;
        break;
      }

      case types.COPY_SECTION: {
        draft.copiedSection = action.payload;
        break;
      }

      case types.UPDATE_SELECTED_ITEM_ID: {
        draft.selectedItemId = action.payload;
        break;
      }

      case types.OPEN_DRAWER: {
        draft.drawerOpen = true;
        break;
      }
      case types.CLOSE_DRAWER: {
        draft.drawerOpen = false;
        break;
      }

      default:
        return state;
    }
  });

export default editorReducer;
