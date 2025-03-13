import {
  AlignType,
  CarouselSettings,
  displayType,
  SectionBackground,
  ShapeType,
  Spacing,
  TextSizeType,
} from "@/types/common";

// Define the interface for a single testimonial
export interface Testimonial {
  id: string;
  review: string;
  name: string;
  bio: string;
  rating: number;
  avatar: string;
  avatarId: string;
  link: string;
}

// Define the interface for the content object
export interface TestimonialContent {
  label: string;
  title: string;
  subtitle: string;
  iconType: "quote" | "star";
  testimonials: Testimonial[];
}

// Define the interface for the grid settings
interface GridSettings {
  desktop: number;
  mobile: number;
}

// Define the interface for the design settings
interface DesignSettings {
  textSize: TextSizeType;
  displayType: displayType;
  grid: GridSettings;
  shape: ShapeType;
  align: AlignType;
  background: boolean;
  border: boolean;
  avatar: boolean;
  rating: boolean;
  leftTitlePosition: boolean;
  spacing: Spacing;
  sectionBackground: SectionBackground;
  carouselSettings: CarouselSettings;
}

// Define the interface for the style object
export interface TestimonialStyle {
  designName: string;
  designSettings: DesignSettings;
}

// Define the main interface for the object
