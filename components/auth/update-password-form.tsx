"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthForm, FormField, FormAction } from "./auth-form";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const fields: FormField[] = [
    {
      id: "password",
      label: "New password",
      type: "password",
      placeholder: "New password",
      required: true,
      value: password,
      onChange: setPassword,
    },
  ];

  const action: FormAction = {
    text: "Save new password",
    loadingText: "Saving...",
    onSubmit: async (formData) => {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ 
        password: formData.password 
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/dashboard");
    },
  };

  return (
    <AuthForm
      className={className}
      title="Reset Your Password"
      description="Please enter your new password below."
      fields={fields}
      action={action}
      {...props}
    />
  );
}