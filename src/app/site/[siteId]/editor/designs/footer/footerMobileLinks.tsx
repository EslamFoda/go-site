// Create a new file, e.g., FooterMobileLinks.tsx
import React from "react";
import { FooterContent } from "@/types/sectionsTypes/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FooterLink } from "./footerLink";
import { useMotion } from "@/hooks/useMotion";
import { cn } from "@/lib/utils";

interface FooterMobileLinksProps {
  footerContent: FooterContent;
}

export const FooterMobileLinks: React.FC<FooterMobileLinksProps> = ({
  footerContent,
}) => {
  const { AnimatePresence, motion } = useMotion();

  const accordionContainerClassName = cn("w-full lg:hidden block space-y-3", {
    hidden: footerContent.links.length === 1,
  });

  const linksMobileContainerClassName = cn("w-full lg:hidden block space-y-3", {
    hidden: footerContent.links.length > 1,
  });

  return (
    <>
      <Accordion type="multiple" className={accordionContainerClassName}>
        <AnimatePresence>
          {footerContent.links.map((link) => (
            <motion.div
              key={link.id}
              layout
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "tween" }}
            >
              <AccordionItem key={link.id} value={link.id}>
                <AccordionTrigger
                  className="hover:bg-muted/50 px-2"
                  iconType="plus"
                >
                  {link.text}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="flex px-2 flex-col gap-3">
                    {link.subLinks.map((subLink) => (
                      <FooterLink
                        key={subLink.id}
                        subLink={subLink}
                        isAccordion
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </Accordion>
      <div className={linksMobileContainerClassName}>
        <AnimatePresence>
          {footerContent.links.map((link) => (
            <motion.div
              key={link.id}
              layout
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "tween" }}
            >
              <div className="border-t border-muted/50 border-b divide-y divide-muted/50">
                {link.subLinks.map((subLink, index) => (
                  <FooterLink
                    key={subLink.id}
                    subLink={subLink}
                    isAccordion
                    className={
                      index === 0 ? "border-t-0" : "border-t border-muted/50"
                    }
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
