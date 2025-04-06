"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleRequest } from "@/utlis/auth-helper/client";
import { signInWithPassword, signInAsGuest } from "@/utlis/auth-helper/server";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGuestSubmitting, setIsGuestSubmitting] = useState(false);
  const router = useRouter();

  // Handler for password login
  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, signInWithPassword, router);
    setIsSubmitting(false);
  };

  // Handler for guest login
  const handleGuestSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent any form submission
    setIsGuestSubmitting(true);
    
    // Create FormData manually since we're not using a form submission
    const formData = new FormData();
    formData.append("pathName", "/");

    // Wrap signInAsGuest to match handleRequest's expected function signature
    const guestSignInAction = async () => {
      return await signInAsGuest(formData);
    };

    await handleRequest(
      { preventDefault: () => {} } as any, // Dummy event object
      guestSignInAction,
      router
    );
    
    setIsGuestSubmitting(false);
  };

  return (
    <div className="w-full">
      <form
        noValidate={true}
        className="mb-4 w-full"
        onSubmit={(e) => handlePasswordSubmit(e)}
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
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>

      {/* Guest login button  */}
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGuestSubmit}
        disabled={isGuestSubmitting}
      >
        {isGuestSubmitting ? "Processing..." : "Login as Guest"}
      </Button>
    </div>
  );
}

export default LoginForm;