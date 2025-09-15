"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthForm, FormField, FormAction, FormLink } from "./auth-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
    {
      id: "password",
      label: "Password",
      type: "password",
      required: true,
      value: password,
      onChange: setPassword,
      link: {
        text: "Forgot your password?",
        href: "/auth/forgot-password",
      },
    },
  ];

  const action: FormAction = {
    text: "Login",
    loadingText: "Logging in...",
    onSubmit: async (formData) => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      router.push("/");
    },
  };

  const link: FormLink = {
    text: "Don't have an account?",
    href: "/auth/register",
    linkText: "Sign up",
  };

  return (
    <AuthForm
      className={className}
      title="Login"
      description="Enter your email below to login to your account"
      fields={fields}
      action={action}
      link={link}
      {...props}
    />
  );
}