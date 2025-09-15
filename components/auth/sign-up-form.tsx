"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthForm, FormField, FormAction, FormLink } from "./auth-form";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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
    },
    {
      id: "repeat-password",
      label: "Repeat Password",
      type: "password",
      required: true,
      value: repeatPassword,
      onChange: setRepeatPassword,
    },
  ];

  const action: FormAction = {
    text: "Sign up",
    loadingText: "Creating an account...",
    onSubmit: async (formData) => {
      if (formData.password !== formData["repeat-password"]) {
        throw new Error("Passwords do not match");
      }

      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    },
  };

  const link: FormLink = {
    text: "Already have an account?",
    href: "/auth/login",
    linkText: "Login",
  };

  return (
    <AuthForm
      className={className}
      title="Sign up"
      description="Create a new account"
      fields={fields}
      action={action}
      link={link}
      {...props}
    />
  );
}