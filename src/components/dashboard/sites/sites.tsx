import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";
import SitesList from "./sitesList";

interface SitesProps {
  sites: any[];
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
}

function Sites({ sites, setSites }: SitesProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter sites based on the search term
  const filteredSites = sites.filter((site) =>
    site.settings.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-10">
      <div className="flex items-center mb-4 border-b">
        <Search size={16} className="stroke-muted-foreground" />
        <Input
          placeholder="Search Sites..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none"
        />
      </div>
      <SitesList sites={filteredSites} setSites={setSites} />
    </div>
  );
}

export default Sites;
