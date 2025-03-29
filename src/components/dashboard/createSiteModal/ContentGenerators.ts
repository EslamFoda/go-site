import { v4 } from "uuid";
import { AIChatSession } from "../../../services/AImodal";
import { unsplashClient } from "@/helper/unsplash/unsplashClient";
import { useToast } from "@/components/ui/use-toast";
import {
  getFallbackAccordions,
  getFallbackBanner,
  getFallbackCards,
  getFallbackTestimonials,
} from "./fallbackContent";

export const retryAIRequest = async (
  fn: () => Promise<any>,
  maxRetries = 2
) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      console.warn(`Attempt ${attempt} failed, retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

export const generateBanner = async (
  siteDescription: string,
  toast: ReturnType<typeof useToast>["toast"]
) => {
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
      description: "Failed to generate banner content, using default content.",
    });
    return getFallbackBanner(siteDescription);
  }
};

export const generateCards = async (
  siteDescription: string,
  toast: ReturnType<typeof useToast>["toast"]
) => {
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
          pageId: "",
          linkType: "internal",
          externalLink: "",
          openNewTab: false,
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

export const generateTestimonials = async (
  siteName: string,
  siteDescription: string,
  toast: ReturnType<typeof useToast>["toast"]
) => {
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
      description: "AI failed to generate testimonials, using default content.",
    });
    return getFallbackTestimonials();
  }
};

export const generateAccordions = async (
  siteDescription: string,
  toast: ReturnType<typeof useToast>["toast"]
) => {
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
