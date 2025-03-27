"use client";
import React, { useRef, useState } from "react";
import Banner from "../designs/banner";
import Cards from "../designs/cards";
import List from "../designs/list";
import Accordion from "../designs/accordion";
import Testimonials from "../designs/testimonials";
import Gallery from "../designs/gallery";
import Header from "../designs/header";
import Footer from "../designs/footer";
import Logos from "../designs/logos";
import Pricing from "../designs/pricing";
import Fluid from "../designs/fluid";
import AddSection from "./addSection";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  closeHeaderOptions,
  closeSectionDesigns,
  updateSectionIndex,
  updateSelectedItem,
  updateSelectedSection,
} from "@/reduxStore/action";
import ControlButtons from "./controlButtons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMotion } from "@/hooks/useMotion";
import { useParams, useRouter } from "next/navigation";
import useScrollParallax from "@/hooks/useScrollParallax";
import { cn } from "@/lib/utils"; // Import cn utility for className merging
import Sidebar from "@/components/shared/sideBar";
import HeaderMobMenu from "./headerMobMenu";
import { HeaderContent, HeaderStyle } from "@/types/sectionsTypes/header";
import { X } from "lucide-react";
import ProgressBar from "@/components/shared/progressBar";

const Section: React.FC<{ pageId: string }> = ({ pageId }) => {
  const dispatch = useAppDispatch();
  const { globalSections, openHeaderOptions, isGenerating, settings } =
    useAppSelector((state) => state.editor.present);
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);
  const { motion, AnimatePresence } = useMotion();
  const router = useRouter();
  const { ParallaxProvider } = useScrollParallax();
  const { siteId } = useParams();
  const headerRef = useRef<HTMLDivElement>(null);

  const currentPage = useAppSelector((state) =>
    state.editor.present.editor.pages.find((page) => page.pageId === pageId)
  );

  const globalHeader = globalSections.find(
    (section) => section.sectionName === "Header"
  );
  const globalFooter = globalSections.find(
    (section) => section.sectionName === "Footer"
  );

  const headerContent = globalHeader?.content as HeaderContent;
  const headerStyle = globalHeader?.style as HeaderStyle;

  const sectionsMapper: { [key: string]: React.ComponentType<any> } = {
    Banner,
    Cards,
    List,
    Accordion,
    Testimonials,
    Gallery,
    Logos,
    Fluid,
    Pricing,
  };

  const globalSectionMapper = {
    Header,
    Footer,
  };

  const GlobalHeaderSection = globalSectionMapper["Header"];
  const GlobalFooterSection = globalSectionMapper["Footer"];

  const handleMouseEnter = (index: number) => {
    setHoveringIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveringIndex(null);
  };

  if (!currentPage) router.push(`/site/${siteId}/editor/`);

  return (
    <div className="relative bg-background">
      {/* Parent container with conditional blur */}
      {headerStyle.designSettings.scrollIndicator &&
        currentPage?.pageSettings.showHeader && <ProgressBar />}
      {openHeaderOptions && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => dispatch(closeHeaderOptions())}
        />
      )}
      <div
        onClick={(e) => {
          dispatch(closeHeaderOptions());
        }}
        className={cn(
          "overflow-y-hidden transition-all duration-300",
          openHeaderOptions && "opacity-20 "
        )}
        ref={headerRef}
      >
        <AnimatePresence mode="popLayout">
          {currentPage?.pageSettings.showHeader && (
            <motion.div
              key="global-header"
              layout
              onClick={() => dispatch(closeSectionDesigns())}
            >
              <GlobalHeaderSection pageId={pageId} section={globalHeader} />
            </motion.div>
          )}
          {currentPage?.sections.map((section, i) => {
            const SectionComponent = sectionsMapper[section.sectionName];

            return (
              <motion.div
                layout
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ type: "tween" }}
                key={section.id}
                className="relative"
              >
                <HoverCard
                  key={section.id}
                  closeDelay={0}
                  openDelay={0}
                  open={hoveringIndex === i}
                >
                  <div
                    id={`section-${i}`} // Fixed template literal syntax
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    onMouseOver={() => handleMouseEnter(i)}
                    onClick={() => dispatch(updateSectionIndex(i))}
                  >
                    <HoverCardContent
                      align="end"
                      side="top"
                      avoidCollisions={false}
                      sideOffset={-45}
                      alignOffset={10}
                      className="rounded-none"
                    >
                      {i !== 0 && (
                        <ControlButtons
                          sectionIndex={i}
                          sectionId={section.id}
                          pageId={pageId}
                        />
                      )}
                    </HoverCardContent>
                    <HoverCardTrigger>
                      <ParallaxProvider>
                        <div
                          onClick={() => {
                            dispatch(closeSectionDesigns());
                            dispatch(updateSelectedSection(pageId, section.id));
                            dispatch(updateSelectedItem(null));
                          }}
                        >
                          <SectionComponent
                            key={section.id}
                            section={section}
                            pageId={pageId}
                            sectionIndex={i}
                          />
                        </div>
                      </ParallaxProvider>
                    </HoverCardTrigger>

                    <div className="absolute rounded-full z-20 left-2/4 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-background">
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              <AddSection sectionIndex={i} pageId={pageId} />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            Add Section
                            <TooltipArrow className="fill-muted" />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </HoverCard>
              </motion.div>
            );
          })}
          {currentPage?.pageSettings.showFooter && (
            <motion.div
              key="global-footer"
              layout
              onClick={() => dispatch(closeSectionDesigns())}
            >
              <GlobalFooterSection pageId={pageId} section={globalFooter} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/*header sidebar for the mobile screen */}
      {openHeaderOptions && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <Sidebar
              open={openHeaderOptions}
              onClose={() => dispatch(closeHeaderOptions())}
              parentRef={headerRef}
              closeButton={
                headerContent.options.iconType === "text" ? (
                  headerContent.options.closeMenuText
                ) : (
                  <X size={18} />
                )
              }
            >
              <HeaderMobMenu headerContent={headerContent} />
            </Sidebar>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
