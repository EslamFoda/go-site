"use client";

import ThemeToggle from "@/components/themeToggle";
import { usePathname } from "next/navigation";
import React from "react";
import UserMenu from "../userMenu";
import { ActiveUserType } from "@/utlis/auth-helper/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    label: "Dashboard",
    isActive: (path: string) => path === "/",
  },
  {
    href: "/templates",
    label: "Templates",
    isActive: (path: string) => path.includes("templates"),
  },
];

function TopBar({ user }: { user: ActiveUserType }) {
  const pathname = usePathname();

  if (pathname.includes("/site")) return null;
  return (
    <header className="h-16 w-full border-b px-5 flex items-center justify-between">
      <div>
        <Link href="/">
          <span className="font-bold text-lg">Vixx</span>
        </Link>
      </div>
      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-muted-foreground h-16 flex items-center border-b border-transparent hover:text-foreground transition-colors",
              {
                "border-b border-foreground  text-foreground":
                  item.isActive(pathname),
              }
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        <ThemeToggle />
        <UserMenu user={user} />
      </div>
    </header>
  );
}

export default TopBar;
