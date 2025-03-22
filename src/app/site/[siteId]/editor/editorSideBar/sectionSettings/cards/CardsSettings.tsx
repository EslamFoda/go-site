import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Trash2 } from "lucide-react";
import EditText from "../settingsUi/EditText";
import { Card } from "@/types/sectionsTypes/cards";
import CardContentTab from "./cardContentTab";
import CardsStyleTab from "./cardsStyleTab";
import ColorSelector from "../settingsUi/ColorSelector";
import { JustifyCenter, JustifyEnd, JustifyStart } from "@/icons/common";
import {
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
  Storage,
} from "@/reduxStore/types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  openChooseBgImage,
  openChooseImage,
  updateContent,
  updateSelectedItem,
  updateStyle,
} from "@/reduxStore/action";
import BackBtn from "@/components/shared/backBtn";
import ImageSelector from "@/components/shared/imageSelector";
import ChooseImage from "../gallery/chooseImage";
import { UnsplashImage } from "@/types/common";
import SpacingTab from "@/components/shared/spacingTab";
import ToggleGroup from "../settingsUi/toggleGroup";
import SwitchSetting from "../settingsUi/SwitchSetting";
import { Input } from "@/components/ui/input";
import validator from "validator";
import { Switch } from "@/components/ui/switch";
import LinkSelector from "../settingsUi/LinkSelector";

interface CardsSettingsProps {
  sections:
    | EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>[]
    | undefined;
  pageId: string;
}
function CardsSettings({ pageId, sections }: CardsSettingsProps) {
  const [tabValue, setTabValue] = useState("content");
  const [sectionBgOpened, setSectionBgOpened] = useState(false);
  const [openSpacingTab, setOpenSpacingTab] = useState(false);

  const dispatch = useAppDispatch();

  const { selectedItem, chooseImage, selectedSection, chooseBgImage, editor } =
    useAppSelector((state) => state.editor.present);
  const { pages } = editor;
  const findSelectedSection = sections?.find(
    (section) => section.id === selectedSection?.id
  ) as EditorSection<keyof SectionContentTypes, keyof SectionStyleTypes>;

  const cardsContent =
    findSelectedSection?.content as SectionContentTypes["cards"];
  const cardStyle = findSelectedSection?.style as SectionStyleTypes["cards"];
  const cardItem = selectedItem as Card;

  const handleDeleteCard = () => {
    const filterCards = cardsContent?.cards?.filter(
      (card) => card.id !== cardItem?.id
    );
    dispatch(
      updateContent(pageId, findSelectedSection.id, { cards: filterCards })
    );
    dispatch(updateSelectedItem(null));
    if (cardsContent.cards.length <= 5) {
      dispatch(
        updateStyle(pageId, findSelectedSection?.id!, {
          designSettings: {
            ...cardStyle.designSettings,
            displayType: "grid",
          },
        })
      );
    }
  };

  const handleUpdateCardItem = (updates: Partial<Card>) => {
    const updatedCards = cardsContent.cards.map((card) =>
      card.id === cardItem.id ? { ...card, ...updates } : card
    );
    dispatch(updateSelectedItem({ ...cardItem, ...updates }));
    dispatch(
      updateContent(pageId, findSelectedSection.id, { cards: updatedCards })
    );
  };

  if (openSpacingTab) {
    return (
      <SpacingTab
        sectionType="cards"
        pageId={pageId}
        findSelectedSection={findSelectedSection}
        sectionStyle={cardStyle}
        setOpenSpacingTab={setOpenSpacingTab}
        showPadding
      />
    );
  }

  if (chooseBgImage) {
    return (
      <ChooseImage
        mediaType="background-image"
        selectedImgId={
          cardStyle?.designSettings.sectionBackground.media.imageId || ""
        }
        handleUpdateUnsplash={(image: UnsplashImage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...cardStyle.designSettings,
                sectionBackground: {
                  ...cardStyle.designSettings.sectionBackground,
                  media: {
                    imageUrl: image.urls.regular,
                    imageId: image.id,
                  },
                },
              },
            })
          );
        }}
        handleUpdateUploadedImg={(image: Storage) => {
          dispatch(
            updateStyle(pageId, findSelectedSection.id, {
              designSettings: {
                ...cardStyle.designSettings,
                sectionBackground: {
                  ...cardStyle.designSettings.sectionBackground,
                  media: {
                    imageUrl: image.url,
                    imageId: image.id,
                  },
                },
              },
            })
          );
        }}
      />
    );
  }

  if (chooseImage) {
    return (
      <ChooseImage
        mediaType="image"
        selectedImgId={cardItem?.imgId || ""}
        handleUpdateUnsplash={(image: UnsplashImage) => {
          handleUpdateCardItem({
            image: image.urls.regular,
            imgId: image.id,
          });
        }}
        handleUpdateUploadedImg={(image: Storage) => {
          handleUpdateCardItem({
            image: image.url,
            imgId: image.id,
          });
        }}
      />
    );
  }

  if (cardItem)
    return (
      <div className="space-y-2">
        <div
          className="flex justify-between p-5 items-center gap-4  border-b-[1px] border-b-muted-bg mb-3"
          onClick={() => {
            dispatch(updateSelectedItem(null));
          }}
        >
          <div className="flex gap-4 items-center cursor-pointer">
            <ChevronLeft size={18} />
            <Label className="cursor-pointer">{cardItem.title}</Label>
          </div>
          <div className="cursor-pointer" onClick={handleDeleteCard}>
            <Trash2 size="18px" color="red" />
          </div>
        </div>
        <div className="px-5 space-y-2">
          <EditText
            label="Title"
            placeholder="Add card title"
            inputType="textArea"
            value={cardItem.title}
            id={cardItem.id}
            handleUpdate={(e: any) =>
              handleUpdateCardItem({ title: e.target.value })
            }
          />
          <EditText
            id={cardItem.id}
            inputType="textArea"
            placeholder="Add card description"
            label="Text"
            value={cardItem.text}
            handleUpdate={(e: any) =>
              handleUpdateCardItem({
                text: e.target.value,
              })
            }
          />
          <ImageSelector
            imageUrl={cardItem.image}
            onImageSelect={() => dispatch(openChooseImage())}
            onImageDelete={() => handleUpdateCardItem({ image: "", imgId: "" })}
            onBack={() => dispatch(updateSelectedItem(null))}
            showBackButton={false}
          />

          <EditText
            id={cardItem.id}
            inputType="text"
            placeholder="Button text"
            label="Button"
            value={cardItem.button}
            handleUpdate={(e: any) =>
              handleUpdateCardItem({
                button: e.target.value,
              })
            }
          />

          <ToggleGroup
            label="Link Type"
            options={[
              { value: "internal", label: "Internal" },
              { value: "external", label: "External" },
            ]}
            value={cardItem.linkType}
            onValueChange={(value) => {
              handleUpdateCardItem({ linkType: value });
            }}
          />
          {cardItem.linkType === "internal" && (
            <LinkSelector
              label="Link"
              links={pages.map((page) => ({
                id: page.pageId,
                link: page.pageSettings.link,
              }))}
              selectedLink={cardItem.link}
              onSelect={(link) => {
                const findPageWithLink = pages.find(
                  (page) => page.pageSettings.link === link.slice(1)
                );
                handleUpdateCardItem({
                  link: link,
                  pageId: findPageWithLink?.pageId || "",
                });
              }}
            />
          )}

          {cardItem.linkType === "external" && (
            <div className="flex items-center justify-between space-y-1">
              <Label htmlFor="Link">Link</Label>
              <div className="w-4/6 border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
                <div className="flex items-center">
                  <Input
                    value={cardItem.externalLink}
                    className="flex-1 border-none outline-none"
                    placeholder="Paste link"
                    onChange={(e) => {
                      handleUpdateCardItem({ externalLink: e.target.value });
                    }}
                  />
                </div>

                {validator.isURL(cardItem.externalLink) && (
                  <div className="flex h-10 items-center justify-between px-3 py-2">
                    <span>Open in new tab</span>
                    <Switch
                      defaultChecked={cardItem.openNewTab}
                      checked={cardItem.openNewTab}
                      onCheckedChange={(value) => {
                        handleUpdateCardItem({ openNewTab: value });
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );

  if (sectionBgOpened)
    return (
      <div className="space-y-2">
        <BackBtn
          label="Section Background"
          handleBack={() => setSectionBgOpened(false)}
        />
        <div className="px-5 space-y-2">
          <ColorSelector
            selectedColor={cardStyle.designSettings.sectionBackground.color}
            handleChangeColor={(color) => {
              if (color === "none") {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...cardStyle.designSettings!,
                      sectionBackground: {
                        ...cardStyle.designSettings.sectionBackground,
                        color,
                        width: "fill",
                      },
                    },
                  })
                );
              } else {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...cardStyle.designSettings!,
                      background: true,
                      border: false,
                      sectionBackground: {
                        ...cardStyle.designSettings.sectionBackground,
                        color,
                      },
                    },
                  })
                );
              }
            }}
          />
          <ImageSelector
            imageUrl={cardStyle.designSettings.sectionBackground.media.imageUrl}
            onImageSelect={() => dispatch(openChooseBgImage())}
            onImageDelete={() =>
              dispatch(
                updateStyle(pageId, findSelectedSection?.id, {
                  designSettings: {
                    ...cardStyle.designSettings,
                    sectionBackground: {
                      ...cardStyle.designSettings.sectionBackground,
                      media: {
                        imageUrl: "",
                        imageId: "",
                      },
                      textColor: "light",
                    },
                  },
                })
              )
            }
            onBack={() => {}}
            showBackButton={false}
          />
          {cardStyle?.designSettings.sectionBackground.media.imageUrl && (
            <ToggleGroup
              label="Text"
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={cardStyle?.designSettings.sectionBackground.textColor}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...cardStyle.designSettings!,
                      sectionBackground: {
                        ...cardStyle.designSettings.sectionBackground,
                        textColor: value,
                      },
                    },
                  })
                );
              }}
            />
          )}

          <ToggleGroup
            label="Height"
            options={[
              { value: "fill", label: "Fill" },
              { value: "fit", label: "Fit" },
            ]}
            value={cardStyle.designSettings.sectionBackground.height}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings!,
                    sectionBackground: {
                      ...cardStyle.designSettings.sectionBackground,
                      height: value,
                      align: "center",
                    },
                  },
                })
              );
            }}
          />
          <ToggleGroup
            label="Width"
            options={[
              { value: "fill", label: "Fill" },
              { value: "fit", label: "Fit" },
            ]}
            value={cardStyle.designSettings.sectionBackground.width}
            onValueChange={(value) => {
              dispatch(
                updateStyle(pageId, findSelectedSection?.id!, {
                  designSettings: {
                    ...cardStyle.designSettings!,
                    sectionBackground: {
                      ...cardStyle.designSettings.sectionBackground,
                      width: value,
                    },
                  },
                })
              );
            }}
          />
          {cardStyle.designSettings.sectionBackground.overlay && (
            <ToggleGroup
              label="Overlay"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={cardStyle.designSettings.sectionBackground.overlayEffect}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...cardStyle.designSettings!,
                      sectionBackground: {
                        ...cardStyle.designSettings.sectionBackground,
                        overlayEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {cardStyle.designSettings.sectionBackground.blur && (
            <ToggleGroup
              label="Blur"
              options={[
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
              ]}
              value={cardStyle.designSettings.sectionBackground.blurEffect}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...cardStyle.designSettings!,
                      sectionBackground: {
                        ...cardStyle.designSettings.sectionBackground,
                        blurEffect: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {cardStyle.designSettings.sectionBackground.height === "fill" && (
            <ToggleGroup
              label="Align"
              options={[
                { value: "start", label: <JustifyStart /> },
                { value: "center", label: <JustifyCenter /> },
                { value: "end", label: <JustifyEnd /> },
              ]}
              value={cardStyle.designSettings.sectionBackground.align}
              onValueChange={(value) => {
                dispatch(
                  updateStyle(pageId, findSelectedSection?.id!, {
                    designSettings: {
                      ...cardStyle.designSettings!,
                      sectionBackground: {
                        ...cardStyle.designSettings.sectionBackground,
                        align: value,
                      },
                    },
                  })
                );
              }}
            />
          )}
          {cardStyle.designSettings.sectionBackground.media.imageUrl && (
            <div className="border-muted-bg border-solid border-[1px] rounded-sm divide-y-[1px] divide-muted-bg">
              {cardStyle.designSettings.sectionBackground.color !== "none" && (
                <SwitchSetting
                  label="Overlay"
                  defaultChecked={
                    cardStyle.designSettings.sectionBackground.overlay
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...cardStyle.designSettings!,
                          sectionBackground: {
                            ...cardStyle.designSettings.sectionBackground,
                            overlay: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              {!cardStyle.designSettings.sectionBackground.parallax && (
                <SwitchSetting
                  label="Blur"
                  defaultChecked={
                    cardStyle.designSettings.sectionBackground.blur
                  }
                  onCheckedChange={(value) => {
                    dispatch(
                      updateStyle(pageId, findSelectedSection?.id!, {
                        designSettings: {
                          ...cardStyle.designSettings!,
                          sectionBackground: {
                            ...cardStyle.designSettings.sectionBackground,
                            blur: value,
                          },
                        },
                      })
                    );
                  }}
                />
              )}
              <SwitchSetting
                label="Greyscale"
                defaultChecked={
                  cardStyle.designSettings.sectionBackground.greyScale
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...cardStyle.designSettings!,
                        sectionBackground: {
                          ...cardStyle.designSettings.sectionBackground,
                          greyScale: value,
                        },
                      },
                    })
                  );
                }}
              />
              <SwitchSetting
                label="Parallax"
                defaultChecked={
                  cardStyle.designSettings.sectionBackground.parallax
                }
                onCheckedChange={(value) => {
                  dispatch(
                    updateStyle(pageId, findSelectedSection?.id!, {
                      designSettings: {
                        ...cardStyle.designSettings!,
                        sectionBackground: {
                          ...cardStyle.designSettings.sectionBackground,
                          parallax: value,
                          blur: false,
                          blurEffect: "s",
                        },
                      },
                    })
                  );
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  return (
    <div>
      <Tabs onValueChange={setTabValue} value={tabValue} className="w-full">
        <TabsList className="grid m-5 grid-cols-2">
          <TabsTrigger value="content">content</TabsTrigger>
          <TabsTrigger value="style">style</TabsTrigger>
        </TabsList>
        <CardContentTab
          pageId={pageId}
          cardsContent={cardsContent}
          cardStyle={cardStyle}
          findSelectedSection={findSelectedSection}
          items={cardsContent?.cards}
        />
        <CardsStyleTab
          pageId={pageId}
          cardStyle={cardStyle}
          cardsContent={cardsContent}
          findSelectedSection={findSelectedSection}
          setSectionBgOpened={setSectionBgOpened}
          setOpenSpacingTab={setOpenSpacingTab}
        />
      </Tabs>
    </div>
  );
}

export default CardsSettings;
