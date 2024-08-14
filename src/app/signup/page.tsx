import OauthSignin from "@/components/shared/oauthSignin";
import Link from "next/link";
import React from "react";
import SignUpForm from "./signUpForm";
import { createClient } from "@/utlis/supabase/server";
import { redirect } from "next/navigation";

async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/");

  return (
    <div className="flex justify-center text-center h-screen">
      <div className="space-y-3 mt-20 w-80">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <div className="flex !mb-8 items-center justify-center gap-1">
          <span className="text-muted-foreground">Already on go-site?</span>
          <Link className="underline underline-offset-4" href="/login">
            Log in
          </Link>
        </div>
        <OauthSignin />
        <SignUpForm />
      </div>
    </div>
  );
}

export default Page;
