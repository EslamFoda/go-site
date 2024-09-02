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
  const { toast } = useToast();
  const router = useRouter();

  const generateBannerAi = async () => {
    try {
      const prompt = `Generate engaging banner content for a website called "${siteDescription}". Include a title, subtitle, and a call to action.`;
      const result = await AIChatSession.sendMessage(prompt);
      const generateBanner = JSON.parse(result.response.text());

      const unsplashResponse = await unsplashClient.search.getPhotos({
        query: siteDescription,
        page: 1,
      });

      const unsplashResponseUsers = await unsplashClient.search.getPhotos({
        query: siteDescription + " Random person",
        page: 1,
      });

      const cardsPrompt = `Generate engaging Card content for a website called "${siteDescription}". Include a title, subtitle, and a list of 3 cards, each card has a title, text, buttonColor ("gray" or "primary"), and a button with text and an empty link.`;
      const cardsResult = await AIChatSession.sendMessage(cardsPrompt);
      const generateCards = JSON.parse(cardsResult.response.text());

      const testimonialsPrompt = `Generate engaging Testimonial content for a website called "${siteName}". Include a title, subtitle, and a list of 3 testimonials, each testimonial has a review mentioning "${siteName}", name, bio, rating from 1 to 5, and an empty link.`;
      const testimonialsResult = await AIChatSession.sendMessage(
        testimonialsPrompt
      );
      const generateTestimonials = JSON.parse(
        testimonialsResult.response.text()
      );

      const generatedImage = unsplashResponse.response?.results[0].urls.regular;

      return {
        banner: { ...generateBanner, imageUrl: generatedImage },
        cards: {
          ...generateCards,
          cards: generateCards.cards.map((card: any, i: number) => ({
            ...card,
            id: v4(),
            image:
              unsplashResponse.response?.results[i + 1]?.urls.regular || "",
          })),
        },
        testimonials: {
          ...generateTestimonials,
          testimonials: generateTestimonials.testimonials.map(
            (testimonial: any, i: number) => ({
              ...testimonial,
              id: v4(),
              avatar:
                unsplashResponseUsers.response?.results[i]?.urls.regular || "",
            })
          ),
        },
      };
    } catch (error) {
      console.error("Error generating content:", error);
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
    const generatedData = await generateBannerAi();
    console.log(generatedData, "generatedData");
    if (!generatedData) return;
    const siteId = v4();
    const homePageId = v4();
    const settings = {
      email: user?.email,
      favicon: "",
      homePage: homePageId,
      isTemplate: false,
      showMadeBy: true,
      name: siteName,
      link: "",
      siteId: siteId,
    };
    const supabase = createClient();
    const { data, error: siteError } = await supabase
      .from("sites")
      .insert([
        {
          settings,
          owner_id: user?.id,
          deployed: false,
          siteId: siteId,

          pages: [
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
                      {
                        text: "button 1",
                        link: "",
                        id: v4(),
                      },
                      {
                        text: "button 2",
                        link: "",
                        id: v4(),
                      },
                    ],
                    announcement: {
                      position: "above", // above, below
                      text: "",
                      link: "",
                    },
                  },
                  style: {
                    designName: "design1",
                    designSettings: {
                      logoColor: "none",
                      mobileMenuIcon: "icon-1", // icon-1, icon-2, icon-3
                      width: "fill", // fill , fit
                      sticky: false,
                      float: false,
                      shadow: false,
                      glass: false,
                      scrollIndicator: false,
                      autoHide: false,
                    },
                  },
                },
                {
                  id: v4(),
                  sectionName: "Banner",
                  content: {
                    label: "",
                    title: generatedData.banner.title || "ana mabdon",
                    subtitle:
                      generatedData.banner.subtitle ||
                      "Eslam helps you build the best products for your customers. With our expertise and experience, we can help you take your ideas from concept to reality",
                    mediaType: "image",
                    imageSetting: {
                      imageUrl: generatedData.banner.imageUrl,
                      altText: generatedData.banner.imageUrl,
                    },
                    videoSetting: { videoUrl: "" },
                    actionType: "buttons",
                    buttons: {
                      primaryButton: {
                        text:
                          generatedData.banner?.buttons?.primaryButton?.text ||
                          "start your journey",
                      },
                      secondaryButton: {
                        text:
                          generatedData.banner.buttons?.secondaryButton?.text ||
                          "learn more",
                      },
                    },
                  },
                  style: {
                    designName: "design1",
                    designSettings: {
                      titleSize: "l",
                      align: "center",
                      subtitleWidth: "80%",
                      height: "460px",
                      video: true,
                      leftTitlePosition: false,
                      leftTitleWidth: "50%",
                      showButtons: true,
                      sectionBackground: {
                        color: "none",
                        media: "",
                        height: "fit",
                        width: "100%",
                        spacing: "xl",
                        align: "center",
                      },
                      imageSetting: {
                        objectFit: "cover",
                        backgroundColor: "primary",
                        showImage: true,
                      },
                    },
                  },
                },
                {
                  id: v4(),
                  sectionName: "Cards",
                  content: {
                    label: "",
                    title: generatedData.cards.title || "Heading",
                    subtitle: generatedData.cards.subtitle || "",
                    cards: generatedData.cards.cards || [],
                  },
                  style: {
                    designName: "design1",
                    designSettings: {
                      layout: "top",
                      layoutV2: "bottom",
                      grid: {
                        desktop: 3,
                        mobile: 1,
                      },
                      height: {
                        desktop: 300,
                        mobile: 300,
                      },
                      titleSize: "m",
                      align: "start",
                      image: true,
                      cardBackground: true,
                      cardBorder: false,
                      leftTitlePosition: false,
                      displayType: "grid",
                      cardSlider: {
                        desktopWidth: 300,
                        mobileWidth: 300,
                        autoScroll: false,
                        scrollSpeed: 2,
                      },
                      button: true,
                      sectionBackground: {
                        color: "none",
                        media: "",
                        height: "fit",
                        spacing: "l",
                      },
                    },
                  },
                },
                {
                  id: v4(),
                  sectionName: "Testimonials",
                  content: {
                    label: "",
                    title: generatedData.testimonials.title || "Heading",
                    subtitle: generatedData.testimonials.subtitle || "",
                    iconType: "star",
                    testimonials: generatedData.testimonials.testimonials || [],
                  },
                  style: {
                    designName: "design1",
                    designSettings: {
                      textSize: "m",
                      displayType: "grid",
                      grid: {
                        desktop: 3,
                        mobile: 1,
                      },
                      shape: "square",
                      align: "start",
                      background: true,
                      border: false,
                      avatar: true,
                      rating: true,
                      leftTitlePosition: false,
                      carouselSettings: {
                        desktopWidth: 350,
                        mobileWidth: 300,
                        autoScroll: false,
                        scrollSpeed: 2,
                      },
                      sectionBackground: {
                        color: "none",
                        media: "",
                        height: "fit",
                        spacing: "l",
                      },
                    },
                  },
                },
              ],
              pageSettings: {
                coverImage:
                  "https://images.unsplash.com/photo-1674062284636-c7b6b6c7a358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDk5MjB8MHwxfHNlYXJjaHw4MXx8bW9iaWxlJTIwc2hvcHxlbnwwfHx8fDE3MDYyNjQxMzR8MA&ixlib=rb-4.0.3&q=80&w=1080",
                description:
                  "Shop for the latest mobile phones, tablets, and accessories at our online mobile shop. We offer a wide selection of products from top brands at competitive prices",
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
            {
              pageId: v4(),
              sections: [
                {
                  id: v4(),
                  sectionName: "Banner",
                  content: {
                    label: "",
                    title: "beeeeeeeeeeeeeeed",
                    subtitle: "test page2 description for go site editor",
                    mediaType: "image",
                    imageSetting: { imageUrl: "", altText: "" },
                    videoSetting: { videoUrl: "" },
                    actionType: "buttons",
                    buttons: {
                      primaryButton: { text: "start your journey" },
                      secondaryButton: { text: "learn more" },
                    },
                  },
                  style: {
                    designName: "design1",
                    designSettings: {
                      titleSize: "l",
                      align: "center",
                      subtitleWidth: "50%",
                      height: "460px",
                      video: true,
                      leftTitlePosition: false,
                      leftTitleWidth: "50%",
                      showButtons: true,
                      sectionBackground: {
                        color: "none",
                        media: "",
                        height: "fit",
                        width: "100%",
                        spacing: "xl",
                        align: "center",
                      },
                      imageSetting: {
                        objectFit: "cover",
                        backgroundColor: "primary",
                        showImage: true,
                      },
                    },
                  },
                },
              ],
              pageSettings: {
                coverImage:
                  "https://images.unsplash.com/photo-1674062284636-c7b6b6c7a358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDk5MjB8MHwxfHNlYXJjaHw4MXx8bW9iaWxlJTIwc2hvcHxlbnwwfHx8fDE3MDYyNjQxMzR8MA&ixlib=rb-4.0.3&q=80&w=1080",
                description:
                  "Shop for the latest mobile phones, tablets, and accessories at our online mobile shop. We offer a wide selection of products from top brands at competitive prices",
                isPublished: true,
                isVisibleInSearch: true,
                link: "home",
                pagePasswordButton: "Continue",
                seoTitle: "Mobile Shop | Buy & Sell New & Used Phones Online",
                showFooter: true,
                showHeader: true,
                title: "about",
                userEditedSlug: false,
              },
            },
          ],
          designSettings: {
            fonts: {
              titleFont: {
                fontFamily: "Space Grotesk",
                fontWeight: "600",
                fontFamilyUrl:
                  "https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksjNsFjTDJK.ttf",
              },
              bodyFont: {
                fontFamily: "Space Grotesk",
                fontWeight: "regular",
                fontFamilyUrl:
                  "https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsjNsFjTDJK.ttf",
              },
            },
            colors: {
              primary: "",
              primaryForGround: "",
            },
            borderRadius: ".5rem",
            width: {
              pages: 1400,
              fullWidthPage: false,
            },
          },
          selectedPallet: "default-theme",
        },
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
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSiteModal;
