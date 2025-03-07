import React from "react";
import SiteCard from "./siteCard";
interface SitesListProps {
  sites: any[];
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
}
function SitesList({ sites, setSites }: SitesListProps) {
  return (
    <div className="space-y-4">
      {sites.map((site) => {
        return <SiteCard site={site} key={site.siteId} setSites={setSites} />;
      })}
    </div>
  );
}

export default SitesList;
