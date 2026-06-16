"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { useAuthStore } from "@/store/useAuthStore";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // localStorage dan auth state ni yuklash (SSR hydration mismatch oldini olish)
    useAuthStore.persist.rehydrate();
  }, []);

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
