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

interface Design2Props {
  section: any;
  pageId: string;
}

function Design2({ pageId, section }: Design2Props) {
  const dispatch = useAppDispatch();
  const { AnimatePresence, motion } = useMotion();
  const { settings } = useAppSelector((state) => state.editor.present);
  const footerContent = section?.content as FooterContent;

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
    "flex flex-col gap-3": footerContent.links.length > 1,
    "flex flex-row gap-6 flex-wrap": footerContent.links.length === 1,
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
        <div className="flex lg:flex-row flex-col items-start gap-7 md:gap-10 lg:gap-36 justify-between">
          <div className="lg:flex hidden basis-3/5  flex-wrap items-start gap-8 justify-start">
            <AnimatePresence>
              {footerContent.links.map((link) => {
                return (
                  <motion.div
                    className="space-y-3"
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
          <div className="space-y-4 lg:flex hidden flex-col basis-2/5  text-end items-end">
            <h2>{settings.name}</h2>
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: footerContent.text }}
            />
            <DesignButtons buttons={footerContent.buttons} reverse />
          </div>
          <FooterMobileLinks footerContent={footerContent} />
        </div>
        <div className="w-full flex gap-2 flex-wrap ">
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
        <div className="space-y-4 lg:hidden flex flex-col w-full text-end items-end">
          <h2>{settings.name}</h2>
          <div
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: footerContent.text }}
          />
          <DesignButtons buttons={footerContent.buttons} />
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

export default Design2;
