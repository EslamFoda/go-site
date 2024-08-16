import { Button } from "@/components/ui/button";
import React from "react";
import CreateSiteModal from "../createSiteModal";
import { ActiveUserType } from "@/utlis/auth-helper/client";
interface EmptySiteStateProps {
  user: ActiveUserType;
}
function EmptySiteState({ user }: EmptySiteStateProps) {
  return (
    <div className="mt-60 flex items-center justify-center text-center">
      <div className="w-80 flex flex-col gap-4 justify-center items-center">
        <SitesIcon />
        <div className="space-y-4">
          <p className="text-muted-foreground">
            No sites yet. Create landing pages, blog posts, SEO and digital
            products.
          </p>
          <CreateSiteModal user={user}>
            <Button className="w-full">Create New Site</Button>
          </CreateSiteModal>
        </div>
      </div>
    </div>
  );
}

export default EmptySiteState;

const SitesIcon = () => (
  <svg
    width={60}
    height={60}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    data-v-caa3228a=""
  >
    <g clipPath="url(#a)" className="fill-muted-foreground" data-v-caa3228a="">
      <path d="M8 4H16V2H8V4Z" data-v-caa3228a=""></path>
      <path d="M5 8H19V6H5V8Z" data-v-caa3228a=""></path>
      <path d="m3 10v12h18v-12h-18z" data-v-caa3228a=""></path>
    </g>
    <defs data-v-caa3228a="">
      <clipPath id="a" data-v-caa3228a="">
        <rect width="24" height="24" fill="#fff" data-v-caa3228a=""></rect>
      </clipPath>
    </defs>
  </svg>
);
