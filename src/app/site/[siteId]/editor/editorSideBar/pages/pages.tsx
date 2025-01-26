import { useAppSelector } from "@/reduxStore/hooks";
import { Plus } from "lucide-react";
import React from "react";
import PageItem from "./pageItem";
import { PageTypes } from "@/types/common";
import PageType from "./pageType";
import ChoosePage from "./choosePage";
function Pages() {
  const pages = useAppSelector((state) => state.editor.present.editor.pages);
  const [addPage, setAddPage] = React.useState(false);
  const [pageType, setPageType] = React.useState<PageTypes>("");

  if (pageType)
    return (
      <PageType
        pageType={pageType}
        setPageType={setPageType}
        setAddPage={setAddPage}
      />
    );

  if (addPage)
    return <ChoosePage setAddPage={setAddPage} setPageType={setPageType} />;

  return (
    <div className="px-5 space-y-2 py-5">
      <div
        className="w-full flex items-center h-10 rounded-sm px-2 gap-2 cursor-pointer bg-secondary-foreground text-background"
        onClick={() => setAddPage(true)}
      >
        <Plus size={16} />
        <span>New Page</span>
      </div>
      {pages.map((page) => (
        <PageItem page={page} key={page.pageId} />
      ))}
    </div>
  );
}

export default Pages;
