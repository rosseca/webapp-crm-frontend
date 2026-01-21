import { Outlet, Navigate } from "react-router";
import { SidebarProvider, SidebarInset } from "~/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";
import { useAuthStore } from "~/modules/auth";

export default function DashboardLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 mx-2 py-1 overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
