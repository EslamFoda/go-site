"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActiveUserType } from "@/utlis/auth-helper/client";
import { v4 } from "uuid";
import { createClient } from "@/utlis/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { AIChatSession } from "../../../services/AImodal";
import { unsplashClient } from "@/helper/unsplash/unsplashClient";
import { insertSiteData, generateSections } from "./siteData";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import {
  updateEditorState,
  updateActivePage,
  updateEditorSections,
  updateSelectedPallet,
  updateDesignSettings,
} from "@/reduxStore/action";
import { useScrollTo } from "@/hooks/useScrollTo";
import { BrainCircuit, Stars } from "@/icons/common";
import { Textarea } from "@/components/ui/textarea";
import {
  getFallbackAccordions,
  getFallbackBanner,
  getFallbackCards,
  getFallbackTestimonials,
} from "./fallbackContent";
import ThemeItem from "@/app/site/[siteId]/editor/editorSideBar/designSettings/aiThemes/themeItem";
import { themes } from "@/constant/createSiteThemes";

interface CreateSiteModalProps {
  children: React.ReactNode;
  user: ActiveUserType;
  sites: any[];
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
}

function CreateSiteModal({
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

  // Retry function for AI requests
  const retryAIRequest = async (fn: () => Promise<any>, maxRetries = 2) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        console.warn(`Attempt ${attempt} failed, retrying...`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay before retry
      }
    }
  };

  const generateBanner = async () => {
    try {
      const prompt = `Generate engaging banner content for a website called "${siteDescription}". Include a title, subtitle, and a call to action.`;
      const result = await retryAIRequest(() =>
        AIChatSession.sendMessage(prompt)
      );
      let bannerData = JSON.parse(result.response.text());

      let imageUrl = "";
      let imgId = "";
      try {
        const unsplashResponse = await unsplashClient.search.getPhotos({
          query: siteDescription,
          page: 1,
          perPage: 1, // Request only 1 image since banner needs one
        });

        if (unsplashResponse.type === "error") {
          console.error("Unsplash error:", unsplashResponse.errors);
          if (unsplashResponse.status === 429) {
            toast({
              title: "Warning",
              description:
                "Unsplash rate limit reached, using placeholder image.",
            });
          }
        } else {
          const results = unsplashResponse.response?.results || [];
          if (results.length > 0) {
            imageUrl = results[0].urls.regular;
            imgId = results[0].id;
          } else {
            console.warn("No images found for query:", siteDescription);
          }
        }
      } catch (error) {
        console.error("Error fetching Unsplash image:", error);
        toast({
          title: "Warning",
          description: "Failed to fetch banner image, using placeholder.",
        });
      }

      return {
        title: bannerData.title,
        subtitle: bannerData.subtitle,
        imageUrl,
        imgId,
        buttons: {
          primaryButton: { text: bannerData.callToAction || "Get Started" },
          secondaryButton: { text: "Learn More" },
        },
      };
    } catch (error) {
      console.error("Banner generation failed:", error);
      toast({
        title: "Warning",
        description:
          "Failed to generate banner content, using default content.",
      });
      return getFallbackBanner(siteDescription);
    }
  };

  const generateCards = async () => {
    try {
      const cardsPrompt = `Generate engaging Card content for a website called "${siteDescription}". Include a title, subtitle, and a list of 3 cards, each card has a title, text, buttonColor ("gray" or "primary"), and a button with text and an empty link.`;
      const cardsResult = await retryAIRequest(() =>
        AIChatSession.sendMessage(cardsPrompt)
      );
      let cardsData = JSON.parse(cardsResult.response.text());

      let results = [] as any;
      try {
        const unsplashResponse = await unsplashClient.search.getPhotos({
          query: siteDescription,
          page: 1,
          perPage: 3, // Request only 3 images for 3 cards
        });
        if (unsplashResponse.type === "error") {
          console.error("Unsplash error:", unsplashResponse.errors);
          if (unsplashResponse.status === 429) {
            toast({
              title: "Warning",
              description:
                "Unsplash rate limit reached, using placeholder images for cards.",
            });
          }
        } else {
          results = unsplashResponse.response?.results || [];
        }
      } catch (error) {
        console.error("Error fetching Unsplash images for cards:", error);
        toast({
          title: "Warning",
          description: "Failed to fetch card images, using placeholders.",
        });
      }

      const usedIndices = new Set();
      const getRandomImage = (index: number) => {
        if (results.length === 0 || index >= results.length) {
          return { url: "", id: "" };
        }
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * results.length);
        } while (
          usedIndices.has(randomIndex) &&
          usedIndices.size < results.length
        );
        usedIndices.add(randomIndex);
        return {
          url: results[randomIndex]?.urls?.regular || "",
          id: results[randomIndex]?.id || "",
        };
      };

      return {
        ...cardsData,
        cards: cardsData.cards.map((card: any, index: number) => {
          const { url, id } = getRandomImage(index);
          return {
            ...card,
            id: v4(),
            image: url,
            imgId: id,
            button: card?.button?.text,
            buttonColor: card?.buttonColor || "gray",
            link: "",
          };
        }),
      };
    } catch (error) {
      toast({
        title: "Warning",
        description: "Failed to generate cards, using default content.",
      });
      return getFallbackCards();
    }
  };
  const generateTestimonials = async () => {
    try {
      const testimonialsPrompt = `Generate engaging Testimonial content for a website called "${siteName}". Include a title, subtitle, and a list of 3 testimonials, each testimonial has a review mentioning "${siteName}" and description about my site is "${siteDescription}, name, bio, rating from 1 to 5, and an empty link.`;
      const testimonialsResult = await retryAIRequest(() =>
        AIChatSession.sendMessage(testimonialsPrompt)
      );
      let testimonialsData = JSON.parse(testimonialsResult.response.text());

      // Fetch Unsplash images
      const unsplashResponse = await unsplashClient.search.getPhotos({
        query: `${siteDescription} user`,
        page: 1,
        perPage: 30, // Request enough images to choose from
      });
      const results = unsplashResponse.response?.results || [];

      // Function to get a random image without duplicates
      const usedIndices = new Set();
      const getRandomImage = () => {
        if (results.length === 0) return { url: "", id: "" };
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * results.length);
        } while (
          usedIndices.has(randomIndex) &&
          usedIndices.size < results.length
        );
        usedIndices.add(randomIndex);
        return {
          url: results[randomIndex]?.urls?.regular || "",
          id: results[randomIndex]?.id || "",
        };
      };

      return {
        ...testimonialsData,
        testimonials: testimonialsData.testimonials.map((testimonial: any) => {
          const { url, id } = getRandomImage();
          return {
            ...testimonial,
            id: v4(),
            avatar: url,
            avatarId: id,
            link: "",
          };
        }),
      };
    } catch (error) {
      toast({
        title: "Warning",
        description:
          "AI failed to generate testimonials, using default content.",
      });
      return getFallbackTestimonials();
    }
  };

  const generateAccordions = async () => {
    try {
      const accordionPrompt = `Generate engaging Accordion content for a website called "${siteDescription}". Include a title, subtitle, and a list of 4 accordions, each accordion has a title, text.`;
      const accordionResult = await retryAIRequest(() =>
        AIChatSession.sendMessage(accordionPrompt)
      );
      let accordionData = JSON.parse(accordionResult.response.text());
      return {
        ...accordionData,
        accordions: accordionData.accordions.map((accordion: any) => ({
          ...accordion,
          id: v4(),
        })),
      };
    } catch (error) {
      toast({
        title: "Warning",
        description: "AI failed to generate accordions, using default content.",
      });
      return getFallbackAccordions();
    }
  };

  const startSiteGeneration = async (siteId: string) => {
    try {
      const initialPage = {
        pageId: homePageId,
        sections: [],
        pageSettings: {
          coverImage: "",
          description: "",
          isPublished: true,
          isVisibleInSearch: true,
          link: "home",
          pagePasswordButton: "",
          seoTitle: "",
          showFooter: true,
          showHeader: true,
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

      generatedData.banner = await generateBanner();
      const bannerSection = generateSections({
        banner: generatedData.banner,
      })[0];
      dispatch(updateEditorSections(homePageId, [bannerSection]));
      setTimeout(() => scrollToElement(`section-0`), 100);

      generatedData.cards = await generateCards();
      const cardsSection = generateSections({ cards: generatedData.cards })[1];
      dispatch(updateEditorSections(homePageId, [bannerSection, cardsSection]));
      setTimeout(() => scrollToElement(`section-1`), 100);

      generatedData.testimonials = await generateTestimonials();
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

      generatedData.accordions = await generateAccordions();
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
      dispatch(updateEditorState(["isGenerating"], false));
      setSiteName("");
      setSiteDescription("");
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
    dispatch(updateEditorState(["isGenerating"], true));
    startSiteGeneration(siteId);
    router.push(`/site/${siteId}/editor`);
    setOpen(false);
  };

  if (isGenerating) {
    return (
      <Dialog open={isGenerating} onOpenChange={setOpen}>
        <DialogContent
          hideCloseButton
          aria-describedby={undefined}
          className="sm:max-w-sm space-y-14"
        >
          <DialogHeader className="items-center">
            <DialogTitle>Generating Site</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 items-center justify-center pb-14">
            <BrainCircuit />
            <div className="text-center">
              <p className="text-muted-foreground">
                Your website is generating
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
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
          <div className="py-3 space-y-4">
            <p className="text-muted-foreground text-center text-sm px-16">
              Customize your site instantly with matching fonts, colors, and
              shapes.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((theme: any) => (
                <ThemeItem
                  key={theme.colorPallet}
                  theme={theme}
                  isSelected={selectedPallet.colorPallet === theme.colorPallet}
                  onClick={() => setSelectedPallet(theme)}
                  setRef={setThemeRef(theme.colorPallet)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-3 space-y-4">
            <Input
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Enter brand name"
              className="focus-visible:ring-0 focus-visible:ring-transparent"
            />
            <Textarea
              id="description"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              placeholder="Tell us about your brand... (e.g., We offer digital marketing services for small businesses)"
              className="resize-none !h-24"
            />
          </div>
        )}
        <DialogFooter className="gap-3">
          {openThemes ? (
            <Button className="w-full" onClick={createSite}>
              Continue
            </Button>
          ) : (
            <Button
              onClick={() => {
                setOpenThemes(true);
              }}
              disabled={!siteName || !siteDescription}
              className="w-full gap-2"
            >
              <Stars />
              Generate Site
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSiteModal;
