import { useAppSelector } from "@/reduxStore/hooks";
import { ChevronRight, Plus } from "lucide-react";
import React from "react";
import PageItem from "./pageItem";
import BackBtn from "@/components/shared/backBtn";
import { AboutDark } from "@/icons/pages";
import { v4 } from "uuid";
import Banner from "../../designs/banner";
import Cards from "../../designs/cards";
import List from "../../designs/list";
import Accordion from "../../designs/accordion";
import Testimonials from "../../designs/testimonials";
type SelectedPageTypes = "about" | "landing" | "";
function Pages() {
  const pages = useAppSelector((state) => state.editor.editor.pages);
  const [addPage, setAddPage] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState<SelectedPageTypes>("");

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
        ],
      },
    ],
  };

  const testPageData = pageMapper[selectedPage as keyof typeof pageMapper];

  const sectionsMapper: { [key: string]: React.ComponentType<any> } = {
    Banner,
    Cards,
    List,
    Accordion,
    Testimonials,
  };

  if (selectedPage)
    return (
      <div>
        <BackBtn label={selectedPage} handleBack={() => setSelectedPage("")} />
        <div>
          {testPageData.map((page, index) => {
            return (
              <div className="w-full h-52 overflow-hidden" key={index}>
                {/* Wrap your sections in a scrollable container */}
                <div
                  className="w-screen h-[70vh] scale-[0.2] overflow-y-auto"
                  style={{
                    transformOrigin: "0 0",
                    aspectRatio: "339 / 200",
                  }}
                >
                  {page.sections.map((section) => {
                    const SectionComponent =
                      sectionsMapper[section.sectionName];
                    return (
                      <div key={section.id}>
                        <div>
                          <SectionComponent section={section} pageId={""} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

  if (addPage)
    return (
      <div>
        <BackBtn label="Add Page" handleBack={() => setAddPage(false)} />
        <div className="px-5">
          <div
            className="flex justify-between items-center bg-muted p-[10px] cursor-pointer rounded-sm hover:bg-muted-foreground/65 group"
            onClick={() => {
              setSelectedPage("about");
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-1 bg-background">{<AboutDark />}</div>
              <div className="flex flex-col">
                <span className="text-xs font-medium">{"about"}</span>
                <span className="text-[11px] text-muted-foreground group-hover:text-textColor">
                  {"Attract and engage with visitors"}
                </span>
              </div>
            </div>
            <div>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="px-5 space-y-2 py-5">
      <div
        className="w-full flex items-center h-10 rounded-sm px-2 gap-2 cursor-pointer bg-secondary-foreground text-background"
        onClick={() => setAddPage(true)}
      >
        <Plus size={16} />
        <span>New Page</span>
      </div>
      {pages.map((page) => (
        <PageItem page={page} />
      ))}
    </div>
  );
}

export default Pages;
