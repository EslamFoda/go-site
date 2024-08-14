"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleRequest } from "@/utlis/auth-helper/client";
import { signUp } from "@/utlis/auth-helper/server";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signUp, router);
    setIsSubmitting(false);
  };
  return (
    <form
      noValidate={true}
      className="mb-4 w-full"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="space-y-3">
        <Input
          id="username"
          placeholder="Name"
          type="text"
          name="username"
          autoCapitalize="none"
          autoComplete="username"
          autoCorrect="off"
        />
        <Input
          id="email"
          placeholder="Email"
          type="email"
          name="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
        />
        <Input
          id="password"
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="current-password"
        />
        <Button className="w-full" disabled={isSubmitting}>
          Sign up
        </Button>
      </div>
    </form>
  );
}

export default SignUpForm;
