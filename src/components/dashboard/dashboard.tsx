"use client";

import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
// import CreateSite from "./createSite";
import EmptySiteState from "./emptySiteState";
import { ActiveUserType } from "@/utlis/auth-helper/client";
import { createClient } from "@/utlis/supabase/client";
import Sites from "./sites";
import SiteSkeleton from "./sites/sitesSkeleton/siteSkeleton";

interface DashboardProps {
  user: ActiveUserType;
}

function Dashboard({ user }: DashboardProps) {
  const ownerId = user?.id;
  const [sites, setSites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounced function to fetch user sites
  const fetchUserSites = useCallback(() => {
    const debouncedFetch = debounce(async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("sites")
          .select()
          .eq("owner_id", ownerId);
        if (error) {
          throw error;
        }
        setTimeout(() => {
          setSites(data);
          setLoading(false);
        }, 600); // Simulating fake loading
      } catch (error) {
        if (error instanceof Error) {
          setTimeout(() => {
            setError(error.message);
            setLoading(false);
          }, 600);
        }
      }
    }, 600);
    debouncedFetch();
  }, [ownerId]);

  useEffect(() => {
    if (ownerId) {
      setLoading(true);
      fetchUserSites();
    }
  }, [ownerId, fetchUserSites]);

  return (
    <div className="max-w-4xl m-auto px-5 mt-16">
      {/* <CreateSite user={user} setSites={setSites} sites={sites} /> */}
      {loading ? (
        <SiteSkeleton />
      ) : (
        <>
          {sites.length > 0 ? (
            <Sites sites={sites} setSites={setSites} />
          ) : (
            <EmptySiteState user={user} setSites={setSites} sites={sites} />
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
