"use client";
import { Button } from "@/components/ui/button";
import { handleRequest } from "@/utlis/auth-helper/client";
import { SignOut } from "@/utlis/auth-helper/server";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React from "react";
interface LogoutProps {
  user: User;
}
function Logout({ user }: LogoutProps) {
  const router = useRouter();

  if (!user) return null;
  return (
    <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
      <input type="hidden" name="pathName" value="logout" />
      <Button type="submit">Sign out</Button>
    </form>
  );
}

export default Logout;
