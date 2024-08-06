// reducer.ts

import { produce } from "immer";
import * as types from "./actionTypes";
import { EditorStore } from "./types";

const initialState: EditorStore = {
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
    borderRadius: "",
  },
};

const editorReducer = (state = initialState, action: any): EditorStore =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.UPDATE_SELECTED_SECTION:
        draft.openPallet = false;
        draft.selectedSection =
          draft.editor.sections.find(
            (section) => section.id === action.payload
          ) || null;
        break;

      case types.UPDATE_SELECTED_ITEM:
        draft.selectedItem = action.payload;
        break;

      case types.UPDATE_CONTENT:
        const sectionToUpdateContent = draft.editor.sections.find(
          (section) => section.id === action.payload.sectionId
        );
        if (sectionToUpdateContent) {
          Object.assign(
            sectionToUpdateContent.content,
            action.payload.newContent
          );
        }
        break;

      case types.UPDATE_STYLE:
        const sectionToUpdateStyle = draft.editor.sections.find(
          (section) => section.id === action.payload.sectionId
        );
        if (sectionToUpdateStyle) {
          Object.assign(sectionToUpdateStyle.style, action.payload.newStyle);
        }
        break;

      case types.UPDATE_SELECTED_PALLET:
        draft.selectedPallet = action.payload;
        break;

      case types.TOGGLE_PALLET:
        draft.openPallet = !draft.openPallet;
        draft.openSectionDesigns = false;
        draft.selectedSection = null;
        break;

      case types.TOGGLE_SECTION_DESIGNS:
        draft.openSectionDesigns = !draft.openSectionDesigns;
        draft.openPallet = false;
        break;

      case types.TOGGLE_CHOOSE_ICON:
        draft.chooseIcon = !draft.chooseIcon;
        break;

      case types.UPDATE_EDITOR_SECTIONS:
        draft.editor.sections = action.payload;
        break;

      case types.UPDATE_SECTION_INDEX:
        draft.sectionIndex = action.payload;
        break;

      case types.OPEN_SECTION_DESIGNS:
        draft.openSectionDesigns = true;
        draft.openPallet = false;
        break;

      case types.CLOSE_SECTION_DESIGNS:
        draft.openSectionDesigns = false;
        draft.openPallet = false;
        break;

      case types.CLOSE_CHOOSE_ICON:
        draft.chooseIcon = false;
        break;

      case types.OPEN_CHOOSE_ICON:
        draft.chooseIcon = true;
        break;

      case types.OPEN_PALLET:
        draft.openPallet = true;
        draft.openSectionDesigns = false;
        draft.chooseIcon = false;
        draft.selectedSection = null;
        break;

      case types.CLOSE_PALLET:
        draft.openPallet = false;
        break;

      case types.UPDATE_DESIGN_SETTINGS:
        draft.designSettings = {
          ...draft.designSettings,
          ...action.payload,
        };
        break;
    }
  });

export default editorReducer;
