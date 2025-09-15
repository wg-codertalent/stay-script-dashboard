"use client";

import { useLoading } from "@/contexts/loading-context";
import { Spinner } from "@/components/ui/spinner";

export function LoadingOverlay() {
  const { isLoading, loadingText } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border rounded-lg p-8 shadow-lg">
        <Spinner size="lg" text={loadingText} layout="stacked" />
      </div>
    </div>
  );
}
