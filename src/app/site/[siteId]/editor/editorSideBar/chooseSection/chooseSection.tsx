import React from "react";
import { useMotion } from "@/hooks/useMotion";
import { useSections } from "@/hooks/useSections";
import { BannerSectionIcon, BannerSectionLightIcon } from "@/icons/banner";
import { CardSectionIcon, CardSectionLightIcon } from "@/icons/cards";
import {
  AccordionSectionIcon,
  AccordionSectionLightIcon,
} from "@/icons/common";
import { FooterDark, FooterLight } from "@/icons/footer";
import { GallerySectionDark, GallerySectionLight } from "@/icons/gallery";
import { HeaderDark, HeaderLight } from "@/icons/header";
import { ListSectionIcon, ListSectionLightIcon } from "@/icons/list";
import { LogosDark, LogosLight } from "@/icons/logos";
import { PricingDark, PricingLight } from "@/icons/pricing";
import {
  TestimonialSectionIcon,
  TestimonialSectionLightIcon,
} from "@/icons/testimonials";
import {
  closeDrawer,
  closeSectionDesigns,
  copySection,
  updateEditorSections,
  updatePageSetting,
  updateSelectedSection,
} from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { PageSettings } from "@/reduxStore/types";
import { useTheme } from "next-themes";
import { useScrollTo } from "@/hooks/useScrollTo";
import { PasteDark, PasteLight } from "@/icons/paste";
import SectionDesign from "./sectionDesign";
import { v4 } from "uuid";
import BackBtn from "@/components/shared/backBtn";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

function ChooseSection() {
  const { motion } = useMotion();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { sections } = useSections();
  const { scrollToElement } = useScrollTo();
  const {
    sectionIndex,
    copiedSection,
    activePage: activePageId,
  } = useAppSelector((state) => state.editor.present);

  const page = useAppSelector((state) =>
    state.editor.present.editor.pages.find(
      (page) => page.pageId === activePageId
    )
  );
  const { showHeader, showFooter } = page?.pageSettings as PageSettings;

  const SectionIcons: {
    [key: string]: {
      Icon: () => React.JSX.Element;
      desc: string;
    };
  } = {
    Header: {
      Icon: theme === "dark" ? HeaderDark : HeaderLight,
      desc: "Logo, Links and buttons",
    },
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

    Gallery: {
      Icon: theme === "dark" ? GallerySectionDark : GallerySectionLight,
      desc: "Display images in grids and carousel",
    },
    Pricing: {
      Icon: theme === "dark" ? PricingDark : PricingLight,
      desc: "Display payment plans and features",
    },
    Logos: {
      Icon: theme === "dark" ? LogosDark : LogosLight,
      desc: "Brands in grids and carousel",
    },
    Fluid: {
      Icon: theme === "dark" ? LogosDark : LogosLight,
      desc: "Fluid design",
    },
    Footer: {
      Icon: theme === "dark" ? FooterDark : FooterLight,
      desc: "Logo contact info, links, & legal",
    },
    // Add more mappings as needed
  };

  const PasteIcon = theme === "dark" ? PasteDark : PasteLight;

  if (!page) return null;

  const handleChooseSection = (section: any) => {
    // Early return if section index is invalid (for non-header/footer sections)
    if (section.sectionName !== "Header" && section.sectionName !== "Footer") {
      if (sectionIndex < 0 || sectionIndex >= page.sections.length) {
        return;
      }
    }

    // Common action for all cases
    dispatch(closeSectionDesigns());

    // Handle each section type
    switch (section.sectionName) {
      case "Header":
        dispatch(
          updatePageSetting(activePageId, {
            ...page.pageSettings,
            showHeader: true,
          })
        );
        dispatch(updateSelectedSection(activePageId, page.sections[0].id));
        break;

      case "Footer":
        dispatch(
          updatePageSetting(activePageId, {
            ...page.pageSettings,
            showFooter: true,
          })
        );
        dispatch(
          updateSelectedSection(
            activePageId,
            page.sections[page.sections.length - 1].id
          )
        );
        break;

      default:
        // Handle regular section insertion
        let newSections = [...page.sections];
        newSections.splice(sectionIndex + 1, 0, section);
        dispatch(updateEditorSections(activePageId, newSections));
        dispatch(updateSelectedSection(activePageId, section.id));
        break;
    }
  };

  const handlePaste = () => {
    if (copiedSection) {
      const newSection = { ...copiedSection, id: v4() };
      let newSections = [...page.sections];
      newSections.splice(sectionIndex + 1, 0, newSection);
      dispatch(updateEditorSections(activePageId, newSections));
      dispatch(updateSelectedSection(activePageId, newSection.id));
      dispatch(copySection(null)); // Clear copied section after pasting
    }
  };

  return (
    <div>
      <BackBtn
        doneBtn
        btnContainerClassName="w-full md:hidden"
        label="Add Section"
        handleBack={() => dispatch(closeDrawer())}
      />
      <motion.div
        variants={variants}
        initial="closed"
        animate="open"
        className="p-5 space-y-3"
      >
        {copiedSection && (
          <SectionDesign
            sectionName="Paste"
            desc="Add copied section"
            Icon={PasteIcon}
            onClick={handlePaste}
          />
        )}
        {sections.map((section) => {
          if (
            (section.sectionName === "Header" && showHeader) ||
            (section.sectionName === "Footer" && showFooter)
          )
            return null;

          const { Icon, desc } = SectionIcons[section.sectionName];
          return (
            <SectionDesign
              key={section.id}
              sectionName={section.sectionName}
              desc={desc}
              Icon={Icon}
              onClick={() => {
                handleChooseSection(section);
                scrollToElement(`section-${sectionIndex + 1}`);
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

export default ChooseSection;
