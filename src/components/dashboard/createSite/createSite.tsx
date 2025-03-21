"use client";

import { Button } from "@/components/ui/button";
import { ActiveUserType } from "@/utlis/auth-helper/client";
import { CircleCheck } from "lucide-react";
import React from "react";
import CreateSiteModal from "../createSiteModal";
interface CreateSiteProps {
  user: ActiveUserType;
  setSites: React.Dispatch<React.SetStateAction<any[]>>;
  sites: any[];
}
function CreateSite({ user, setSites, sites }: CreateSiteProps) {
  const [hideCreateSite, setHideCreateSite] = React.useState(true);
  const userName = user?.user_metadata?.userName || user?.user_metadata?.name;

  const toggleCreateSite = () => {
    setHideCreateSite(!hideCreateSite);
  };
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="text-2xl font-bold capitalize">Hi {userName}</h1>
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

const Stars = () => (
  <svg
    data-v-caa3228a=""
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-caa3228a=""
      d="M5.52865 1.91677C5.52865 1.91677 4.38656 4.98925 3.669 5.63505C2.95144 6.28086 0.570312 6.8751 0.570312 6.8751C0.570312 6.8751 2.95144 7.46934 3.669 8.11515C4.38656 8.76095 5.52865 11.8334 5.52865 11.8334C5.52865 11.8334 6.67073 8.76107 7.38829 8.11515C8.10585 7.46934 10.487 6.8751 10.487 6.8751C10.487 6.8751 8.10585 6.28086 7.38829 5.63505C6.67073 4.98925 5.52865 1.91677 5.52865 1.91677Z"
      className="fill-background"
    ></path>
    <path
      data-v-caa3228a=""
      d="M9.90363 0.166748C9.90363 0.166748 9.36617 1.61262 9.0285 1.91653C8.69082 2.22044 7.57029 2.50008 7.57029 2.50008C7.57029 2.50008 8.69082 2.77972 9.0285 3.08363C9.36617 3.38754 9.90363 4.83341 9.90363 4.83341C9.90363 4.83341 10.4411 3.3876 10.7788 3.08363C11.1164 2.77972 12.237 2.50008 12.237 2.50008C12.237 2.50008 11.1164 2.22044 10.7788 1.91653C10.4411 1.61262 9.90363 0.166748 9.90363 0.166748Z"
      className="fill-background"
    ></path>
  </svg>
);
