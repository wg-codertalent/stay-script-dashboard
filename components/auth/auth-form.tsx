"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoading } from "@/contexts/loading-context";
import Link from "next/link";

export interface FormField {
  id: string;
  label: string;
  type: "email" | "password" | "text" | "tel" | "url";
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  validation?: (value: string) => string | null;
  helperText?: string;
  link?: {
    text: string;
    href: string;
  };
}

export interface FormAction {
  text: string;
  loadingText: string;
  onSubmit: (formData: Record<string, string>) => Promise<void>;
}

export interface FormLink {
  text: string;
  href: string;
  linkText: string;
}

export interface AuthFormProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
  description: string;
  fields: FormField[];
  action: FormAction;
  link?: FormLink;
  successState?: {
    title: string;
    description: string;
    content: React.ReactNode;
  };
}

export function AuthForm({
  className,
  title,
  description,
  fields,
  action,
  link,
  successState,
  ...props
}: AuthFormProps) {
  const { setLoading } = useLoading();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true, action.loadingText);
    setError(null);

    try {
      // Validate all fields
      const formData: Record<string, string> = {};
      for (const field of fields) {
        if (field.validation) {
          const validationError = field.validation(field.value);
          if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
          }
        }
        formData[field.id] = field.value;
      }

      await action.onSubmit(formData);
      
      if (successState) {
        setSuccess(true);
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Show success state if provided and success is true
  if (successState && success) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{successState.title}</CardTitle>
            <CardDescription>{successState.description}</CardDescription>
          </CardHeader>
          <CardContent>{successState.content}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {fields.map((field) => (
                <div key={field.id} className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    {field.link && (
                      <Link
                        href={field.link.href}
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        {field.link.text}
                      </Link>
                    )}
                  </div>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  {field.helperText && (
                    <p className="text-xs text-muted-foreground">
                      {field.helperText}
                    </p>
                  )}
                </div>
              ))}
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full">
                {action.text}
              </Button>
            </div>
            {link && (
              <div className="mt-4 text-center text-sm">
                {link.text}{" "}
                <Link href={link.href} className="underline underline-offset-4">
                  {link.linkText}
                </Link>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
