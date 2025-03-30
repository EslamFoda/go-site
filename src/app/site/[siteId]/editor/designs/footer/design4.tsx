import { updateSelectedItem, updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { FooterContent } from "@/types/sectionsTypes/footer";
import React from "react";
import { iconMap } from "../../editorSideBar/sectionSettings/footer/social/socialIcons";
import { useMotion } from "@/hooks/useMotion";
import { FooterLink } from "./footerLink";
import { cn } from "@/lib/utils";
import { FooterMobileLinks } from "./footerMobileLinks";
import DesignButtons from "@/components/shared/designButtons";
import { LogoText } from "../header/logoText";
import Logo from "../header/logo";
import { HeaderContent, HeaderStyle } from "@/types/sectionsTypes/header";
interface Design4Props {
  section: any;
  pageId: string;
}

function Design4({ pageId, section }: Design4Props) {
  const dispatch = useAppDispatch();
  const { AnimatePresence, motion } = useMotion();
  const { globalSections } = useAppSelector((state) => state.editor.present);
  const globalHeader = globalSections.find(
    (section) => section.sectionName === "Header"
  );
  const headerStyle = globalHeader?.style as HeaderStyle;
  const headerContent = globalHeader?.content as HeaderContent;
  const footerContent = section?.content as FooterContent;
  const { logo } = headerContent;

  // Function to handle social link clicks
  const handleSocialLinkClick = (link: string) => {
    if (!link) return;

    let finalLink = link;

    // Ensure the link has http/https prefix
    if (!finalLink.startsWith("http://") && !finalLink.startsWith("https://")) {
      finalLink = "https://" + finalLink;
    }

    // Open in new tab
    window.open(finalLink, "_blank", "noopener,noreferrer");
  };

  const groupTextClassName = cn("text-muted-foreground", {
    hidden: footerContent.links.length === 1,
  });

  const linkContainerClassName = cn({
    "flex items-center justify-center flex-col gap-3":
      footerContent.links.length > 1,
    "flex items-center justify-center flex-row gap-6 flex-wrap":
      footerContent.links.length === 1,
  });
  const logoClassNames = cn("text-xl", {
    "text-primary": headerStyle.designSettings.logoColor === "primary",
  });

  return (
    <section
      className="container max-w-container  w-full py-12"
      onClick={() => {
        dispatch(updateSelectedSection(pageId, section.id));
        dispatch(updateSelectedItem(null));
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center gap-12 justify-center">
          <div className="lg:flex hidden flex-wrap items-start gap-8 justify-center">
            <AnimatePresence>
              {footerContent.links.map((link) => {
                return (
                  <motion.div
                    className="space-y-3 text-center"
                    key={link.id}
                    layout
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "tween" }}
                  >
                    <span className={groupTextClassName}>{link.text}</span>
                    <div className={linkContainerClassName}>
                      {link.subLinks.map((subLink) => (
                        <FooterLink key={subLink.id} subLink={subLink} />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <FooterMobileLinks footerContent={footerContent} />
          <div className="w-full flex gap-2 flex-wrap items-center justify-center">
            <AnimatePresence>
              {footerContent.social.map((social) => {
                return (
                  <motion.div
                    layout
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "tween" }}
                    key={social.id}
                    className={cn(
                      "h-10 w-10 bg-muted rounded-sm flex items-center justify-center",
                      { "cursor-pointer": social.link }
                    )}
                    onClick={() => handleSocialLinkClick(social.link)}
                  >
                    {iconMap[social.icon]}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <div className="space-y-4 ">
            <div
              className="text-muted-foreground max-w-3xl"
              dangerouslySetInnerHTML={{ __html: footerContent.text }}
            />
            <DesignButtons
              buttons={footerContent.buttons}
              btnClassNames="justify-center"
            />
            {footerContent.siteLogo && (
              <div className="flex items-center justify-center">
                <LogoText
                  logo={headerContent.logo}
                  logoClassNames={logoClassNames}
                />
                <Logo
                  logoType={headerContent.logo.logoType}
                  logoSize={headerStyle.designSettings.logoSize}
                  logo={logo}
                />
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="flex items-start justify-between  gap-7 md:gap-10 lg:gap-36">
          <div
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: footerContent.copyRight.leftArea,
            }}
          />
          <div
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: footerContent.copyRight.rightArea,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Design4;
