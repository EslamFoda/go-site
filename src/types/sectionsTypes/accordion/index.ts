interface SectionBackground {
  color: "primary" | "gray" | "none";
  media: string;
  height: string;
  spacing: string;
  align?: "start" | "center" | "end";
}

interface IconType {
  ARROW: "arrow";
  PLUS: "plus";
}

interface DesignSettings {
  icon: IconType;
  align: "start" | "center" | "end";
  background: boolean;
  border: boolean;
  sectionBackground: SectionBackground;
}

export interface AccordionStyle {
  designName: string;
  designSettings: DesignSettings;
}

export interface Accordion {
  id: string;
  title: string;
  text: string;
}

export interface AccordionContent {
  label: string;
  title: string;
  subtitle: string;
  accordions: Accordion[];
}
