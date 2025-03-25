"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
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
import { insertSiteData, generateSections } from "./siteData"; // Import your functions
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  updateEditorState,
  updateActivePage,
  updateEditorSections,
  resetEditorState,
} from "@/reduxStore/action";
import { useScrollTo } from "@/hooks/useScrollTo";

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
  const [siteName, setSiteName] = React.useState("");
  const [siteDescription, setSiteDescription] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const homePageId = "ijwqoij1io23joi1km12";

  const generateBanner = async () => {
    try {
      const prompt = `Generate engaging banner content for a website called "${siteDescription}". Include a title, subtitle, and a call to action.`;
      const result = await AIChatSession.sendMessage(prompt);
      let bannerData;
      try {
        bannerData = JSON.parse(result.response.text());
      } catch (parseError) {
        console.error(
          "AI response parsing failed, using fallback:",
          parseError
        );
        bannerData = {
          title: `Welcome to ${siteDescription}`,
          subtitle: "Discover something amazing!",
          callToAction: "Get Started",
        };
      }
      const unsplashResponse = await unsplashClient.search.getPhotos({
        query: siteDescription,
        page: 1,
      });
      return {
        title: bannerData.title,
        subtitle: bannerData.subtitle,
        imageUrl: unsplashResponse.response?.results[0]?.urls?.regular || "",
        imgId: unsplashResponse.response?.results[0]?.id || "",
        buttons: {
          primaryButton: { text: bannerData.callToAction || "Get Started" },
          secondaryButton: { text: "Learn More" },
        },
      };
    } catch (error) {
      console.error("Banner generation failed:", error);
      throw error;
    }
  };

  const generateCards = async () => {
    try {
      const cardsPrompt = `Generate engaging Card content for a website called "${siteDescription}". Include a title, subtitle, and a list of 3 cards, each card has a title, text, buttonColor ("gray" or "primary"), and a button with text and an empty link.`;
      const cardsResult = await AIChatSession.sendMessage(cardsPrompt);
      let cardsData = JSON.parse(cardsResult.response.text());
      const unsplashResponse = await unsplashClient.search.getPhotos({
        query: siteDescription,
        page: 1,
      });
      return {
        ...cardsData,
        cards: cardsData.cards.map((card: any, i: number) => ({
          ...card,
          id: v4(),
          image: unsplashResponse.response?.results[i + 1]?.urls?.regular || "",
          imgId: unsplashResponse.response?.results[i + 1]?.id || "",
          button: card?.button?.text,
          buttonColor: card?.buttonColor || "gray",
          link: "",
        })),
      };
    } catch (error) {
      console.error("Cards generation failed:", error);
      throw error;
    }
  };

  const generateTestimonials = async () => {
    try {
      const testimonialsPrompt = `Generate engaging Testimonial content for a website called "${siteName}". Include a title, subtitle, and a list of 3 testimonials, each testimonial has a review mentioning "${siteName}", name, bio, rating from 1 to 5, and an empty link.`;
      const testimonialsResult = await AIChatSession.sendMessage(
        testimonialsPrompt
      );
      let testimonialsData = JSON.parse(testimonialsResult.response.text());
      const unsplashResponse = await unsplashClient.search.getPhotos({
        query: `${siteDescription} user`,
        page: 1,
      });
      return {
        ...testimonialsData,
        testimonials: testimonialsData.testimonials.map(
          (testimonial: any, i: number) => ({
            ...testimonial,
            id: v4(),
            avatar: unsplashResponse.response?.results[i]?.urls?.regular || "",
            avatarId: unsplashResponse.response?.results[i]?.id || "",
            link: "",
          })
        ),
      };
    } catch (error) {
      console.error("Testimonials generation failed:", error);
      throw error;
    }
  };

  const generateAccordions = async () => {
    try {
      const accordionPrompt = `Generate engaging Accordion content for a website called "${siteDescription}". Include a title, subtitle, and a list of 4 accordions, each accordion has a title, text.`;
      const accordionResult = await AIChatSession.sendMessage(accordionPrompt);
      let accordionData = JSON.parse(accordionResult.response.text());
      return {
        ...accordionData,
        accordions: accordionData.accordions.map((accordion: any) => ({
          ...accordion,
          id: v4(),
        })),
      };
    } catch (error) {
      console.error("Accordions generation failed:", error);
      throw error;
    }
  };

  const startSiteGeneration = async (siteId: string) => {
    try {
      // Initialize the page with no sections
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
      dispatch(updateActivePage(homePageId));

      // Generate sections and update Redux incrementally
      const generatedData: any = {};

      console.log("Generating Banner...");
      generatedData.banner = await generateBanner();
      const bannerSection = generateSections({
        banner: generatedData.banner,
      })[0];
      dispatch(updateEditorSections(homePageId, [bannerSection]));
      setTimeout(() => scrollToElement(`section-0`), 100); // Delay to ensure DOM update

      console.log("Generating Cards...");
      generatedData.cards = await generateCards();
      const cardsSection = generateSections({ cards: generatedData.cards })[1];
      dispatch(updateEditorSections(homePageId, [bannerSection, cardsSection]));
      setTimeout(() => scrollToElement(`section-1`), 100);

      console.log("Generating Testimonials...");
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

      console.log("Generating Accordions...");
      generatedData.accordions = await generateAccordions();
      const accordionSection = generateSections({
        accordions: generatedData.accordions,
      })[3];
      setTimeout(() => scrollToElement(`section-3`), 100);
      const allSections = [
        bannerSection,
        cardsSection,
        testimonialsSection,
        accordionSection,
      ];
      dispatch(updateEditorSections(homePageId, allSections));
      setTimeout(() => scrollToElement(`section-0`), 900);

      // Save to Supabase with all generated data

      const supabase = createClient();
      const { data, error } = await supabase
        .from("sites")
        .insert([
          insertSiteData(generatedData, user, siteId, homePageId, siteName),
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
      console.error("Error during site creation:", error);
      toast({
        title: "Error",
        description: "Failed to create site.",
        variant: "destructive",
      });
    } finally {
      dispatch(updateEditorState(["isGenerating"], false));
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <DialogTitle>Site Name</DialogTitle>
        </DialogHeader>
        <div className="py-5 space-y-4">
          <Input
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Your site name or brand name"
            className="focus-visible:ring-0 focus-visible:ring-transparent"
          />
          <Input
            id="description"
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            placeholder="Select category or industry..."
            className="focus-visible:ring-0 focus-visible:ring-transparent"
          />
        </div>
        <DialogFooter className="gap-3">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={createSite} className="w-full">
            Generate Site
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSiteModal;
