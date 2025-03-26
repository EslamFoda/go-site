import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MainLogo } from "@/icons/mainLogo";
import { cn } from "@/lib/utils";
import { createClient } from "@/utlis/supabase/client";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
interface SiteCardProps {
  site: any;
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
}
function SiteCard({ site, setSites }: SiteCardProps) {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const siteCardClassName = cn(
    "flex items-center justify-between border rounded-sm p-3 hover:bg-muted group transition-all",
    {
      "bg-muted": openMenu,
    }
  );
  const logoContainerClassName = cn(
    "h-10 w-10 rounded-sm bg-muted flex items-center justify-center group-hover:bg-background",
    {
      "bg-background": openMenu,
    }
  );
  const menuBtnClassName = cn(
    "flex items-center justify-center h-6 w-6 rounded-full bg-muted group-hover:bg-primary",
    {
      "bg-primary svg:stroke-background": openMenu,
    }
  );
  const menuIconClassName = cn("group-hover:stroke-background cursor-pointer", {
    "stroke-background": openMenu,
  });

  const editBtnClassName = cn(
    "hidden group-hover:flex items-center justify-center h-6 w-fit px-3  rounded-full bg-primary cursor-pointer",
    {
      "flex text-background": openMenu,
    }
  );

  const deleteSite = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("sites")
      .delete()
      .eq("siteId", site.siteId)
      .select();

    if (data) {
      setSites((prev: any) =>
        prev.filter((s: any) => s.siteId !== data[0].siteId)
      );
      setLoading(false);
    }
  };

  return (
    <div className={siteCardClassName}>
      <div className="flex items-center gap-2">
        <div className={logoContainerClassName}>
          <MainLogo />
        </div>
        <div>
          <span>{site.settings.name}</span>
          <span className="block text-muted-foreground text-xs">
            {site.settings.url || "Free · Unpublished"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div
          className={editBtnClassName}
          onClick={() => {
            router.push(`site/${site.siteId}/editor`);
          }}
        >
          <span className="group-hover:text-background">Edit</span>
        </div>
        <DropdownMenu
          defaultOpen={openMenu && !loading}
          onOpenChange={setOpenMenu}
        >
          <DropdownMenuTrigger>
            <div className={menuBtnClassName}>
              <Ellipsis size={16} className={menuIconClassName} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={deleteSite}
              disabled={loading}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default SiteCard;
