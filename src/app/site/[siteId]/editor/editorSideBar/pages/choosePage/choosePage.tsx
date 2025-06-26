import BackBtn from "@/components/shared/backBtn";
import {
  AboutDark,
  AboutLight,
  BlankDark,
  BlankLight,
  ContactDark,
  ContactLight,
  LandingDark,
  LandingLight,
  PortfolioDark,
  PortfolioLight,
  PricingDark,
  PricingLight,
  ServicesDark,
  ServicesLight,
} from "@/icons/pages";
import { addNewPage } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { EditorPage } from "@/reduxStore/types";
import { PageTypes } from "@/types/common";
import { createClient } from "@/utlis/supabase/client";
import { ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import { v4 } from "uuid";
import { blank } from "../pageType/pagesConstant/blank";
interface ChoosePageProps {
  setPageType: React.Dispatch<React.SetStateAction<PageTypes>>;
  setAddPage: React.Dispatch<React.SetStateAction<boolean>>;
}
function ChoosePage({ setPageType, setAddPage }: ChoosePageProps) {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { selectedPallet, editor, settings } = useAppSelector(
    (state) => state.editor.present
  );
  const { pages } = editor;
  const siteId = settings.siteId;
  const router = useRouter();
  const pagesTypes = [
    {
      Icon: theme === "dark" ? LandingDark : LandingLight,
      desc: "Attract and engage with visitors",
      type: "landing",
    },
    {
      Icon: theme === "dark" ? AboutDark : AboutLight,
      desc: "Attract and engage with visitors",
      type: "about",
    },
    {
      Icon: theme === "dark" ? ServicesDark : ServicesLight,
      desc: "Display products and solutions",
      type: "services",
    },
    {
      Icon: theme === "dark" ? PortfolioDark : PortfolioLight,
      desc: "Display work and projects",
      type: "portfolio",
    },
    {
      Icon: theme === "dark" ? PricingDark : PricingLight,
      desc: "Display plans and features",
      type: "pricing",
    },
    {
      Icon: theme === "dark" ? ContactDark : ContactLight,
      desc: "Form And contact links",
      type: "contact",
    },
    {
      Icon: theme === "dark" ? BlankDark : BlankLight,
      desc: "Start with a blank page",
      type: "blanks",
    },
    // Add more mappings as needed
  ];

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
      <BackBtn label="Add Page" handleBack={() => setAddPage(false)} doneBtn />
      <div className="p-2 px-5 space-y-3">
        {pagesTypes.map((page) => (
          <div
            key={page.type}
            className="flex justify-between items-center bg-muted p-[10px] cursor-pointer rounded-sm hover:bg-muted-foreground/65 group"
            onClick={() => {
              if (page.type === "blanks") {
                const newPageLink = generateUniqueLink("blank");
                const newPage = {
                  pageId: v4(),
                  ...blank,
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
                    title: "blank",
                    userEditedSlug: false,
                  },
                } as EditorPage;
                handleAddNewPage(newPage);
              } else {
                setPageType(page.type as PageTypes);
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-1 bg-background">{page.Icon()}</div>
              <div className="flex flex-col">
                <span className="text-xs font-medium capitalize">
                  {page.type}
                </span>
                <span className="text-[11px] text-muted-foreground group-hover:text-textColor">
                  {page.desc}
                </span>
              </div>
            </div>
            <div>
              <ChevronRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChoosePage;
