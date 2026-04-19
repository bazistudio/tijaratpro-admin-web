"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Define routes that shouldn't have the dashboard sidebar/header
  const isAuthRoute = pathname?.startsWith("/login") || pathname?.startsWith("/register") || pathname?.startsWith("/forgot-password")

  if (isAuthRoute) {
    return <>{children}</>
  }

  // Dashboard layout is now handled by individual pages using PageLayout
  return <>{children}</>
}
