import { DashboardLayout } from "@/components/layout/DashboardLayout";

// ─── Dashboard Group Layout ───────────────────────────────────────────────────
// This forces all routes placed inside `app/(dashboard)` to adopt the 
// standard ERP interface layout (Sidebar + Header).
//
// By relying on Next.js nested layouts, pages don't need to manually
// wrap themselves in `<DashboardLayout>`.

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
