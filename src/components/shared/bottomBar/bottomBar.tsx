"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { HomeIcon, TemplatesIcon } from "@/icons/common";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    label: "Dashboard",
    isActive: (path: string) => path === "/",
    icon: HomeIcon,
  },
  {
    href: "/templates",
    label: "Templates",
    isActive: (path: string) => path.includes("templates"),
    icon: TemplatesIcon,
  },
];

function BottomBar() {
  const pathname = usePathname();
  const hideInPages =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot_password";
  if (pathname.includes("/site") || hideInPages) return null;

  return (
    <div className="fixed sm:hidden block bottom-0 left-0 right-0 h-20 bg-background backdrop-blur-md border-t">
      <div className="flex items-center justify-between h-full w-full">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex gap-1 flex-col w-full h-full items-center justify-center cursor-pointer text-muted-foreground/70 hover:text-foreground",
              {
                "text-foreground": item.isActive(pathname),
              }
            )}
          >
            <item.icon />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BottomBar;
