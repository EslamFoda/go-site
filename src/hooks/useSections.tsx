import { v4 } from "uuid";

export function useSections() {
  const sections = [
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
        title: "developer",
        subtitle:
          "Eslam** helps you build the best products for your customers. With our expertise and experience, we can help you take your ideas from concept to reality",
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
          titleSize: "xl",
          align: "center",
          subtitleWidth: "50%",
          height: "460px",
          video: true,
          leftTitlePosition: true,
          leftTitleWidth: "50%",
          showButtons: true,
          sectionBackground: {
            color: "none",
            media: "",
            height: "fit",
            width: "100%",
            spacing: "xl",
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
        title: "Heading",
        subtitle: "",
        cards: [
          {
            id: v4(),
            title: "Card 1",
            text: "card 1 text",
            image: "",
            button: "",
            buttonColor: "gray" || "primary",
            link: "",
          },
          {
            id: v4(),
            title: "Card 2",
            text: "card 2 text",
            image: "",
            button: "",
            buttonColor: "gray" || "primary",
            link: "",
          },
          {
            id: v4(),
            title: "Card 3",
            text: "card 3 text",
            image: "",
            button: "",
            buttonColor: "gray" || "primary",
            link: "",
          },
        ],
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
      sectionName: "List",
      content: {
        label: "",
        title: "Heading",
        subtitle: "",
        type: "icon",
        list: [
          {
            id: v4(),
            title: "List 1",
            text: "List 1 text",
            icon: "",
            link: "",
          },
          {
            id: v4(),
            title: "List 2",
            text: "",
            icon: "",
            link: "",
          },
          {
            id: v4(),
            title: "List 3",
            text: "",
            icon: "",
            link: "",
          },
          {
            id: v4(),
            title: "List 4",
            text: "",
            icon: "",
            link: "",
          },
          {
            id: v4(),
            title: "List 5",
            text: "",
            icon: "",
            link: "",
          },
          {
            id: v4(),
            title: "List 6",
            text: "",
            icon: "",
            link: "",
          },
        ],
      },
      style: {
        designName: "design1",
        designSettings: {
          layout: "row",
          grid: {
            desktop: 3,
            mobile: 1,
          },
          height: 50,
          shape: "square",
          iconColor: "none",
          textSize: "m",
          align: "start",
          icon: true,
          background: true,
          border: false,
          leftTitlePosition: false,
          displayType: "grid",
          carouselSettings: {
            desktopWidth: 200,
            mobileWidth: 200,
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
    {
      id: v4(),
      sectionName: "Accordion",
      content: {
        label: "",
        title: "Heading",
        subtitle: "",
        accordions: [
          {
            id: v4(),
            title: "Accordion 1",
            text: "Add text here",
          },
          {
            id: v4(),
            title: "Accordion 2",
            text: "Add text here",
          },
          {
            id: v4(),
            title: "Accordion 3",
            text: "Add text here",
          },
        ],
      },
      style: {
        designName: "design1",
        designSettings: {
          icon: "arrow",
          align: "start",
          background: true,
          border: false,
          leftTitlePosition: false,
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
        title: "Testimonials",
        subtitle: "",
        iconType: "star",
        testimonials: [
          {
            id: v4(),
            review:
              "Add a customer review that describes their experience with your product/service",
            name: "John Doe",
            bio: "@johnDoe",
            rating: 4,
            avatar: "",
            link: "",
          },
          {
            id: v4(),
            review:
              "Add a customer review that describes their experience with your product/service",
            name: "John Doe",
            bio: "@johnDoe",
            rating: 4,
            avatar: "",
            link: "",
          },
          {
            id: v4(),
            review:
              "Add a customer review that describes their experience with your product/service",
            name: "John Doe",
            bio: "@johnDoe",
            rating: 4,
            avatar: "",
            link: "",
          },
        ],
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
    {
      id: v4(),
      sectionName: "Gallery",
      content: {
        label: "",
        title: "Heading",
        subtitle: "",
        photos: [
          {
            id: v4(),
            imgId: "",
            url: "",
          },
          {
            id: v4(),
            imgId: "",
            url: "",
          },
          {
            id: v4(),
            imgId: "",
            url: "",
          },
          {
            id: v4(),
            imgId: "",
            url: "",
          },
        ],
      },
      style: {
        designName: "design1",
        designSettings: {
          grid: {
            desktop: 4,
            mobile: 1,
          },
          height: {
            desktop: 250,
            mobile: 100,
          },

          leftTitlePosition: false,
          displayType: "grid",
          carouselSettings: {
            desktopWidth: 300,
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
  ];

  return { sections };
}
