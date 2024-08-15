"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActiveUserType, handleRequest } from "@/utlis/auth-helper/client";
import { updateEmail } from "@/utlis/auth-helper/server";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function UpdateAccountForm({ user }: { user: ActiveUserType }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userEmail = user?.email;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Check if the new email is the same as the old email
    if (e.currentTarget.newEmail.value === userEmail) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    handleRequest(e, updateEmail, router);
    setIsSubmitting(false);
  };
  return (
    <form
      id="emailForm"
      noValidate={true}
      onSubmit={(e) => handleSubmit(e)}
      className="space-y-2"
    >
      {/* <div className="grid grid-cols-4">
        <Label htmlFor="password">Name</Label>
        <Input
          id="newUserName"
          placeholder="Display Name"
          type="text"
          name="newUserName"
          defaultValue={userName ?? ""}
          className="md:col-span-2 col-span-3"
        />
      </div> */}
      <div className="grid grid-cols-4">
        <Label htmlFor="passwordConfirm">Email</Label>
        <Input
          id="newEmail"
          placeholder="Enter Email Address"
          type="email"
          name="newEmail"
          defaultValue={userEmail ?? ""}
          className="md:col-span-2 col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 !mt-4">
        <div></div>
        <Button
          form="emailForm"
          disabled={isSubmitting}
          type="submit"
          className="md:col-span-2 col-span-3"
        >
          Update Email
        </Button>
      </div>
    </form>
  );
}

export default UpdateAccountForm;
