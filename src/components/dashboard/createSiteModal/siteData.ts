import { SocialLinkIcons } from "@/types/common";
import { v4 } from "uuid";

// Function to generate the sections based on dynamic data
export const generateSections = (
  generatedData: any,
  siteId?: string,
  homePageId?: string
) => [
  {
    id: v4(),
    sectionName: "Banner",
    content: {
      label: "",
      title: generatedData.banner?.title || "Banner title",
      subtitle:
        generatedData.banner?.subtitle ||
        "Eslam helps you build the best products for your customers. With our expertise and experience, we can help you take your ideas from concept to reality",
      mediaType: "image",
      imageSetting: {
        imageUrl: generatedData.banner?.imageUrl,
        altText: "Banner image",
        id: generatedData.banner?.imgId,
      },
      videoSetting: { videoUrl: "" },
      actionType: "buttons",
      form: {
        fields: [
          {
            id: v4(),
            type: "text",
            label: "First name",
            value: "First name",
            placeholder: "First name",
            required: false,
            active: true,
          },
          {
            id: v4(),
            type: "text",
            label: "Last name",
            value: "Last name",
            placeholder: "Last name",
            required: false,
            active: true,
          },
          {
            id: v4(),
            type: "email",
            label: "Email",
            value: "Email",
            placeholder: "Email",
            required: true,
            active: true,
          },
          {
            id: v4(),
            type: "tel",
            label: "Phone",
            value: "Phone",
            placeholder: "Phone",
            required: false,
            active: false,
          },
          {
            id: v4(),
            type: "textarea",
            label: "Message",
            value: "Message",
            placeholder: "Message",
            required: false,
            active: false,
          },
        ],
        button: { text: "button 1", link: "", id: v4() },
        successMessage: "Thank you! Your submission has been received",
        countryCode: {
          code: "US",
          name: "United States",
          dialCode: "+1",
          flag: "🇺🇸",
        },
      },
      buttons: [
        {
          text:
            generatedData.banner?.buttons?.primaryButton?.text || "Get Started",
          link: "",
          id: v4(),
          pageId: "",
          linkType: "internal",
          externalLink: "",
          openNewTab: false,
        },
        {
          text:
            generatedData.banner?.buttons?.secondaryButton?.text ||
            "Learn More",
          link: "",
          id: v4(),
          pageId: "",
          linkType: "internal",
          externalLink: "",
          openNewTab: false,
        },
      ],
    },
    style: {
      designName: "design1",
      designSettings: {
        titleSize: "l",
        align: "center",
        subtitleWidth: "80%",
        height: {
          desktop: 460,
          mobile: 350,
        },
        video: true,
        leftTitlePosition: false,
        leftTitleWidth: "50%",
        showButtons: true,
        showForm: false,
        showVideo: false,
        spacing: {
          top: {
            desktop: 50,
            mobile: 15,
          },
          bottom: {
            desktop: 50,
            mobile: 15,
          },
          gap: {
            desktop: 20,
            mobile: 10,
          },
          padding: {
            desktop: 20,
            mobile: 10,
          },
        },
        sectionBackground: {
          color: "gray",
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
      title: generatedData.cards?.title || "Heading",
      subtitle: generatedData.cards?.subtitle || "",
      cards: generatedData.cards?.cards || [],
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
        spacing: {
          top: {
            desktop: 50,
            mobile: 15,
          },
          bottom: {
            desktop: 50,
            mobile: 15,
          },
          gap: {
            desktop: 20,
            mobile: 10,
          },
          padding: {
            desktop: 20,
            mobile: 10,
          },
        },
        sectionBackground: {
          color: "primary",
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
      title: generatedData.testimonials?.title || "Heading",
      subtitle: generatedData.testimonials?.subtitle || "",
      iconType: "star",
      testimonials: generatedData.testimonials?.testimonials || [],
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
        spacing: {
          top: {
            desktop: 50,
            mobile: 15,
          },
          bottom: {
            desktop: 50,
            mobile: 15,
          },
          gap: {
            desktop: 20,
            mobile: 10,
          },
          padding: {
            desktop: 20,
            mobile: 10,
          },
        },
        sectionBackground: {
          color: "gray",
          media: "",
          height: "fit",
          spacing: "l",
        },
      },
    },
  },
  {
    id: v4(),
    sectionName: "Accordion",
    content: {
      label: "",
      title: generatedData.accordions?.title || "Heading",
      subtitle: generatedData.accordions?.subtitle || "",
      accordions: generatedData.accordions?.accordions || [],
    },
    style: {
      designName: "design1",
      designSettings: {
        icon: "arrow",
        align: "start",
        background: true,
        border: false,
        leftTitlePosition: false,
        spacing: {
          top: {
            desktop: 50,
            mobile: 15,
          },
          bottom: {
            desktop: 50,
            mobile: 15,
          },
          gap: {
            desktop: 20,
            mobile: 10,
          },
          padding: {
            desktop: 20,
            mobile: 10,
          },
        },
        sectionBackground: {
          color: "primary",
          media: "",
          height: "fit",
          spacing: "l",
        },
      },
    },
  },
  // Add more sections here...
];

export const insertSiteData = (
  generatedData: any,
  user: any,
  siteId: string,
  homePageId: string,
  siteName: string
) => ({
  settings: {
    email: user?.email,
    favicon: "",
    homePage: homePageId,
    isTemplate: false,
    showMadeBy: true,
    name: siteName,
    link: "",
    siteId: siteId,
    owner_id: user?.id,
  },
  owner_id: user?.id,
  deployed: false,
  siteId: siteId,
  pages: [
    {
      pageId: homePageId,
      sections: generateSections(generatedData, siteId, homePageId),
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
  globalSections: [
    {
      id: v4(),
      sectionName: "Header",
      content: {
        Logo: {
          type: "text",
          text: "logo",
        },
        logo: {
          linkType: "internal",
          link: "",
          externalLink: "",
          pageId: "",
          openNewTab: false,
          logoType: "text",
          text: "logo",
          logoImage: {
            lightImgId: "",
            darkImgId: "",
            urlLight: "",
            urlDark: "",
          },
        },
        links: [
          {
            text: "link 2",
            link: "",
            id: v4(),
            openNewTab: false,
            subLinks: [],
            pageId: "",
            linkType: "internal",
            externalLink: "",
          },
          {
            text: "link 3",
            link: "",
            id: v4(),
            openNewTab: false,
            subLinks: [],
            pageId: "",
            linkType: "internal",
            externalLink: "",
          },
          {
            text: "link 4",
            link: "",
            id: v4(),
            openNewTab: false,
            subLinks: [],
            pageId: "",
            linkType: "internal",
            externalLink: "",
          },
        ],
        buttons: [
          {
            text: "button 1",
            link: "",
            id: v4(),
            linkType: "internal",
            externalLink: "",
            pageId: "",
          },
          {
            text: "button 2",
            link: "",
            id: v4(),
            linkType: "internal",
            externalLink: "",
            pageId: "",
          },
        ],
        announcement: {
          position: "above", // above, below
          text: "",
          link: "",
        },
        options: {
          iconType: "icon",
          menuIcon: "icon-1",
          openMenuText: "Open",
          closeMenuText: "Close",
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
          logoSize: {
            desktop: 20,
            mobile: 20,
          },
        },
      },
    },
    {
      id: v4(),
      sectionName: "Footer",
      content: {
        siteLogo: true,
        text: "Add a short descriptive text",
        links: [
          {
            text: "Group",
            id: v4(),
            subLinks: [
              {
                text: "sub link 1",
                link: "",
                id: v4(),
                linkType: "internal",
                externalLink: "",
                pageId: "",
              },
              {
                text: "sub link 2",
                link: "",
                id: v4(),
                linkType: "internal",
                externalLink: "",
                pageId: "",
              },
            ],
          },
          {
            text: "Group 2",
            id: v4(),
            subLinks: [
              {
                text: "sub link 1",
                link: "",
                id: v4(),
                linkType: "internal",
                externalLink: "",
                pageId: "",
              },
              {
                text: "sub link 2",
                link: "",
                id: v4(),
                linkType: "internal",
                externalLink: "",
                pageId: "",
              },
            ],
          },
          {
            text: "Group 3",
            id: v4(),
            subLinks: [
              {
                text: "sub link 1",
                link: "",
                id: v4(),
                linkType: "internal",
                externalLink: "",
                pageId: "",
              },
              {
                text: "sub link 2",
                link: "",
                id: v4(),
                linkType: "internal",
                externalLink: "",
                pageId: "",
              },
            ],
          },
        ],
        buttons: [
          {
            text: "button 1",
            link: "",
            id: v4(),
            linkType: "internal",
            externalLink: "",
            pageId: "",
          },
          {
            text: "button 2",
            link: "",
            id: v4(),
            linkType: "internal",
            externalLink: "",
            pageId: "",
          },
        ],
        social: [
          { id: v4(), icon: SocialLinkIcons.LinkedIn, link: "" },
          { id: v4(), icon: SocialLinkIcons.Twitter, link: "" },
          { id: v4(), icon: SocialLinkIcons.Instagram, link: "" },
          { id: v4(), icon: SocialLinkIcons.WhatsApp, link: "" },
        ],
        copyRight: {
          leftArea: "All rights reserved.",
          rightArea: "",
        },
      },
      style: {
        designName: "design1",
      },
    },
  ],
  storage: [],
});
