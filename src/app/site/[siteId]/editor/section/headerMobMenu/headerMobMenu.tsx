import { Button } from "@/components/ui/button";
import { HeaderContent } from "@/types/sectionsTypes/header";
import React from "react";
interface HeaderMobMenuProps {
  headerContent: HeaderContent;
}
function HeaderMobMenu({ headerContent }: HeaderMobMenuProps) {
  const variants = ["default", "secondary"] as const;
  console.log(headerContent, "headerContent");

  return (
    <div>
      {headerContent.links.map((link) => (
        <div key={link.id}>
          <div className="p-3 border-b border-muted-bg">
            <span>{link.text}</span>
          </div>
          {link.subLinks.map((subLink) => (
            <div key={subLink.id} className="p-3 px-6 border-b border-muted-bg">
              <span>{subLink.text}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="p-3 flex flex-col-reverse gap-3">
        {headerContent.buttons.map((button, index) => (
          <Button className="w-full" variant={variants[index]} key={button.id}>
            {button.text}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default HeaderMobMenu;
