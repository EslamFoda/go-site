"use client";
import React, { lazy, useRef, useState } from "react";
import AddSection from "./addSection";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  closeChooseIcon,
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
import { redirect, useParams } from "next/navigation";
import useScrollParallax from "@/hooks/useScrollParallax";
import { cn } from "@/lib/utils"; // Import cn utility for className merging
import Sidebar from "@/components/shared/sideBar";
import HeaderMobMenu from "./headerMobMenu";
import { HeaderContent, HeaderStyle } from "@/types/sectionsTypes/header";
import { X } from "lucide-react";
import ProgressBar from "@/components/shared/progressBar";
import { useMediaQuery } from "react-responsive";

const Banner = lazy(() => import("../designs/banner"));
const Cards = lazy(() => import("../designs/cards"));
const List = lazy(() => import("../designs/list"));
const Accordion = lazy(() => import("../designs/accordion"));
const Testimonials = lazy(() => import("../designs/testimonials"));
const Gallery = lazy(() => import("../designs/gallery"));
const Logos = lazy(() => import("../designs/logos"));
const Fluid = lazy(() => import("../designs/fluid"));
const Pricing = lazy(() => import("../designs/pricing"));
const Header = lazy(() => import("../designs/header"));
const Footer = lazy(() => import("../designs/footer"));

const Section: React.FC<{ pageId: string }> = ({ pageId }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const dispatch = useAppDispatch();
  const { globalSections, openHeaderOptions } = useAppSelector(
    (state) => state.editor.present
  );
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);
  const { motion, AnimatePresence } = useMotion();
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

  if (!currentPage) redirect(`/site/${siteId}/editor/`);

  return (
    <div className="relative bg-background">
      {/* Parent container with conditional blur */}
      {headerStyle.designSettings.scrollIndicator &&
        currentPage?.pageSettings.showHeader && <ProgressBar />}
      {openHeaderOptions && (
        <div
          className="fixed inset-0 z-40 bg-transparent max-md:hidden"
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
              onClick={() => {
                if (!globalHeader) return;
                dispatch(closeSectionDesigns());
                dispatch(updateSelectedSection(pageId, globalHeader.id));
                dispatch(updateSelectedItem(null));
                dispatch(closeChooseIcon());
              }}
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
                  open={hoveringIndex === i || isMobile}
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
              onClick={() => {
                if (!globalFooter) return;
                dispatch(closeSectionDesigns());
                dispatch(updateSelectedSection(pageId, globalFooter.id));
                dispatch(updateSelectedItem(null));
              }}
            >
              <GlobalFooterSection pageId={pageId} section={globalFooter} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/*header sidebar for the mobile screen */}
      {openHeaderOptions && (
        <div className="fixed inset-0 z-50 pointer-events-none max-md:hidden">
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
