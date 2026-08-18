import Link from "next/link";
import React from "react";
import LoginForm from "./loginForm";
import OauthSignIn from "@/components/shared/oauthSignin";
import { createClient } from "@/utlis/supabase/server";
import { redirect } from "next/navigation";

async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/");

  return (
    <div className="flex justify-center text-center mt-28 h-screen">
      <div className="space-y-3 w-80">
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex !mb-8 items-center justify-center gap-1">
          <span className="text-muted-foreground">new to vexx?</span>
          <Link className="underline underline-offset-4" href="/signup">
            Sign up
          </Link>
        </div>
        <OauthSignIn />
        <LoginForm />
        <Link
          href="/forgot_password"
          className="!mt-5 inline-block hover:underline underline-offset-8"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

export default Page;
