import React from "react";
import { createClient } from "@/utlis/supabase/server";
import { redirect } from "next/navigation";
import ForgotPasswordForm from "./forgotPasswordForm";
import Link from "next/link";

async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { disable_button: boolean };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/");

  return (
    <div className="flex justify-center mt-28 text-center h-screen">
      <div className="space-y-3 w-80">
        <h1 className="text-2xl font-bold">Forgot password?</h1>
        <div className="flex !mb-8 items-center justify-center gap-1">
          <span className="text-muted-foreground">
            Don’t worry, we will send you a reset link
          </span>
        </div>
        <ForgotPasswordForm disableButton={searchParams.disable_button} />
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
