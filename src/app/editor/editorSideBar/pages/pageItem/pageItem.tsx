import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { addNewPage, deletePage } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { EditorPage } from "@/reduxStore/types";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { v4 } from "uuid";

interface PageItemProps {
  page: EditorPage;
}

function PageItem({ page }: PageItemProps) {
  const { pageId } = useParams();
  const dispatch = useAppDispatch();
  const { editor } = useAppSelector((state) => state.editor);
  const { pages } = editor;

  const pageButtonClassNames = cn(
    "w-full flex justify-between items-center  rounded-sm px-2 gap-2 cursor-pointer border",
    {
      "bg-secondary": pageId === page.pageId,
    }
  );

  const handleDelete = () => {
    dispatch(deletePage(page.pageId));
  };

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
            <MenubarTrigger className="cursor-pointer">
              <Ellipsis size={16} />
            </MenubarTrigger>
            <MenubarContent align="end">
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                onClick={() => dispatch(addNewPage({ ...page, pageId: v4() }))}
              >
                Duplicate
              </MenubarItem>
              <MenubarSeparator />
              {pages.length > 1 && (
                <MenubarItem
                  className="text-destructive"
                  onClick={handleDelete}
                >
                  Delete
                </MenubarItem>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}

export default PageItem;
