import { useSections } from "@/hooks/useSections";
import { BannerSectionIcon, BannerSectionLightIcon } from "@/icons/banner";
import { CardSectionIcon, CardSectionLightIcon } from "@/icons/cards";
import {
  AccordionSectionIcon,
  AccordionSectionLightIcon,
} from "@/icons/common";
import { HeaderDark, HeaderLight } from "@/icons/header";
import { ListSectionIcon, ListSectionLightIcon } from "@/icons/list";
import {
  TestimonialSectionIcon,
  TestimonialSectionLightIcon,
} from "@/icons/testimonials";
import {
  closeSectionDesigns,
  updateEditorSections,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

function ChooseSection() {
  const sectionIndex = useAppSelector((state) => state.editor.sectionIndex);
  const activePageId = useAppSelector((state) => state.editor.activePage);
  const page = useAppSelector((state) =>
    state.editor.editor.pages.find((page) => page.pageId === activePageId)
  );
  const hasHeaderSection = page?.sections.some(
    (section) => section.sectionName === "Header"
  );
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { sections } = useSections();

  const SectionIcons: {
    [key: string]: {
      Icon: () => React.JSX.Element;
      desc: string;
    };
  } = {
    Banner: {
      Icon: theme === "dark" ? BannerSectionIcon : BannerSectionLightIcon,
      desc: "Image or video, text and forms",
    },
    Cards: {
      Icon: theme === "dark" ? CardSectionIcon : CardSectionLightIcon,
      desc: "Content previews with images, links",
    },
    List: {
      Icon: theme === "dark" ? ListSectionIcon : ListSectionLightIcon,
      desc: "Content previews with icons, links",
    },
    Accordion: {
      Icon: theme === "dark" ? AccordionSectionIcon : AccordionSectionLightIcon,
      desc: "Expandable sections for FAQs",
    },
    Testimonials: {
      Icon:
        theme === "dark" ? TestimonialSectionIcon : TestimonialSectionLightIcon,
      desc: "Customer praise and trust snippets",
    },
    Header: {
      Icon: theme === "dark" ? HeaderDark : HeaderLight,
      desc: "Logo, Links and buttons",
    },
    // Add more mappings as needed
  };

  if (!page) return null;

  const handleChooseSection = (section: any) => {
    let newSections = [...page.sections];
    console.log(section, "section");

    if (section.sectionName === "Header") {
      newSections = [section, ...newSections];
    } else {
      if (sectionIndex < 0 || sectionIndex >= page.sections.length) {
        return newSections;
      }
      newSections.splice(sectionIndex + 1, 0, section);
    }

    dispatch(closeSectionDesigns());
    dispatch(updateEditorSections(activePageId, newSections));
    dispatch(updateSelectedSection(activePageId, section.id));
  };

  const filteredSections = hasHeaderSection
    ? sections.filter((section) => section.sectionName !== "Header")
    : sections;

  return (
    <div className="p-5 space-y-3">
      {filteredSections.map((section) => {
        const { Icon, desc } = SectionIcons[section.sectionName];
        return (
          <div
            className="flex justify-between items-center bg-muted p-[10px] cursor-pointer rounded-sm hover:bg-muted-foreground/65 group"
            key={section.id}
            onClick={() => handleChooseSection(section)}
          >
            <div className="flex items-center gap-3">
              <div className="p-1 bg-background">
                <Icon />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium">
                  {section.sectionName}
                </span>
                <span className="text-[11px] text-muted-foreground group-hover:text-textColor">
                  {desc}
                </span>
              </div>
            </div>
            <div>
              <ChevronRight size={16} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChooseSection;
