import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon1, MenuIcon2, MenuIcon3 } from "@/icons/common";
import { cn } from "@/lib/utils";
import { updateSelectedSection } from "@/reduxStore/action";
import { useAppDispatch } from "@/reduxStore/hooks";
import { HeaderContent, HeaderStyle } from "@/types/sectionsTypes/header";

interface Design3Props {
  section: any;
  pageId: string;
}

function Design3({ pageId, section }: Design3Props) {
  const dispatch = useAppDispatch();
  const headerContent = section.content as HeaderContent;
  const headerStyle = section.style as HeaderStyle;
  const { sticky, float, autoHide, width, shadow, glass, scrollIndicator } =
    headerStyle.designSettings;

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const NavIcon = {
    "icon-1": <MenuIcon1 className="animate-fadeIn" active={false} />,
    "icon-2": <MenuIcon2 className="animate-fadeIn" active={false} />,
    "icon-3": <MenuIcon3 className="animate-fadeIn" active={false} />,
  };

  const logoClassNames = cn("text-xl", {
    "text-primary": headerStyle.designSettings.logoColor === "primary",
  });

  const normalHeaderClassName = cn(
    "bg-background transition-transform ease-linear",
    {
      "fixed right-0  w-[calc(100vw_-_450px)] top-0 z-50 mt-12": sticky,
      "-translate-y-48": !isVisible && autoHide && sticky, // hide navbar when not visible
      "translate-y-0": isVisible && autoHide && sticky, // show navbar when visible
      "bg-background/50 backdrop-blur-lg": glass,
      "shadow-lg": shadow,
    }
  );

  const normalHeaderInnerClassName = cn(
    "h-20 flex items-center justify-between",
    {
      "container max-w-container": width === "fit",
      "px-5": width === "fill",
    }
  );

  const floatHeaderClassName = cn(
    "bg-background transition-transform ease-linear rounded-sm",
    {
      "mx-auto inset-x-0 mt-14 ms-[456px] fixed right-0 top-0 z-50 mt-14":
        float,
      "px-5 w-[calc(99vw_-_450px)]": width === "fill",
      "-translate-y-48": !isVisible && autoHide && sticky, // hide navbar when not visible
      "translate-y-0": isVisible && autoHide && sticky, // show navbar when visible
      "bg-transparent ms-[447px]": width === "fit",
      "shadow-lg": shadow && width === "fill",
      "bg-background/50 backdrop-blur-lg": glass && width === "fill",
      "bg-transparent": glass && width === "fit",
    }
  );

  const floatHeaderInnerClassName = cn({
    "container max-w-container": width === "fit",
  });

  const innerHeaderClassName = cn(
    "flex items-center rounded-sm justify-between w-full bg-background px-5 h-20",
    {
      "shadow-lg": shadow && width === "fit",
      "bg-transparent": glass && width === "fill",
      "bg-background/50 backdrop-blur-lg": glass && width === "fit",
    }
  );

  const scrollIndicatorClassName = cn(
    "h-1  transition-width duration-300 ease-in-out",
    { "bg-primary": scrollIndicator }
  );

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const scrollY = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollY / totalHeight) * 100;
        setScrollProgress(progress);

        if (scrollY > lastScrollY) {
          setIsVisible(false); // hide the navbar when scrolling down
        } else {
          setIsVisible(true); // show the navbar when scrolling up
        }

        setLastScrollY(scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  const ScrollIndicator = () => (
    <div
      className={scrollIndicatorClassName}
      style={{ width: `${scrollProgress}%` }}
    />
  );

  if (float) {
    return (
      <header
        className={floatHeaderClassName}
        onClick={() => dispatch(updateSelectedSection(pageId, section.id))}
      >
        <ScrollIndicator />
        <div className={floatHeaderInnerClassName}>
          <div className={innerHeaderClassName}>
            <h2 className={logoClassNames}>{headerContent.Logo.text}</h2>
            <div className="flex items-center gap-5">
              <nav className="hidden lg:flex gap-7 group">
                {headerContent.links.map((link) => (
                  <span
                    key={link.id}
                    className="cursor-pointer whitespace-nowrap group-hover:text-muted-foreground transition-colors hover:!text-secondary-foreground"
                  >
                    {link.text}
                  </span>
                ))}
              </nav>
              <div className="hidden lg:flex items-center gap-4">
                <Button variant="secondary">
                  {headerContent.buttons[0].text}
                </Button>
                <Button>{headerContent.buttons[1].text}</Button>
              </div>
              <div className="block lg:hidden cursor-pointer">
                {NavIcon[headerStyle.designSettings.mobileMenuIcon]}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={normalHeaderClassName}
      onClick={() => dispatch(updateSelectedSection(pageId, section.id))}
    >
      <ScrollIndicator />
      <div className={normalHeaderInnerClassName}>
        <h2 className={logoClassNames}>{headerContent.Logo.text}</h2>
        <div className="flex items-center gap-5">
          <nav className="hidden lg:flex gap-7 group">
            {headerContent.links.map((link) => (
              <span
                key={link.id}
                className="cursor-pointer whitespace-nowrap group-hover:text-muted-foreground transition-colors hover:!text-secondary-foreground"
              >
                {link.text}
              </span>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="secondary">{headerContent.buttons[0].text}</Button>
            <Button>{headerContent.buttons[1].text}</Button>
          </div>
          <div className="block lg:hidden cursor-pointer">
            {NavIcon[headerStyle.designSettings.mobileMenuIcon]}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Design3;
