"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthForm, FormField, FormAction, FormLink } from "./auth-form";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");

  const fields: FormField[] = [
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "m@example.com",
      required: true,
      value: email,
      onChange: setEmail,
    },
  ];

  const action: FormAction = {
    text: "Send reset email",
    loadingText: "Sending...",
    onSubmit: async (formData) => {
      const supabase = createClient();
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
    },
  };

  const link: FormLink = {
    text: "Already have an account?",
    href: "/auth/login",
    linkText: "Login",
  };

  const successState = {
    title: "Check Your Email",
    description: "Password reset instructions sent",
    content: (
      <p className="text-sm text-muted-foreground">
        If you registered using your email and password, you will receive
        a password reset email.
      </p>
    ),
  };

  return (
    <AuthForm
      className={className}
      title="Reset Your Password"
      description="Type in your email and we'll send you a link to reset your password"
      fields={fields}
      action={action}
      link={link}
      successState={successState}
      {...props}
    />
  );
}