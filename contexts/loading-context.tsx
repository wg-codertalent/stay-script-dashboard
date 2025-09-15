"use client";

import * as React from "react";

interface LoadingContextType {
  isLoading: boolean;
  loadingText: string;
  setLoading: (isLoading: boolean, loadingText?: string) => void;
}

const LoadingContext = React.createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState("Loading...");

  const setLoading = React.useCallback((loading: boolean, text: string = "Loading...") => {
    setIsLoading(loading);
    setLoadingText(text);
  }, []);

  const value = React.useMemo(
    () => ({
      isLoading,
      loadingText,
      setLoading,
    }),
    [isLoading, loadingText, setLoading]
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = React.useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
