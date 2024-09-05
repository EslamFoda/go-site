"use client";

import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import Section from "./section";
import { useEffect, useState } from "react";
import {
  updateActivePage,
  updateAiGenerator,
  updateEditorState,
  updateSelectedPage,
  updateSelectedPallet,
} from "@/reduxStore/action";
import { createClient } from "@/utlis/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { AIChatSession } from "@/services/AImodal";
import { unsplashClient } from "@/helper/unsplash/unsplashClient";
import { v4 } from "uuid";

export default function Home({ params }: any) {
  const [loading, setLoading] = useState(true);
  const selectedPallet = useAppSelector((state) => state.editor.selectedPallet);
  const homePageId = useAppSelector(
    (state) => state.editor.editor.pages[0].pageId
  );
  const {
    aiGenerator,
    user,
    editor: { pages },
  } = useAppSelector((state) => state.editor);
  console.log(aiGenerator, "aiGenerator");
  const dispatch = useAppDispatch();
  const siteDescription = "gaming";
  const siteName = "100 pixels";

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
      id: v4(),
      sectionName: "Banner",
      content: {
        label: "",
        title: bannerData?.title || "ana mabdon",
        subtitle:
          bannerData?.subtitle ||
          "Eslam helps you build the best products for your customers. With our expertise and experience, we can help you take your ideas from concept to reality",
        mediaType: "image",
        imageSetting: {
          imageUrl: generatedImage,
          altText: generatedImage,
        },
        videoSetting: { videoUrl: "" },
        actionType: "buttons",
        buttons: {
          primaryButton: {
            text:
              bannerData?.buttons?.primaryButton?.text || "start your journey",
          },
          secondaryButton: {
            text: bannerData?.buttons?.secondaryButton?.text || "learn more",
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
      id: v4(),
      sectionName: "Cards",
      content: {
        label: "",
        title: cardsData?.title || "Heading",
        subtitle: cardsData?.subtitle || "",
        cards: cardsData.cards.map((card: any, i: number) => ({
          ...card,
          id: v4(),
          image: unsplashResponse.response?.results[i + 1]?.urls?.regular || "",
        })),
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
    };
  };

  useEffect(() => {
    let isMounted = true;

    const addSections = async () => {
      try {
        const bannerSection = await generateBanner();
        //@ts-ignore
        if (isMounted) dispatch(updateSelectedPage(homePageId, bannerSection));

        const cardsSection = await generateCards();
        //@ts-ignore
        if (isMounted) dispatch(updateSelectedPage(homePageId, cardsSection));
        if (isMounted) {
          const supabase = createClient();
          const { data, error: siteError } = await supabase
            .from("sites")
            .insert([
              {
                settings: {
                  email: user?.email,
                  favicon: "",
                  homePage: homePageId,
                  isTemplate: false,
                  showMadeBy: true,
                  name: siteName,
                  link: "",
                  siteId: params.siteId,
                },
                owner_id: user?.id,
                deployed: false,
                siteId: params.siteId,
                pages: pages,
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
        }
      } catch (error) {
        console.error("Error adding sections:", error);
      }
    };

    if (aiGenerator) {
      addSections();
      dispatch(updateActivePage(homePageId));
    }

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [homePageId, dispatch, aiGenerator, user, params.siteId]);

  useEffect(() => {
    const fetchSiteData = async () => {
      const supabase = createClient();

      const { data: siteData, error } = await supabase
        .from("sites")
        .select()
        .eq("siteId", params.siteId)
        .single();

      if (error) console.log(error);
      if (siteData) {
        // Update designSettings
        dispatch(
          updateEditorState(["designSettings"], siteData.designSettings)
        );

        // Update pages
        dispatch(updateEditorState(["editor", "pages"], siteData.pages));

        // Update activePage
        dispatch(updateActivePage(siteData.pages[0].pageId));
        // Update site settings
        dispatch(updateEditorState(["settings"], siteData.settings));

        // Update selected pallet settings
        dispatch(updateSelectedPallet(siteData.selectedPallet));

        setLoading(false);
      }
    };

    if (!aiGenerator) {
      fetchSiteData();
    }
  }, [params.siteId, dispatch, homePageId, params.pageId, aiGenerator]);

  if (loading && !aiGenerator) return null;

  return (
    <div className={`${selectedPallet} page-container`}>
      <Section pageId={homePageId} />
    </div>
  );
}
