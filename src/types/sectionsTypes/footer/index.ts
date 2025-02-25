interface FooterSubLink {
  text: string;
  link: string;
  id: string;
  pageId: string;
}

// Link group interface
interface LinkGroup {
  text: string;
  id: string;
  subLinks: FooterSubLink[];
}

// Button interface
interface FooterButton {
  text: string;
  link: string;
  id: string;
}

// Social media link interface
interface SocialLink {
  id: string;
  icon: "linkedin" | "twitter" | "instagram" | "whatsapp" | string;
  link: string;
}

// Copyright section interface
interface CopyRight {
  leftArea: string;
  rightArea: string;
}

// Footer content interface
interface FooterContent {
  siteLogo: boolean;
  text: string;
  links: LinkGroup[];
  buttons: FooterButton[];
  social: SocialLink[];
  copyRight: CopyRight;
}

// Footer style interface
interface FooterStyle {
  designName: string;
}

export type {
  FooterContent,
  FooterStyle,
  FooterSubLink,
  LinkGroup,
  FooterButton,
  SocialLink,
  CopyRight,
};
