import { useMotion } from "@/hooks/useMotion";
import { useSections } from "@/hooks/useSections";
import { BannerSectionIcon, BannerSectionLightIcon } from "@/icons/banner";
import { CardSectionIcon, CardSectionLightIcon } from "@/icons/cards";
import {
  AccordionSectionIcon,
  AccordionSectionLightIcon,
} from "@/icons/common";
import { GallerySectionDark, GallerySectionLight } from "@/icons/gallery";
import { HeaderDark, HeaderLight } from "@/icons/header";
import { ListSectionIcon, ListSectionLightIcon } from "@/icons/list";
import { LogosDark, LogosLight } from "@/icons/logos";
import {
  TestimonialSectionIcon,
  TestimonialSectionLightIcon,
} from "@/icons/testimonials";
import {
  closeSectionDesigns,
  updateEditorSections,
  updatePageSetting,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const sectionVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

function ChooseSection() {
  const { motion } = useMotion();
  const sectionIndex = useAppSelector(
    (state) => state.editor.present.sectionIndex
  );
  const activePageId = useAppSelector(
    (state) => state.editor.present.activePage
  );
  const page = useAppSelector((state) =>
    state.editor.present.editor.pages.find(
      (page) => page.pageId === activePageId
    )
  );
  const showHeader = page?.pageSettings.showHeader;

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
    Gallery: {
      Icon: theme === "dark" ? GallerySectionDark : GallerySectionLight,
      desc: "Display images in grids and carousel",
    },
    Logos: {
      Icon: theme === "dark" ? LogosDark : LogosLight,
      desc: "Brands in grids and carousel",
    },
    Fluid: {
      Icon: theme === "dark" ? LogosDark : LogosLight,
      desc: "Fluid design",
    },
    // Add more mappings as needed
  };

  if (!page) return null;

  const handleChooseSection = (section: any) => {
    let newSections = [...page.sections];

    if (section.sectionName === "Header") {
      dispatch(closeSectionDesigns());
      dispatch(
        updatePageSetting(activePageId, {
          ...page.pageSettings,
          showHeader: true,
        })
      );
      dispatch(updateSelectedSection(activePageId, page.sections[0].id));
    } else {
      if (sectionIndex < 0 || sectionIndex >= page.sections.length) {
        return newSections;
      }
      newSections.splice(sectionIndex + 1, 0, section);
      dispatch(closeSectionDesigns());
      dispatch(updateEditorSections(activePageId, newSections));
      dispatch(updateSelectedSection(activePageId, section.id));
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="closed"
      animate="open"
      className="p-5 space-y-3"
    >
      {sections.map((section) => {
        if (section.sectionName === "Header" && showHeader) return null;

        const { Icon, desc } = SectionIcons[section.sectionName];
        return (
          <motion.div
            variants={sectionVariants}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
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
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default ChooseSection;
