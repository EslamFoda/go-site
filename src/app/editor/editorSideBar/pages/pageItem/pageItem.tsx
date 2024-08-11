import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { EditorPage } from "@/reduxStore/types";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
interface PageItemProps {
  page: EditorPage;
}
function PageItem({ page }: PageItemProps) {
  const { pageId } = useParams();
  const pageButtonClassNames = cn(
    "w-full flex justify-between items-center  rounded-sm px-2 gap-2 cursor-pointer border",
    {
      "bg-secondary": pageId === page.pageId,
    }
  );

  return (
    <div className={pageButtonClassNames}>
      <Link
        href={`/editor/${page.pageId}`}
        className="h-10 w-full flex items-center"
      >
        <span>{page.pageSettings.title}</span>
      </Link>
      <div className="h-10 flex items-center">
        <Menubar className="bg-inherit">
          <MenubarMenu>
            <MenubarTrigger>
              <Ellipsis size={16} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem></MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}

export default PageItem;
