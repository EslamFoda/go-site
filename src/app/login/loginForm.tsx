"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleRequest } from "@/utlis/auth-helper/client";
import { signInWithPassword } from "@/utlis/auth-helper/server";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router);
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
          Sign in
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
