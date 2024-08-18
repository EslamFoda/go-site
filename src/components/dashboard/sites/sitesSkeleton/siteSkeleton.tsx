import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SiteCardSkeleton = () => (
  <Skeleton className="flex items-center justify-between border bg-background rounded-sm p-3">
    <div className="flex items-center gap-2">
      <Skeleton className="h-10 w-10 rounded-sm bg-muted" />

      <div className="space-y-2">
        <Skeleton className="h-3 w-64" />
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
  </Skeleton>
);

function SiteSkeleton() {
  return (
    <div className="mt-10">
      <div className="space-y-4">
        <SiteCardSkeleton />
        <SiteCardSkeleton />
        <SiteCardSkeleton />
        <SiteCardSkeleton />
        <SiteCardSkeleton />
      </div>
    </div>
  );
}

export default SiteSkeleton;
