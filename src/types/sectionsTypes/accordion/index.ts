type SectionBackground = {
  color: "primary" | "gray" | "none";
  media: string;
  height: string;
  spacing: string;
  align?: AlignTypes;
};

type IconType = {
  ARROW: "arrow";
  PLUS: "plus";
};

export type AlignTypes = "start" | "center" | "end";
 

type DesignSettings = {
  icon: IconType;
  align: AlignTypes;
  background: boolean;
  border: boolean;
  sectionBackground: SectionBackground;
};

export type AccordionStyle = {
  designName: string;
  designSettings: DesignSettings;
};

export type Accordion = {
  id: string;
  title: string;
  text: string;
};

export type AccordionContent = {
  label: string;
  title: string;
  subtitle: string;
  accordions: Accordion[];
};
