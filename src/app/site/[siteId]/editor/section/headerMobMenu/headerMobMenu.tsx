import DesignButtons from "@/components/shared/designButtons";
import { HeaderContent } from "@/types/sectionsTypes/header";
import React from "react";
interface HeaderMobMenuProps {
  headerContent: HeaderContent;
}
function HeaderMobMenu({ headerContent }: HeaderMobMenuProps) {
  const variants = ["default", "secondary"] as const;

  return (
    <div>
      {headerContent.links.map((link) => (
        <div key={link.id}>
          <div className="px-3 py-4 border-b border-muted-bg">
            <span>{link.text}</span>
          </div>
          {link.subLinks.map((subLink) => (
            <div
              key={subLink.id}
              className="py-4 px-6 border-b border-muted-bg"
            >
              <span>{subLink.text}</span>
            </div>
          ))}
        </div>
      ))}
      <DesignButtons
        buttons={headerContent.buttons}
        btnClassNames="w-full"
        btnContainerClassNames="p-3 flex flex-col-reverse gap-3"
      />
    </div>
  );
}

export default HeaderMobMenu;
