import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActiveUserType, handleRequest } from "@/utlis/auth-helper/client";
import { SignOut } from "@/utlis/auth-helper/server";
import Link from "next/link";
import { useRouter } from "next/navigation";
function UserMenu({ user }: { user: ActiveUserType }) {
  const router = useRouter();
  const activeUser = user?.user_metadata?.userName || user?.user_metadata?.name || user?.email;

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-muted h-8 w-8 rounded-full flex items-center justify-center">
        {activeUser?.slice(0, 1).toUpperCase() || "A"}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/account" className="w-full">
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full cursor-pointer">
          <form
            className="w-full"
            onSubmit={(e) => handleRequest(e, SignOut, router)}
          >
            <input type="hidden" name="pathName" value="logout" />
            <Button
              variant="ghost"
              className="p-0 h-auto justify-start font-normal w-full"
              type="submit"
            >
              Sign out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
