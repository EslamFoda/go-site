import Accordion from "@/app/editor/designs/accordion";
import Banner from "@/app/editor/designs/banner";
import Cards from "@/app/editor/designs/cards";
import List from "@/app/editor/designs/list";
import Testimonials from "@/app/editor/designs/testimonials";
import BackBtn from "@/components/shared/backBtn";
import { addNewPage } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { EditorPage } from "@/reduxStore/types";
import { PageTypes } from "@/types/common";
import React from "react";
import { v4 } from "uuid";
interface PageTypeProps {
  pageType: PageTypes;
  setPageType: React.Dispatch<React.SetStateAction<PageTypes>>;
  setAddPage: React.Dispatch<React.SetStateAction<boolean>>;
}
function PageType({ pageType, setPageType, setAddPage }: PageTypeProps) {
  const dispatch = useAppDispatch();
  const pageMapper = {
    about: [
      {
        sections: [
          {
            id: v4(),
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
                titleSize: "xl",
                align: "center",
                subtitleWidth: "50%",
                height: "460px",
                video: true,
                leftTitlePosition: true,
                leftTitleWidth: "50%",
                showButtons: true,
                sectionBackground: {
                  color: "gray",
                  media: "",
                  height: "fit",
                  width: "100%",
                  spacing: "xl",
                },
                imageSetting: {
                  objectFit: "cover",
                  backgroundColor: "primary",
                  showImage: true,
                },
              },
            },
          },
          {
            id: v4(),
            sectionName: "Cards",
            content: {
              label: "",
              title: "Heading",
              subtitle: "",
              cards: [
                {
                  id: v4(),
                  title: "Card 1",
                  text: "card 1 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
                {
                  id: v4(),
                  title: "Card 2",
                  text: "card 2 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
                {
                  id: v4(),
                  title: "Card 3",
                  text: "card 3 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
              ],
            },
            style: {
              designName: "design1",
              designSettings: {
                layout: "top",
                layoutV2: "bottom",
                grid: {
                  desktop: 3,
                  mobile: 1,
                },
                height: {
                  desktop: 300,
                  mobile: 300,
                },
                titleSize: "m",
                align: "start",
                image: true,
                cardBackground: true,
                cardBorder: false,
                leftTitlePosition: false,
                displayType: "grid",
                cardSlider: {
                  desktopWidth: 300,
                  mobileWidth: 300,
                  autoScroll: false,
                  scrollSpeed: 2,
                },
                button: true,
                sectionBackground: {
                  color: "none",
                  media: "",
                  height: "fit",
                  spacing: "l",
                },
              },
            },
          },
          {
            id: v4(),
            sectionName: "Testimonials",
            content: {
              label: "",
              title: "Testimonials",
              subtitle: "",
              iconType: "star",
              testimonials: [
                {
                  id: v4(),
                  review:
                    "Add a customer review that describes their experience with your product/service",
                  name: "John Doe",
                  bio: "@johnDoe",
                  rating: 4,
                  avatar: "",
                  link: "",
                },
                {
                  id: v4(),
                  review:
                    "Add a customer review that describes their experience with your product/service",
                  name: "John Doe",
                  bio: "@johnDoe",
                  rating: 4,
                  avatar: "",
                  link: "",
                },
                {
                  id: v4(),
                  review:
                    "Add a customer review that describes their experience with your product/service",
                  name: "John Doe",
                  bio: "@johnDoe",
                  rating: 4,
                  avatar: "",
                  link: "",
                },
              ],
            },
            style: {
              designName: "design1",
              designSettings: {
                textSize: "m",
                displayType: "grid",
                grid: {
                  desktop: 3,
                  mobile: 1,
                },
                shape: "square",
                align: "start",
                background: true,
                border: false,
                avatar: true,
                rating: true,
                leftTitlePosition: false,
                carouselSettings: {
                  desktopWidth: 350,
                  mobileWidth: 300,
                  autoScroll: false,
                  scrollSpeed: 2,
                },
                sectionBackground: {
                  color: "none",
                  media: "",
                  height: "fit",
                  spacing: "l",
                },
              },
            },
          },
        ],
      },
      {
        sections: [
          {
            id: v4(),
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
              designName: "design2",
              designSettings: {
                titleSize: "xl",
                align: "center",
                subtitleWidth: "50%",
                height: "460px",
                video: true,
                leftTitlePosition: true,
                leftTitleWidth: "50%",
                showButtons: true,
                sectionBackground: {
                  color: "none",
                  media: "",
                  height: "fit",
                  width: "100%",
                  spacing: "xl",
                },
                imageSetting: {
                  objectFit: "cover",
                  backgroundColor: "primary",
                  showImage: true,
                },
              },
            },
          },
          {
            id: v4(),
            sectionName: "Accordion",
            content: {
              label: "",
              title: "Heading",
              subtitle: "",
              accordions: [
                {
                  id: v4(),
                  title: "Accordion 1",
                  text: "Add text here",
                },
                {
                  id: v4(),
                  title: "Accordion 2",
                  text: "Add text here",
                },
                {
                  id: v4(),
                  title: "Accordion 3",
                  text: "Add text here",
                },
              ],
            },
            style: {
              designName: "design1",
              designSettings: {
                icon: "arrow",
                align: "start",
                background: true,
                border: false,
                leftTitlePosition: false,
                sectionBackground: {
                  color: "none",
                  media: "",
                  height: "fit",
                  spacing: "l",
                },
              },
            },
          },
          {
            id: v4(),
            sectionName: "Cards",
            content: {
              label: "",
              title: "Heading",
              subtitle: "",
              cards: [
                {
                  id: v4(),
                  title: "Card 1",
                  text: "card 1 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
                {
                  id: v4(),
                  title: "Card 2",
                  text: "card 2 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
                {
                  id: v4(),
                  title: "Card 3",
                  text: "card 3 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
              ],
            },
            style: {
              designName: "design1",
              designSettings: {
                layout: "top",
                layoutV2: "bottom",
                grid: {
                  desktop: 3,
                  mobile: 1,
                },
                height: {
                  desktop: 300,
                  mobile: 300,
                },
                titleSize: "m",
                align: "start",
                image: true,
                cardBackground: true,
                cardBorder: false,
                leftTitlePosition: false,
                displayType: "grid",
                cardSlider: {
                  desktopWidth: 300,
                  mobileWidth: 300,
                  autoScroll: false,
                  scrollSpeed: 2,
                },
                button: true,
                sectionBackground: {
                  color: "none",
                  media: "",
                  height: "fit",
                  spacing: "l",
                },
              },
            },
          },
        ],
      },
    ],
    landing: [
      {
        sections: [
          {
            id: v4(),
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
              designName: "design2",
              designSettings: {
                titleSize: "xl",
                align: "center",
                subtitleWidth: "50%",
                height: "460px",
                video: true,
                leftTitlePosition: true,
                leftTitleWidth: "50%",
                showButtons: true,
                sectionBackground: {
                  color: "none",
                  media: "",
                  height: "fit",
                  width: "100%",
                  spacing: "xl",
                },
                imageSetting: {
                  objectFit: "cover",
                  backgroundColor: "primary",
                  showImage: true,
                },
              },
            },
          },
          {
            id: v4(),
            sectionName: "Accordion",
            content: {
              label: "",
              title: "Heading",
              subtitle: "",
              accordions: [
                {
                  id: v4(),
                  title: "Accordion 1",
                  text: "Add text here",
                },
                {
                  id: v4(),
                  title: "Accordion 2",
                  text: "Add text here",
                },
                {
                  id: v4(),
                  title: "Accordion 3",
                  text: "Add text here",
                },
              ],
            },
            style: {
              designName: "design1",
              designSettings: {
                icon: "arrow",
                align: "start",
                background: true,
                border: false,
                leftTitlePosition: false,
                sectionBackground: {
                  color: "none",
                  media: "",
                  height: "fit",
                  spacing: "l",
                },
              },
            },
          },
          {
            id: v4(),
            sectionName: "Cards",
            content: {
              label: "",
              title: "Heading",
              subtitle: "",
              cards: [
                {
                  id: v4(),
                  title: "Card 1",
                  text: "card 1 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
                {
                  id: v4(),
                  title: "Card 2",
                  text: "card 2 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
                {
                  id: v4(),
                  title: "Card 3",
                  text: "card 3 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
              ],
            },
            style: {
              designName: "design1",
              designSettings: {
                layout: "top",
                layoutV2: "bottom",
                grid: {
                  desktop: 3,
                  mobile: 1,
                },
                height: {
                  desktop: 300,
                  mobile: 300,
                },
                titleSize: "m",
                align: "start",
                image: true,
                cardBackground: true,
                cardBorder: false,
                leftTitlePosition: false,
                displayType: "grid",
                cardSlider: {
                  desktopWidth: 300,
                  mobileWidth: 300,
                  autoScroll: false,
                  scrollSpeed: 2,
                },
                button: true,
                sectionBackground: {
                  color: "none",
                  media: "",
                  height: "fit",
                  spacing: "l",
                },
              },
            },
          },
        ],
      },
      {
        sections: [
          {
            id: v4(),
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
                titleSize: "xl",
                align: "center",
                subtitleWidth: "50%",
                height: "460px",
                video: true,
                leftTitlePosition: true,
                leftTitleWidth: "50%",
                showButtons: true,
                sectionBackground: {
                  color: "gray",
                  media: "",
                  height: "fit",
                  width: "100%",
                  spacing: "xl",
                },
                imageSetting: {
                  objectFit: "cover",
                  backgroundColor: "primary",
                  showImage: true,
                },
              },
            },
          },
          {
            id: v4(),
            sectionName: "Cards",
            content: {
              label: "",
              title: "Heading",
              subtitle: "",
              cards: [
                {
                  id: v4(),
                  title: "Card 1",
                  text: "card 1 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
                {
                  id: v4(),
                  title: "Card 2",
                  text: "card 2 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
                {
                  id: v4(),
                  title: "Card 3",
                  text: "card 3 text",
                  image: "",
                  button: "",
                  buttonColor: "gray" || "primary",
                  link: "",
                },
              ],
            },
            style: {
              designName: "design1",
              designSettings: {
                layout: "top",
                layoutV2: "bottom",
                grid: {
                  desktop: 3,
                  mobile: 1,
                },
                height: {
                  desktop: 300,
                  mobile: 300,
                },
                titleSize: "m",
                align: "start",
                image: true,
                cardBackground: true,
                cardBorder: false,
                leftTitlePosition: false,
                displayType: "grid",
                cardSlider: {
                  desktopWidth: 300,
                  mobileWidth: 300,
                  autoScroll: false,
                  scrollSpeed: 2,
                },
                button: true,
                sectionBackground: {
                  color: "none",
                  media: "",
                  height: "fit",
                  spacing: "l",
                },
              },
            },
          },
          {
            id: v4(),
            sectionName: "Testimonials",
            content: {
              label: "",
              title: "Testimonials",
              subtitle: "",
              iconType: "star",
              testimonials: [
                {
                  id: v4(),
                  review:
                    "Add a customer review that describes their experience with your product/service",
                  name: "John Doe",
                  bio: "@johnDoe",
                  rating: 4,
                  avatar: "",
                  link: "",
                },
                {
                  id: v4(),
                  review:
                    "Add a customer review that describes their experience with your product/service",
                  name: "John Doe",
                  bio: "@johnDoe",
                  rating: 4,
                  avatar: "",
                  link: "",
                },
                {
                  id: v4(),
                  review:
                    "Add a customer review that describes their experience with your product/service",
                  name: "John Doe",
                  bio: "@johnDoe",
                  rating: 4,
                  avatar: "",
                  link: "",
                },
              ],
            },
            style: {
              designName: "design1",
              designSettings: {
                textSize: "m",
                displayType: "grid",
                grid: {
                  desktop: 3,
                  mobile: 1,
                },
                shape: "square",
                align: "start",
                background: true,
                border: false,
                avatar: true,
                rating: true,
                leftTitlePosition: false,
                carouselSettings: {
                  desktopWidth: 350,
                  mobileWidth: 300,
                  autoScroll: false,
                  scrollSpeed: 2,
                },
                sectionBackground: {
                  color: "none",
                  media: "",
                  height: "fit",
                  spacing: "l",
                },
              },
            },
          },
        ],
      },
    ],
  };
  const testPageData = pageMapper[pageType as keyof typeof pageMapper];
  const sectionsMapper: { [key: string]: React.ComponentType<any> } = {
    Banner,
    Cards,
    List,
    Accordion,
    Testimonials,
  };
  const { selectedPallet, editor } = useAppSelector((state) => state.editor);
  const { pages } = editor;
  const generateUniqueLink = (baseLink: string) => {
    const matchingPages = pages.filter((page) =>
      page.pageSettings.link.startsWith(baseLink)
    );
    if (matchingPages.length === 0) return baseLink;

    const numbers = matchingPages.map((page) => {
      const match = page.pageSettings.link.match(
        new RegExp(`${baseLink}-(\\d+)$`)
      );
      return match ? parseInt(match[1], 10) : 0;
    });

    const maxNumber = Math.max(0, ...numbers);
    return `${baseLink}-${maxNumber + 1}`;
  };
  return (
    <div>
      <BackBtn label={pageType} handleBack={() => setPageType("")} />
      <div className="space-y-7 p-5">
        {testPageData.map((page, index) => {
          return (
            <div key={index} className="bg-muted p-2 rounded-sm">
              <div className="w-full h-52 overflow-hidden relative">
                <div
                  className="overflow-y-auto"
                  style={{
                    transformOrigin: "0 0",
                    transform: "scale(0.2)",
                    width: "calc(100% / 0.2)", // Adjust the width based on the scale factor
                    aspectRatio: "2 / 1",
                    height: "calc(100% / 0.2)",
                  }}
                >
                  {page.sections.map((section) => {
                    const SectionComponent =
                      sectionsMapper[section.sectionName];
                    return (
                      <div
                        key={section.id}
                        className={`${selectedPallet} page-container`}
                      >
                        <div>
                          <SectionComponent section={section} pageId={""} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className="bg-secondary-foreground text-background rounded-sm p-1 flex items-center justify-center cursor-pointer hover:bg-secondary-foreground/80"
                onClick={() => {
                  const newPageLink = generateUniqueLink(pageType);
                  const newPage = {
                    pageId: v4(),
                    ...page,
                    pageSettings: {
                      coverImage: "",
                      description: "",
                      isPublished: true,
                      isVisibleInSearch: true,
                      link: newPageLink,
                      pagePasswordButton: "Continue",
                      seoTitle: "",
                      showFooter: true,
                      showHeader: true,
                      title: pageType,
                      userEditedSlug: false,
                    },
                  } as EditorPage;
                  dispatch(addNewPage(newPage));
                  setPageType("");
                  setAddPage(false);
                }}
              >
                <span className="text-sm">Add Page</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PageType;
