import { ActiveUserType } from "@/utlis/auth-helper/client";
import React from "react";
import CreateSite from "./createSite";
import EmptySiteState from "./emptySiteState";
interface DashboardProps {
  user: ActiveUserType;
}
function Dashboard({ user }: DashboardProps) {
  return (
    <div className="max-w-4xl m-auto px-5 mt-16">
      <CreateSite user={user} />
      <EmptySiteState user={user} />
    </div>
  );
}

export default Dashboard;
