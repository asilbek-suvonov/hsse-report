"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { useAuthStore } from "@/store/useAuthStore";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return (
    <ThemeProvider
      defaultTheme="light"
      attribute="class"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
