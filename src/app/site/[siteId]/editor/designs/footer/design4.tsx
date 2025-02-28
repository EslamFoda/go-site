import { Button } from "@/components/ui/button";
import { updateSelectedItem, updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { FooterContent } from "@/types/sectionsTypes/footer";
import React from "react";
import { iconMap } from "../../editorSideBar/sectionSettings/footer/social/socialIcons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMotion } from "@/hooks/useMotion";
interface Design4Props {
  section: any;
  pageId: string;
}

function Design4({ pageId, section }: Design4Props) {
  const dispatch = useAppDispatch();
  const { AnimatePresence, motion } = useMotion();
  const { settings } = useAppSelector((state) => state.editor.present);
  const footerContent = section?.content as FooterContent;

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
          <div className="lg:flex hidden flex-wrap items-center gap-8 justify-center">
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
                    <span className="text-muted-foreground">{link.text}</span>
                    <div className="flex items-center justify-center flex-col gap-3">
                      {link.subLinks.map((subLink) => {
                        return <span key={subLink.id}>{subLink.text}</span>;
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <Accordion
            type="multiple"
            className="w-full lg:hidden block space-y-3"
          >
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
                        {link.subLinks.map((subLink) => {
                          return (
                            <div
                              className="cursor-pointer flex items-center h-12 hover:bg-muted/50"
                              key={subLink.id}
                            >
                              <span>{subLink.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </Accordion>
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
                    className="h-10 w-10 bg-muted rounded-sm flex items-center justify-center"
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
            <div className="flex items-center justify-center gap-2">
              <Button>{footerContent.buttons[1].text}</Button>
              <Button variant="secondary">
                {footerContent.buttons[0].text}
              </Button>
            </div>
            <h2>{settings.name}</h2>
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
