import {
    DesignSettings,
  EditorPage,
  EditorSection,
  SectionContentTypes,
  SectionStyleTypes,
} from "@/reduxStore/types";

export interface SiteData {
  created_at: string;
  globalSections: EditorSection<
    keyof SectionContentTypes,
    keyof SectionStyleTypes
  >[];
  designSettings: DesignSettings;
  siteSettings: SiteSettings;
  id: number;
  owner_id: string;
  pages: EditorPage[];
  selectedPallet: string;
  settings: SiteSettings;
  domainName: string;
  imageLink: string;
}

export interface SiteSettings {
  email: string | undefined;
  favicon: string;
  homePage: string;
  isTemplate: boolean;
  showMadeBy: boolean;
  name: string;
  link: string;
  siteId: string;
  published: boolean;
  owner_id: string;
}
