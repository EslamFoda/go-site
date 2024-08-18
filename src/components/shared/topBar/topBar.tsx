"use client";

import ThemeToggle from "@/components/themeToggle";
import { usePathname } from "next/navigation";
import React from "react";
import UserMenu from "../userMenu";
import { ActiveUserType } from "@/utlis/auth-helper/client";
import Link from "next/link";

function TopBar({ user }: { user: ActiveUserType }) {
  const pathname = usePathname();
  if (pathname.includes("/site")) return null;
  return (
    <header className="h-16 w-full border-b px-5 flex items-center justify-between">
      <div>
        <Link href="/">
          <span className="font-bold text-lg">Go-site</span>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-3">
        <ThemeToggle />
        <UserMenu user={user} />
      </div>
    </header>
  );
}

export default TopBar;
