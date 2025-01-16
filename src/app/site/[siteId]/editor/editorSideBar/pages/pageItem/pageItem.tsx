import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { addNewPage, deletePage, updateActivePage } from "@/reduxStore/action";
import { useAppDispatch, useAppSelector } from "@/reduxStore/hooks";
import { EditorPage } from "@/reduxStore/types";
import { createClient } from "@/utlis/supabase/client";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { v4 } from "uuid";

interface PageItemProps {
  page: EditorPage;
}

function PageItem({ page }: PageItemProps) {
  const dispatch = useAppDispatch();
  const { pageId, siteId } = useParams();
  const { editor, settings } = useAppSelector((state) => state.editor.present);
  const { pages } = editor;
  const router = useRouter();

  const pageButtonClassNames = cn(
    "w-full flex justify-between items-center rounded-sm px-2 gap-2 cursor-pointer border",
    {
      "bg-secondary":
        pageId === page.pageId ||
        (page.pageId === settings.homePage && !pageId),
    }
  );

  const handleDeletePage = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("sites")
      .update({ pages: pages.filter((p) => p.pageId !== page.pageId) })
      .eq("siteId", siteId)
      .select();
    if (data) {
      dispatch(deletePage(page.pageId));
      const findLastPageId = pages.findLast((p) => p.pageId !== page.pageId);
      const lastPageId = findLastPageId?.pageId;
      router.push(`/site/${siteId}/editor/${lastPageId}`);
    }
  };

  const generateUniqueLink = (baseLink: string) => {
    // Remove any existing numbering
    const baseLinkWithoutNumber = baseLink.replace(/-\d+$/, "");

    const matchingPages = pages.filter((p) =>
      p.pageSettings.link.startsWith(baseLinkWithoutNumber)
    );

    if (matchingPages.length === 1) return `${baseLinkWithoutNumber}-2`;

    const numbers = matchingPages.map((p) => {
      const match = p.pageSettings.link.match(
        new RegExp(`${baseLinkWithoutNumber}-(\\d+)$`)
      );
      return match ? parseInt(match[1], 10) : 1;
    });

    const maxNumber = Math.max(...numbers);
    return `${baseLinkWithoutNumber}-${maxNumber + 1}`;
  };

  const handleDuplicatePage = async (originalPage: EditorPage) => {
    const newPageId = v4();
    const newLink = generateUniqueLink(originalPage.pageSettings.link);

    const duplicatedPage: EditorPage = {
      ...originalPage,
      pageId: newPageId,
      pageSettings: {
        ...originalPage.pageSettings,
        link: newLink,
        title: `${originalPage.pageSettings.title} (Copy)`,
      },
    };

    const supabase = createClient();
    const { data } = await supabase
      .from("sites")
      .update({
        pages: [...pages, duplicatedPage],
      })
      .eq("siteId", siteId)
      .select();

    if (data) {
      dispatch(addNewPage(duplicatedPage));
    }
  };

  return (
    <div className={pageButtonClassNames}>
      <Link
        href={`/site/${siteId}/editor/${page.pageId}`}
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
                onClick={() => {
                  handleDuplicatePage(page);
                }}
              >
                Duplicate
              </MenubarItem>
              <MenubarSeparator />
              {pages.length > 1 && (
                <MenubarItem
                  className="text-destructive"
                  onClick={handleDeletePage}
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
