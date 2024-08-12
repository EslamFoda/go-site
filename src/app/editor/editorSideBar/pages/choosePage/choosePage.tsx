import BackBtn from "@/components/shared/backBtn";
import {
  AboutDark,
  AboutLight,
  LandingDark,
  LandingLight,
} from "@/icons/pages";
import { PageTypes } from "@/types/common";
import { ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
interface ChoosePageProps {
  setPageType: React.Dispatch<React.SetStateAction<PageTypes>>;
  setAddPage: React.Dispatch<React.SetStateAction<boolean>>;
}
function ChoosePage({ setPageType, setAddPage }: ChoosePageProps) {
  const { theme } = useTheme();
  const pagesTypes = [
    {
      Icon: theme === "dark" ? LandingDark : LandingLight,
      desc: "Attract and engage with visitors",
      type: "landing",
    },
    {
      Icon: theme === "dark" ? AboutDark : AboutLight,
      desc: "Attract and engage with visitors",
      type: "about",
    },
    // Add more mappings as needed
  ];
  return (
    <div>
      <BackBtn label="Add Page" handleBack={() => setAddPage(false)} />
      <div className="p-2 px-5 space-y-3">
        {pagesTypes.map((page) => (
          <div
            key={page.type}
            className="flex justify-between items-center bg-muted p-[10px] cursor-pointer rounded-sm hover:bg-muted-foreground/65 group"
            onClick={() => {
              setPageType(page.type as PageTypes);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-1 bg-background">{page.Icon()}</div>
              <div className="flex flex-col">
                <span className="text-xs font-medium capitalize">
                  {page.type}
                </span>
                <span className="text-[11px] text-muted-foreground group-hover:text-textColor">
                  {page.desc}
                </span>
              </div>
            </div>
            <div>
              <ChevronRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChoosePage;
