import React from "react";
import { AuthWrapper } from "../auth/authWrapper";
import { createClient } from "@/utlis/supabase/server";
import UpdateAccountForm from "./upateAccountForm/updateAccountForm";

async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <AuthWrapper>
      <div className="flex items-center justify-center w-full px-5">
        <div className="mt-20 space-y-8 w-[700px]">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              hello {user?.user_metadata.userName}
            </h1>
            <span className="text-muted-foreground block">
              Manage your account here
            </span>
          </div>
          <UpdateAccountForm user={user} />
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Page;
