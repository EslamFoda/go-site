import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ActiveUserType } from "@/utlis/auth-helper/client";
import { v4 } from "uuid";
import { createClient } from "@/utlis/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  updateEditorState,
  updateActivePage,
  updateEditorSections,
  updateSelectedPallet,
  updateDesignSettings,
  updateIsGenerating,
} from "@/reduxStore/action";
import { useScrollTo } from "@/hooks/useScrollTo";
import { insertSiteData, generateSections } from "./siteData";
import { themes } from "@/constant/createSiteThemes";
import { SiteForm } from "./SiteForm";
import { GeneratingDialog } from "./GeneratingDialog";
import {
  generateBanner,
  generateCards,
  generateTestimonials,
  generateAccordions,
} from "./ContentGenerators";
import { ThemeSelector } from "./themeSelector";
import { ActionCreators as UndoActionCreators } from "redux-undo";

interface CreateSiteModalProps {
  children: React.ReactNode;
  user: ActiveUserType;
  sites: any[];
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function CreateSiteModal({
  children,
  user,
  sites,
  setSites,
}: CreateSiteModalProps) {
  const { toast } = useToast();
  const { scrollToElement } = useScrollTo();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isGenerating, designSettings } = useAppSelector(
    (state) => state.editor.present
  );
  const [siteName, setSiteName] = React.useState("");
  const [siteDescription, setSiteDescription] = React.useState("");
  const homePageId = "ijwqoij1io23joi1km12";
  const [open, setOpen] = React.useState(false);
  const [openThemes, setOpenThemes] = React.useState(false);
  const [selectedPallet, setSelectedPallet] = React.useState<
    (typeof themes)[0]
  >(themes[0]);
  const themeRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const setThemeRef = React.useCallback(
    (key: string) => (el: HTMLDivElement | null) => {
      themeRefs.current[key] = el;
    },
    []
  );

  const startSiteGeneration = async (siteId: string) => {
    dispatch(updateIsGenerating(true));
    try {
      const initialPage = {
        pageId: homePageId,
        sections: [],
        pageSettings: {
          showFooter: true,
          showHeader: true,
          coverImage: "",
          description: "",
          isPublished: true,
          isVisibleInSearch: true,
          link: "home",
          pagePasswordButton: "",
          seoTitle: "",
          title: "homepage",
          userEditedSlug: false,
        },
      };
      dispatch(updateEditorState(["editor", "pages"], [initialPage]));
      dispatch(updateSelectedPallet(selectedPallet.colorPallet));
      dispatch(
        updateDesignSettings({
          ...designSettings,
          fonts: {
            ...designSettings.fonts,
            bodyFont: {
              fontFamily: selectedPallet.bodyFontFamily,
              fontFamilyUrl: selectedPallet.bodyFontFamilyUrl,
              fontWeight: selectedPallet.bodyFontWeight,
            },
            titleFont: {
              fontFamily: selectedPallet.titleFontFamily,
              fontFamilyUrl: selectedPallet.titleFontFamilyUrl,
              fontWeight: selectedPallet.titleFontWeight,
            },
          },
        })
      );
      dispatch(updateActivePage(homePageId));

      const generatedData: any = {};

      generatedData.banner = await generateBanner(siteDescription, toast);
      const bannerSection = generateSections({
        banner: generatedData.banner,
      })[0];
      dispatch(updateEditorSections(homePageId, [bannerSection]));
      setTimeout(() => scrollToElement(`section-0`), 100);

      generatedData.cards = await generateCards(siteDescription, toast);
      const cardsSection = generateSections({ cards: generatedData.cards })[1];
      dispatch(updateEditorSections(homePageId, [bannerSection, cardsSection]));
      setTimeout(() => scrollToElement(`section-1`), 100);

      generatedData.testimonials = await generateTestimonials(
        siteName,
        siteDescription,
        toast
      );
      const testimonialsSection = generateSections({
        testimonials: generatedData.testimonials,
      })[2];
      dispatch(
        updateEditorSections(homePageId, [
          bannerSection,
          cardsSection,
          testimonialsSection,
        ])
      );
      setTimeout(() => scrollToElement(`section-2`), 100);

      generatedData.accordions = await generateAccordions(
        siteDescription,
        toast
      );
      const accordionSection = generateSections({
        accordions: generatedData.accordions,
      })[3];
      const allSections = [
        bannerSection,
        cardsSection,
        testimonialsSection,
        accordionSection,
      ];
      dispatch(updateEditorSections(homePageId, allSections));
      setTimeout(() => scrollToElement(`section-0`), 900);

      const supabase = createClient();
      const { data, error } = await supabase
        .from("sites")
        .insert([
          insertSiteData(
            generatedData,
            user,
            siteId,
            homePageId,
            siteName,
            selectedPallet
          ),
        ])
        .select();

      if (data) {
        setSites([data[0], ...(sites || [])]);
        dispatch(updateEditorState(["editor", "pages"], data[0].pages));
        dispatch(updateActivePage(homePageId));
        toast({ title: "Site Created", description: "Your site is ready!" });
      }
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create site. Please try again.",
        variant: "destructive",
      });
    } finally {
      dispatch(updateIsGenerating(false));
      setSiteName("");
      setSiteDescription("");
      dispatch(UndoActionCreators.clearHistory());
    }
  };

  const createSite = () => {
    if (!siteName || !siteDescription) {
      toast({
        title: "Error",
        description: "Please enter site name and description",
        variant: "destructive",
      });
      return;
    }

    const siteId = v4();
    startSiteGeneration(siteId);
    router.push(`/site/${siteId}/editor`);
    setOpen(false);
  };

  if (isGenerating) {
    return <GeneratingDialog isGenerating={isGenerating} setOpen={setOpen} />;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setOpenThemes(false);
          setSiteName("");
          setSiteDescription("");
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <DialogTitle>{openThemes ? "Select Theme" : "New Site"}</DialogTitle>
        </DialogHeader>
        {openThemes ? (
          <ThemeSelector
            selectedPallet={selectedPallet}
            setSelectedPallet={setSelectedPallet}
            onContinue={createSite}
            setRef={setThemeRef}
          />
        ) : (
          <SiteForm
            siteName={siteName}
            setSiteName={setSiteName}
            siteDescription={siteDescription}
            setSiteDescription={setSiteDescription}
            onGenerate={() => setOpenThemes(true)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
