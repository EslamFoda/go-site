import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { HeaderContent, HeaderStyle } from "@/types/sectionsTypes/header";
import React, { useEffect, useState } from "react";
interface Design1Props {
  section: any;
  pageId: string;
}
function Design1({ pageId, section }: Design1Props) {
  const dispatch = useAppDispatch();
  const headerContent = section.content as HeaderContent;
  const headerStyle = section.style as HeaderStyle;
  const { sticky, float, autoHide } = headerStyle.designSettings;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerClassNames = cn(
    "h-[70px] flex items-center rounded-sm transition-transform ease-linear justify-between px-5 shadow-md bg-background",
    {
      "fixed right-0  w-[calc(100vw_-_450px)] top-0 z-50 mt-12": sticky,
      "mx-auto inset-x-0 mt-14 ms-[450px] w-[calc(99vw_-_450px)]": float,
      "-translate-y-48": !isVisible && autoHide, // hide navbar when not visible
      "translate-y-0": isVisible && autoHide, // show navbar when visible
    }
  );

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setIsVisible(false);
        } else {
          // if scroll up show the navbar
          setIsVisible(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={headerClassNames}
      onClick={() => dispatch(updateSelectedSection(pageId, section.id))}
    >
      <nav className="flex items-center gap-5">
        <h2 className="text-xl">{headerContent.Logo.text}</h2>
        <div className="flex gap-7 group">
          {headerContent.links.map((link) => {
            return (
              <span
                key={link.id}
                className="cursor-pointer group-hover:text-muted-foreground transition-colors hover:!text-secondary-foreground"
              >
                {link.text}
              </span>
            );
          })}
        </div>
      </nav>
      <div className="flex items-center gap-4">
        <Button variant="secondary">{headerContent.buttons[0].text}</Button>
        <Button>{headerContent.buttons[1].text}</Button>
      </div>
    </header>
  );
}

export default Design1;
