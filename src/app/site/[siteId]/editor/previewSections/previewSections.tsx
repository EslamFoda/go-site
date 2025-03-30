"use client";

import { useAppSelector } from "@/reduxStore/hooks";
import { useParams, useRouter } from "next/navigation";
import useScrollParallax from "@/hooks/useScrollParallax";
import ProgressBar from "@/components/shared/progressBar";
import { HeaderStyle } from "@/types/sectionsTypes/header";
import { lazy } from "react";

const Banner = lazy(() => import("../designs/banner"));
const Cards = lazy(() => import("../designs/cards"));
const List = lazy(() => import("../designs/list"));
const Accordion = lazy(() => import("../designs/accordion"));
const Testimonials = lazy(() => import("../designs/testimonials"));
const Gallery = lazy(() => import("../designs/gallery"));
const Logos = lazy(() => import("../designs/logos"));
const FluidPreview = lazy(() => import("../designs/fluidPreview"));
const Pricing = lazy(() => import("../designs/pricing"));
const Header = lazy(() => import("../designs/header"));
const Footer = lazy(() => import("../designs/footer"));

const PreviewSection: React.FC<{ pageId: string }> = ({ pageId }) => {
  const { globalSections } = useAppSelector((state) => state.editor.present);
  const router = useRouter();
  const { ParallaxProvider } = useScrollParallax();
  const { siteId } = useParams();

  const currentPage = useAppSelector((state) =>
    state.editor.present.editor.pages.find((page) => page.pageId === pageId)
  );

  const globalHeader = globalSections.find(
    (section) => section.sectionName === "Header"
  );
  const globalFooter = globalSections.find(
    (section) => section.sectionName === "Footer"
  );

  const headerStyle = globalHeader?.style as HeaderStyle;

  const sectionsMapper: { [key: string]: React.ComponentType<any> } = {
    Banner,
    Cards,
    List,
    Accordion,
    Testimonials,
    Gallery,
    Logos,
    Fluid: FluidPreview,
    Pricing,
  };

  const globalSectionMapper = {
    Header,
    Footer,
  };

  const GlobalHeaderSection = globalSectionMapper["Header"];
  const GlobalFooterSection = globalSectionMapper["Footer"];

  if (!currentPage) router.push(`/site/${siteId}/editor/`);

  return (
    <div className="relative bg-background">
      {/* Parent container with conditional blur */}
      {headerStyle.designSettings.scrollIndicator &&
        currentPage?.pageSettings.showHeader && <ProgressBar />}

      {currentPage?.pageSettings.showHeader && (
        <div key="global-header">
          <GlobalHeaderSection pageId={pageId} section={globalHeader} />
        </div>
      )}
      {currentPage?.sections.map((section, i) => {
        const SectionComponent = sectionsMapper[section.sectionName];

        return (
          <div key={section.id} className="relative">
            <div id={`section-${i}`}>
              <ParallaxProvider>
                <div>
                  <SectionComponent
                    key={section.id}
                    section={section}
                    pageId={pageId}
                    sectionIndex={i}
                  />
                </div>
              </ParallaxProvider>
            </div>
          </div>
        );
      })}
      {currentPage?.pageSettings.showFooter && (
        <div key="global-footer">
          <GlobalFooterSection pageId={pageId} section={globalFooter} />
        </div>
      )}
    </div>
  );
};

export default PreviewSection;
