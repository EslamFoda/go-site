import React from "react";
import { createClient } from "@/utlis/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import UpdatePasswordForm from "./updatePasswordForm";

async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex justify-center text-center h-screen">
      <div className="space-y-3 mt-20 w-80">
        <h1 className="text-2xl font-bold">New password</h1>
        <div className="flex !mb-8 items-center justify-center gap-1">
          <span className="text-muted-foreground">
            Create a secure 8-Ch4r@ct3r password
          </span>
        </div>
        <UpdatePasswordForm />
        <Link
          href="/login"
          className="!mt-5 inline-block hover:underline underline-offset-8"
        >
          Back to Sign in
        </Link>
      </div>
    </div>
  );
}

export default Page;
