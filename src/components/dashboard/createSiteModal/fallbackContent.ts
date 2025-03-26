import { v4 } from "uuid";

// Fallback data for when AI fails
export const getFallbackBanner = (siteDescription: string) => ({
  title: `Welcome to ${siteDescription || "Your Site"}`,
  subtitle: "Explore our amazing offerings!",
  imageUrl: "",
  imgId: "",
  buttons: {
    primaryButton: { text: "Get Started" },
    secondaryButton: { text: "Learn More" },
  },
});

export const getFallbackCards = () => ({
  title: "Our Features",
  subtitle: "Check out what we offer",
  cards: [
    {
      id: v4(),
      title: "Feature 1",
      text: "Description",
      button: "Explore",
      buttonColor: "gray",
      link: "",
      image: "",
    },
    {
      id: v4(),
      title: "Feature 2",
      text: "Description",
      button: "Explore",
      buttonColor: "gray",
      link: "",
      image: "",
    },
    {
      id: v4(),
      title: "Feature 3",
      text: "Description",
      button: "Explore",
      buttonColor: "gray",
      link: "",
      image: "",
    },
  ],
});

export const getFallbackTestimonials = () => ({
  title: "What People Say",
  subtitle: "Hear from our users",
  testimonials: [
    {
      id: v4(),
      review: "Great service!",
      name: "John Doe",
      bio: "Customer",
      rating: 5,
      link: "",
      avatar: "",
    },
    {
      id: v4(),
      review: "Really helpful!",
      name: "Jane Smith",
      bio: "Client",
      rating: 4,
      link: "",
      avatar: "",
    },
    {
      id: v4(),
      review: "Loved it!",
      name: "Alex Brown",
      bio: "User",
      rating: 5,
      link: "",
      avatar: "",
    },
  ],
});

export const getFallbackAccordions = () => ({
  title: "Frequently Asked Questions",
  subtitle: "Learn more about us",
  accordions: [
    {
      id: v4(),
      title: "What do you do?",
      text: "We provide great services.",
    },
    { id: v4(), title: "How to start?", text: "Just sign up!" },
    { id: v4(), title: "Pricing?", text: "Affordable plans available." },
    { id: v4(), title: "Support?", text: "24/7 support." },
  ],
});
