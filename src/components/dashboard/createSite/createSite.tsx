"use client";

import { Button } from "@/components/ui/button";
import { ActiveUserType } from "@/utlis/auth-helper/client";
import { CircleCheck } from "lucide-react";
import React from "react";
import CreateSiteModal from "../createSiteModal";
import { Stars } from "@/icons/common";
interface CreateSiteProps {
  user: ActiveUserType;
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
  sites: any[];
}
function CreateSite({ user, setSites, sites }: CreateSiteProps) {
  const [hideCreateSite, setHideCreateSite] = React.useState(true);
  const userName = user?.user_metadata?.userName || user?.user_metadata?.name || user?.email;

  const toggleCreateSite = () => {
    setHideCreateSite(!hideCreateSite);
  };
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-2xl font-bold capitalize">
        Hi {userName || "Anonymous"},
      </h1>
      <div className="flex items-center gap-3">
        <Button
          onClick={toggleCreateSite}
          variant="ghost"
          size="icon"
          className="bg-secondary h-10 w-10"
        >
          <CircleCheck className="fill-primary stroke-background" />
        </Button>
        {hideCreateSite && (
          <CreateSiteModal user={user} setSites={setSites} sites={sites}>
            <Button className="w-32 flex items-center justify-between">
              New Site <Stars />
            </Button>
          </CreateSiteModal>
        )}
      </div>
    </div>
  );
}

export default CreateSite;
