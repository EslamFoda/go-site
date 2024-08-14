"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleRequest } from "@/utlis/auth-helper/client";
import { requestPasswordUpdate } from "@/utlis/auth-helper/server";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface ForgotPasswordProps {
  disableButton?: boolean;
}
function ForgotPasswordForm({ disableButton }: ForgotPasswordProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, requestPasswordUpdate, router);
    setIsSubmitting(false);
  };
  return (
    <form noValidate={true} className="mb-4" onSubmit={(e) => handleSubmit(e)}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            name="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            className="w-full p-3 rounded-md bg-zinc-800"
          />
        </div>
        <Button disabled={disableButton}>Reset my password</Button>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
