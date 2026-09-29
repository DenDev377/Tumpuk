import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import SidebarDashboard from "@/components/dashboard/SidebarDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <SidebarDashboard />
      <div className="flex flex-col flex-1 min-w-0">
        <NavbarDashboard />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
