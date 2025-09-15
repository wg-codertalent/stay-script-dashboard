"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/loading-context";

export function LogoutButton() {
  const router = useRouter();
  const { setLoading } = useLoading();

  const logout = async () => {
    setLoading(true, "Logging out...");
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return <Button onClick={logout}>Logout</Button>;
}
