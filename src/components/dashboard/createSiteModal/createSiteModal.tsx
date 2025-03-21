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
import { Progress } from "@/components/ui/progress";

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
  const router = useRouter();
  const [siteName, setSiteName] = React.useState("");
  const [siteDescription, setSiteDescription] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [generatedProgress, setGeneratedProgress] = React.useState(0);
  const [generatingText, setGeneratingText] = React.useState({
    title: "",
    description: "",
  });
  let generatedData: any = {};

  const generateBanner = async () => {
    setGeneratingText({
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

    // toast({
    //   title: "Banner Generated",
    //   description: "The banner section has been created.",
    // });
    setGeneratedProgress(25);
    return {
      ...bannerData,
      imageUrl: generatedImage,
      imgId: unsplashResponse.response?.results[0]?.id || "",
    };
  };

  const generateCards = async () => {
    setGeneratingText({
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

    // toast({
    //   title: "Cards Generated",
    //   description: "The cards section has been created.",
    // });

    setGeneratedProgress(50);

    return {
      ...cardsData,
      cards: cardsData.cards.map((card: any, i: number) => ({
        ...card,
        id: v4(),
        image: unsplashResponse.response?.results[i + 1]?.urls?.regular || "",
        imgId: unsplashResponse.response?.results[i + 1]?.id || "",
        button: "",
        buttonColor: "gray",
        link: "",
        pageId: "",
        linkType: "internal",
        externalLink: "",
        openNewTab: false,
      })),
    };
  };

  const generateAccordions = async () => {
    setGeneratingText({
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

    // toast({
    //   title: "Accordions Generated",
    //   description: "The accordion section has been created.",
    // });

    setGeneratedProgress(75);

    return {
      ...accordionData,
      accordions: accordionData.accordions.map((accordion: any) => ({
        ...accordion,
        id: v4(),
      })),
    };
  };

  const generateTestimonials = async () => {
    setGeneratingText({
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
      query: `${siteDescription} user`,
      page: 1,
    });

    // toast({
    //   title: "Testimonials Generated",
    //   description: "The testimonials section has been created.",
    // });

    setGeneratedProgress(85);

    return {
      ...testimonialsData,
      testimonials: testimonialsData.testimonials.map(
        (testimonial: any, i: number) => ({
          ...testimonial,
          id: v4(),
          avatar:
            unsplashResponseUsers.response?.results[i]?.urls?.regular || "",
          avatarId: unsplashResponseUsers.response?.results[i]?.id || "",
        })
      ),
    };
  };

  const validateGeneratedData = () => {
    const requiredSections = ["banner", "cards", "accordions", "testimonials"];
    for (const section of requiredSections) {
      if (!generatedData[section]) {
        throw new Error(`Missing generated data for section: ${section}`);
      } else {
        toast({
          title: `All sections generated`,
          description: `Proceeding to create site...`,
        });
        setGeneratedProgress(100);
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

    try {
      console.log("Generating Banner...");
      const bannerData = await generateBanner();
      generatedData.banner = bannerData;
      console.log("Banner Generated.", bannerData);

      console.log("Generating Cards...");
      const cardsData = await generateCards();
      generatedData.cards = cardsData;
      console.log("Cards Generated.", cardsData);

      console.log("Generating Testimonials...");
      const testimonialsData = await generateTestimonials();
      generatedData.testimonials = testimonialsData;
      console.log("Testimonials Generated.", testimonialsData);

      console.log("Generating Accordions...");
      const accordionsData = await generateAccordions();
      generatedData.accordions = accordionsData;
      console.log("Accordions Generated.", accordionsData);

      // Validate generated data
      validateGeneratedData();
      console.log("All sections generated. Proceeding to create site...");

      const supabase = createClient();
      const { data, error: siteError } = await supabase
        .from("sites")
        .insert([
          insertSiteData(generatedData, user, siteId, homePageId, siteName),
        ])
        .select();

      if (data) {
        setSites([data[0], ...(sites || [])]);
        setOpen(false);
        setSiteName("");
        setSiteDescription("");
        setLoading(false);
        router.push(`/site/${data[0].siteId}/editor`);
      }
      if (siteError) {
        throw siteError;
      }
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

  if (loading) {
    return (
      <Dialog open={loading} onOpenChange={setOpen}>
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
              <p className="text-muted-foreground">{generatingText.title}</p>
              <p className="text-muted-foreground">
                {generatingText.description}
              </p>
            </div>
            <Progress className="h-3" value={generatedProgress} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open && !loading} onOpenChange={setOpen}>
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
            Generate Site
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSiteModal;

const BrainCircuit = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      fill="none"
      viewBox="0 0 128 128"
      id="ai-chipset"
    >
      <path
        className="animate-pulse"
        strokeDasharray="50 50"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
        d="M97 80.5V88C97 93.5228 92.5228 98 87 98H80M31 80.5V88C31 93.5228 35.4772 98 41 98H47.5M31 47V41C31 35.4772 35.4772 31 41 31H47.5M97 47V41C97 35.4772 92.5228 31 87 31H80M31 70.125V63.75 57.375M97 70.125V63.75 57.375M69.375 31H62.75 57.125M69.375 98H62.75 57.125M46 76L58.0844 52.2089C58.1495 52.0807 58.281 52 58.4248 52V52C58.5725 52 58.7069 52.0852 58.77 52.2187L70 76M52 70H63M81 76V52M97 80H104M48 98L48 106"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
        d="M31 80H23"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
        d="M48 31L48 23"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
        d="M97 47H104"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
        d="M80 98L80 106"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        fill="currentColor"
        d="M101 61H98V67H101V61zM112 67C113.657 67 115 65.6569 115 64 115 62.3431 113.657 61 112 61V67zM101 67H112V61H101V67zM66 101L66 98 60 98 60 101 66 101zM60 112C60 113.657 61.3431 115 63 115 64.6569 115 66 113.657 66 112L60 112zM60 101L60 112 66 112 66 101 60 101zM27 61H30V67H27V61zM16 67C14.3431 67 13 65.6569 13 64 13 62.3431 14.3431 61 16 61V67zM27 67H16V61H27V67zM66 26L66 29 60 29 60 26 66 26zM60 15C60 13.3431 61.3431 12 63 12 64.6569 12 66 13.3431 66 15L60 15zM60 26L60 15 66 15 66 26 60 26z"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
        d="M31 47H23"
      ></path>
      <path
        className="animate-draw"
        strokeDasharray="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="6"
        d="M80 31L80 23"
      ></path>
    </svg>
  );
};
