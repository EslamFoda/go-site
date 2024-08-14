"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleRequest } from "@/utlis/auth-helper/client";
import { updatePassword } from "@/utlis/auth-helper/server";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function UpdatePasswordForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, updatePassword, router);
    setIsSubmitting(false);
  };
  return (
    <form noValidate={true} className="mb-4" onSubmit={(e) => handleSubmit(e)}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Input
            id="password"
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="current-password"
          />
          <Input
            id="passwordConfirm"
            placeholder="Confirm Password"
            type="password"
            name="passwordConfirm"
            autoComplete="current-password"
          />
        </div>
        <Button disabled={isSubmitting}>Reset my password</Button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
