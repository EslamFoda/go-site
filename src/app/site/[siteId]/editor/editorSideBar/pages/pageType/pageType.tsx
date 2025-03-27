import BackBtn from "@/components/shared/backBtn";
import { addNewPage } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { EditorPage } from "@/reduxStore/types";
import { PageTypes } from "@/types/common";
import React from "react";
import { v4 } from "uuid";
import Banner from "../../../designs/banner";
import Cards from "../../../designs/cards";
import List from "../../../designs/list";
import Accordion from "../../../designs/accordion";
import Testimonials from "../../../designs/testimonials";
import { createClient } from "@/utlis/supabase/client";
import { useRouter } from "next/navigation";
import Pricing from "../../../designs/pricing";
import Logos from "../../../designs/logos";
import Gallery from "../../../designs/gallery";
import { about } from "./pagesConstant/about";
import { landing } from "./pagesConstant/landing";
import { services } from "./pagesConstant/services";
import { portfolio } from "./pagesConstant/portfolio";
import { pricing } from "./pagesConstant/pricing";
import { contact } from "./pagesConstant/contact";
import { getCSSVariableValueByClassName } from "@/helper";

interface PageTypeProps {
  pageType: PageTypes;
  setPageType: React.Dispatch<React.SetStateAction<PageTypes>>;
  setAddPage: React.Dispatch<React.SetStateAction<boolean>>;
}
function PageType({ pageType, setPageType, setAddPage }: PageTypeProps) {
  const dispatch = useAppDispatch();
  const { selectedPallet, editor, settings } = useAppSelector(
    (state) => state.editor.present
  );
  const primaryColor = getCSSVariableValueByClassName(
    "page-container",
    "--primary"
  );
  const maxWidth = getCSSVariableValueByClassName(
    "page-container",
    "--container-max-width"
  );
  const { pages } = editor;
  const siteId = settings.siteId;
  const router = useRouter();

  const pageMapper = {
    about: about,
    landing: landing,
    services: services,
    portfolio: portfolio,
    pricing: pricing,
    contact: contact,
  };
  const pageData = pageMapper[pageType as keyof typeof pageMapper];
  const sectionsMapper: { [key: string]: React.ComponentType<any> } = {
    Banner,
    Cards,
    List,
    Accordion,
    Testimonials,
    Gallery,
    Logos,
    Pricing,
  };

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

  const handleAddNewPage = async (newPage: EditorPage) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("sites")
      .update({ pages: [...pages, newPage] })
      .eq("siteId", siteId)
      .select();
    if (data) {
      const pageId = data[0].pages[data[0].pages.length - 1].pageId;
      router.push(`/site/${siteId}/editor/${pageId}`);
      dispatch(addNewPage(newPage));
      setPageType("");
      setAddPage(false);
    }
  };

  return (
    <div>
      <BackBtn label={pageType} handleBack={() => setPageType("")} />
      <div
        className="space-y-7 px-5 py-2 overflow-y-auto"
        style={{ height: "calc(92vh - 70px)" }}
      >
        {pageData.map((page, index) => {
          return (
            <div key={index} className="bg-muted p-1 rounded-sm">
              <div className="w-full h-52 bg-background overflow-hidden relative">
                <div
                  className={`${selectedPallet} page-container overflow-y-auto`}
                  style={
                    {
                      transformOrigin: "0 0",
                      transform: "scale(0.2)",
                      width: "calc(100% / 0.2)", // Adjust the width based on the scale factor
                      aspectRatio: "2 / 1",
                      height: "calc(100% / 0.2)",
                      "--container-max-width": maxWidth,
                      ...(selectedPallet === "custom"
                        ? { "--primary": primaryColor }
                        : {}),
                    } as React.CSSProperties
                  }
                >
                  {page.sections.map((section) => {
                    const SectionComponent =
                      sectionsMapper[section.sectionName];
                    return (
                      <div key={section.id} className="relative">
                        <div className="absolute inset-0 pointer-events-auto" />
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
                  handleAddNewPage(newPage);
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
