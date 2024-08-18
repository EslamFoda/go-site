import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import SitesList from "./sitesList";
interface SitesProps {
  sites: any[];
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
}
function Sites({ sites, setSites }: SitesProps) {
  return (
    <div className="mt-10">
      <div className="flex items-center mb-4 border-b">
        <Search size={16} className="stroke-muted-foreground" />
        <Input
          placeholder="Search Sites..."
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none"
        />
      </div>
      <SitesList sites={sites} setSites={setSites} />
    </div>
  );
}

export default Sites;
