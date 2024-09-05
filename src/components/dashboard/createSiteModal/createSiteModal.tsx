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
import { insertSiteData } from "./siteData";
import { useAppDispatch } from "@/reduxStore/hooks";
import {
  updateAiGenerator,
  updateEditorState,
  updateUser,
} from "@/reduxStore/action";

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
  const [siteName, setSiteName] = React.useState("");
  const [siteDescription, setSiteDescription] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  let generatedData: any = {};
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const generateBanner = async () => {
    toast({
      title: "Generating Banner",
      description: "Creating the banner section.",
    });
    const prompt = `Generate engaging banner content for a website called "${siteDescription}". Include a title, subtitle, and a call to action.`;
    const result = await AIChatSession.sendMessage(prompt);

    let bannerData;
    try {
      bannerData = JSON.parse(result.response.text());
    } catch (parseError) {
      console.error("Error parsing banner data:", parseError);
      throw new Error("Failed to generate banner content.");
    }

    const unsplashResponse = await unsplashClient.search.getPhotos({
      query: siteDescription,
      page: 1,
    });

    console.log(bannerData, "bannerData");

    const generatedImage =
      unsplashResponse.response?.results[0]?.urls?.regular || "";

    toast({
      title: "Banner Generated",
      description: "The banner section has been created.",
    });
    return {
      ...bannerData,
      imageUrl: generatedImage,
    };
  };

  const generateCards = async () => {
    toast({
      title: "Generating Cards",
      description: "Creating the cards section.",
    });
    const cardsPrompt = `Generate engaging Card content for a website called "${siteDescription}". Include a title, subtitle, and a list of 3 cards, each card has a title, text, buttonColor ("gray" or "primary"), and a button with text and an empty link.`;
    const cardsResult = await AIChatSession.sendMessage(cardsPrompt);
    const unsplashResponse = await unsplashClient.search.getPhotos({
      query: siteDescription,
      page: 1,
    });

    let cardsData;
    try {
      cardsData = JSON.parse(cardsResult.response.text());
    } catch (parseError) {
      console.error("Error parsing cards data:", parseError);
      throw new Error("Failed to generate cards content.");
    }

    toast({
      title: "Cards Generated",
      description: "The cards section has been created.",
    });

    return {
      ...cardsData,
      cards: cardsData.cards.map((card: any, i: number) => ({
        ...card,
        id: v4(),
        image: unsplashResponse.response?.results[i + 1]?.urls?.regular || "",
      })),
    };
  };

  const generateAccordions = async () => {
    toast({
      title: "Generating Accordions",
      description: "Creating the accordion section.",
    });
    const accordionPrompt = `Generate engaging Accordion content for a website called "${siteDescription}". Include a title, subtitle, and a list of 4 accordions, each accordion has a title, text.`;
    const accordionResult = await AIChatSession.sendMessage(accordionPrompt);

    let accordionData;
    try {
      accordionData = JSON.parse(accordionResult.response.text());
    } catch (parseError) {
      console.error("Error parsing accordion data:", parseError);
      throw new Error("Failed to generate accordion content.");
    }

    toast({
      title: "Accordions Generated",
      description: "The accordion section has been created.",
    });

    return {
      ...accordionData,
      accordions: accordionData.accordions.map((accordion: any) => ({
        ...accordion,
        id: v4(),
      })),
    };
  };

  const generateTestimonials = async () => {
    toast({
      title: "Generating Testimonials",
      description: "Creating the testimonials section.",
    });
    const testimonialsPrompt = `Generate engaging Testimonial content for a website called "${siteName}". Include a title, subtitle, and a list of 3 testimonials, each testimonial has a review mentioning "${siteName}", name, bio, rating from 1 to 5, and an empty link.`;
    const testimonialsResult = await AIChatSession.sendMessage(
      testimonialsPrompt
    );

    let testimonialsData;
    try {
      testimonialsData = JSON.parse(testimonialsResult.response.text());
    } catch (parseError) {
      console.error("Error parsing testimonials data:", parseError);
      throw new Error("Failed to generate testimonials content.");
    }

    const unsplashResponseUsers = await unsplashClient.search.getPhotos({
      query: `${siteDescription} Random person`,
      page: 1,
    });

    toast({
      title: "Testimonials Generated",
      description: "The testimonials section has been created.",
    });

    return {
      ...testimonialsData,
      testimonials: testimonialsData.testimonials.map(
        (testimonial: any, i: number) => ({
          ...testimonial,
          id: v4(),
          avatar:
            unsplashResponseUsers.response?.results[i]?.urls?.regular || "",
        })
      ),
    };
  };

  const validateGeneratedData = () => {
    const requiredSections = ["banner", "cards", "accordions", "testimonials"];
    for (const section of requiredSections) {
      console.log(generatedData, section, "asddasds");
      if (!generatedData[section]) {
        throw new Error(`Missing generated data for section: ${section}`);
      }
    }
  };

  const createSite = async () => {
    if (!siteName || !siteDescription) {
      toast({
        title: "Error",
        description: "Please enter site name and description",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    console.log("Starting site creation...");

    const siteId = v4();
    const homePageId = v4();
    dispatch(updateAiGenerator(true));
    dispatch(
      updateEditorState(
        ["editor", "pages"],
        [
          {
            pageId: homePageId,
            sections: [
              {
                id: v4(),
                sectionName: "Header",
                content: {
                  Logo: {
                    type: "text",
                    text: "logo",
                  },
                  logo: {
                    link: "",
                    openNewTab: false,
                  },
                  links: [
                    {
                      text: "link 2",
                      link: "",
                      id: v4(),
                      openNewTab: false,
                      subLinks: [],
                    },
                    {
                      text: "link 3",
                      link: "",
                      id: v4(),
                      openNewTab: false,
                      subLinks: [],
                    },
                    {
                      text: "link 4",
                      link: "",
                      id: v4(),
                      openNewTab: false,
                      subLinks: [],
                    },
                  ],
                  buttons: [
                    { text: "button 1", link: "", id: v4() },
                    { text: "button 2", link: "", id: v4() },
                  ],
                  announcement: {
                    position: "above",
                    text: "",
                    link: "",
                  },
                },
                style: {
                  designName: "design1",
                  designSettings: {
                    logoColor: "none",
                    mobileMenuIcon: "icon-1",
                    width: "fill",
                    sticky: false,
                    float: false,
                    shadow: false,
                    glass: false,
                    scrollIndicator: false,
                    autoHide: false,
                  },
                },
              },
            ],
            pageSettings: {
              coverImage:
                "https://images.unsplash.com/photo-1674062284636-c7b6b6c7a358...",
              description: "Shop for the latest mobile phones...",
              isPublished: true,
              isVisibleInSearch: true,
              link: "home",
              pagePasswordButton: "Continue",
              seoTitle: "Mobile Shop | Buy & Sell New & Used Phones Online",
              showFooter: true,
              showHeader: true,
              title: "homepage",
              userEditedSlug: false,
            },
          },
        ]
      )
    );

    dispatch(
      updateUser({
        email: user?.email,
        id: user?.id,
      })
    );

    router.push(`/site/${siteId}/editor`);

    try {
      // console.log("Generating Banner...");
      // const bannerData = await generateBanner();
      // generatedData.banner = bannerData;
      // console.log("Banner Generated.", bannerData);
      // console.log("Generating Cards...");
      // const cardsData = await generateCards();
      // generatedData.cards = cardsData;
      // console.log("Cards Generated.", cardsData);
      // console.log("Generating Accordions...");
      // const accordionsData = await generateAccordions();
      // generatedData.accordions = accordionsData;
      // console.log("Accordions Generated.", accordionsData);
      // console.log("Generating Testimonials...");
      // const testimonialsData = await generateTestimonials();
      // generatedData.testimonials = testimonialsData;
      // console.log("Testimonials Generated.", testimonialsData);
      // // Validate generated data
      // validateGeneratedData();
      // console.log("All sections generated. Proceeding to create site...");
      // const supabase = createClient();
      // const { data, error: siteError } = await supabase
      //   .from("sites")
      //   .insert(
      //     insertSiteData(generatedData, user, siteId, homePageId, siteName)
      //   )
      //   .select();
      // if (data) {
      //   setSites([data[0], ...(sites || [])]);
      //   setOpen(false);
      //   setSiteName("");
      //   setSiteDescription("");
      //   // Refresh the route
      //   router.push(`/site/${siteId}/editor`);
      //   setLoading(false);
      // }
      // if (siteError) {
      //   throw siteError;
      // }
    } catch (error) {
      console.error("Error during site creation:", error);
      toast({
        title: "Error",
        description:
          "There was an issue creating your site. Please check the console for details.",
        variant: "destructive",
      });
      setLoading(false);
    }
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
          <Button
            disabled={loading}
            onClick={createSite}
            className="w-full disabled:opacity-40"
          >
            {loading ? "Creating..." : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSiteModal;
